"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SystemRouter = void 0;

var SystemRouter = function SystemRouter(app) {
  app.route("/system/status").get(function (req, res) {
    return res.send("ok");
  });
};

exports.SystemRouter = SystemRouter;
//# sourceMappingURL=system.route.js.map