"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthRouter = void 0;

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AuthRouter = function AuthRouter(app) {
  app.route("/login").post(_auth["default"].doLogin);
  app.route("/register").post(_auth["default"].doRegister);
  app.route("/token").post(_auth["default"].refreshToken);
};

exports.AuthRouter = AuthRouter;
//# sourceMappingURL=auth.route.js.map