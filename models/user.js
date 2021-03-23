// MONGOOSE
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/nodeauth", {
	useNewUrlParser: true,
});

// bcryptjs
const bcrypt = require("bcryptjs");

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

const User = mongoose.model("user", UserSchema);

module.exports = User;

module.exports.createUser = (newUser, callback) => {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash("aghdasgdas", salt, function (err, hash) {
			// Store hash in your password DB.
			newUser.password = hash;
			User.create(newUser, callback);
		});
	});
};
