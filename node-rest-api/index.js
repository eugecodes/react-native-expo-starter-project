var express = require("express");
var app = express(),
bodyParser = require('body-parser'),
crypto = require('crypto'),
session = require('express-session'),
roman = require('./util.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'This-Is-My-Extremely-Useful-Secret',
  resave: true,
  saveUninitialized: true
}));
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'movies'
});

connection.connect();

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "logged_in_admin" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

// Login 
app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = crypto.createHash('md5').update(req.body.password).digest("hex");
  connection.query("select * from users where `user` = '" + username + "' and `password` = '" + password + "'", function(err, rows, fields) {
    if (err) throw err;
    if(rows[0]){
      req.session.user = "logged_in_admin";
      req.session.admin = true;
      res.send("login success!");
    }else{
      res.send('login failed');
    }
  });
});

// Logout
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

// Display all actors / actresses
app.get('/person', function (req, res) {
  connection.query('SELECT * FROM person', (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

// Display all movies
app.get('/movie', function (req, res) {
  connection.query('SELECT * FROM movie', (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

// Look for some actor / actress in particular
app.get('/person/:personName', function (req, res) {
  var look_for = req.params.personName;
  connection.query("select * from person where CONCAT(`First Name`, ' ', `Last Name`, ' ', `Aliases`) like '%" + look_for + "%'", function(err, rows, fields) {
    if (err) throw err;
    res.send(rows[0]);
  });
});

// Add new actor / actress
app.post('/person/new', auth, (req, res) => {
  var lastName = req.body.lastName;
  var firstName = req.body.firstName;
  var aliases = req.body.aliases;
  var moviesAsActor = req.body.moviesAsActor;
  var moviesAsDirector = req.body.moviesAsDirector;
  var moviesAsProducer = req.body.moviesAsProducer;
  connection.query("insert into person (`Last Name`, `First Name`, `Aliases`, `Movies As Actor Actress`, `Movies As Director`, `Movies As Producer`) values('"+lastName+"','"+firstName+"','"+aliases+"','"+moviesAsActor+"','"+moviesAsDirector+"', '"+moviesAsProducer+"')", function(err, rows, fields) {
    if (err) throw err;
    res.status(201).send(`Actor / Actress added with ID: ${rows.insertId}`);
  });
});

// Look for some movie in particular
app.get('/movie/:movieName', function (req, res) {
  var look_for = req.params.movieName;
  connection.query("select * from movie where `Title` like '%" + look_for + "%'", function(err, rows, fields) {
    if (err) throw err;
    res.send(rows[0]);
  });
});

// Add new movie
app.post('/movie/new', auth, (req, res) => {
  var title = req.body.title;
  var releaseYear = req.body.releaseYear;
  var casting = req.body.casting;
  var directors = req.body.directors;
  var producers = req.body.producers;
  connection.query("insert into movie (`Title`, `Release Year`, `Casting`, `Directors`, `Producers`) values('"+title+"','"+releaseYear+"','"+casting+"','"+directors+"','"+producers+"')", function(err, rows, fields) {
    if (err) throw err;
    res.status(201).send(`Movie added with ID: ${rows.insertId}`);
  });
});

// Add new user
app.post('/user/new', auth, (req, res) => {
  console.log(req.body);
  var username = req.body.username;
  var password = crypto.createHash('md5').update(req.body.password).digest("hex");
  connection.query("insert into users (`user`, `password`) values ('" + username + "','" + password + "')", function(err, rows, fields) {
    if (err) throw err;
    res.send(rows[0]);
  });
});

app.listen(3000, () => {
 console.log("El servidor esta inicializado en el puerto 3000");
});

//connection.end();