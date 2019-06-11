var express = require("express");
var app = express();

const SERVER_PORT = process.env.PORT || 5000;
app.listen(SERVER_PORT, function() {
  console.log("ESCUTANDO NA PORTA " + SERVER_PORT);
});
