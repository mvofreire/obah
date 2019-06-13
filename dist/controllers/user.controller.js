"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Usuario = _interopRequireDefault(require("../models/Usuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var me = function me(req, res) {
  var me = req.appContext;
  res.json(me);
};

var addFavorite =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var id, userSession, user, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = req.body.id;
            userSession = req.appContext.userSession;
            _context.next = 5;
            return _Usuario["default"].findById(userSession.id);

          case 5:
            user = _context.sent;
            _context.next = 8;
            return user.addFavorite(id);

          case 8:
            result = _context.sent;
            res.json(result);
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            res.status(500).send(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function addFavorite(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var removeFavorite =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var id, userSession, user, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            console.log(id);
            userSession = req.appContext.userSession;
            _context2.next = 6;
            return _Usuario["default"].findById(userSession.id);

          case 6:
            user = _context2.sent;
            _context2.next = 9;
            return user.removeFavorite(id);

          case 9:
            result = _context2.sent;
            res.json(result);
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            res.status(500).send(_context2.t0);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function removeFavorite(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var favorites =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var userSession, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            userSession = req.appContext.userSession;
            _context3.next = 4;
            return _Usuario["default"].findById(userSession.id).populate("saved.reference");

          case 4:
            user = _context3.sent;

            if (user) {
              res.json(user.saved);
            } else {
              res.status(404);
            }

            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.status(500).send(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function favorites(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var setConfig =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body, key, _value, id, user;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body = req.body, key = _req$body.key, _value = _req$body.value;
            id = req.appContext.userSession.id;
            _context4.next = 5;
            return _Usuario["default"].findById(id);

          case 5:
            user = _context4.sent;
            _context4.next = 8;
            return user.setConfig(key, _value);

          case 8:
            res.json(true);
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            res.status(500).send(_context4.t0);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));

  return function setConfig(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var getConfig =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var key, id, user, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            key = req.params.key;
            id = req.appContext.userSession.id;
            _context5.next = 5;
            return _Usuario["default"].findById(id);

          case 5:
            user = _context5.sent;
            result = user.getConfig(key, value);
            res.json(result);
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            res.status(500).send(_context5.t0);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function getConfig(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var _default = {
  me: me,
  addFavorite: addFavorite,
  removeFavorite: removeFavorite,
  favorites: favorites,
  setConfig: setConfig,
  getConfig: getConfig
};
exports["default"] = _default;
//# sourceMappingURL=user.controller.js.map