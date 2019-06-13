"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Usuario = _interopRequireDefault(require("../models/Usuario"));

var _main = _interopRequireDefault(require("../config/main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isExpired = function isExpired(expire) {
  var now = new Date().getTime() / 1000;

  if (now > expire) {
    throw "Tempo de sessão foi expirado";
  }
};

var isAllowed = function isAllowed(req) {
  var testUrl = req.url;
  var allowed = _main["default"].publicRoutes.indexOf(testUrl) > -1;
  return allowed;
};

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var authorization, _authorization$split, _authorization$split2, type, token, decoded, userId, usuario;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.headers && req.headers.authorization)) {
              _context.next = 16;
              break;
            }

            _context.prev = 1;
            authorization = req.headers.authorization;
            _authorization$split = authorization.split(" "), _authorization$split2 = _slicedToArray(_authorization$split, 2), type = _authorization$split2[0], token = _authorization$split2[1];
            decoded = _jsonwebtoken["default"].verify(token, _main["default"].tokenSecret, {
              ignoreExpiration: false
            });
            isExpired(decoded.exp);
            userId = decoded.id;
            _context.next = 9;
            return _Usuario["default"].findById(userId);

          case 9:
            usuario = _context.sent;
            req.appContext = {
              userSession: usuario
            };
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0); // if (!isAllowed(req)) {
            //   return res.status(401).send("unauthorized");
            // }

          case 16:
            next();

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=user-session.js.map