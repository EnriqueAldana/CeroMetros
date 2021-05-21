(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var ECMAScript = Package.ecmascript.ECMAScript;
var Collection2 = Package['aldeed:collection2'].Collection2;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"socialize:base-model":{"entry-meteor.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/socialize_base-model/entry-meteor.js                                                                   //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
module.export({
  BaseModel: () => BaseModel
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let construct;
module.link("./base-model", {
  default(v) {
    construct = v;
  }

}, 1);

/* eslint-enable import/no-unresolved */
const BaseModel = construct(Meteor);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"base-model.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/socialize_base-model/base-model.js                                                                     //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
let SimpleSchema;
module.link("simpl-schema", {
  default(v) {
    SimpleSchema = v;
  }

}, 0);
let MessageBox;
module.link("message-box", {
  default(v) {
    MessageBox = v;
  }

}, 1);
let diff;
module.link("mongodb-diff", {
  diff(v) {
    diff = v;
  }

}, 2);
module.exportDefault(Meteor => {
  /* We check for server code here to deal with a buffer issue in meteor-message-box
   * This shouldn't be a major issue as I doubt we will need to display this error
   * on the client at this point. Should be fixed though.
   * https://github.com/aldeed/meteor-message-box/issues/1
  */
  if (Meteor.isServer) {
    MessageBox.defaults({
      messages: {
        en: {
          Untrusted: 'Inserts/Updates from untrusted code not supported'
        }
      }
    });
  }

  SimpleSchema.denyUntrusted = function denyUntrusted() {
    if (this.isSet) {
      const autoValue = this.definition.autoValue && this.definition.autoValue.call(this);
      const defaultValue = this.definition.defaultValue;

      if (this.value !== defaultValue && this.value !== autoValue && !this.isFromTrustedCode) {
        return 'Untrusted';
      }
    }

    return undefined;
  };

  function extend(receiver, provider) {
    const rec = receiver;

    for (const prop in provider) {
      if (prop in provider) {
        rec[prop] = provider[prop];
      }
    }
  }

  return class BaseModel {
    constructor() {
      let document = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let preClean = arguments.length > 1 ? arguments[1] : undefined;
      let doc = document;

      if (preClean) {
        doc = this._getSchema(doc).clean(doc);
      }

      extend(this, doc);

      this.getDocument = function getDocument() {
        return doc;
      };
    }

    static createEmpty(_id) {
      return new this({
        _id
      });
    }

    static methods(methodMap) {
      const self = this;

      if ((typeof methodMap === 'function' || typeof methodMap === 'object') && !!methodMap) {
        const keys = Object.keys(methodMap);

        for (let i = 0, length = keys.length; i < length; i++) {
          const method = methodMap[keys[i]];

          if (typeof method === 'function') {
            if (!self.prototype[keys[i]]) {
              self.prototype[keys[i]] = method;
            } else {
              throw new Meteor.Error('existent-method', "The method ".concat(keys[i], " already exists."));
            }
          }
        }
      }
    }

    static updateTransformFunction() {
      this.prototype.getCollection()._transform = document => new this(document);
    }

    static attachCollection(collection) {
      let transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this.prototype.getCollection = function getCollection() {
        return collection;
      };

      if (transform) {
        this.updateTransformFunction();
      }
    }

    static attachSchema(schemaInstance) {
      const collection = this.prototype.getCollection();

      if (collection) {
        collection.attachSchema(schemaInstance);
      } else {
        throw new Meteor.Error("Can't append schema to non existent collection. Please attach a collection to your model using `ModelName.attachCollection`");
      }
    }

    static appendSchema(schemaObject) {
      this.attachSchema(new SimpleSchema(schemaObject));
    }

    _getSchema() {
      const schema = this.getCollection().simpleSchema(...arguments);

      if (schema) {
        return schema;
      }

      throw new Meteor.Error('noSchema', "You don't have a schema defined for ".concat(this.getCollectionName()));
    }

    getCollection() {
      // We just throw here. This method is reassigned in attachCollection method when collection is attached.
      if (this) throw new Meteor.Error('noCollection', 'You must use ClassName.attachCollection to attach a collection to your model.');
    }

    getCollectionName() {
      return this.getCollection()._name;
    } // get all values from the model that do not have a denyUpdate or denyUntrusted in their schema


    getUpdatableFields() {
      const schemas = Meteor._get(this.getCollection(), '_c2', '_simpleSchemas');

      const fields = {
        _id: this._id
      };

      for (const key of Object.keys(this)) {
        schemas.forEach((_ref) => {
          let {
            schema
          } = _ref;

          if (schema[key] && !(schema[key].custom && schema[key].custom === SimpleSchema.denyUntrusted) && !schema[key].denyUpdate) {
            fields[key] = this[key];
          }
        });
      }

      return fields;
    }

    checkOwnership() {
      return this.userId === Meteor.userId();
    }

    save(callback) {
      let obj = Object.keys(this).reduce((accumulator, key) => {
        if (key !== 'getDocument') accumulator[key] = this[key]; // eslint-disable-line no-param-reassign

        return accumulator;
      }, {});

      if (this._id) {
        const updateDiff = diff(this.getDocument(), obj);

        if (updateDiff && Object.keys(updateDiff).length !== 0) {
          this.update(updateDiff, callback);
        } else {
          callback && callback(null);
        }
      } else {
        const schema = this._getSchema(obj);

        if (Meteor.isClient && schema) {
          obj = schema.clean(obj, {
            extendAutoValueContext: {
              isInsert: true,
              userId: Meteor.userId()
            }
          });
        }

        this._id = this.getCollection().insert(obj, callback);
      }

      return this;
    }

    update(modifier, callback) {
      if (this._id) {
        this.getCollection().update(this._id, modifier, callback);
      }
    }

    remove(callback) {
      if (this._id) {
        this.getCollection().remove({
          _id: this._id
        }, callback);
      }
    }

  };
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"mongodb-diff":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// node_modules/meteor/socialize_base-model/node_modules/mongodb-diff/package.json                                 //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
module.exports = {
  "name": "mongodb-diff",
  "version": "0.4.4"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// node_modules/meteor/socialize_base-model/node_modules/mongodb-diff/index.js                                     //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/socialize:base-model/entry-meteor.js");

/* Exports */
Package._define("socialize:base-model", exports);

})();

//# sourceURL=meteor://💻app/packages/socialize_base-model.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvc29jaWFsaXplOmJhc2UtbW9kZWwvZW50cnktbWV0ZW9yLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9zb2NpYWxpemU6YmFzZS1tb2RlbC9iYXNlLW1vZGVsLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydCIsIkJhc2VNb2RlbCIsIk1ldGVvciIsImxpbmsiLCJ2IiwiY29uc3RydWN0IiwiZGVmYXVsdCIsIlNpbXBsZVNjaGVtYSIsIk1lc3NhZ2VCb3giLCJkaWZmIiwiZXhwb3J0RGVmYXVsdCIsImlzU2VydmVyIiwiZGVmYXVsdHMiLCJtZXNzYWdlcyIsImVuIiwiVW50cnVzdGVkIiwiZGVueVVudHJ1c3RlZCIsImlzU2V0IiwiYXV0b1ZhbHVlIiwiZGVmaW5pdGlvbiIsImNhbGwiLCJkZWZhdWx0VmFsdWUiLCJ2YWx1ZSIsImlzRnJvbVRydXN0ZWRDb2RlIiwidW5kZWZpbmVkIiwiZXh0ZW5kIiwicmVjZWl2ZXIiLCJwcm92aWRlciIsInJlYyIsInByb3AiLCJjb25zdHJ1Y3RvciIsImRvY3VtZW50IiwicHJlQ2xlYW4iLCJkb2MiLCJfZ2V0U2NoZW1hIiwiY2xlYW4iLCJnZXREb2N1bWVudCIsImNyZWF0ZUVtcHR5IiwiX2lkIiwibWV0aG9kcyIsIm1ldGhvZE1hcCIsInNlbGYiLCJrZXlzIiwiT2JqZWN0IiwiaSIsImxlbmd0aCIsIm1ldGhvZCIsInByb3RvdHlwZSIsIkVycm9yIiwidXBkYXRlVHJhbnNmb3JtRnVuY3Rpb24iLCJnZXRDb2xsZWN0aW9uIiwiX3RyYW5zZm9ybSIsImF0dGFjaENvbGxlY3Rpb24iLCJjb2xsZWN0aW9uIiwidHJhbnNmb3JtIiwiYXR0YWNoU2NoZW1hIiwic2NoZW1hSW5zdGFuY2UiLCJhcHBlbmRTY2hlbWEiLCJzY2hlbWFPYmplY3QiLCJzY2hlbWEiLCJzaW1wbGVTY2hlbWEiLCJnZXRDb2xsZWN0aW9uTmFtZSIsIl9uYW1lIiwiZ2V0VXBkYXRhYmxlRmllbGRzIiwic2NoZW1hcyIsIl9nZXQiLCJmaWVsZHMiLCJrZXkiLCJmb3JFYWNoIiwiY3VzdG9tIiwiZGVueVVwZGF0ZSIsImNoZWNrT3duZXJzaGlwIiwidXNlcklkIiwic2F2ZSIsImNhbGxiYWNrIiwib2JqIiwicmVkdWNlIiwiYWNjdW11bGF0b3IiLCJ1cGRhdGVEaWZmIiwidXBkYXRlIiwiaXNDbGllbnQiLCJleHRlbmRBdXRvVmFsdWVDb250ZXh0IiwiaXNJbnNlcnQiLCJpbnNlcnQiLCJtb2RpZmllciIsInJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUFDQyxXQUFTLEVBQUMsTUFBSUE7QUFBZixDQUFkO0FBQXlDLElBQUlDLE1BQUo7QUFBV0gsTUFBTSxDQUFDSSxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDRCxRQUFNLENBQUNFLENBQUQsRUFBRztBQUFDRixVQUFNLEdBQUNFLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQ7QUFBcUQsSUFBSUMsU0FBSjtBQUFjTixNQUFNLENBQUNJLElBQVAsQ0FBWSxjQUFaLEVBQTJCO0FBQUNHLFNBQU8sQ0FBQ0YsQ0FBRCxFQUFHO0FBQUNDLGFBQVMsR0FBQ0QsQ0FBVjtBQUFZOztBQUF4QixDQUEzQixFQUFxRCxDQUFyRDs7QUFHdkg7QUFFQSxNQUFNSCxTQUFTLEdBQUdJLFNBQVMsQ0FBQ0gsTUFBRCxDQUEzQixDOzs7Ozs7Ozs7OztBQ0xBLElBQUlLLFlBQUo7QUFBaUJSLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLGNBQVosRUFBMkI7QUFBQ0csU0FBTyxDQUFDRixDQUFELEVBQUc7QUFBQ0csZ0JBQVksR0FBQ0gsQ0FBYjtBQUFlOztBQUEzQixDQUEzQixFQUF3RCxDQUF4RDtBQUEyRCxJQUFJSSxVQUFKO0FBQWVULE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLGFBQVosRUFBMEI7QUFBQ0csU0FBTyxDQUFDRixDQUFELEVBQUc7QUFBQ0ksY0FBVSxHQUFD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RUFBRSxJQURVO0FBRXBCVixvQkFBTSxFQUFFdEUsTUFBTSxDQUFDc0UsTUFBUDtBQUZZO0FBREosV0FBbEIsQ0FBTjtBQU1IOztBQUNELGFBQUtsQyxHQUFMLEdBQVcsS0FBS1ksYUFBTCxHQUFxQmlDLE1BQXJCLENBQTRCUixHQUE1QixFQUFpQ0QsUUFBakMsQ0FBWDtBQUNIOztBQUVELGFBQU8sSUFBUDtBQUNIOztBQUVESyxVQUFNLENBQUNLLFFBQUQsRUFBV1YsUUFBWCxFQUFxQjtBQUN2QixVQUFJLEtBQUtwQyxHQUFULEVBQWM7QUFDVixhQUFLWSxhQUFMLEdBQXFCNkIsTUFBckIsQ0FBNEIsS0FBS3pDLEdBQWpDLEVBQXNDOEMsUUFBdEMsRUFBZ0RWLFFBQWhEO0FBQ0g7QUFDSjs7QUFFRFcsVUFBTSxDQUFDWCxRQUFELEVBQVc7QUFDYixVQUFJLEtBQUtwQyxHQUFULEVBQWM7QUFDVixhQUFLWSxhQUFMLEdBQXFCbUMsTUFBckIsQ0FBNEI7QUFBRS9DLGFBQUcsRUFBRSxLQUFLQTtBQUFaLFNBQTVCLEVBQStDb0MsUUFBL0M7QUFDSDtBQUNKOztBQTlJa0IsR0FBdkI7QUFnSkgsQ0EzTEQsRSIsImZpbGUiOiIvcGFja2FnZXMvc29jaWFsaXplX2Jhc2UtbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgY29uc3RydWN0IGZyb20gJy4vYmFzZS1tb2RlbCc7XG4vKiBlc2xpbnQtZW5hYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5cbmNvbnN0IEJhc2VNb2RlbCA9IGNvbnN0cnVjdChNZXRlb3IpO1xuXG5leHBvcnQgeyBCYXNlTW9kZWwgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgU2ltcGxlU2NoZW1hIGZyb20gJ3NpbXBsLXNjaGVtYSc7XG5pbXBvcnQgTWVzc2FnZUJveCBmcm9tICdtZXNzYWdlLWJveCc7XG5pbXBvcnQgeyBkaWZmIH0gZnJvbSAnbW9uZ29kYi1kaWZmJztcbi8qIGVzbGludC1lbmFibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cblxuZXhwb3J0IGRlZmF1bHQgKE1ldGVvcikgPT4ge1xuICAgIC8qIFdlIGNoZWNrIGZvciBzZXJ2ZXIgY29kZSBoZXJlIHRvIGRlYWwgd2l0aCBhIGJ1ZmZlciBpc3N1ZSBpbiBtZXRlb3ItbWVzc2FnZS1ib3hcbiAgICAgKiBUaGlzIHNob3VsZG4ndCBiZSBhIG1ham9yIGlzc3VlIGFzIEkgZG91YnQgd2Ugd2lsbCBuZWVkIHRvIGRpc3BsYXkgdGhpcyBlcnJvclxuICAgICAqIG9uIHRoZSBjbGllbnQgYXQgdGhpcyBwb2ludC4gU2hvdWxkIGJlIGZpeGVkIHRob3VnaC5cbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vYWxkZWVkL21ldGVvci1tZXNzYWdlLWJveC9pc3N1ZXMvMVxuICAgICovXG4gICAgaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAgICAgICBNZXNzYWdlQm94LmRlZmF1bHRzKHtcbiAgICAgICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgZW46IHtcbiAgICAgICAgICAgICAgICAgICAgVW50cnVzdGVkOiAnSW5zZXJ0cy9VcGRhdGVzIGZyb20gdW50cnVzdGVkIGNvZGUgbm90IHN1cHBvcnRlZCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIFNpbXBsZVNjaGVtYS5kZW55VW50cnVzdGVkID0gZnVuY3Rpb24gZGVueVVudHJ1c3RlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGF1dG9WYWx1ZSA9IHRoaXMuZGVmaW5pdGlvbi5hdXRvVmFsdWUgJiYgdGhpcy5kZWZpbml0aW9uLmF1dG9WYWx1ZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdGhpcy5kZWZpbml0aW9uLmRlZmF1bHRWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgIT09IGRlZmF1bHRWYWx1ZSAmJiB0aGlzLnZhbHVlICE9PSBhdXRvVmFsdWUgJiYgIXRoaXMuaXNGcm9tVHJ1c3RlZENvZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1VudHJ1c3RlZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZXh0ZW5kKHJlY2VpdmVyLCBwcm92aWRlcikge1xuICAgICAgICBjb25zdCByZWMgPSByZWNlaXZlcjtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHByb3ZpZGVyKSB7XG4gICAgICAgICAgICBpZiAocHJvcCBpbiBwcm92aWRlcikge1xuICAgICAgICAgICAgICAgIHJlY1twcm9wXSA9IHByb3ZpZGVyW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzIEJhc2VNb2RlbCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50ID0ge30sIHByZUNsZWFuKSB7XG4gICAgICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQ7XG4gICAgICAgICAgICBpZiAocHJlQ2xlYW4pIHtcbiAgICAgICAgICAgICAgICBkb2MgPSB0aGlzLl9nZXRTY2hlbWEoZG9jKS5jbGVhbihkb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXh0ZW5kKHRoaXMsIGRvYyk7XG4gICAgICAgICAgICB0aGlzLmdldERvY3VtZW50ID0gZnVuY3Rpb24gZ2V0RG9jdW1lbnQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvYztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgY3JlYXRlRW1wdHkoX2lkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoeyBfaWQgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgbWV0aG9kcyhtZXRob2RNYXApIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgaWYgKCh0eXBlb2YgbWV0aG9kTWFwID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBtZXRob2RNYXAgPT09ICdvYmplY3QnKSAmJiAhIW1ldGhvZE1hcCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhtZXRob2RNYXApO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IG1ldGhvZE1hcFtrZXlzW2ldXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLnByb3RvdHlwZVtrZXlzW2ldXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucHJvdG90eXBlW2tleXNbaV1dID0gbWV0aG9kO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdleGlzdGVudC1tZXRob2QnLCBgVGhlIG1ldGhvZCAke2tleXNbaV19IGFscmVhZHkgZXhpc3RzLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIHVwZGF0ZVRyYW5zZm9ybUZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5wcm90b3R5cGUuZ2V0Q29sbGVjdGlvbigpLl90cmFuc2Zvcm0gPSBkb2N1bWVudCA9PiBuZXcgdGhpcyhkb2N1bWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgYXR0YWNoQ29sbGVjdGlvbihjb2xsZWN0aW9uLCB0cmFuc2Zvcm0gPSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3RvdHlwZS5nZXRDb2xsZWN0aW9uID0gZnVuY3Rpb24gZ2V0Q29sbGVjdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0cmFuc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRyYW5zZm9ybUZ1bmN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgYXR0YWNoU2NoZW1hKHNjaGVtYUluc3RhbmNlKSB7XG4gICAgICAgICAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpcy5wcm90b3R5cGUuZ2V0Q29sbGVjdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoY29sbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24uYXR0YWNoU2NoZW1hKHNjaGVtYUluc3RhbmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIkNhbid0IGFwcGVuZCBzY2hlbWEgdG8gbm9uIGV4aXN0ZW50IGNvbGxlY3Rpb24uIFBsZWFzZSBhdHRhY2ggYSBjb2xsZWN0aW9uIHRvIHlvdXIgbW9kZWwgdXNpbmcgYE1vZGVsTmFtZS5hdHRhY2hDb2xsZWN0aW9uYFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBhcHBlbmRTY2hlbWEoc2NoZW1hT2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFNjaGVtYShuZXcgU2ltcGxlU2NoZW1hKHNjaGVtYU9iamVjdCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2dldFNjaGVtYSguLi5hcmdzKSB7XG4gICAgICAgICAgICBjb25zdCBzY2hlbWEgPSB0aGlzLmdldENvbGxlY3Rpb24oKS5zaW1wbGVTY2hlbWEoLi4uYXJncyk7XG4gICAgICAgICAgICBpZiAoc2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ25vU2NoZW1hJywgYFlvdSBkb24ndCBoYXZlIGEgc2NoZW1hIGRlZmluZWQgZm9yICR7dGhpcy5nZXRDb2xsZWN0aW9uTmFtZSgpfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Q29sbGVjdGlvbigpIHtcbiAgICAgICAgICAgIC8vIFdlIGp1c3QgdGhyb3cgaGVyZS4gVGhpcyBtZXRob2QgaXMgcmVhc3NpZ25lZCBpbiBhdHRhY2hDb2xsZWN0aW9uIG1ldGhvZCB3aGVuIGNvbGxlY3Rpb24gaXMgYXR0YWNoZWQuXG4gICAgICAgICAgICBpZiAodGhpcykgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignbm9Db2xsZWN0aW9uJywgJ1lvdSBtdXN0IHVzZSBDbGFzc05hbWUuYXR0YWNoQ29sbGVjdGlvbiB0byBhdHRhY2ggYSBjb2xsZWN0aW9uIHRvIHlvdXIgbW9kZWwuJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldENvbGxlY3Rpb25OYW1lKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29sbGVjdGlvbigpLl9uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGFsbCB2YWx1ZXMgZnJvbSB0aGUgbW9kZWwgdGhhdCBkbyBub3QgaGF2ZSBhIGRlbnlVcGRhdGUgb3IgZGVueVVudHJ1c3RlZCBpbiB0aGVpciBzY2hlbWFcbiAgICAgICAgZ2V0VXBkYXRhYmxlRmllbGRzKCkge1xuICAgICAgICAgICAgY29uc3Qgc2NoZW1hcyA9IE1ldGVvci5fZ2V0KHRoaXMuZ2V0Q29sbGVjdGlvbigpLCAnX2MyJywgJ19zaW1wbGVTY2hlbWFzJylcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IHsgX2lkOiB0aGlzLl9pZCB9O1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzKSkge1xuICAgICAgICAgICAgICAgIHNjaGVtYXMuZm9yRWFjaCgoeyBzY2hlbWEgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hW2tleV0gJiYgIShzY2hlbWFba2V5XS5jdXN0b20gJiYgc2NoZW1hW2tleV0uY3VzdG9tID09PSBTaW1wbGVTY2hlbWEuZGVueVVudHJ1c3RlZCkgJiYgIXNjaGVtYVtrZXldLmRlbnlVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkc1trZXldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZpZWxkcztcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrT3duZXJzaGlwKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlcklkID09PSBNZXRlb3IudXNlcklkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzYXZlKGNhbGxiYWNrKSB7XG5cbiAgICAgICAgICAgIGxldCBvYmogPSBPYmplY3Qua2V5cyh0aGlzKS5yZWR1Y2UoXG4gICAgICAgICAgICAgICAgKGFjY3VtdWxhdG9yLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ2dldERvY3VtZW50JykgYWNjdW11bGF0b3Jba2V5XSA9IHRoaXNba2V5XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICAgICAgICAgICAgfSwge30sXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5faWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVEaWZmID0gZGlmZih0aGlzLmdldERvY3VtZW50KCksIG9iaik7XG4gICAgICAgICAgICAgICAgaWYgKHVwZGF0ZURpZmYgJiYgT2JqZWN0LmtleXModXBkYXRlRGlmZikubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKHVwZGF0ZURpZmYsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMuX2dldFNjaGVtYShvYmopO1xuICAgICAgICAgICAgICAgIGlmIChNZXRlb3IuaXNDbGllbnQgJiYgc2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IHNjaGVtYS5jbGVhbihvYmosIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuZEF1dG9WYWx1ZUNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0luc2VydDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IE1ldGVvci51c2VySWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9pZCA9IHRoaXMuZ2V0Q29sbGVjdGlvbigpLmluc2VydChvYmosIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGUobW9kaWZpZXIsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvbGxlY3Rpb24oKS51cGRhdGUodGhpcy5faWQsIG1vZGlmaWVyLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmUoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29sbGVjdGlvbigpLnJlbW92ZSh7IF9pZDogdGhpcy5faWQgfSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG4iXX0=
