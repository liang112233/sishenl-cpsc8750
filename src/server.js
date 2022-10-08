// use the express library
const express = require('express');

// create a new server application
const app = express();

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;


// The main page of our website
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>An Example Title</title>
        <link rel="stylesheet" href="app.css">
      </head>
      <body>
        <h1>Hello, World!</h1>
        <p>HTML is so much better than a plain string!</p>
      </body>
    </html>
  `);
});

app.use(express.static('public'));
// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");
