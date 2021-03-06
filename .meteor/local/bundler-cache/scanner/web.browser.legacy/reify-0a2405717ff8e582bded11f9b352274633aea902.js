"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoObject = _interopRequireDefault(require("mongo-object"));

var _doValidation = _interopRequireDefault(require("./doValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ValidationContext =
/*#__PURE__*/
function () {
  /**
   * @param {SimpleSchema} ss SimpleSchema instance to use for validation
   * @param {String} [name] Optional context name, accessible on context.name.
   */
  function ValidationContext(ss, name) {
    var _this = this;

    _classCallCheck(this, ValidationContext);

    this.name = name;
    this._simpleSchema = ss;
    this._schema = ss.schema();
    this._schemaKeys = Object.keys(this._schema);
    this._validationErrors = []; // Set up validation dependencies

    this._deps = {};
    var tracker = ss._constructorOptions.tracker;

    if (tracker) {
      this._depsAny = new tracker.Dependency();

      this._schemaKeys.forEach(function (key) {
        _this._deps[key] = new tracker.Dependency();
      });
    }
  }

  _createClass(ValidationContext, [{
    key: "_markKeyChanged",
    value: function _markKeyChanged(key) {
      var genericKey = _mongoObject.default.makeKeyGeneric(key);

      if (Object.prototype.hasOwnProperty.call(this._deps, genericKey)) this._deps[genericKey].changed();
    }
  }, {
    key: "_markKeysChanged",
    value: function _markKeysChanged(keys) {
      var _this2 = this;

      if (!keys || !Array.isArray(keys) || !keys.length) return;
      keys.forEach(function (key) {
        return _this2._markKeyChanged(key);
      });
      this._depsAny && this._depsAny.changed();
    }
  }, {
    key: "setValidationErrors",
    value: function setValidationErrors(errors) {
      var previousValidationErrors = this._validationErrors.map(function (o) {
        return o.name;
      });

      var newValidationErrors = errors.map(function (o) {
        return o.name;
      });
      this._validationErrors = errors; // Mark all previous plus all new as changed

      var changedKeys = previousValidationErrors.concat(newValidationErrors);

      this._markKeysChanged(changedKeys);
    }
  }, {
    key: "addValidationErrors",
    value: function addValidationErrors(errors) {
      var _this3 = this;

      var newValidationErrors = errors.map(function (o) {
        return o.name;
      });
      errors.forEach(function (error) {
        return _this3._validationErrors.push(error);
      }); // Mark all new as changed

      this._markKeysChanged(newValidationErrors);
    } // Reset the validationErrors array

  }, {
    key: "reset",
    value: function reset() {
      this.setValidationErrors([]);
    }
  }, {
    key: "getErrorForKey",
    value: function getErrorForKey(key) {
      var genericKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _mongoObject.default.makeKeyGeneric(key);
      var errors = this._validationErrors;
      var errorForKey = errors.find(function (error) {
        return error.name === key;
      });
      if (errorForKey) return errorForKey;
      return errors.find(function (error) {
        return error.name === genericKey;
      });
    }
  }, {
    key: "_keyIsInvalid",
    value: function _keyIsInvalid(key, genericKey) {
      return !!this.getErrorForKey(key, genericKey);
    } // Like the internal one, but with deps

  }, {
    key: "keyIsInvalid",
    value: function keyIsInvalid(key) {
      var genericKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _mongoObject.default.makeKeyGeneric(key);
      if (Object.prototype.hasOwnProperty.call(this._deps, genericKey)) this._deps[genericKey].depend();
      return this._keyIsInvalid(key, genericKey);
    }
  }, {
    key: "keyErrorMessage",
    value: function keyErrorMessage(key) {
      var genericKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _mongoObject.default.makeKeyGeneric(key);
      if (Object.prototype.hasOwnProperty.call(this._deps, genericKey)) this._deps[genericKey].depend();
      var errorObj = this.getErrorForKey(key, genericKey);
      if (!errorObj) return '';
      return this._simpleSchema.messageForError(errorObj);
    }
    /**
     * Validates the object against the simple schema and sets a reactive array of error objects
     */

  }, {
    key: "validate",
    value: function validate(obj) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$extendedCustomCo = _ref.extendedCustomContext,
          extendedCustomContext = _ref$extendedCustomCo === void 0 ? {} : _ref$extendedCustomCo,
          _ref$ignore = _ref.ignore,
          ignoreTypes = _ref$ignore === void 0 ? [] : _ref$ignore,
          keysToValidate = _ref.keys,
          _ref$modifier = _ref.modifier,
          isModifier = _ref$modifier === void 0 ? false : _ref$modifier,
          mongoObject = _ref.mongoObject,
          _ref$upsert = _ref.upsert,
          isUpsert = _ref$upsert === void 0 ? false : _ref$upsert;

      var validationErrors = (0, _doValidation.default)({
        extendedCustomContext: extendedCustomContext,
        ignoreTypes: ignoreTypes,
        isModifier: isModifier,
        isUpsert: isUpsert,
        keysToValidate: keysToValidate,
        mongoObject: mongoObject,
        obj: obj,
        schema: this._simpleSchema,
        validationContext: this
      });

      if (keysToValidate) {
        // We have only revalidated the listed keys, so if there
        // are any other existing errors that are NOT in the keys list,
        // we should keep these errors.

        /* eslint-disable no-restricted-syntax */
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var error = _step.value;
            var wasValidated = keysToValidate.some(function (key) {
              return key === error.name || error.name.startsWith("".concat(key, "."));
            });
            if (!wasValidated) validationErrors.push(error);
          };

          for (var _iterator = this._validationErrors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
          }
          /* eslint-enable no-restricted-syntax */

        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      this.setValidationErrors(validationErrors); // Return true if it was valid; otherwise, return false

      return !validationErrors.length;
    }
  }, {
    key: "isValid",
    value: function isValid() {
      this._depsAny && this._depsAny.depend();
      return this._validationErrors.length === 0;
    }
  }, {
    key: "validationErrors",
    value: function validationErrors() {
      this._depsAny && this._depsAny.depend();
      return this._validationErrors;
    }
  }, {
    key: "clean",
    value: function clean() {
      var _this$_simpleSchema;

      return (_this$_simpleSchema = this._simpleSchema).clean.apply(_this$_simpleSchema, arguments);
    }
  }]);

  return ValidationContext;
}();

exports.default = ValidationContext;
module.exports = exports.default;
module.exports.default = exports.default;