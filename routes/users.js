// ROUTER
const express = require("express");
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
router.get("/logout", function (req, res, next) {
	res.render("logout", {
		title: "logout",
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
	check("username").notEmpty(),
	check("password").isLength({ min: 5 }),
	check("name").notEmpty(),
	check("email").isEmail(),
	check("password2").custom((value, { req }) => value == req.body.password),
	async (req, res, next) => {
		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// return res.status(400).json({ errors: errors.array() });
			res.render("register",{a: "AAAA",b:"BBB",errors: errors.array()});
		}
		// save data to databases
		await User.create({
			username: req.body.username,
			password: req.body.password,
			name: req.body.name,
			email: req.body.email,
			profileimage: JSON.stringify(req.file.path),
		});
		res.location("/");
		res.redirect("/");
	}
);

module.exports = router;
