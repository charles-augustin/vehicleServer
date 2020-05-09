var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('./cors');
var authenticate = require('../authenticate');
var User = require('../model/user');
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  // User.findOne({username: req.body.username})
  //using register method for passport
  User.register(new User({ username: req.body.username, name: req.body.name, email: req.body.email}),       req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
      console.log("if loop");
    }
    else {
      //adding first name and last name of user to db
      if (req.body.username){
        user.username = req.body.username;
        user.name = req.body.name;
        user.email = req.body.email;
      }
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: err });
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, status: 'Registration Successful!' });
        });
      });
    }
  });
});

router.post('/login', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: 'Login Unsuccessful!', err: info });
    }

    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, status: 'Login Unsuccessful!', err: 'Could not login the user!' });
      }

      //creating a token
      var token = authenticate.getToken({ _id: req.user._id });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, user_id: req.user._id, token: token, status: 'Login Successful!' });
    });

  })(req, res, next);
});

router.get('/checkJWTtoken', cors.cors, (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ status: 'JWT Invalid', success: false, err: info });
    }

    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ status: 'JWT valid', success: true, user: user });
    }
  })(req, res);
});

router.get('/logout', cors.cors, (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id', { httpOnly: true, path: "/" });
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
