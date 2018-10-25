const port = Number(process.env.HTTPPORT) || 4500;
const http = require("http");
const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION || "mongodb://localhost/ottest");
// When using unix sockets uencode: "mongodb://%2Ftmp%2Fmongodb-27017.sock/ottest"
const Otdata = require("./schema");
const db = mongoose.connection;
const initServer = httpServer =>
	httpServer.listen(port, () => {
		return console.log(`Listening on ${port}`);
	});

// Owntracks expects an empty array as a "success" response
const reply = (res, status = 200, contentType = "application/json", content = "[]\n") => {
	res.writeHead(status, { "Content-Type": contentType });
	return res.end(content);
};

const reqOnReadable = req =>
	Reflect.construct(Promise, [
		(resolve, reject) => {
			req.once("readable", () => {
				return resolve(req);
			});
		}
	]);

const parse = raw =>
	Reflect.construct(Promise, [
		(resolve, reject) => {
			console.log(raw);
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
	reqOnReadable(req)
		.then(read)
		.then(parse)
		.then(save)
		.then(saved => reply(res))
		.catch(console.error);

const httpServer = http.createServer(handle);
db.once("open", () => {
	return initServer(httpServer);
});
