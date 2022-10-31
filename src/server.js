
//  use the express library
const express = require('express');
// create a new server application
const app = express();
//standard api for web requests
const fetch = require('node-fetch');

//
//
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

app.get("/trivia", async (req, res) => {
  // fetch the data
  const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");

  // fail if bad response
  if (!response.ok) {
    res.status(500);
    res.send(`Open Trivia Database failed with HTTP code ${response.status}`);
    return;
  }

  // interpret the body as json
  const data = await response.json();

  // fail if db failed
  if (data.response_code !== 0) {
    res.status(500);
    res.send(`Open Trivia Database failed with internal response code ${data.response_code}`);
    return;
  }

  // respond to the browser
 // res.send(JSON.stringify(content, 2));
  correctAnswer = data.results[0]['correct_answer'];
  answers = data.results[0]['incorrect_answers'];
  answers.push(correctAnswer);

  const answerLinks = answers.map(answer => {
  return `<a href="javascript:alert('${
    answer === correctAnswer ? 'Correct!' : 'Incorrect, Please Try Again!'
    }')">${answer}</a>
  }`
})

  res.render('trivia', {question: data.results[0]['question'],
    category: data.results[0]['category'],
    difficulty: data.results[0]['difficulty'],
    answers: answerLinks
  })
  });
app.use(express.static('public'));
// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");

