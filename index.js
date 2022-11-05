const express = require('express');

// set up express app
const app = express();

app.use(express.json({extended:true})) 
app.use(express.urlencoded({extended:true})) 


// initialize routes
app.get('/', (req, res) => {
  res.json({ "slackUsername": "Fhave", "backend": true, "age": 20, "bio": "My Name is Omoruyi Iyobosa. I am an aspiring Fullstack Web Developer" });
});

const operation_typeEnums = Object.freeze({
  "+": "addition", 
  "*": "multiplication", 
  "-": "subtraction"
});


app.post('/stage2', (req, res) => {
  let operation_type = req.body.operation_type;

  if (Object.values(operation_typeEnums).includes(operation_type)) {
    let x = parseInt(req.body.x);
    let y = parseInt(req.body.y);
      switch(operation_type) {
        case "addition":
          res.json({ "slackUsername": "Fhave", "operation_type" : operation_type, "result": x+y })
        break;
        case "multiplication":
          res.json({ "slackUsername": "Fhave", "operation_type" : operation_type, "result": x*y })
        break;
        case "subtraction":
          res.json({ "slackUsername": "Fhave", "operation_type" : operation_type, "result": x-y })
        break;
      }
  } else {
    let words = operation_type.split(' ');
    
    var r = /\d+/g;
    if (r.test(operation_type)) {
      var numbers = operation_type.match(r)
      var x = parseInt(numbers[0]);
      var y = parseInt(numbers[1]);
    } else {
      var x = parseInt(req.body.x);
      var y = parseInt(req.body.y);
    }

    for(let i=0; i<words.length; i++) {
      if ((words[i] === "add") || (words[i] === "plus") || (words[i] === "addition") || (words[i] === "+")) {
        res.json({ "slackUsername": "Fhave", "operation_type" : "addition", "result": x+y });
        break;
      } else if ((words[i] === "minus") || (words[i] === "subtract") || (words[i] === "take away") || (words[i] === "subtraction") || (words[i] === "-")) {
        res.json({ "slackUsername": "Fhave", "operation_type" : "subtraction", "result": x-y });
        break;
      } else if ((words[i] === "multiply") || (words[i] === "times") || (words[i] === "multiplication") || (words[i] === "*")) {
        res.json({ "slackUsername": "Fhave", "operation_type" : "multiplication", "result": x*y });
        break;
      }
    }
  }
})


// listen for requests
app.listen(process.env.port || 4000, function(){
  console.log('now listening for requests');
});

// Export the Express API
module.exports = app;