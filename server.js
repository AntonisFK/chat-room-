var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

//store users with session id 
var cookieParser = require('cookie-parser');
var session = require('express-session')
app.use(cookieParser());
app.use(session({
    secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
    resave: false,
    saveUninitialized: true
}));



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//we're going to have /routes/index.js handle all of our routing

// setting server to run on port 3000
var server = app.listen(3000, function() {
 console.log("listening on port 3000!");
})


var route = require('./routes/index.js')(app, server);