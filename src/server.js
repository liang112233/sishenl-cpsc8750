// use the express library
const express = require('express');
// create a new server application
const app = express();

// cookie 
const cookieParser = require('cookie-parser');
app.use(cookieParser());

let nextVisitorId = 1;

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;
// set the view engine to ejs
app.set('view engine', 'ejs');

// The main page of our website
// the main page
app.get('/', (req, res) => {
  const date = Date.now().toString();
  let visitorId = req.cookies.visitorId ? nextVisitorId : ++nextVisitorId;
  res.cookie('visitorId', visitorId);
  res.cookie('visited', date);
 // console.log(req.cookies.visited);
  req.cookies.visited = Math.floor((date - req.cookies.visited ) / 1000 )
  
  res.render('welcome',{
  name: req.query.name || "World",
  visitDate: new Date().toString(), 
  visitId: visitorId,
  timeSinceLast : req.cookies.visited,
  } /* params */);
});


app.use(express.static('public'));
// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");

