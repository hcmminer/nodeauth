// packages
const express = require("express");
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.set("trust proxy", 1);
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
		// cookie: { secure: true }, // nếu bật lên thì không thể dùng req.isAuthenticated
	})
);

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// passport init BEFORE SESSION !!!!
app.use(passport.initialize());
app.use(passport.session());
//
app.get("*", (req, res, next) => {
	res.locals.user = req.user || null;// user is a var in local range when every a request send up
	next();
});

// ROUTER
app.use("/", indexRouter);
app.use("/users", usersRouter);

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// START SERVER
app.listen(port, () => {
	console.log(`Nodeauth at http://localhost:${port}`);
});
