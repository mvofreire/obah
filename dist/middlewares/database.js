"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _main = _interopRequireDefault(require("../config/main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ENV = process.env.NODE_ENV || "dev";
var config = _main["default"].database[ENV];
var DB_PROTOCOL = config.DB_PROTOCOL;
var DB_HOST = config.DB_HOST;
var DB_USER = config.DB_USER;
var DB_PASSWORD = config.DB_PASSWORD;
var DB_DATABASE = config.DB_DATABASE;
var DB_PORT = config.DB_PORT;
var DB_OPTIONS = config.DB_OPTIONS || "";
var connectionString = "".concat(DB_PROTOCOL).concat(DB_USER, ":").concat(DB_PASSWORD, "@").concat(DB_HOST).concat(DB_PORT, "/").concat(DB_DATABASE, "?").concat(DB_OPTIONS);

var _default = function _default() {
  _mongoose["default"].connect(connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true
  }).then(function () {
    console.log("MongoDB Conectado: ".concat(ENV));
  })["catch"](function (err) {
    console.log(err);
  });
};

exports["default"] = _default;
//# sourceMappingURL=database.js.map