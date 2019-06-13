"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRouter = void 0;

var _user = _interopRequireDefault(require("../controllers/user.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserRouter = function UserRouter(app) {
  app.route("/me").get(_user["default"].me);
  app.route("/config").get(_user["default"].getConfig).post(_user["default"].setConfig);
};

exports.UserRouter = UserRouter;
//# sourceMappingURL=user.route.js.map