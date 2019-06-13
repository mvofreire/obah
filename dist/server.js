"use strict";

require("@babel/polyfill/noConflict");

var _database = _interopRequireDefault(require("./middlewares/database"));

var _route = _interopRequireDefault(require("./middlewares/route"));

var _userSession = _interopRequireDefault(require("./middlewares/user-session"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _database["default"])();
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_userSession["default"]);
(0, _route["default"])(app);
var SERVER_PORT = process.env.PORT || 5000;
app.listen(SERVER_PORT, function () {
  console.log("ESCUTANDO NA PORTA ".concat(SERVER_PORT, "!"));
});
//# sourceMappingURL=server.js.map