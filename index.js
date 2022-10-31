const express = require('express');

// set up express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded());

// initialize routes
app.get('/', () => {
  
});


// listen for requests
app.listen(process.env.port || 4000, function(){
  console.log('now listening for requests');

});