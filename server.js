var app = require('express')();
var http = require('http').Server(app);


//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/data/db/journal';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});


var path = require('path');
app.get('/', function(req, res){
  console.log(res);
  res.sendFile(__dirname + '/public/index.html');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});


// Retrieve







// // set up ======================================================================
// var express  = require('express');
// var app      = express(); 								// create our app w/ express
// var mongoose = require('mongoose'); 					// mongoose for mongodb
// var port  	 = process.env.PORT || 8080; 				// set the port
// var database = require('./config/database'); 			// load the database config
// var morgan   = require('morgan');
// var bodyParser = require('body-parser');
// var methodOverride = require('method-override');

// // configuration ===============================================================
// mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

// app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
// app.use(morgan('dev')); // log every request to the console
// app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()); // parse application/json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// // routes ======================================================================
// require('./app/routes.js')(app);

// // listen (start app with node server.js) ======================================
// app.listen(port);
// console.log("App listening on port " + port);
