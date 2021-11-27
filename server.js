var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const getTimeFormates = (date)=>{
  const unix = (date.getTime()/1000).toFixed(0);
  const utc = date.toUTCString();
  return {unix, utc};
}

app.get("/api/:time?", function (req, res) {
  if(req.params.time) {
    const date = new Date(req.params.time);
    if(Date.parse(date)){
      res.json(getTimeFormates(date))
    } else {
      res.json({error : "Invalid Date"})
    }
  } else {
    const date = new Date();
    res.json(getTimeFormates(date))
  }
});

var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
