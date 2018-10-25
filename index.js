const port = Number(process.env.HTTPPORT) || 4500;
const http = require("http");
const mongoose = require("mongoose");
mongoose.connect(
	process.env.CONNECTION || "mongodb://localhost/ottest",
	{ useNewUrlParser: true }
);
// When using unix sockets uencode: "mongodb://%2Ftmp%2Fmongodb-27017.sock/ottest"
const Otdata = require("./schema");
const db = mongoose.connection;

const ok = req => value => {
	if (value) {
		return Promise.resolve(req);
	}
	return Promise.reject(new Error("Precondition failed"));
};

const initServer = httpServer =>
	httpServer.listen(port, () => {
		return console.log(`Listening on ${port}`);
	});

// Owntracks expects an empty array as a "success" response
const reply = (res, status = 200, contentType = "application/json", content = "[]\n") => {
	res.writeHead(status, { "Content-Type": contentType });
	return res.end(content);
};

// Reflect.construct is the new new (eslint-plugin-fp)
const reqOnReadable = req =>
	Reflect.construct(Promise, [
		(resolve, _reject) => {
			req.once("readable", () => {
				return resolve(req);
			});
		}
	]);

const parse = raw =>
	Reflect.construct(Promise, [
		(resolve, reject) => {
			// console.log(raw);
			try {
				const p = JSON.parse(raw.toString("utf-8"));
				return resolve(p);
			} catch (e) {
				reject(e);
			}
		}
	]);

const save = obj => {
	console.log(obj);
	const Saveable = Reflect.construct(Otdata, [obj || { error: "Unable to parse data", data }]);
	return Saveable.save();
};

const read = req => req.read();

const handle = (req, res) =>
	ok(req)(req.method === "POST")
		.then(reqOnReadable)
		.then(read)
		.then(parse)
		.then(save)
		.then(_saved => reply(res))
		.catch(e => {
			console.error(e);
			return reply(res, 400, "text/plain", "I can't get no satisfaction");
		});

const httpServer = http.createServer(handle);
db.once("open", () => {
	return initServer(httpServer);
});
