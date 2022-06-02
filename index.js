// index.js
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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.use(express.urlencoded());

app.get('/api/:date', (req, res) => {
  const inputDate = req.params.date;
  let date = "";
  const numDate = Number(inputDate)
  if (numDate) {
    date = new Date(numDate)
  } else {
    date = new Date(inputDate)
  }
  const unixDate = date.getTime();
  const utcDate = date.toUTCString();
  if (date.getTime() === date.getTime()) {
    res.json({unix: unixDate, utc: utcDate})
  } else {
    res.json({error: "Invalid Date"})
  }
});

app.get('/api', (req, res) => {
  const date = new Date();
  const unixDate = date.getTime();
  const utcDate = date.toUTCString();
  res.json({unix: unixDate, utc: utcDate})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
