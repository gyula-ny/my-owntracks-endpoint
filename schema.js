const mongoose = require("mongoose");
const otdataSchema = new mongoose.Schema(
	{
		_type: { type: String },
		tid: { type: String },
		acc: { type: Number },
		batt: { type: Number },
		conn: { type: String },
		lat: { type: Number },
		lon: { type: Number },
		t: { type: String },
		tst: { type: Number },
		event: { type: String },
		wtst: { type: Number }
	},
	{ timestamps: true, strict: false }
);

exports.Otdata = mongoose.model("otd", otdataSchema);
