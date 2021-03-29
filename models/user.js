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

module.exports.getUserById = (id, callback) => {
	User.findById(id, callback);
};

module.exports.getUserByUsername = (username, callback) => {
	const query = { username: username };
	User.findOne(query, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
	// Load hash from your password DB.
	// bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
	// 	callback(null, isMatch);
	// });

	bcrypt.compare(candidatePassword, hash).then((res) => {
		// res === true
		console.log(res,"res");
		callback(null, res);
	});
};

module.exports.createUser = (newUser, callback) => {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			// Store hash in your password DB.
			newUser.password = hash;
			User.create(newUser, callback);
		});
	});
};
