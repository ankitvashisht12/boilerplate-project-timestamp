// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


const validate = (req, res, next) => {
  try{
    const d = new Date(req.params.d); 
    
    if( isNaN(d) && isNaN(Number(req.params.d)))
      throw 'Invalid Date';    
    next();
  }catch (err) {
    res.json({
      error: err
    });
  }
}

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:d', validate, (req, res)=>{

  let date = req.params.d;

  if(isNaN(Number(date))){
    res.json({
      unix: +new Date(date),
      utc: new Date(date).toUTCString()
    });
  }else{
    date =  Number(date);
    res.json({
      unix: date,
      utc: new Date(date).toUTCString()
    });
  }


});

app.get('/api/timestamp/', (req, res)=>{
  const currDate = Date.now(); 
  res.json({
    unix: currDate,
    utc: new Date(currDate).toUTCString()
   });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
