const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const passport = require('passport');

//EXPRESS
const express = require("express");
const app = express();
const port = 3000;

// VIEW ENGINE SETUP
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// SESSION-EXPRESS
const session = require("express-session");
app.set("trust proxy", 1); // trust first proxy
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);

// COOKIE PARSE AFTER SESSION
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// BODY PARSE
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//
app.use(passport.initialize());

// ROUTER

app.use("/", indexRouter);
app.use("/users", usersRouter);

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// START SERVER
app.listen(port, () => {
	console.log(`Nodeauth at http://localhost:${port}`);
});
