const express = require('express');
// const Enum = require('enum');

// set up express app
const app = express();

app.use(express.json({extended:true})) 
app.use(express.urlencoded({extended:true})) 


// initialize routes
app.get('/', (req, res) => {
  res.json({ "slackUsername": "Fhave", "backend": true, "age": 20, "bio": "My Name is Omoruyi Iyobosa. I am an aspiring Fullstack Web Developer" });
});

// var operation_type = new Enum({
//   'addition': "+", 
//   'multiplication': "*", 
//   'subtraction': "-"
// })

const operation_typeEnums = Object.freeze({
  "+": "addition", 
  "*": "multiplication", 
  "-": "subtraction"
});


app.post('/stage2', (req, res) => {
  let operation_type = req.body.operation_type;

  if (Object.values(operation_typeEnums).includes(operation_type)) {
    let x = req.body.x;
    let y = req.body.y;
      switch(operation_type) {
        case "addition":
          let result1 = x+y;
          res.json({ "slackUsername": "Fhave", "operation_type" : operation_type, "result": result1 })
        break;
        case "multiplication":
          let result2 = x*y;
          res.json({ "slackUsername": "Fhave", "operation_type" : operation_type, "result": result2 })
        break;
        case "subtraction":
          let result3 = x-y;
          res.json({ "slackUsername": "Fhave", "operation_type" : operation_type, "result": result3 })
        break;
        default:
          console.log('jjj')
        break;
      }
  } else {
    var words = operation_type.split(' ');
    var r = /\d+/g;
    if (r.test(operation_type)) {
      var numbers = operation_type.match(r)
      var x = parseInt(numbers[0]);
      var y = parseInt(numbers[1]);
    } else {
      var x = req.body.x;
      var y = req.body.y;
    }
    console.log(r.test(operation_type))
    for(let i=0; i<words.length; i++) {
      if ((words[i] === "add") || (words[i] === "plus") || (words[i] === "addition") || (words[i] === "+")) {
        let result1 = x+y;
        res.json({ "slackUsername": "Fhave", "operation_type" : "addition", "result": result1 })
      } else if ((words[i] === "minus") || (words[i] === "subtract") || (words[i] === "take away") || (words[i] === "subtraction") || (words[i] === "-")) {
        let result3 = x-y;
        res.json({ "slackUsername": "Fhave", "operation_type" : "subtraction", "result": result3 })
      } else if ((words[i] === "multiply") || (words[i] === "times") || (words[i] === "multiplication") || (words[i] === "*")) {
        let result2 = x*y;
        res.json({ "slackUsername": "Fhave", "operation_type" : "multiplication", "result": result2 })
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