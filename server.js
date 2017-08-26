var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
//configure app to use BodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 8080;  //set port

// Routes for our API
//===========================================
var router = express.Router();  // get instance of express router

//middleware to use for all requests
router.use(function(req, res, next) {
  //do logging
  console.log('Something is happening.');
  next(); //make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working
//(accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});


//***************************************NEW ROUTE FOR EXTERNAL API**************************
router.route('/recipes/:recipeSearch')

.get(function(req, res) {
  var url = 'http://food2fork.com/api/search?key=28c6a5c2d2a2364793dc4e56623f9826&q=' + req.params.recipeSearch;
  req.pipe(request(url)).pipe(res);
});

// Register Our Routes ------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// Start the Server
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
