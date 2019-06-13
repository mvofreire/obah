"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _types = require("../business/account/types");

var _validation = require("../business/account/validation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsuarioSchema = new _mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  config: {},
  completeProfile: Boolean,
  accountType: {
    type: String,
    "enum": [_types.ACCOUNT_TYPES.free.name, _types.ACCOUNT_TYPES.premium.name, _types.ACCOUNT_TYPES.top.name],
    required: [true, "Tipo de Conta é obrigatório"]
  },
  topics: [{
    reference: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: "Topicos"
    },
    data: Date
  }],
  saved: [{
    reference: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: "Licitacao"
    },
    data: Date
  }]
});

var UsuarioClass =
/*#__PURE__*/
function () {
  function UsuarioClass() {
    _classCallCheck(this, UsuarioClass);
  }

  _createClass(UsuarioClass, [{
    key: "getCountTopics",
    value: function getCountTopics() {
      return this.topics.length || 0;
    }
  }, {
    key: "getAccount",
    value: function getAccount() {
      switch (this.accountType) {
        case _types.ACCOUNT_TYPES.free.name:
          return new _validation.AccountFree(this);

        case _types.ACCOUNT_TYPES.premium.name:
          return new _validation.AccountPremium(this);

        case _types.ACCOUNT_TYPES.top.name:
          return new _validation.AccountTop(this);
      }
    }
  }, {
    key: "canAddTopic",
    value: function canAddTopic() {
      return this.getAccount().canAdd();
    }
  }, {
    key: "setConfig",
    value: function setConfig(key, value) {
      this.config[key] = value;
      return this.save();
    }
  }, {
    key: "getConfig",
    value: function getConfig(key) {
      return this.config[key] || null;
    }
  }, {
    key: "addFavorite",
    value: function () {
      var _addFavorite = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(id) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.saved.push({
                  reference: id,
                  data: new Date()
                });
                _context.next = 3;
                return this.save();

              case 3:
                return _context.abrupt("return", this.saved);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addFavorite(_x) {
        return _addFavorite.apply(this, arguments);
      }

      return addFavorite;
    }()
  }, {
    key: "removeFavorite",
    value: function () {
      var _removeFavorite = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_reference) {
        var index;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                index = this.saved.findIndex(function (_ref) {
                  var reference = _ref.reference;
                  return reference == _reference;
                });

                if (index > -1) {
                  this.saved.splice(index, 1);
                  this.markModified("saved");
                }

                _context2.next = 4;
                return this.save();

              case 4:
                return _context2.abrupt("return", this.saved);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function removeFavorite(_x2) {
        return _removeFavorite.apply(this, arguments);
      }

      return removeFavorite;
    }()
  }, {
    key: "fullName",
    // `fullName` becomes a virtual
    get: function get() {
      return "".concat(this.firstName, " ").concat(this.lastName);
    }
  }], [{
    key: "createNewUser",
    value: function () {
      var _createNewUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref2) {
        var password, data, hashedPassword, usuario;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                password = _ref2.password, data = _objectWithoutProperties(_ref2, ["password"]);
                hashedPassword = _bcryptjs["default"].hashSync(password, 8);
                _context3.next = 4;
                return this.create(_objectSpread({}, data, {
                  password: hashedPassword,
                  accountType: _types.ACCOUNT_TYPES.free.name
                }));

              case 4:
                usuario = _context3.sent;
                return _context3.abrupt("return", usuario);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createNewUser(_x3) {
        return _createNewUser.apply(this, arguments);
      }

      return createNewUser;
    }()
  }, {
    key: "findUserWithRolesAuthenticate",
    value: function () {
      var _findUserWithRolesAuthenticate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(email, password) {
        var usuario;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.findOne({
                  email: email
                });

              case 2:
                usuario = _context4.sent;

                if (usuario) {
                  _context4.next = 5;
                  break;
                }

                throw "Usuario não encontrado";

              case 5:
                if (!(!!usuario && _bcryptjs["default"].compareSync(password, usuario.password))) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", usuario.toObject());

              case 9:
                throw "E-mail ou senha estão incorretos";

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function findUserWithRolesAuthenticate(_x4, _x5) {
        return _findUserWithRolesAuthenticate.apply(this, arguments);
      }

      return findUserWithRolesAuthenticate;
    }()
  }]);

  return UsuarioClass;
}();

UsuarioSchema.loadClass(UsuarioClass);

var _default = _mongoose["default"].model("Usuario", UsuarioSchema, "usuarios");

exports["default"] = _default;
//# sourceMappingURL=Usuario.js.map