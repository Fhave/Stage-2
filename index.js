const express = require('express');

// set up express app
const app = express();


// initialize routes
app.get('/', (req, res) => {
  res.json({ "slackUsername": "Fhave", "backend": true, "age": 20, "bio": "My Name is Omoruyi Iyobosa. I am an aspiring Fullstack Web Developer" })
});


// listen for requests
app.listen(process.env.port || 4000, function(){
  console.log('now listening for requests');
});