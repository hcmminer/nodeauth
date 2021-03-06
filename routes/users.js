// passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// EXPRESS
const express = require("express");

// ROUTER
const router = express.Router();

// UPLOAD BY MULTER
const multer = require("multer");
const upload = multer({ dest: "../uploads" });

// MODEL
const User = require("../models/user");

// LIST ROUTER
router.get("/", function (req, res, next) {
	res.send("respond with a resource ok");
});
router.get("/login", function (req, res, next) {
	res.render("login", {
		title: "login",
	});
});

// login with passport
router.post("/login", passport.authenticate("local"), function (req, res) {
	res.redirect("/");
});

// passport local stragegy
passport.use(
	new LocalStrategy((username, password, done) => {
		User.getUserByUsername(username, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: "Incorrect username." });
			}

			User.comparePassword(password, user.password, (err, isMatch) => {
				console.log("kiem tra mat khau", isMatch, err, password, user.password);
				if (err) {
					return done(err);
				}
				if (isMatch) {
					return done(null, user);
				} else {
					console.log("Invalid Password");
					return done(null, false, { message: "Invalid Password" });
				}
			});
			// console.log("ko chay tiep den day neu den day neu mk sai");
			// return done(null, user);
		});
	})
);

// session
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

router.get("/register", function (req, res, next) {
	res.render("register", {
		title: "register",
	});
});

// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require("express-validator");

router.post(
	"/register",
	upload.single("singlefileupload"),
	check("username", "username do not exits").notEmpty(),
	check("password", "password at least 5 character").isLength({ min: 5 }),
	check("name", "name is not empty").notEmpty(),
	check("email", "do not use spam email").isEmail(),
	check("password2", "do not use common word as the password").custom(
		(value, { req }) => value == req.body.password
	),
	(req, res, next) => {
		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.render("register", { a: "AAAA", b: "BBB", errors: errors.array() });
			return;
		}

		// CREATE USER AND SAVE TO DATABASES
		const newUser = new User({
			username: req.body.username,
			password: req.body.password,
			name: req.body.name,
			email: req.body.email,
			profileimage: JSON.stringify(req.file.path),
		});

		User.createUser(newUser, function (err, user) {
			if (err) throw err;
			console.log(user);
		});

		res.render("index", {
			message: "you have been registered and can login now",
		});
	}
);

// logout
router.get("/logout", (req, res, next) => {
	req.logout();
	res.redirect("/users/login");
});

module.exports = router;
