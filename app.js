var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require("hbs");
var bodyParser = require('body-parser');
var mongoose = require("./db/database");
var user = require('./models/user');
var formData = require('./models/FormData');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.set("view engine","hbs");
hbs.registerPartials(__dirname+"/views/partials");
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
//app.use('/', indexRouter);

app.post('/register', function(req,res){
 var users = new user({
     username: req.body.username,
     email : req.body.email,
     password: req.body.password,
     name: req.body.name,
     contact_detail: req.body.contact_detail
 });

  users.save().then(function(doc){
      res.send(200);
    },function(error){
      res.status(400).send(error);
    });
});

app.post('/login',function(req,res){
  user.find({
      username:req.body.username,
      password:req.body.password
  }).then(function(user_detail){
      if(user_detail.length>0) {
          res.render("afterLogin.hbs");
      }else{
          res.render("noUser.hbs");
      }
  },function(error){
     res.status(400).send(error);
  });
});

app.post('/submit',function(req,res){
    var FormData = new formData({
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email
    });

    FormData.save().then(function(doc){
        res.send(200);
    },function(error){
        res.status(400).send(error);
    });
});


app.get('/', function (req, res){
    res.render("home.hbs");
});



module.exports = app;
