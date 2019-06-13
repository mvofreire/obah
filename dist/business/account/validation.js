"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountTop = exports.AccountPremium = exports.AccountFree = void 0;

var _types = require("./types");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountValidation =
/*#__PURE__*/
function () {
  function AccountValidation(user) {
    _classCallCheck(this, AccountValidation);

    this.count = user.getCountTopics();
  }

  _createClass(AccountValidation, [{
    key: "canAdd",
    value: function canAdd() {
      return false;
    }
  }]);

  return AccountValidation;
}();

var AccountFree =
/*#__PURE__*/
function (_AccountValidation) {
  _inherits(AccountFree, _AccountValidation);

  function AccountFree() {
    _classCallCheck(this, AccountFree);

    return _possibleConstructorReturn(this, _getPrototypeOf(AccountFree).apply(this, arguments));
  }

  _createClass(AccountFree, [{
    key: "canAdd",
    value: function canAdd() {
      if (this.count > _types.ACCOUNT_TYPES.free.limit) {
        return {
          status: false,
          message: "Conta ultrapassou o limite de topicos"
        };
      } else {
        return {
          status: true,
          message: ""
        };
      }
    }
  }]);

  return AccountFree;
}(AccountValidation);

exports.AccountFree = AccountFree;

var AccountPremium =
/*#__PURE__*/
function (_AccountValidation2) {
  _inherits(AccountPremium, _AccountValidation2);

  function AccountPremium() {
    _classCallCheck(this, AccountPremium);

    return _possibleConstructorReturn(this, _getPrototypeOf(AccountPremium).apply(this, arguments));
  }

  _createClass(AccountPremium, [{
    key: "canAdd",
    value: function canAdd() {
      return this.count < _types.ACCOUNT_TYPES.premium.limit;
    }
  }]);

  return AccountPremium;
}(AccountValidation);

exports.AccountPremium = AccountPremium;

var AccountTop =
/*#__PURE__*/
function (_AccountValidation3) {
  _inherits(AccountTop, _AccountValidation3);

  function AccountTop() {
    _classCallCheck(this, AccountTop);

    return _possibleConstructorReturn(this, _getPrototypeOf(AccountTop).apply(this, arguments));
  }

  _createClass(AccountTop, [{
    key: "canAdd",
    value: function canAdd() {
      return this.count < _types.ACCOUNT_TYPES.top.limit;
    }
  }]);

  return AccountTop;
}(AccountValidation);

exports.AccountTop = AccountTop;
//# sourceMappingURL=validation.js.map