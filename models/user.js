// MONGOOSE
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/nodeauth', {useNewUrlParser: true});
mongoose.connection;
// User Schema
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		index: true,
	},
	password: {
		type: String,
	},
	email: {
		type: String,
	},
	name: {
		type: String,
	},
	profileimage: {
		type: String,
	},
});

const User = mongoose.model("Try", UserSchema);

module.exports = User;


