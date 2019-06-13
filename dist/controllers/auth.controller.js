"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Usuario = _interopRequireDefault(require("../models/Usuario"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _main = _interopRequireDefault(require("../config/main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var tokenList = {};

var doLogin =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, usuario, token, _refreshToken, response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.prev = 1;
            _context.next = 4;
            return _Usuario["default"].findUserWithRolesAuthenticate(email, password);

          case 4:
            usuario = _context.sent;
            token = _jsonwebtoken["default"].sign({
              id: usuario._id
            }, _main["default"].tokenSecret, {
              expiresIn: _main["default"].tokenTimeExpiration
            });
            _refreshToken = _jsonwebtoken["default"].sign({
              id: usuario._id
            }, _main["default"].refreshTokenSecret, {
              expiresIn: _main["default"].refreshTokenTimeExpiration
            });
            response = {
              id: usuario._id,
              name: usuario.name,
              email: usuario.email,
              saved: usuario.saved,
              token: token,
              refreshToken: _refreshToken
            };
            tokenList[_refreshToken] = response;
            res.status(200).send(response);
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            res.status(500).send(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 12]]);
  }));

  return function doLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var refreshToken = function refreshToken(req, res) {
  // refresh the damn token
  var postData = req.body; // if refresh token exists

  if (postData.refreshToken && postData.refreshToken in tokenList) {
    var decoded = _jsonwebtoken["default"].verify(postData.refreshToken, _main["default"].refreshTokenSecret);

    var token = _jsonwebtoken["default"].sign({
      id: decoded.id
    }, _main["default"].tokenSecret, {
      expiresIn: _main["default"].tokenTimeExpiration
    });

    var response = {
      token: token
    }; // update the token in the list

    tokenList[postData.refreshToken].token = token;
    res.status(200).json(response);
  } else {
    res.status(404).send("Invalid request");
  }
};

var doRegister =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var data, usuario;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = req.body;
            _context2.prev = 1;
            _context2.next = 4;
            return _Usuario["default"].createNewUser(data);

          case 4:
            usuario = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(usuario));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            res.status(500).send("Erro ao criar usuario");

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function doRegister(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  doLogin: doLogin,
  doRegister: doRegister,
  refreshToken: refreshToken
};
exports["default"] = _default;
//# sourceMappingURL=auth.controller.js.map