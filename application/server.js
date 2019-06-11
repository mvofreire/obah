var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/route", function(req, res) {
  res.send("Hello Route!");
});

const SERVER_PORT = process.env.PORT || 5000;
app.listen(SERVER_PORT, function() {
  console.log("ESCUTANDO NA PORTA " + SERVER_PORT);
});
