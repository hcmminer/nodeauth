//EXPRESS
const express = require("express");
const app = express();
const port = 3000;

// VIEW ENGINE SETUP
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// COOKIE PARSE
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// BODY PARSE
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// UPLOAD
// const multer = require("multer");
// const upload = multer({ dest: "./uploads" });

// ROUTER
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
app.use("/", indexRouter);
app.use("/users", usersRouter);

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// START SERVER
app.listen(port, () => {
	console.log(`Nodeauth at http://localhost:${port}`);
});
