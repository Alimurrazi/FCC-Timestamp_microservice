var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const getTimeFormates = (date)=>{
  const unix = date.getTime();
  const utc = date.toUTCString();
  return {unix, utc};
}

const getTimeParamFromRes = (time) => {
  if(Number(time)){
    return (Number(time));
  }
    return time;
}

app.get("/api/:time?", function (req, res) {
  if(req.params.time) {
    const time = getTimeParamFromRes(req.params.time);
    const date = new Date(time);
    if(Date.parse(date)){
      res.json(getTimeFormates(date));
    } else {
      res.json({error : "Invalid Date"});
    }
  } else {
    res.json(getTimeFormates(new Date()));
  }
});

var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
