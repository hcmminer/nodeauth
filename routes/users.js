var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource ok');
});
router.get('/register', function(req, res, next) {
  res.render('register',{title: "register"});
});
router.get('/login', function(req, res, next) {
  res.render('login',{title: "login"});
});
router.get('/logout', function(req, res, next) {
  res.render('logout',{title: "logout"});
});

module.exports = router;
