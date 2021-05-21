(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var EJSON = Package.ejson.EJSON;
var EventEmitter = Package['raix:eventemitter'].EventEmitter;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Collection2;

var require = meteorInstall({"node_modules":{"meteor":{"aldeed:collection2":{"collection2.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/aldeed_collection2/collection2.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 0);
let EventEmitter;
module.link("meteor/raix:eventemitter", {
  EventEmitter(v) {
    EventEmitter = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 2);
let checkNpmVersions;
module.link("meteor/tmeasday:check-npm-versions", {
  checkNpmVersions(v) {
    checkNpmVersions = v;
  }

}, 3);
let clone;
module.link("clone", {
  default(v) {
    clone = v;
  }

}, 4);
let EJSON;
module.link("meteor/ejson", {
  EJSON(v) {
    EJSON = v;
  }

}, 5);
let isEmpty;
module.link("lodash.isempty", {
  default(v) {
    isEmpty = v;
  }

}, 6);
let isEqual;
module.link("lodash.isequal", {
  default(v) {
    isEqual = v;
  }

}, 7);
let isObject;
module.link("lodash.isobject", {
  default(v) {
    isObject = v;
  }

}, 8);
let flattenSelector;
module.link("./lib", {
  flattenSelector(v) {
    flattenSelector = v;
  }

}, 9);
checkNpmVersions({
  'simpl-schema': '>=0.0.0'
}, 'aldeed:collection2');

const SimpleSchema = require('simpl-schema').default; // Exported only for listening to events


const Collection2 = new EventEmitter();
const defaultCleanOptions = {
  filter: true,
  autoConvert: true,
  removeEmptyStrings: true,
  trimStrings: true,
  removeNullsFromArrays: false
};
/**
 * Mongo.Collection.prototype.attachSchema
 * @param {SimpleSchema|Object} ss - SimpleSchema instance or a schema definition object
 *    from which to create a new SimpleSchema instance
 * @param {Object} [options]
 * @param {Boolean} [options.transform=false] Set to `true` if your document must be passed
 *    through the collection's transform to properly validate.
 * @param {Boolean} [options.replace=false] Set to `true` to replace any existing schema instead of combining
 * @return {undefined}
 *
 * Use this method to attach a schema to a collection created by another package,
 * such as Meteor.users. It is most likely unsafe to call this method more than
 * once for a single collection, or to call this for a collection that had a
 * schema object passed to its constructor.
 */

Mongo.Collection.prototype.attachSchema = function c2AttachSchema(ss, options) {
  options = options || {}; // Allow passing just the schema object

  if (!SimpleSchema.isSimpleSchema(ss)) {
    ss = new SimpleSchema(ss);
  }

  function attachTo(obj) {
    // we need an array to hold multiple schemas
    // position 0 is reserved for the "base" schema
    obj._c2 = obj._c2 || {};
    obj._c2._simpleSchemas = obj._c2._simpleSchemas || [null];

    if (typeof options.selector === "object") {
      // Selector Schemas
      // Extend selector schema with base schema
      var baseSchema = obj._c2._simpleSchemas[0];

      if (baseSchema) {
        ss = extendSchema(baseSchema.schema, ss);
      } // Index of existing schema with identical selector


      var schemaIndex; // Loop through existing schemas with selectors,

      for (schemaIndex = obj._c2._simpleSchemas.length - 1; 0 < schemaIndex; schemaIndex--) {
        var schema = obj._c2._simpleSchemas[schemaIndex];
        if (schema && isEqual(schema.selector, options.selector)) break;
      }

      if (schemaIndex <= 0) {
        // We didn't find the schema in our array - push it into the array
        obj._c2._simpleSchemas.push({
          schema: ss,
          selector: options.selector
        });
      } else {
        // We found a schema with an identical selector in our array,
        if (options.replace === true) {
          // Replace existing selector schema with new selector schema
          obj._c2._simpleSchemas[schemaIndex].schema = ss;
        } else {
          // Extend existing selector schema with new selector schema.
          obj._c2._simpleSchemas[schemaIndex].schema = extendSchema(obj._c2._simpleSchemas[schemaIndex].schema, ss);
        }
      }
    } else {
      // Base Schema
      if (options.replace === true) {
        // Replace base schema and delete all other schemas
        obj._c2._simpleSchemas = [{
          schema: ss,
          selector: options.selector
        }];
      } else {
        // Set base schema if not yet set
        if (!obj._c2._simpleSchemas[0]) {
          return obj._c2._simpleSchemas[0] = {
            schema: ss,
            selector: undefined
          };
        } // Extend base schema and therefore extend all schemas


        obj._c2._simpleSchemas.forEach((schema, index) => {
          if (obj._c2._simpleSchemas[index]) {
            obj._c2._simpleSchemas[index].schema = extendSchema(obj._c2._simpleSchemas[index].schema, ss);
          }
        });
      }
    }
  }

  attachTo(this); // Attach the schema to the underlying LocalCollection, too

  if (this._collection instanceof LocalCollection) {
    this._collection._c2 = this._collection._c2 || {};
    attachTo(this._collection);
  }

  defineDeny(this, options);
  keepInsecure(this);
  Collection2.emit('schema.attached', this, ss, options);
};

[Mongo.Collection, LocalCollection].forEach(obj => {
  /**
   * simpleSchema
   * @description function detect the correct schema by given params. If it
   * detect multi-schema presence in the collection, then it made an attempt to find a
   * `selector` in args
   * @param {Object} doc - It could be <update> on update/upsert or document
   * itself on insert/remove
   * @param {Object} [options] - It could be <update> on update/upsert etc
   * @param {Object} [query] - it could be <query> on update/upsert
   * @return {Object} Schema
   */
  obj.prototype.simpleSchema = function (doc, options, query) {
    if (!this._c2) return null;
    if (this._c2._simpleSchema) return this._c2._simpleSchema;
    var schemas = this._c2._simpleSchemas;

    if (schemas && schemas.length > 0) {
      var schema, selector, target; // Position 0 reserved for base schema

      for (var i = 1; i < schemas.length; i++) {
        schema = schemas[i];
        selector = Object.keys(schema.selector)[0]; // We will set this to undefined because in theory you might want to select
        // on a null value.

        target = undefined; // here we are looking for selector in different places
        // $set should have more priority here

        if (doc.$set && typeof doc.$set[selector] !== 'undefined') {
          target = doc.$set[selector];
        } else if (typeof doc[selector] !== 'undefined') {
          target = doc[selector];
        } else if (options && options.selector) {
          target = options.selector[selector];
        } else if (query && query[selector]) {
          // on upsert/update operations
          target = query[selector];
        } // we need to compare given selector with doc property or option to
        // find right schema


        if (target !== undefined && target === schema.selector[selector]) {
          return schema.schema;
        }
      }

      if (schemas[0]) {
        return schemas[0].schema;
      } else {
        throw new Error("No default schema");
      }
    }

    return null;
  };
}); // Wrap DB write operation methods

['insert', 'update'].forEach(methodName => {
  const _super = Mongo.Collection.prototype[methodName];

  Mongo.Collection.prototype[methodName] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    let options = methodName === "insert" ? args[1] : args[2]; // Support missing options arg

    if (!options || typeof options === "function") {
      options = {};
    }

    if (this._c2 && options.bypassCollection2 !== true) {
      var userId = null;

      try {
        // https://github.com/aldeed/meteor-collection2/issues/175
        userId = Meteor.userId();
      } catch (err) {}

      args = doValidate(this, methodName, args, Meteor.isServer || this._connection === null, // getAutoValues
      userId, Meteor.isServer // isFromTrustedCode
      );

      if (!args) {
        // doValidate already called the callback or threw the error so we're done.
        // But insert should always return an ID to match core behavior.
        return methodName === "insert" ? this._makeNewID() : undefined;
      }
    } else {
      // We still need to adjust args because insert does not take options
      if (methodName === "insert" && typeof args[1] !== 'function') args.splice(1, 1);
    }

    return _super.apply(this, args);
  };
});
/*
 * Private
 */

function doValidate(collection, type, args, getAutoValues, userId, isFromTrustedCode) {
  var doc, callback, error, options, isUpsert, selector, last, hasCallback;

  if (!args.length) {
    throw new Error(type + " requires an argument");
  } // Gather arguments and cache the selector


  if (type === "insert") {
    doc = args[0];
    options = args[1];
    callback = args[2]; // The real insert doesn't take options

    if (typeof options === "function") {
      args = [doc, options];
    } else if (typeof callback === "function") {
      args = [doc, callback];
    } else {
      args = [doc];
    }
  } else if (type === "update") {
    selector = args[0];
    doc = args[1];
    options = args[2];
    callback = args[3];
  } else {
    throw new Error("invalid type argument");
  }

  var validatedObjectWasInitiallyEmpty = isEmpty(doc); // Support missing options arg

  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }

  options = options || {};
  last = args.length - 1;
  hasCallback = typeof args[last] === 'function'; // If update was called with upsert:true, flag as an upsert

  isUpsert = type === "update" && options.upsert === true; // we need to pass `doc` and `options` to `simpleSchema` method, that's why
  // schema declaration moved here

  var schema = collection.simpleSchema(doc, options, selector);
  var isLocalCollection = collection._connection === null; // On the server and for local collections, we allow passing `getAutoValues: false` to disable autoValue functions

  if ((Meteor.isServer || isLocalCollection) && options.getAutoValues === false) {
    getAutoValues = false;
  } // Process pick/omit options if they are present


  var picks = Array.isArray(options.pick) ? options.pick : null;
  var omits = Array.isArray(options.omit) ? options.omit : null;

  if (picks && omits) {
    // Pick and omit cannot both be present in the options
    throw new Error('pick and omit options are mutually exclusive');
  } else if (picks) {
    schema = schema.pick(...picks);
  } else if (omits) {
    schema = schema.omit(...omits);
  } // Determine validation context


  var validationContext = options.validationContext;

  if (validationContext) {
    if (typeof validationContext === 'string') {
      validationContext = schema.namedContext(validationContext);
    }
  } else {
    validationContext = schema.namedContext();
  } // Add a default callback function if we're on the client and no callback was given


  if (Meteor.isClient && !callback) {
    // Client can't block, so it can't report errors by exception,
    // only by callback. If they forget the callback, give them a
    // default one that logs the error, so they aren't totally
    // baffled if their writes don't work because their database is
    // down.
    callback = function (err) {
      if (err) {
        Meteor._debug(type + " failed: " + (err.reason || err.stack));
      }
    };
  } // If client validation is fine or is skipped but then something
  // is found to be invalid on the server, we get that error back
  // as a special Meteor.Error that we need to parse.


  if (Meteor.isClient && hasCallback) {
    callback = args[last] = wrapCallbackForParsingServerErrors(validationContext, callback);
  }

  var schemaAllowsId = schema.allowsKey("_id");

  if (type === "insert" && !doc._id && schemaAllowsId) {
    doc._id = collection._makeNewID();
  } // Get the docId for passing in the autoValue/custom context


  var docId;

  if (type === 'insert') {
    docId = doc._id; // might be undefined
  } else if (type === "update" && selector) {
    docId = typeof selector === 'string' || selector instanceof Mongo.ObjectID ? selector : selector._id;
  } // If _id has already been added, remove it temporarily if it's
  // not explicitly defined in the schema.


  var cachedId;

  if (doc._id && !schemaAllowsId) {
    cachedId = doc._id;
    delete doc._id;
  }

  const autoValueContext = {
    isInsert: type === "insert",
    isUpdate: type === "update" && options.upsert !== true,
    isUpsert,
    userId,
    isFromTrustedCode,
    docId,
    isLocalCollection
  };

  const extendAutoValueContext = _objectSpread(_objectSpread(_objectSpread({}, (schema._cleanOptions || {}).extendAutoValueContext || {}), autoValueContext), options.extendAutoValueContext);

  const cleanOptionsForThisOperation = {};
  ["autoConvert", "filter", "removeEmptyStrings", "removeNullsFromArrays", "trimStrings"].forEach(prop => {
    if (typeof options[prop] === "boolean") {
      cleanOptionsForThisOperation[prop] = options[prop];
    }
  }); // Preliminary cleaning on both client and server. On the server and for local
  // collections, automatic values will also be set at this point.

  schema.clean(doc, _objectSpread(_objectSpread(_objectSpread(_objectSpread({
    mutate: true,
    // Clean the doc/modifier in place
    isModifier: type !== "insert"
  }, defaultCleanOptions), schema._cleanOptions || {}), cleanOptionsForThisOperation), {}, {
    extendAutoValueContext,
    // This was extended separately above
    getAutoValues // Force this override

  })); // We clone before validating because in some cases we need to adjust the
  // object a bit before validating it. If we adjusted `doc` itself, our
  // changes would persist into the database.

  var docToValidate = {};

  for (var prop in doc) {
    // We omit prototype properties when cloning because they will not be valid
    // and mongo omits them when saving to the database anyway.
    if (Object.prototype.hasOwnProperty.call(doc, prop)) {
      docToValidate[prop] = doc[prop];
    }
  } // On the server, upserts are possible; SimpleSchema handles upserts pretty
  // well by default, but it will not know about the fields in the selector,
  // which are also stored in the database if an insert is performed. So we
  // will allow these fields to be considered for validation by adding them
  // to the $set in the modifier, while stripping out query selectors as these
  // don't make it into the upserted document and break validation. 
  // This is no doubt prone to errors, but there probably isn't any better way
  // right now.


  if (Meteor.isServer && isUpsert && isObject(selector)) {
    var set = docToValidate.$set || {};
    docToValidate.$set = flattenSelector(selector);
    if (!schemaAllowsId) delete docToValidate.$set._id;
    Object.assign(docToValidate.$set, set);
  } // Set automatic values for validation on the client.
  // On the server, we already updated doc with auto values, but on the client,
  // we will add them to docToValidate for validation purposes only.
  // This is because we want all actual values generated on the server.


  if (Meteor.isClient && !isLocalCollection) {
    schema.clean(docToValidate, {
      autoConvert: false,
      extendAutoValueContext,
      filter: false,
      getAutoValues: true,
      isModifier: type !== "insert",
      mutate: true,
      // Clean the doc/modifier in place
      removeEmptyStrings: false,
      removeNullsFromArrays: false,
      trimStrings: false
    });
  } // XXX Maybe move this into SimpleSchema


  if (!validatedObjectWasInitiallyEmpty && isEmpty(docToValidate)) {
    throw new Error('After filtering out keys not in the schema, your ' + (type === 'update' ? 'modifier' : 'object') + ' is now empty');
  } // Validate doc


  var isValid;

  if (options.validate === false) {
    isValid = true;
  } else {
    isValid = validationContext.validate(docToValidate, {
      modifier: type === "update" || type === "upsert",
      upsert: isUpsert,
      extendedCustomContext: _objectSpread({
        isInsert: type === "insert",
        isUpdate: type === "update" && options.upsert !== true,
        isUpsert,
        userId,
        isFromTrustedCode,
        docId,
        isLocalCollection
      }, options.extendedCustomContext || {})
    });
  }

  if (isValid) {
    // Add the ID back
    if (cachedId) {
      doc._id = cachedId;
    } // Update the args to reflect the cleaned doc
    // XXX not sure this is necessary since we mutate


    if (type === "insert") {
      args[0] = doc;
    } else {
      args[1] = doc;
    } // If callback, set invalidKey when we get a mongo unique error


    if (Meteor.isServer && hasCallback) {
      args[last] = wrapCallbackForParsingMongoValidationErrors(validationContext, args[last]);
    }

    return args;
  } else {
    error = getErrorObject(validationContext, "in ".concat(collection._name, " ").concat(type));

    if (callback) {
      // insert/update/upsert pass `false` when there's an error, so we do that
      callback(error, false);
    } else {
      throw error;
    }
  }
}

function getErrorObject(context) {
  let appendToMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let message;
  const invalidKeys = typeof context.validationErrors === 'function' ? context.validationErrors() : context.invalidKeys();

  if (invalidKeys.length) {
    const firstErrorKey = invalidKeys[0].name;
    const firstErrorMessage = context.keyErrorMessage(firstErrorKey); // If the error is in a nested key, add the full key to the error message
    // to be more helpful.

    if (firstErrorKey.indexOf('.') === -1) {
      message = firstErrorMessage;
    } else {
      message = "".concat(firstErrorMessage, " (").concat(firstErrorKey, ")");
    }
  } else {
    message = "Failed validation";
  }

  message = "".concat(message, " ").concat(appendToMessage).trim();
  const error = new Error(message);
  error.invalidKeys = invalidKeys;
  error.validationContext = context; // If on the server, we add a sanitized error, too, in case we're
  // called from a method.

  if (Meteor.isServer) {
    error.sanitizedError = new Meteor.Error(400, message, EJSON.stringify(error.invalidKeys));
  }

  return error;
}

function addUniqueError(context, errorMessage) {
  var name = errorMessage.split('c2_')[1].split(' ')[0];
  var val = errorMessage.split('dup key:')[1].split('"')[1];
  var addValidationErrorsPropName = typeof context.addValidationErrors === 'function' ? 'addValidationErrors' : 'addInvalidKeys';
  context[addValidationErrorsPropName]([{
    name: name,
    type: 'notUnique',
    value: val
  }]);
}

function wrapCallbackForParsingMongoValidationErrors(validationContext, cb) {
  return function wrappedCallbackForParsingMongoValidationErrors() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    const error = args[0];

    if (error && (error.name === "MongoError" && error.code === 11001 || error.message.indexOf('MongoError: E11000' !== -1)) && error.message.indexOf('c2_') !== -1) {
      addUniqueError(validationContext, error.message);
      args[0] = getErrorObject(validationContext);
    }

    return cb.apply(this, args);
  };
}

function wrapCallbackForParsingServerErrors(validationContext, cb) {
  var addValidationErrorsPropName = typeof validationContext.addValidationErrors === 'function' ? 'addValidationErrors' : 'addInvalidKeys';
  return function wrappedCallbackForParsingServerErrors() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    const error = args[0]; // Handle our own validation errors

    if (error instanceof Meteor.Error && error.error === 400 && error.reason === "INVALID" && typeof error.details === "string") {
      var invalidKeysFromServer = EJSON.parse(error.details);
      validationContext[addValidationErrorsPropName](invalidKeysFromServer);
      args[0] = getErrorObject(validationContext);
    } // Handle Mongo unique index errors, which are forwarded to the client as 409 errors
    else if (error instanceof Meteor.Error && error.error === 409 && error.reason && error.reason.indexOf('E11000') !== -1 && error.reason.indexOf('c2_') !== -1) {
        addUniqueError(validationContext, error.reason);
        args[0] = getErrorObject(validationContext);
      }

    return cb.apply(this, args);
  };
}

var alreadyInsecure = {};

function keepInsecure(c) {
  // If insecure package is in use, we need to add allow rules that return
  // true. Otherwise, it would seemingly turn off insecure mode.
  if (Package && Package.insecure && !alreadyInsecure[c._name]) {
    c.allow({
      insert: function () {
        return true;
      },
      update: function () {
        return true;
      },
      remove: function () {
        return true;
      },
      fetch: [],
      transform: null
    });
    alreadyInsecure[c._name] = true;
  } // If insecure package is NOT in use, then adding the two deny functions
  // does not have any effect on the main app's security paradigm. The
  // user will still be required to add at least one allow function of her
  // own for each operation for this collection. And the user may still add
  // additional deny functions, but does not have to.

}

var alreadyDefined = {};

function defineDeny(c, options) {
  if (!alreadyDefined[c._name]) {
    var isLocalCollection = c._connection === null; // First define deny functions to extend doc with the results of clean
    // and auto-values. This must be done with "transform: null" or we would be
    // extending a clone of doc and therefore have no effect.

    c.deny({
      insert: function (userId, doc) {
        // Referenced doc is cleaned in place
        c.simpleSchema(doc).clean(doc, {
          mutate: true,
          isModifier: false,
          // We don't do these here because they are done on the client if desired
          filter: false,
          autoConvert: false,
          removeEmptyStrings: false,
          trimStrings: false,
          extendAutoValueContext: {
            isInsert: true,
            isUpdate: false,
            isUpsert: false,
            userId: userId,
            isFromTrustedCode: false,
            docId: doc._id,
            isLocalCollection: isLocalCollection
          }
        });
        return false;
      },
      update: function (userId, doc, fields, modifier) {
        // Referenced modifier is cleaned in place
        c.simpleSchema(modifier).clean(modifier, {
          mutate: true,
          isModifier: true,
          // We don't do these here because they are done on the client if desired
          filter: false,
          autoConvert: false,
          removeEmptyStrings: false,
          trimStrings: false,
          extendAutoValueContext: {
            isInsert: false,
            isUpdate: true,
            isUpsert: false,
            userId: userId,
            isFromTrustedCode: false,
            docId: doc && doc._id,
            isLocalCollection: isLocalCollection
          }
        });
        return false;
      },
      fetch: ['_id'],
      transform: null
    }); // Second define deny functions to validate again on the server
    // for client-initiated inserts and updates. These should be
    // called after the clean/auto-value functions since we're adding
    // them after. These must *not* have "transform: null" if options.transform is true because
    // we need to pass the doc through any transforms to be sure
    // that custom types are properly recognized for type validation.

    c.deny(_objectSpread({
      insert: function (userId, doc) {
        // We pass the false options because we will have done them on client if desired
        doValidate(c, "insert", [doc, {
          trimStrings: false,
          removeEmptyStrings: false,
          filter: false,
          autoConvert: false
        }, function (error) {
          if (error) {
            throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));
          }
        }], false, // getAutoValues
        userId, false // isFromTrustedCode
        );
        return false;
      },
      update: function (userId, doc, fields, modifier) {
        // NOTE: This will never be an upsert because client-side upserts
        // are not allowed once you define allow/deny functions.
        // We pass the false options because we will have done them on client if desired
        doValidate(c, "update", [{
          _id: doc && doc._id
        }, modifier, {
          trimStrings: false,
          removeEmptyStrings: false,
          filter: false,
          autoConvert: false
        }, function (error) {
          if (error) {
            throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));
          }
        }], false, // getAutoValues
        userId, false // isFromTrustedCode
        );
        return false;
      },
      fetch: ['_id']
    }, options.transform === true ? {} : {
      transform: null
    })); // note that we've already done this collection so that we don't do it again
    // if attachSchema is called again

    alreadyDefined[c._name] = true;
  }
}

function extendSchema(s1, s2) {
  if (s2.version >= 2) {
    const ss = new SimpleSchema(s1);
    ss.extend(s2);
    return ss;
  } else {
    return new SimpleSchema([s1, s2]);
  }
}

module.exportDefault(Collection2);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/aldeed_collection2/lib.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  flattenSelector: () => flattenSelector
});

function flattenSelector(selector) {
  // If selector uses $and format, convert to plain object selector
  if (Array.isArray(selector.$and)) {
    selector.$and.forEach(sel => {
      Object.assign(selector, flattenSelector(sel));
    });
    delete selector.$and;
  }

  const obj = {};
  Object.entries(selector).forEach((_ref) => {
    let [key, value] = _ref;

    // Ignoring logical selectors (https://docs.mongodb.com/manual/reference/operator/query/#logical)
    if (!key.startsWith("$")) {
      if (typeof value === 'object' && value !== null) {
        if (value.$eq !== undefined) {
          obj[key] = value.$eq;
        } else if (Array.isArray(value.$in) && value.$in.length === 1) {
          obj[key] = value.$in[0];
        } else if (Object.keys(value).every(v => !(typeof v === "string" && v.startsWith("$")))) {
          obj[key] = value;
        }
      } else {
        obj[key] = value;
      }
    }
  });
  return obj;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"clone":{"package.json":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// node_modules/meteor/aldeed_collection2/node_modules/clone/package.json                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.exports = {
  "name": "clone",
  "version": "2.1.2",
  "main": "clone.js"
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"clone.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// node_modules/meteor/aldeed_collection2/node_modules/clone/clone.js                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.useNode();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lodash.isempty":{"package.json":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// node_modules/meteor/aldeed_collection2/node_modules/lodash.isempty/package.json                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.exports = {
  "name": "lodash.isempty",
  "version": "4.4.0"
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// node_modules/meteor/aldeed_collection2/node_modules/lodash.isempty/index.js                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.useNode();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lodash.isequal":{"package.json":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// node_modules/meteor/aldeed_collection2/node_modules/lodash.isequal/package.json                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.exports = {
  "name": "lodash.isequal",
  "version": "4.5.0"
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// node_modules/meteor/aldeed_collection2/node_modules/lodash.isequal/index.js                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.useNode();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lodash.isobject":{"package.json":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// node_modules/meteor/aldeed_collection2/node_modules/lodash.isobject/package.json                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.exports = {
  "name": "lodash.isobject",
  "version": "3.0.2"
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// node_modules/meteor/aldeed_collection2/node_modules/lodash.isobject/index.js                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.useNode();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/aldeed:collection2/collection2.js");

/* Exports */
Package._define("aldeed:collection2", exports, {
  Collection2: Collection2
});

})();

//# sourceURL=meteor://💻app/packages/aldeed_collection2.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWxkZWVkOmNvbGxlY3Rpb24yL2NvbGxlY3Rpb24yLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9hbGRlZWQ6Y29sbGVjdGlvbjIvbGliLmpzIl0sIm5hbWVzIjpbIl9vYmplY3RTcHJlYWQiLCJtb2R1bGUiLCJsaW5rIiwiZGVmYXVsdCIsInYiLCJFdmVudEVtaXR0ZXIiLCJNZXRlb3IiLCJNb25nbyIsImNoZWNrTnBtVmVyc2lvbnMiLCJjbG9uZSIsIkVKU09OIiwiaXNFbXB0eSIsImlzRXF1YWwiLCJpc09iamVjdCIsImZsYXR0ZW5TZWxlY3RvciIsIlNpbXBsZVNjaGVtYSIsInJlcXVpcmUiLCJDb2xsZWN0aW9uMiIsImRlZmF1bHRDbGVhbk9wdGlvbnMiLCJmaWx0ZXIiLCJhdXRvQ29udmVydCIsInJlbW92ZUVtcHR5U3RyaW5ncyIsInRyaW1TdHJpbmdzIiwicmVtb3ZlTnVsbHNGcm9tQXJyYXlzIiwiQ29sbGVjdGlvbiIsInByb3RvdHlwZSIsImF0dGFjaFNjaGVtYSIsImMyQXR0YWNoU2NoZW1hIiwic3MiLCJvcHRpb25zIiwiaXNTaW1wbGVTY2hlbWEiLCJhdHRhY2hUbyIsIm9iaiIsIl9jMiIsIl9zaW1wbGVTY2hlbWFzIiwic2VsZWN0b3IiLCJiYXNlU2NoZW1hIiwiZXh0ZW5kU2NoZW1hIiwic2NoZW1hIiwic2NoZW1hSW5kZXgiLCJsZW5ndGgiLCJwdXNoIiwicmVwbGFjZSIsInVuZGVmaW5lZCIsImZvckVhY2giLCJpbmRleCIsIl9jb2xsZWN0aW9uIiwiTG9jYWxDb2xsZWN0aW9uIiwiZGVmaW5lRGVueSIsImtlZXBJbnNlY3VyZSIsImVtaXQiLCJzaW1wbGVTY2hlbWEiLCJkb2MiLCJxdWVyeSIsIl9zaW1wbGVTY2hlbWEiLCJzY2hlbWFzIiwidGFyZ2V0IiwiaSIsIk9iamVjdCIsImtleXMiLCIkc2V0IiwiRXJyb3IiLCJtZXRob2ROYW1lIiwiX3N1cGVyIiwiYXJncyIsImJ5cGFzc0NvbGxlY3Rpb24yIiwidXNlcklkIiwiZXJyIiwiZG9WYWxpZGF0ZSIsImlzU2VydmVyIiwiX2Nvbm5lY3Rpb24iLCJfbWFrZU5ld0lEIiwic3BsaWNlIiwiYXBwbHkiLCJjb2xsZWN0aW9uIiwidHlwZSIsImdldEF1dG9WYWx1ZXMiLCJpc0Zyb21UcnVzdGVkQ29kZSIsImNhbGxiYWNrIiwiZXJyb3IiLCJpc1Vwc2VydCIsImxhc3QiLCJoYXNDYWxsYmFjayIsInZhbGlkYXRlZE9iamVjdFdhc0luaXRpYWxseUVtcHR5IiwidXBzZXJ0IiwiaXNMb2NhbENvbGxlY3Rpb24iLCJwaWNrcyIsIkFycmF5IiwiaXNBcnJheSIsInBpY2siLCJvbWl0cyIsIm9taXQiLCJ2YWxpZGF0aW9uQ29udGV4dCIsIm5hbWVkQ29udGV4dCIsImlzQ2xpZW50IiwiX2RlYnVnIiwicmVhc29uIiwic3RhY2siLCJ3cmFwQ2FsbGJhY2tGb3JQYXJzaW5nU2VydmVyRXJyb3JzIiwic2NoZW1hQWxsb3dzSWQiLCJhbGxvd3NLZXkiLCJfaWQiLCJkb2NJZCIsIk9iamVjdElEIiwiY2FjaGVkSWQiLCJhdXRvVmFsdWVDb250ZXh0IiwiaXNJbnNlcnQiLCJpc1VwZGF0ZSIsImV4dGVuZEF1dG9WYWx1ZUNvbnRleHQiLCJfY2xlYW5PcHRpb25zIiwiY2xlYW5PcHRpb25zRm9yVGhpc09wZXJhdGlvbiIsInByb3AiLCJjbGVhbiIsIm11dGF0ZSIsImlzTW9kaWZpZXIiLCJkb2NUb1ZhbGlkYXRlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwic2V0IiwiYXNzaWduIiwiaXNWYWxpZCIsInZhbGlkYXRlIiwibW9kaWZpZXIiLCJleHRlbmRlZEN1c3RvbUNvbnRleHQiLCJ3cmFwQ2FsbGJhY2tGb3JQYXJzaW5nTW9uZ29WYWxpZGF0aW9uRXJyb3JzIiwiZ2V0RXJyb3JPYmplY3QiLCJfbmFtZSIsImNvbnRleHQiLCJhcHBlbmRUb01lc3NhZ2UiLCJtZXNzYWdlIiwiaW52YWxpZEtleXMiLCJ2YWxpZGF0aW9uRXJyb3JzIiwiZmlyc3RFcnJvcktleSIsIm5hbWUiLCJmaXJzdEVycm9yTWVzc2FnZSIsImtleUVycm9yTWVzc2FnZSIsImluZGV4T2YiLCJ0cmltIiwic2FuaXRpemVkRXJyb3IiLCJzdHJpbmdpZnkiLCJhZGRVbmlxdWVFcnJvciIsImVycm9yTWVzc2FnZSIsInNwbGl0IiwidmFsIiwiYWRkVmFsaWRhdGlvbkVycm9yc1Byb3BOYW1lIiwiYWRkVmFsaWRhdGlvbkVycm9ycyIsInZhbHVlIiwiY2IiLCJ3cmFwcGVkQ2FsbGJhY2tGb3JQYXJzaW5nTW9uZ29WYWxpZGF0aW9uRXJyb3JzIiwiY29kZSIsIndyYXBwZWRDYWxsYmFja0ZvclBhcnNpbmdTZXJ2ZXJFcnJvcnMiLCJkZXRhaWxzIiwiaW52YWxpZEtleXNGcm9tU2VydmVyIiwicGFyc2UiLCJhbHJlYWR5SW5zZWN1cmUiLCJjIiwiUGFja2FnZSIsImluc2VjdXJlIiwiYWxsb3ciLCJpbnNlcnQiLCJ1cGRhdGUiLCJyZW1vdmUiLCJmZXRjaCIsInRyYW5zZm9ybSIsImFscmVhZHlEZWZpbmVkIiwiZGVueSIsImZpZWxkcyIsInMxIiwiczIiLCJ2ZXJzaW9uIiwiZXh0ZW5kIiwiZXhwb3J0RGVmYXVsdCIsImV4cG9ydCIsIiRhbmQiLCJzZWwiLCJlbnRyaWVzIiwia2V5Iiwic3RhcnRzV2l0aCIsIiRlcSIsIiRpbiIsImV2ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxhQUFKOztBQUFrQkMsTUFBTSxDQUFDQyxJQUFQLENBQVksc0NBQVosRUFBbUQ7QUFBQ0MsU0FBTyxDQUFDQyxDQUFELEVBQUc7QUFBQ0osaUJBQWEsR0FBQ0ksQ0FBZDtBQUFnQjs7QUFBNUIsQ0FBbkQsRUFBaUYsQ0FBakY7QUFBbEIsSUFBSUMsWUFBSjtBQUFpQkosTUFBTSxDQUFDQyxJQUFQLENBQVksMEJBQVosRUFBdUM7QUFBQ0csY0FBWSxDQUFDRCxDQUFELEVBQUc7QUFBQ0MsZ0JBQVksR0FBQ0QsQ0FBYjtBQUFlOztBQUFoQyxDQUF2QyxFQUF5RSxDQUF6RTtBQUE0RSxJQUFJRSxNQUFKO0FBQVdMLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGVBQVosRUFBNEI7QUFBQ0ksUUFBTSxDQUFDRixDQUFELEVBQUc7QUFBQ0UsVUFBTSxHQUFDRixDQUFQO0FBQVM7O0FBQXBCLENBQTVCLEVBQWtELENBQWxEO0FBQXFELElBQUlHLEtBQUo7QUFBVU4sTUFBTSxDQUFDQyxJQUFQLENBQVksY0FBWixFQUEyQjtBQUFDSyxPQUFLLENBQUNILENBQUQsRUFBRztBQUFDRyxTQUFLLEdBQUNILENBQU47QUFBUTs7QUFBbEIsQ0FBM0IsRUFBK0MsQ0FBL0M7QUFBa0QsSUFBSUksZ0JBQUo7QUFBcUJQLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLG9DQUFaLEVBQWlEO0FBQUNNLGtCQUFnQixDQUFDSixDQUFELEVBQUc7QUFBQ0ksb0JBQWdCLEdBQUNKLENBQWpCO0FBQW1COztBQUF4QyxDQUFqRCxFQUEyRixDQUEzRjtBQUE4RixJQUFJSyxLQUFKO0FBQVVSLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLE9BQVosRUFBb0I7QUFBQ0MsU0FBTyxDQUFDQyxDQUFELEVBQUc7QUFBQ0ssU0FBSyxHQUFDTCxDQUFOO0FBQVE7O0FBQXBCLENBQXBCLEVBQTBDLENBQTFDO0FBQTZDLElBQUlNLEtBQUo7QUFBVVQsTUFBTSxDQUFDQyxJQUFQLENBQVksY0FBWixFQUEyQjtBQUFDUSxPQUFLLENBQUNOLENBQUQsRUFBRztBQUFDTSxTQUFLLEdBQUNOLENBQU47QUFBUTs7QUFBbEIsQ0FBM0IsRUFBK0MsQ0FBL0M7QUFBa0QsSUFBSU8sT0FBSjtBQUFZVixNQUFNLENBQUNDLElBQVAsQ0FBWSxnQkFBWixFQUE2QjtBQUFDQyxTQUFPLENBQUNDLENBQUQsRUFBRztBQUFDTyxXQUFPLEdBQUNQLENBQVI7QUFBVTs7QUFBdEIsQ0FBN0IsRUFBcUQsQ0FBckQ7QUFBd0QsSUFBSVEsT0FBSjtBQUFZWCxNQUFNLENBQUNDLElBQVAsQ0FBWSxnQkFBWixFQUE2QjtBQUFDQyxTQUFPLENBQUNDLENBQUQsRUFBRztBQUFDUSxXQUFPLEdBQUNSLENBQVI7QUFBVTs7QUFBdEIsQ0FBN0IsRUFBcUQsQ0FBckQ7QUFBd0QsSUFBSVMsUUFBSjtBQUFhWixNQUFNLENBQUNDLElBQVAsQ0FBWSxpQkFBWixFQUE4QjtBQUFDQyxTQUFPLENBQUNDLENBQUQsRUFBRztBQUFDUyxZQUFRLEdBQUNULENBQVQ7QUFBVzs7QUFBdkIsQ0FBOUIsRUFBdUQsQ0FBdkQ7QUFBMEQsSUFBSVUsZUFBSjtBQUFvQmIsTUFBTSxDQUFDQyxJQUFQLENBQVksT0FBWixFQUFvQjtBQUFDWSxpQkFBZSxDQUFDVixDQUFELEVBQUc7QUFBQ1UsbUJBQWUsR0FBQ1YsQ0FBaEI7QUFBa0I7O0FBQXRDLENBQXBCLEVBQTRELENBQTVEO0FBV2xxQkksZ0JBQWdCLENBQUM7QUFBRSxrQkFBZ0I7QUFBbEIsQ0FBRCxFQUFnQyxvQkFBaEMsQ0FBaEI7O0FBRUEsTUFBTU8sWUFBWSxHQUFHQyxPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCYixPQUE3QyxDLENBRUE7OztBQUNBLE1BQU1jLFdBQVcsR0FBRyxJQUFJWixZQUFKLEVBQXBCO0FBRUEsTUFBTWEsbUJBQW1CLEdBQUc7QUFDMUJDLFFBQU0sRUFBRSxJQURrQjtBQUUxQkMsYUFBVyxFQUFFLElBRmE7QUFHMUJDLG9CQUFrQixFQUFFLElBSE07QUFJMUJDLGFBQVcsRUFBRSxJQUphO0FBSzFCQyx1QkFBcUIsRUFBRTtBQUxHLENBQTVCO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBaEIsS0FBSyxDQUFDaUIsVUFBTixDQUFpQkMsU0FBakIsQ0FBMkJDLFlBQTNCLEdBQTBDLFNBQVNDLGNBQVQsQ0FBd0JDLEVBQXhCLEVBQTRCQyxPQUE1QixFQUFxQztBQUM3RUEsU0FBTyxHQUFHQSxPQUFPLElBQUksRUFBckIsQ0FENkUsQ0FHN0U7O0FBQ0EsTUFBSSxDQUFDZCxZQUFZLENBQUNlLGNBQWIsQ0FBNEJGLEVBQTVCLENBQUwsRUFBc0M7QUFDcENBLE1BQUUsR0FBRyxJQUFJYixZQUFKLENBQWlCYSxFQUFqQixDQUFMO0FBQ0Q7O0FBRUQsV0FBU0csUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUI7QUFDckI7QUFDQTtBQUNBQSxPQUFHLENBQUNDLEdBQUosR0FBVUQsR0FBRyxDQUFDQyxHQUFKLElBQVcsRUFBckI7QUFDQUQsT0FBRyxDQUFDQyxHQUFKLENBQVFDLGNBQVIsR0FBeUJGLEdBQUcsQ0FBQ0MsR0FBSixDQUFRQyxjQUFSLElBQTBCLENBQUUsSUFBRixDQUFuRDs7QUFFQSxRQUFJLE9BQU9MLE9BQU8sQ0FBQ00sUUFBZixLQUE0QixRQUFoQyxFQUEwQztBQUN4QztBQUVBO0FBQ0EsVUFBSUMsVUFBVSxHQUFHSixHQUFHLENBQUNDLEdBQUosQ0FBUUMsY0FBUixDQUF1QixDQUF2QixDQUFqQjs7QUFDQSxVQUFJRSxVQUFKLEVBQWdCO0FBQ2RSLFVBQUUsR0FBR1MsWUFBWSxDQUFDRCxVQUFVLENBQUNFLE1BQVosRUFBb0JWLEVBQXBCLENBQWpCO0FBQ0QsT0FQdUMsQ0FTeEM7OztBQUNBLFVBQUlXLFdBQUosQ0FWd0MsQ0FZeEM7O0FBQ0EsV0FBS0EsV0FBVyxHQUFHUCxHQUFHLENBQUNDLEdBQUosQ0FBUUMsY0FBUixDQUF1Qk0sTUFBdkIsR0FBZ0MsQ0FBbkQsRUFBc0QsSUFBSUQsV0FBMUQsRUFBdUVBLFdBQVcsRUFBbEYsRUFBc0Y7QUFDcEYsWUFBSUQsTUFBTSxHQUFHTixHQUFHLENBQUNDLEdBQUosQ0FBUUMsY0FBUixDQUF1QkssV0FBdkIsQ0FBYjtBQUNBLFlBQUlELE1BQU0sSUFBSTFCLE9BQU8sQ0FBQzBCLE1BQU0sQ0FBQ0gsUUFBUixFQUFrQk4sT0FBTyxDQUFDTSxRQUExQixDQUFyQixFQUEwRDtBQUMzRDs7QUFFRCxVQUFJSSxXQUFXLElBQUksQ0FBbkIsRUFBc0I7QUFDcEI7QUFDQVAsV0FBRyxDQUFDQyxHQUFKLENBQVFDLGNBQVIsQ0FBdUJPLElBQXZCLENBQTRCO0FBQzFCSCxnQkFBTSxFQUFFVixFQURrQjtBQUUxQk8sa0JBQVEsRUFBRU4sT0FBTyxDQUFDTTtBQUZRLFNBQTVCO0FBSUQsT0FORCxNQU1PO0FBQ0w7QUFDQSxZQUFJTixPQUFPLENBQUNhLE9BQVIsS0FBb0IsSUFBeEIsRUFBOEI7QUFDNUI7QUFDQVYsYUFBRyxDQUFDQyxHQUFKLENBQVFDLGNBQVIsQ0FBdUJLLFdBQXZCLEVBQW9DRCxNQUFwQyxHQUE2Q1YsRUFBN0M7QUFDRCxTQUhELE1BR087QUFDTDtBQUNBSSxhQUFHLENBQUNDLEdBQUosQ0FBUUMsY0FBUixDQUF1QkssV0FBdkIsRUFBb0NELE1BQXBDLEdBQTZDRCxZQUFZLENBQUNMLEdBQUcsQ0FBQ0MsR0FBSixDQUFRQyxjQUFSLENBQXVCSyxXQUF2QixFQUFvQ0QsTUFBckMsRUFBNkNWLEVBQTdDLENBQXpEO0FBQ0Q7QUFDRjtBQUNGLEtBbENELE1Ba0NPO0FBQ0w7QUFDQSxVQUFJQyxPQUFPLENBQUNhLE9BQVIsS0FBb0IsSUFBeEIsRUFBOEI7QUFDNUI7QUFDQVYsV0FBRyxDQUFDQyxHQUFKLENBQVFDLGNBQVIsR0FBeUIsQ0FBQztBQUN4QkksZ0JBQU0sRUFBRVYsRUFEZ0I7QUFFeEJPLGtCQUFRLEVBQUVOLE9BQU8sQ0FBQ007QUFGTSxTQUFELENBQXpCO0FBSUQsT0FORCxNQU1PO0FBQ0w7QUFDQSxZQUFJLENBQUNILEdBQUcsQ0FBQ0MsR0FBSixDQUFRQyxjQUFSLENBQXVCLENBQXZCLENBQUwsRUFBZ0M7QUFDOUIsaUJBQU9GLEdBQUcsQ0FBQ0MsR0FBSixDQUFRQyxjQUFSLENBQXVCLENBQXZCLElBQTRCO0FBQUVJLGtCQUFNLEVBQUVWLEVBQVY7QUFBY08sb0JBQVEsRUFBRVE7QUFBeEIsV0FBbkM7QUFDRCxTQUpJLENBS0w7OztBQUNBWCxXQUFHLENBQUNDLEdBQUosQ0FBUUMsY0FBUixDQUF1QlUsT0FBdkIsQ0FBK0IsQ0FBQ04sTUFBRCxFQUFTTyxLQUFULEtBQW1CO0FBQ2hELGNBQUliLEdBQUcsQ0FBQ0MsR0FBSixDQUFRQyxjQUFSLENBQXVCVyxLQUF2QixDQUFKLEVBQW1DO0FBQ2pDYixlQUFHLENBQUNDLEdBQUosQ0FBUUMsY0FBUixDQUF1QlcsS0FBdkIsRUFBOEJQLE1BQTlCLEdBQXVDRCxZQUFZLENBQUNMLEdBQUcsQ0FBQ0MsR0FBSixDQUFRQyxjQUFSLENBQXVCVyxLQUF2QixFQUE4QlAsTUFBL0IsRUFBdUNWLEVBQXZDLENBQW5EO0FBQ0Q7QUFDRixTQUpEO0FBS0Q7QUFDRjtBQUNGOztBQUVERyxVQUFRLENBQUMsSUFBRCxDQUFSLENBdkU2RSxDQXdFN0U7O0FBQ0EsTUFBSSxLQUFLZSxXQUFMLFlBQTRCQyxlQUFoQyxFQUFpRDtBQUMvQyxTQUFLRCxXQUFMLENBQWlCYixHQUFqQixHQUF1QixLQUFLYSxXQUFMLENBQWlCYixHQUFqQixJQUF3QixFQUEvQztBQUNBRixZQUFRLENBQUMsS0FBS2UsV0FBTixDQUFSO0FBQ0Q7O0FBRURFLFlBQVUsQ0FBQyxJQUFELEVBQU9uQixPQUFQLENBQVY7QUFDQW9CLGNBQVksQ0FBQyxJQUFELENBQVo7QUFFQWhDLGFBQVcsQ0FBQ2lDLElBQVosQ0FBaUIsaUJBQWpCLEVBQW9DLElBQXBDLEVBQTBDdEIsRUFBMUMsRUFBOENDLE9BQTlDO0FBQ0QsQ0FsRkQ7O0FBb0ZBLENBQUN0QixLQUFLLENBQUNpQixVQUFQLEVBQW1CdUIsZUFBbkIsRUFBb0NILE9BQXBDLENBQTZDWixHQUFELElBQVM7QUFDbkQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFQSxLQUFHLENBQUNQLFNBQUosQ0FBYzBCLFlBQWQsR0FBNkIsVUFBVUMsR0FBVixFQUFldkIsT0FBZixFQUF3QndCLEtBQXhCLEVBQStCO0FBQzFELFFBQUksQ0FBQyxLQUFLcEIsR0FBVixFQUFlLE9BQU8sSUFBUDtBQUNmLFFBQUksS0FBS0EsR0FBTCxDQUFTcUIsYUFBYixFQUE0QixPQUFPLEtBQUtyQixHQUFMLENBQVNxQixhQUFoQjtBQUU1QixRQUFJQyxPQUFPLEdBQUcsS0FBS3RCLEdBQUwsQ0FBU0MsY0FBdkI7O0FBQ0EsUUFBSXFCLE9BQU8sSUFBSUEsT0FBTyxDQUFDZixNQUFSLEdBQWlCLENBQWhDLEVBQW1DO0FBRWpDLFVBQUlGLE1BQUosRUFBWUgsUUFBWixFQUFzQnFCLE1BQXRCLENBRmlDLENBR2pDOztBQUNBLFdBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsT0FBTyxDQUFDZixNQUE1QixFQUFvQ2lCLENBQUMsRUFBckMsRUFBeUM7QUFDdkNuQixjQUFNLEdBQUdpQixPQUFPLENBQUNFLENBQUQsQ0FBaEI7QUFDQXRCLGdCQUFRLEdBQUd1QixNQUFNLENBQUNDLElBQVAsQ0FBWXJCLE1BQU0sQ0FBQ0gsUUFBbkIsRUFBNkIsQ0FBN0IsQ0FBWCxDQUZ1QyxDQUl2QztBQUNBOztBQUNBcUIsY0FBTSxHQUFHYixTQUFULENBTnVDLENBT3ZDO0FBQ0E7O0FBQ0EsWUFBSVMsR0FBRyxDQUFDUSxJQUFKLElBQVksT0FBT1IsR0FBRyxDQUFDUSxJQUFKLENBQVN6QixRQUFULENBQVAsS0FBOEIsV0FBOUMsRUFBMkQ7QUFDekRxQixnQkFBTSxHQUFHSixHQUFHLENBQUNRLElBQUosQ0FBU3pCLFFBQVQsQ0FBVDtBQUNELFNBRkQsTUFFTyxJQUFJLE9BQU9pQixHQUFHLENBQUNqQixRQUFELENBQVYsS0FBeUIsV0FBN0IsRUFBMEM7QUFDL0NxQixnQkFBTSxHQUFHSixHQUFHLENBQUNqQixRQUFELENBQVo7QUFDRCxTQUZNLE1BRUEsSUFBSU4sT0FBTyxJQUFJQSxPQUFPLENBQUNNLFFBQXZCLEVBQWlDO0FBQ3RDcUIsZ0JBQU0sR0FBRzNCLE9BQU8sQ0FBQ00sUUFBUixDQUFpQkEsUUFBakIsQ0FBVDtBQUNELFNBRk0sTUFFQSxJQUFJa0IsS0FBSyxJQUFJQSxLQUFLLENBQUNsQixRQUFELENBQWxCLEVBQThCO0FBQUU7QUFDckNxQixnQkFBTSxHQUFHSCxLQUFLLENBQUNsQixRQUFELENBQWQ7QUFDRCxTQWpCc0MsQ0FtQnZDO0FBQ0E7OztBQUNBLFlBQUlxQixNQUFNLEtBQUtiLFNBQVgsSUFBd0JhLE1BQU0sS0FBS2xCLE1BQU0sQ0FBQ0gsUUFBUCxDQUFnQkEsUUFBaEIsQ0FBdkMsRUFBa0U7QUFDaEUsaUJBQU9HLE1BQU0sQ0FBQ0EsTUFBZDtBQUNEO0FBQ0Y7O0FBQ0QsVUFBSWlCLE9BQU8sQ0FBQyxDQUFELENBQVgsRUFBZ0I7QUFDZCxlQUFPQSxPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdqQixNQUFsQjtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU0sSUFBSXVCLEtBQUosQ0FBVSxtQkFBVixDQUFOO0FBQ0Q7QUFDRjs7QUFFRCxXQUFPLElBQVA7QUFDRCxHQTFDRDtBQTJDRCxDQXZERCxFLENBeURBOztBQUNBLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUJqQixPQUFyQixDQUE4QmtCLFVBQUQsSUFBZ0I7QUFDM0MsUUFBTUMsTUFBTSxHQUFHeEQsS0FBSyxDQUFDaUIsVUFBTixDQUFpQkMsU0FBakIsQ0FBMkJxQyxVQUEzQixDQUFmOztBQUNBdkQsT0FBSyxDQUFDaUIsVUFBTixDQUFpQkMsU0FBakIsQ0FBMkJxQyxVQUEzQixJQUF5QyxZQUFrQjtBQUFBLHNDQUFORSxJQUFNO0FBQU5BLFVBQU07QUFBQTs7QUFDekQsUUFBSW5DLE9BQU8sR0FBSWlDLFVBQVUsS0FBSyxRQUFoQixHQUE0QkUsSUFBSSxDQUFDLENBQUQsQ0FBaEMsR0FBc0NBLElBQUksQ0FBQyxDQUFELENBQXhELENBRHlELENBR3pEOztBQUNBLFFBQUksQ0FBQ25DLE9BQUQsSUFBWSxPQUFPQSxPQUFQLEtBQW1CLFVBQW5DLEVBQStDO0FBQzdDQSxhQUFPLEdBQUcsRUFBVjtBQUNEOztBQUVELFFBQUksS0FBS0ksR0FBTCxJQUFZSixPQUFPLENBQUNvQyxpQkFBUixLQUE4QixJQUE5QyxFQUFvRDtBQUNsRCxVQUFJQyxNQUFNLEdBQUcsSUFBYjs7QUFDQSxVQUFJO0FBQUU7QUFDSkEsY0FBTSxHQUFHNUQsTUFBTSxDQUFDNEQsTUFBUCxFQUFUO0FBQ0QsT0FGRCxDQUVFLE9BQU9DLEdBQVAsRUFBWSxDQUFFOztBQUVoQkgsVUFBSSxHQUFHSSxVQUFVLENBQ2YsSUFEZSxFQUVmTixVQUZlLEVBR2ZFLElBSGUsRUFJZjFELE1BQU0sQ0FBQytELFFBQVAsSUFBbUIsS0FBS0MsV0FBTCxLQUFxQixJQUp6QixFQUkrQjtBQUM5Q0osWUFMZSxFQU1mNUQsTUFBTSxDQUFDK0QsUUFOUSxDQU1DO0FBTkQsT0FBakI7O0FBUUEsVUFBSSxDQUFDTCxJQUFMLEVBQVc7QUFDVDtBQUNBO0FBQ0EsZUFBT0YsVUFBVSxLQUFLLFFBQWYsR0FBMEIsS0FBS1MsVUFBTCxFQUExQixHQUE4QzVCLFNBQXJEO0FBQ0Q7QUFDRixLQW5CRCxNQW1CTztBQUNMO0FBQ0EsVUFBSW1CLFVBQVUsS0FBSyxRQUFmLElBQTJCLE9BQU9FLElBQUksQ0FBQyxDQUFELENBQVgsS0FBbUIsVUFBbEQsRUFBOERBLElBQUksQ0FBQ1EsTUFBTCxDQUFZLENBQVosRUFBZSxDQUFmO0FBQy9EOztBQUVELFdBQU9ULE1BQU0sQ0FBQ1UsS0FBUCxDQUFhLElBQWIsRUFBbUJULElBQW5CLENBQVA7QUFDRCxHQWpDRDtBQWtDRCxDQXBDRDtBQXNDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0ksVUFBVCxDQUFvQk0sVUFBcEIsRUFBZ0NDLElBQWhDLEVBQXNDWCxJQUF0QyxFQUE0Q1ksYUFBNUMsRUFBMkRWLE1BQTNELEVBQW1FVyxpQkFBbkUsRUFBc0Y7QUFDcEYsTUFBSXpCLEdBQUosRUFBUzBCLFFBQVQsRUFBbUJDLEtBQW5CLEVBQTBCbEQsT0FBMUIsRUFBbUNtRCxRQUFuQyxFQUE2QzdDLFFBQTdDLEVBQXVEOEMsSUFBdkQsRUFBNkRDLFdBQTdEOztBQUVBLE1BQUksQ0FBQ2xCLElBQUksQ0FBQ3hCLE1BQVYsRUFBa0I7QUFDaEIsVUFBTSxJQUFJcUIsS0FBSixDQUFVYyxJQUFJLEdBQUcsdUJBQWpCLENBQU47QUFDRCxHQUxtRixDQU9wRjs7O0FBQ0EsTUFBSUEsSUFBSSxLQUFLLFFBQWIsRUFBdUI7QUFDckJ2QixPQUFHLEdBQUdZLElBQUksQ0FBQyxDQUFELENBQVY7QUFDQW5DLFdBQU8sR0FBR21DLElBQUksQ0FBQyxDQUFELENBQWQ7QUFDQWMsWUFBUSxHQUFHZCxJQUFJLENBQUMsQ0FBRCxDQUFmLENBSHFCLENBS3JCOztBQUNBLFFBQUksT0FBT25DLE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDakNtQyxVQUFJLEdBQUcsQ0FBQ1osR0FBRCxFQUFNdkIsT0FBTixDQUFQO0FBQ0QsS0FGRCxNQUVPLElBQUksT0FBT2lELFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDekNkLFVBQUksR0FBRyxDQUFDWixHQUFELEVBQU0wQixRQUFOLENBQVA7QUFDRCxLQUZNLE1BRUE7QUFDTGQsVUFBSSxHQUFHLENBQUNaLEdBQUQsQ0FBUDtBQUNEO0FBQ0YsR0FiRCxNQWFPLElBQUl1QixJQUFJLEtBQUssUUFBYixFQUF1QjtBQUM1QnhDLFlBQVEsR0FBRzZCLElBQUksQ0FBQyxDQUFELENBQWY7QUFDQVosT0FBRyxHQUFHWSxJQUFJLENBQUMsQ0FBRCxDQUFWO0FBQ0FuQyxXQUFPLEdBQUdtQyxJQUFJLENBQUMsQ0FBRCxDQUFkO0FBQ0FjLFlBQVEsR0FBR2QsSUFBSSxDQUFDLENBQUQsQ0FBZjtBQUNELEdBTE0sTUFLQTtBQUNMLFVBQU0sSUFBSUgsS0FBSixDQUFVLHVCQUFWLENBQU47QUFDRDs7QUFFRCxNQUFJc0IsZ0NBQWdDLEdBQUd4RSxPQUFPLENBQUN5QyxHQUFELENBQTlDLENBOUJvRixDQWdDcEY7O0FBQ0EsTUFBSSxDQUFDMEIsUUFBRCxJQUFhLE9BQU9qRCxPQUFQLEtBQW1CLFVBQXBDLEVBQWdEO0FBQzlDaUQsWUFBUSxHQUFHakQsT0FBWDtBQUNBQSxXQUFPLEdBQUcsRUFBVjtBQUNEOztBQUNEQSxTQUFPLEdBQUdBLE9BQU8sSUFBSSxFQUFyQjtBQUVBb0QsTUFBSSxHQUFHakIsSUFBSSxDQUFDeEIsTUFBTCxHQUFjLENBQXJCO0FBRUEwQyxhQUFXLEdBQUksT0FBT2xCLElBQUksQ0FBQ2lCLElBQUQsQ0FBWCxLQUFzQixVQUFyQyxDQXpDb0YsQ0EyQ3BGOztBQUNBRCxVQUFRLEdBQUlMLElBQUksS0FBSyxRQUFULElBQXFCOUMsT0FBTyxDQUFDdUQsTUFBUixLQUFtQixJQUFwRCxDQTVDb0YsQ0E4Q3BGO0FBQ0E7O0FBQ0EsTUFBSTlDLE1BQU0sR0FBR29DLFVBQVUsQ0FBQ3ZCLFlBQVgsQ0FBd0JDLEdBQXhCLEVBQTZCdkIsT0FBN0IsRUFBc0NNLFFBQXRDLENBQWI7QUFDQSxNQUFJa0QsaUJBQWlCLEdBQUlYLFVBQVUsQ0FBQ0osV0FBWCxLQUEyQixJQUFwRCxDQWpEb0YsQ0FtRHBGOztBQUNBLE1BQUksQ0FBQ2hFLE1BQU0sQ0FBQytELFFBQVAsSUFBbUJnQixpQkFBcEIsS0FBMEN4RCxPQUFPLENBQUMrQyxhQUFSLEtBQTBCLEtBQXhFLEVBQStFO0FBQzdFQSxpQkFBYSxHQUFHLEtBQWhCO0FBQ0QsR0F0RG1GLENBd0RwRjs7O0FBQ0EsTUFBSVUsS0FBSyxHQUFHQyxLQUFLLENBQUNDLE9BQU4sQ0FBYzNELE9BQU8sQ0FBQzRELElBQXRCLElBQThCNUQsT0FBTyxDQUFDNEQsSUFBdEMsR0FBNkMsSUFBekQ7QUFDQSxNQUFJQyxLQUFLLEdBQUdILEtBQUssQ0FBQ0MsT0FBTixDQUFjM0QsT0FBTyxDQUFDOEQsSUFBdEIsSUFBOEI5RCxPQUFPLENBQUM4RCxJQUF0QyxHQUE2QyxJQUF6RDs7QUFFQSxNQUFJTCxLQUFLLElBQUlJLEtBQWIsRUFBb0I7QUFDbEI7QUFDQSxVQUFNLElBQUk3QixLQUFKLENBQVUsOENBQVYsQ0FBTjtBQUNELEdBSEQsTUFHTyxJQUFJeUIsS0FBSixFQUFXO0FBQ2hCaEQsVUFBTSxHQUFHQSxNQUFNLENBQUNtRCxJQUFQLENBQVksR0FBR0gsS0FBZixDQUFUO0FBQ0QsR0FGTSxNQUVBLElBQUlJLEtBQUosRUFBVztBQUNoQnBELFVBQU0sR0FBR0EsTUFBTSxDQUFDcUQsSUFBUCxDQUFZLEdBQUdELEtBQWYsQ0FBVDtBQUNELEdBbkVtRixDQXFFcEY7OztBQUNBLE1BQUlFLGlCQUFpQixHQUFHL0QsT0FBTyxDQUFDK0QsaUJBQWhDOztBQUNBLE1BQUlBLGlCQUFKLEVBQXVCO0FBQ3JCLFFBQUksT0FBT0EsaUJBQVAsS0FBNkIsUUFBakMsRUFBMkM7QUFDekNBLHVCQUFpQixHQUFHdEQsTUFBTSxDQUFDdUQsWUFBUCxDQUFvQkQsaUJBQXBCLENBQXBCO0FBQ0Q7QUFDRixHQUpELE1BSU87QUFDTEEscUJBQWlCLEdBQUd0RCxNQUFNLENBQUN1RCxZQUFQLEVBQXBCO0FBQ0QsR0E3RW1GLENBK0VwRjs7O0FBQ0EsTUFBSXZGLE1BQU0sQ0FBQ3dGLFFBQVAsSUFBbUIsQ0FBQ2hCLFFBQXhCLEVBQWtDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsWUFBUSxHQUFHLFVBQVNYLEdBQVQsRUFBYztBQUN2QixVQUFJQSxHQUFKLEVBQVM7QUFDUDdELGNBQU0sQ0FBQ3lGLE1BQVAsQ0FBY3BCLElBQUksR0FBRyxXQUFQLElBQXNCUixHQUFHLENBQUM2QixNQUFKLElBQWM3QixHQUFHLENBQUM4QixLQUF4QyxDQUFkO0FBQ0Q7QUFDRixLQUpEO0FBS0QsR0EzRm1GLENBNkZwRjtBQUNBO0FBQ0E7OztBQUNBLE1BQUkzRixNQUFNLENBQUN3RixRQUFQLElBQW1CWixXQUF2QixFQUFvQztBQUNsQ0osWUFBUSxHQUFHZCxJQUFJLENBQUNpQixJQUFELENBQUosR0FBYWlCLGtDQUFrQyxDQUFDTixpQkFBRCxFQUFvQmQsUUFBcEIsQ0FBMUQ7QUFDRDs7QUFFRCxNQUFJcUIsY0FBYyxHQUFHN0QsTUFBTSxDQUFDOEQsU0FBUCxDQUFpQixLQUFqQixDQUFyQjs7QUFDQSxNQUFJekIsSUFBSSxLQUFLLFFBQVQsSUFBcUIsQ0FBQ3ZCLEdBQUcsQ0FBQ2lELEdBQTFCLElBQWlDRixjQUFyQyxFQUFxRDtBQUNuRC9DLE9BQUcsQ0FBQ2lELEdBQUosR0FBVTNCLFVBQVUsQ0FBQ0gsVUFBWCxFQUFWO0FBQ0QsR0F2R21GLENBeUdwRjs7O0FBQ0EsTUFBSStCLEtBQUo7O0FBQ0EsTUFBSTNCLElBQUksS0FBSyxRQUFiLEVBQXVCO0FBQ3JCMkIsU0FBSyxHQUFHbEQsR0FBRyxDQUFDaUQsR0FBWixDQURxQixDQUNKO0FBQ2xCLEdBRkQsTUFFTyxJQUFJMUIsSUFBSSxLQUFLLFFBQVQsSUFBcUJ4QyxRQUF6QixFQUFtQztBQUN4Q21FLFNBQUssR0FBRyxPQUFPbkUsUUFBUCxLQUFvQixRQUFwQixJQUFnQ0EsUUFBUSxZQUFZNUIsS0FBSyxDQUFDZ0csUUFBMUQsR0FBcUVwRSxRQUFyRSxHQUFnRkEsUUFBUSxDQUFDa0UsR0FBakc7QUFDRCxHQS9HbUYsQ0FpSHBGO0FBQ0E7OztBQUNBLE1BQUlHLFFBQUo7O0FBQ0EsTUFBSXBELEdBQUcsQ0FBQ2lELEdBQUosSUFBVyxDQUFDRixjQUFoQixFQUFnQztBQUM5QkssWUFBUSxHQUFHcEQsR0FBRyxDQUFDaUQsR0FBZjtBQUNBLFdBQU9qRCxHQUFHLENBQUNpRCxHQUFYO0FBQ0Q7O0FBRUQsUUFBTUksZ0JBQWdCLEdBQUc7QUFDdkJDLFlBQVEsRUFBRy9CLElBQUksS0FBSyxRQURHO0FBRXZCZ0MsWUFBUSxFQUFHaEMsSUFBSSxLQUFLLFFBQVQsSUFBcUI5QyxPQUFPLENBQUN1RCxNQUFSLEtBQW1CLElBRjVCO0FBR3ZCSixZQUh1QjtBQUl2QmQsVUFKdUI7QUFLdkJXLHFCQUx1QjtBQU12QnlCLFNBTnVCO0FBT3ZCakI7QUFQdUIsR0FBekI7O0FBVUEsUUFBTXVCLHNCQUFzQixpREFDdEIsQ0FBQ3RFLE1BQU0sQ0FBQ3VFLGFBQVAsSUFBd0IsRUFBekIsRUFBNkJELHNCQUE3QixJQUF1RCxFQURqQyxHQUV2QkgsZ0JBRnVCLEdBR3ZCNUUsT0FBTyxDQUFDK0Usc0JBSGUsQ0FBNUI7O0FBTUEsUUFBTUUsNEJBQTRCLEdBQUcsRUFBckM7QUFDQSxHQUFDLGFBQUQsRUFBZ0IsUUFBaEIsRUFBMEIsb0JBQTFCLEVBQWdELHVCQUFoRCxFQUF5RSxhQUF6RSxFQUF3RmxFLE9BQXhGLENBQWdHbUUsSUFBSSxJQUFJO0FBQ3RHLFFBQUksT0FBT2xGLE9BQU8sQ0FBQ2tGLElBQUQsQ0FBZCxLQUF5QixTQUE3QixFQUF3QztBQUN0Q0Qsa0NBQTRCLENBQUNDLElBQUQsQ0FBNUIsR0FBcUNsRixPQUFPLENBQUNrRixJQUFELENBQTVDO0FBQ0Q7QUFDRixHQUpELEVBMUlvRixDQWdKcEY7QUFDQTs7QUFDQXpFLFFBQU0sQ0FBQzBFLEtBQVAsQ0FBYTVELEdBQWI7QUFDRTZELFVBQU0sRUFBRSxJQURWO0FBQ2dCO0FBQ2RDLGNBQVUsRUFBR3ZDLElBQUksS0FBSztBQUZ4QixLQUlLekQsbUJBSkwsR0FNTW9CLE1BQU0sQ0FBQ3VFLGFBQVAsSUFBd0IsRUFOOUIsR0FRS0MsNEJBUkw7QUFTRUYsMEJBVEY7QUFTMEI7QUFDeEJoQyxpQkFWRixDQVVpQjs7QUFWakIsTUFsSm9GLENBK0pwRjtBQUNBO0FBQ0E7O0FBQ0EsTUFBSXVDLGFBQWEsR0FBRyxFQUFwQjs7QUFDQSxPQUFLLElBQUlKLElBQVQsSUFBaUIzRCxHQUFqQixFQUFzQjtBQUNwQjtBQUNBO0FBQ0EsUUFBSU0sTUFBTSxDQUFDakMsU0FBUCxDQUFpQjJGLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQ2pFLEdBQXJDLEVBQTBDMkQsSUFBMUMsQ0FBSixFQUFxRDtBQUNuREksbUJBQWEsQ0FBQ0osSUFBRCxDQUFiLEdBQXNCM0QsR0FBRyxDQUFDMkQsSUFBRCxDQUF6QjtBQUNEO0FBQ0YsR0F6S21GLENBMktwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxNQUFJekcsTUFBTSxDQUFDK0QsUUFBUCxJQUFtQlcsUUFBbkIsSUFBK0JuRSxRQUFRLENBQUNzQixRQUFELENBQTNDLEVBQXVEO0FBQ3JELFFBQUltRixHQUFHLEdBQUdILGFBQWEsQ0FBQ3ZELElBQWQsSUFBc0IsRUFBaEM7QUFDQXVELGlCQUFhLENBQUN2RCxJQUFkLEdBQXFCOUMsZUFBZSxDQUFDcUIsUUFBRCxDQUFwQztBQUVBLFFBQUksQ0FBQ2dFLGNBQUwsRUFBcUIsT0FBT2dCLGFBQWEsQ0FBQ3ZELElBQWQsQ0FBbUJ5QyxHQUExQjtBQUNyQjNDLFVBQU0sQ0FBQzZELE1BQVAsQ0FBY0osYUFBYSxDQUFDdkQsSUFBNUIsRUFBa0MwRCxHQUFsQztBQUNELEdBekxtRixDQTBMcEY7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLE1BQUloSCxNQUFNLENBQUN3RixRQUFQLElBQW1CLENBQUNULGlCQUF4QixFQUEyQztBQUN6Qy9DLFVBQU0sQ0FBQzBFLEtBQVAsQ0FBYUcsYUFBYixFQUE0QjtBQUMxQi9GLGlCQUFXLEVBQUUsS0FEYTtBQUUxQndGLDRCQUYwQjtBQUcxQnpGLFlBQU0sRUFBRSxLQUhrQjtBQUkxQnlELG1CQUFhLEVBQUUsSUFKVztBQUsxQnNDLGdCQUFVLEVBQUd2QyxJQUFJLEtBQUssUUFMSTtBQU0xQnNDLFlBQU0sRUFBRSxJQU5rQjtBQU1aO0FBQ2Q1Rix3QkFBa0IsRUFBRSxLQVBNO0FBUTFCRSwyQkFBcUIsRUFBRSxLQVJHO0FBUzFCRCxpQkFBVyxFQUFFO0FBVGEsS0FBNUI7QUFXRCxHQTFNbUYsQ0E0TXBGOzs7QUFDQSxNQUFJLENBQUM2RCxnQ0FBRCxJQUFxQ3hFLE9BQU8sQ0FBQ3dHLGFBQUQsQ0FBaEQsRUFBaUU7QUFDL0QsVUFBTSxJQUFJdEQsS0FBSixDQUFVLHVEQUNiYyxJQUFJLEtBQUssUUFBVCxHQUFvQixVQUFwQixHQUFpQyxRQURwQixJQUVkLGVBRkksQ0FBTjtBQUdELEdBak5tRixDQW1OcEY7OztBQUNBLE1BQUk2QyxPQUFKOztBQUNBLE1BQUkzRixPQUFPLENBQUM0RixRQUFSLEtBQXFCLEtBQXpCLEVBQWdDO0FBQzlCRCxXQUFPLEdBQUcsSUFBVjtBQUNELEdBRkQsTUFFTztBQUNMQSxXQUFPLEdBQUc1QixpQkFBaUIsQ0FBQzZCLFFBQWxCLENBQTJCTixhQUEzQixFQUEwQztBQUNsRE8sY0FBUSxFQUFHL0MsSUFBSSxLQUFLLFFBQVQsSUFBcUJBLElBQUksS0FBSyxRQURTO0FBRWxEUyxZQUFNLEVBQUVKLFFBRjBDO0FBR2xEMkMsMkJBQXFCO0FBQ25CakIsZ0JBQVEsRUFBRy9CLElBQUksS0FBSyxRQUREO0FBRW5CZ0MsZ0JBQVEsRUFBR2hDLElBQUksS0FBSyxRQUFULElBQXFCOUMsT0FBTyxDQUFDdUQsTUFBUixLQUFtQixJQUZoQztBQUduQkosZ0JBSG1CO0FBSW5CZCxjQUptQjtBQUtuQlcseUJBTG1CO0FBTW5CeUIsYUFObUI7QUFPbkJqQjtBQVBtQixTQVFmeEQsT0FBTyxDQUFDOEYscUJBQVIsSUFBaUMsRUFSbEI7QUFINkIsS0FBMUMsQ0FBVjtBQWNEOztBQUVELE1BQUlILE9BQUosRUFBYTtBQUNYO0FBQ0EsUUFBSWhCLFFBQUosRUFBYztBQUNacEQsU0FBRyxDQUFDaUQsR0FBSixHQUFVRyxRQUFWO0FBQ0QsS0FKVSxDQU1YO0FBQ0E7OztBQUNBLFFBQUk3QixJQUFJLEtBQUssUUFBYixFQUF1QjtBQUNyQlgsVUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVWixHQUFWO0FBQ0QsS0FGRCxNQUVPO0FBQ0xZLFVBQUksQ0FBQyxDQUFELENBQUosR0FBVVosR0FBVjtBQUNELEtBWlUsQ0FjWDs7O0FBQ0EsUUFBSTlDLE1BQU0sQ0FBQytELFFBQVAsSUFBbUJhLFdBQXZCLEVBQW9DO0FBQ2xDbEIsVUFBSSxDQUFDaUIsSUFBRCxDQUFKLEdBQWEyQywyQ0FBMkMsQ0FBQ2hDLGlCQUFELEVBQW9CNUIsSUFBSSxDQUFDaUIsSUFBRCxDQUF4QixDQUF4RDtBQUNEOztBQUVELFdBQU9qQixJQUFQO0FBQ0QsR0FwQkQsTUFvQk87QUFDTGUsU0FBSyxHQUFHOEMsY0FBYyxDQUFDakMsaUJBQUQsZUFBMEJsQixVQUFVLENBQUNvRCxLQUFyQyxjQUE4Q25ELElBQTlDLEVBQXRCOztBQUNBLFFBQUlHLFFBQUosRUFBYztBQUNaO0FBQ0FBLGNBQVEsQ0FBQ0MsS0FBRCxFQUFRLEtBQVIsQ0FBUjtBQUNELEtBSEQsTUFHTztBQUNMLFlBQU1BLEtBQU47QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBUzhDLGNBQVQsQ0FBd0JFLE9BQXhCLEVBQXVEO0FBQUEsTUFBdEJDLGVBQXNCLHVFQUFKLEVBQUk7QUFDckQsTUFBSUMsT0FBSjtBQUNBLFFBQU1DLFdBQVcsR0FBSSxPQUFPSCxPQUFPLENBQUNJLGdCQUFmLEtBQW9DLFVBQXJDLEdBQW1ESixPQUFPLENBQUNJLGdCQUFSLEVBQW5ELEdBQWdGSixPQUFPLENBQUNHLFdBQVIsRUFBcEc7O0FBQ0EsTUFBSUEsV0FBVyxDQUFDMUYsTUFBaEIsRUFBd0I7QUFDdEIsVUFBTTRGLGFBQWEsR0FBR0YsV0FBVyxDQUFDLENBQUQsQ0FBWCxDQUFlRyxJQUFyQztBQUNBLFVBQU1DLGlCQUFpQixHQUFHUCxPQUFPLENBQUNRLGVBQVIsQ0FBd0JILGFBQXhCLENBQTFCLENBRnNCLENBSXRCO0FBQ0E7O0FBQ0EsUUFBSUEsYUFBYSxDQUFDSSxPQUFkLENBQXNCLEdBQXRCLE1BQStCLENBQUMsQ0FBcEMsRUFBdUM7QUFDckNQLGFBQU8sR0FBR0ssaUJBQVY7QUFDRCxLQUZELE1BRU87QUFDTEwsYUFBTyxhQUFNSyxpQkFBTixlQUE0QkYsYUFBNUIsTUFBUDtBQUNEO0FBQ0YsR0FYRCxNQVdPO0FBQ0xILFdBQU8sR0FBRyxtQkFBVjtBQUNEOztBQUNEQSxTQUFPLEdBQUcsVUFBR0EsT0FBSCxjQUFjRCxlQUFkLEVBQWdDUyxJQUFoQyxFQUFWO0FBQ0EsUUFBTTFELEtBQUssR0FBRyxJQUFJbEIsS0FBSixDQUFVb0UsT0FBVixDQUFkO0FBQ0FsRCxPQUFLLENBQUNtRCxXQUFOLEdBQW9CQSxXQUFwQjtBQUNBbkQsT0FBSyxDQUFDYSxpQkFBTixHQUEwQm1DLE9BQTFCLENBcEJxRCxDQXFCckQ7QUFDQTs7QUFDQSxNQUFJekgsTUFBTSxDQUFDK0QsUUFBWCxFQUFxQjtBQUNuQlUsU0FBSyxDQUFDMkQsY0FBTixHQUF1QixJQUFJcEksTUFBTSxDQUFDdUQsS0FBWCxDQUFpQixHQUFqQixFQUFzQm9FLE9BQXRCLEVBQStCdkgsS0FBSyxDQUFDaUksU0FBTixDQUFnQjVELEtBQUssQ0FBQ21ELFdBQXRCLENBQS9CLENBQXZCO0FBQ0Q7O0FBQ0QsU0FBT25ELEtBQVA7QUFDRDs7QUFFRCxTQUFTNkQsY0FBVCxDQUF3QmIsT0FBeEIsRUFBaUNjLFlBQWpDLEVBQStDO0FBQzdDLE1BQUlSLElBQUksR0FBR1EsWUFBWSxDQUFDQyxLQUFiLENBQW1CLEtBQW5CLEVBQTBCLENBQTFCLEVBQTZCQSxLQUE3QixDQUFtQyxHQUFuQyxFQUF3QyxDQUF4QyxDQUFYO0FBQ0EsTUFBSUMsR0FBRyxHQUFHRixZQUFZLENBQUNDLEtBQWIsQ0FBbUIsVUFBbkIsRUFBK0IsQ0FBL0IsRUFBa0NBLEtBQWxDLENBQXdDLEdBQXhDLEVBQTZDLENBQTdDLENBQVY7QUFFQSxNQUFJRSwyQkFBMkIsR0FBSSxPQUFPakIsT0FBTyxDQUFDa0IsbUJBQWYsS0FBdUMsVUFBeEMsR0FBc0QscUJBQXRELEdBQThFLGdCQUFoSDtBQUNBbEIsU0FBTyxDQUFDaUIsMkJBQUQsQ0FBUCxDQUFxQyxDQUFDO0FBQ3BDWCxRQUFJLEVBQUVBLElBRDhCO0FBRXBDMUQsUUFBSSxFQUFFLFdBRjhCO0FBR3BDdUUsU0FBSyxFQUFFSDtBQUg2QixHQUFELENBQXJDO0FBS0Q7O0FBRUQsU0FBU25CLDJDQUFULENBQXFEaEMsaUJBQXJELEVBQXdFdUQsRUFBeEUsRUFBNEU7QUFDMUUsU0FBTyxTQUFTQyw4Q0FBVCxHQUFpRTtBQUFBLHVDQUFOcEYsSUFBTTtBQUFOQSxVQUFNO0FBQUE7O0FBQ3RFLFVBQU1lLEtBQUssR0FBR2YsSUFBSSxDQUFDLENBQUQsQ0FBbEI7O0FBQ0EsUUFBSWUsS0FBSyxLQUNIQSxLQUFLLENBQUNzRCxJQUFOLEtBQWUsWUFBZixJQUErQnRELEtBQUssQ0FBQ3NFLElBQU4sS0FBZSxLQUEvQyxJQUF5RHRFLEtBQUssQ0FBQ2tELE9BQU4sQ0FBY08sT0FBZCxDQUFzQix5QkFBeUIsQ0FBQyxDQUFoRCxDQURyRCxDQUFMLElBRUF6RCxLQUFLLENBQUNrRCxPQUFOLENBQWNPLE9BQWQsQ0FBc0IsS0FBdEIsTUFBaUMsQ0FBQyxDQUZ0QyxFQUV5QztBQUN2Q0ksb0JBQWMsQ0FBQ2hELGlCQUFELEVBQW9CYixLQUFLLENBQUNrRCxPQUExQixDQUFkO0FBQ0FqRSxVQUFJLENBQUMsQ0FBRCxDQUFKLEdBQVU2RCxjQUFjLENBQUNqQyxpQkFBRCxDQUF4QjtBQUNEOztBQUNELFdBQU91RCxFQUFFLENBQUMxRSxLQUFILENBQVMsSUFBVCxFQUFlVCxJQUFmLENBQVA7QUFDRCxHQVREO0FBVUQ7O0FBRUQsU0FBU2tDLGtDQUFULENBQTRDTixpQkFBNUMsRUFBK0R1RCxFQUEvRCxFQUFtRTtBQUNqRSxNQUFJSCwyQkFBMkIsR0FBSSxPQUFPcEQsaUJBQWlCLENBQUNxRCxtQkFBekIsS0FBaUQsVUFBbEQsR0FBZ0UscUJBQWhFLEdBQXdGLGdCQUExSDtBQUNBLFNBQU8sU0FBU0sscUNBQVQsR0FBd0Q7QUFBQSx1Q0FBTnRGLElBQU07QUFBTkEsVUFBTTtBQUFBOztBQUM3RCxVQUFNZSxLQUFLLEdBQUdmLElBQUksQ0FBQyxDQUFELENBQWxCLENBRDZELENBRTdEOztBQUNBLFFBQUllLEtBQUssWUFBWXpFLE1BQU0sQ0FBQ3VELEtBQXhCLElBQ0FrQixLQUFLLENBQUNBLEtBQU4sS0FBZ0IsR0FEaEIsSUFFQUEsS0FBSyxDQUFDaUIsTUFBTixLQUFpQixTQUZqQixJQUdBLE9BQU9qQixLQUFLLENBQUN3RSxPQUFiLEtBQXlCLFFBSDdCLEVBR3VDO0FBQ3JDLFVBQUlDLHFCQUFxQixHQUFHOUksS0FBSyxDQUFDK0ksS0FBTixDQUFZMUUsS0FBSyxDQUFDd0UsT0FBbEIsQ0FBNUI7QUFDQTNELHVCQUFpQixDQUFDb0QsMkJBQUQsQ0FBakIsQ0FBK0NRLHFCQUEvQztBQUNBeEYsVUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVNkQsY0FBYyxDQUFDakMsaUJBQUQsQ0FBeEI7QUFDRCxLQVBELENBUUE7QUFSQSxTQVNLLElBQUliLEtBQUssWUFBWXpFLE1BQU0sQ0FBQ3VELEtBQXhCLElBQ0FrQixLQUFLLENBQUNBLEtBQU4sS0FBZ0IsR0FEaEIsSUFFQUEsS0FBSyxDQUFDaUIsTUFGTixJQUdBakIsS0FBSyxDQUFDaUIsTUFBTixDQUFhd0MsT0FBYixDQUFxQixRQUFyQixNQUFtQyxDQUFDLENBSHBDLElBSUF6RCxLQUFLLENBQUNpQixNQUFOLENBQWF3QyxPQUFiLENBQXFCLEtBQXJCLE1BQWdDLENBQUMsQ0FKckMsRUFJd0M7QUFDM0NJLHNCQUFjLENBQUNoRCxpQkFBRCxFQUFvQmIsS0FBSyxDQUFDaUIsTUFBMUIsQ0FBZDtBQUNBaEMsWUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVNkQsY0FBYyxDQUFDakMsaUJBQUQsQ0FBeEI7QUFDRDs7QUFDRCxXQUFPdUQsRUFBRSxDQUFDMUUsS0FBSCxDQUFTLElBQVQsRUFBZVQsSUFBZixDQUFQO0FBQ0QsR0FyQkQ7QUFzQkQ7O0FBRUQsSUFBSTBGLGVBQWUsR0FBRyxFQUF0Qjs7QUFDQSxTQUFTekcsWUFBVCxDQUFzQjBHLENBQXRCLEVBQXlCO0FBQ3ZCO0FBQ0E7QUFDQSxNQUFJQyxPQUFPLElBQUlBLE9BQU8sQ0FBQ0MsUUFBbkIsSUFBK0IsQ0FBQ0gsZUFBZSxDQUFDQyxDQUFDLENBQUM3QixLQUFILENBQW5ELEVBQThEO0FBQzVENkIsS0FBQyxDQUFDRyxLQUFGLENBQVE7QUFDTkMsWUFBTSxFQUFFLFlBQVc7QUFDakIsZUFBTyxJQUFQO0FBQ0QsT0FISztBQUlOQyxZQUFNLEVBQUUsWUFBVztBQUNqQixlQUFPLElBQVA7QUFDRCxPQU5LO0FBT05DLFlBQU0sRUFBRSxZQUFZO0FBQ2xCLGVBQU8sSUFBUDtBQUNELE9BVEs7QUFVTkMsV0FBSyxFQUFFLEVBVkQ7QUFXTkMsZUFBUyxFQUFFO0FBWEwsS0FBUjtBQWFBVCxtQkFBZSxDQUFDQyxDQUFDLENBQUM3QixLQUFILENBQWYsR0FBMkIsSUFBM0I7QUFDRCxHQWxCc0IsQ0FtQnZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0Q7O0FBRUQsSUFBSXNDLGNBQWMsR0FBRyxFQUFyQjs7QUFDQSxTQUFTcEgsVUFBVCxDQUFvQjJHLENBQXBCLEVBQXVCOUgsT0FBdkIsRUFBZ0M7QUFDOUIsTUFBSSxDQUFDdUksY0FBYyxDQUFDVCxDQUFDLENBQUM3QixLQUFILENBQW5CLEVBQThCO0FBRTVCLFFBQUl6QyxpQkFBaUIsR0FBSXNFLENBQUMsQ0FBQ3JGLFdBQUYsS0FBa0IsSUFBM0MsQ0FGNEIsQ0FJNUI7QUFDQTtBQUNBOztBQUNBcUYsS0FBQyxDQUFDVSxJQUFGLENBQU87QUFDTE4sWUFBTSxFQUFFLFVBQVM3RixNQUFULEVBQWlCZCxHQUFqQixFQUFzQjtBQUM1QjtBQUNBdUcsU0FBQyxDQUFDeEcsWUFBRixDQUFlQyxHQUFmLEVBQW9CNEQsS0FBcEIsQ0FBMEI1RCxHQUExQixFQUErQjtBQUM3QjZELGdCQUFNLEVBQUUsSUFEcUI7QUFFN0JDLG9CQUFVLEVBQUUsS0FGaUI7QUFHN0I7QUFDQS9GLGdCQUFNLEVBQUUsS0FKcUI7QUFLN0JDLHFCQUFXLEVBQUUsS0FMZ0I7QUFNN0JDLDRCQUFrQixFQUFFLEtBTlM7QUFPN0JDLHFCQUFXLEVBQUUsS0FQZ0I7QUFRN0JzRixnQ0FBc0IsRUFBRTtBQUN0QkYsb0JBQVEsRUFBRSxJQURZO0FBRXRCQyxvQkFBUSxFQUFFLEtBRlk7QUFHdEIzQixvQkFBUSxFQUFFLEtBSFk7QUFJdEJkLGtCQUFNLEVBQUVBLE1BSmM7QUFLdEJXLDZCQUFpQixFQUFFLEtBTEc7QUFNdEJ5QixpQkFBSyxFQUFFbEQsR0FBRyxDQUFDaUQsR0FOVztBQU90QmhCLDZCQUFpQixFQUFFQTtBQVBHO0FBUkssU0FBL0I7QUFtQkEsZUFBTyxLQUFQO0FBQ0QsT0F2Qkk7QUF3QkwyRSxZQUFNLEVBQUUsVUFBUzlGLE1BQVQsRUFBaUJkLEdBQWpCLEVBQXNCa0gsTUFBdEIsRUFBOEI1QyxRQUE5QixFQUF3QztBQUM5QztBQUNBaUMsU0FBQyxDQUFDeEcsWUFBRixDQUFldUUsUUFBZixFQUF5QlYsS0FBekIsQ0FBK0JVLFFBQS9CLEVBQXlDO0FBQ3ZDVCxnQkFBTSxFQUFFLElBRCtCO0FBRXZDQyxvQkFBVSxFQUFFLElBRjJCO0FBR3ZDO0FBQ0EvRixnQkFBTSxFQUFFLEtBSitCO0FBS3ZDQyxxQkFBVyxFQUFFLEtBTDBCO0FBTXZDQyw0QkFBa0IsRUFBRSxLQU5tQjtBQU92Q0MscUJBQVcsRUFBRSxLQVAwQjtBQVF2Q3NGLGdDQUFzQixFQUFFO0FBQ3RCRixvQkFBUSxFQUFFLEtBRFk7QUFFdEJDLG9CQUFRLEVBQUUsSUFGWTtBQUd0QjNCLG9CQUFRLEVBQUUsS0FIWTtBQUl0QmQsa0JBQU0sRUFBRUEsTUFKYztBQUt0QlcsNkJBQWlCLEVBQUUsS0FMRztBQU10QnlCLGlCQUFLLEVBQUVsRCxHQUFHLElBQUlBLEdBQUcsQ0FBQ2lELEdBTkk7QUFPdEJoQiw2QkFBaUIsRUFBRUE7QUFQRztBQVJlLFNBQXpDO0FBbUJBLGVBQU8sS0FBUDtBQUNELE9BOUNJO0FBK0NMNkUsV0FBSyxFQUFFLENBQUMsS0FBRCxDQS9DRjtBQWdETEMsZUFBUyxFQUFFO0FBaEROLEtBQVAsRUFQNEIsQ0EwRDVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQVIsS0FBQyxDQUFDVSxJQUFGO0FBQ0VOLFlBQU0sRUFBRSxVQUFTN0YsTUFBVCxFQUFpQmQsR0FBakIsRUFBc0I7QUFDNUI7QUFDQWdCLGtCQUFVLENBQ1J1RixDQURRLEVBRVIsUUFGUSxFQUdSLENBQ0V2RyxHQURGLEVBRUU7QUFDRTlCLHFCQUFXLEVBQUUsS0FEZjtBQUVFRCw0QkFBa0IsRUFBRSxLQUZ0QjtBQUdFRixnQkFBTSxFQUFFLEtBSFY7QUFJRUMscUJBQVcsRUFBRTtBQUpmLFNBRkYsRUFRRSxVQUFTMkQsS0FBVCxFQUFnQjtBQUNkLGNBQUlBLEtBQUosRUFBVztBQUNULGtCQUFNLElBQUl6RSxNQUFNLENBQUN1RCxLQUFYLENBQWlCLEdBQWpCLEVBQXNCLFNBQXRCLEVBQWlDbkQsS0FBSyxDQUFDaUksU0FBTixDQUFnQjVELEtBQUssQ0FBQ21ELFdBQXRCLENBQWpDLENBQU47QUFDRDtBQUNGLFNBWkgsQ0FIUSxFQWlCUixLQWpCUSxFQWlCRDtBQUNQaEUsY0FsQlEsRUFtQlIsS0FuQlEsQ0FtQkY7QUFuQkUsU0FBVjtBQXNCQSxlQUFPLEtBQVA7QUFDRCxPQTFCSDtBQTJCRThGLFlBQU0sRUFBRSxVQUFTOUYsTUFBVCxFQUFpQmQsR0FBakIsRUFBc0JrSCxNQUF0QixFQUE4QjVDLFFBQTlCLEVBQXdDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBdEQsa0JBQVUsQ0FDUnVGLENBRFEsRUFFUixRQUZRLEVBR1IsQ0FDRTtBQUFDdEQsYUFBRyxFQUFFakQsR0FBRyxJQUFJQSxHQUFHLENBQUNpRDtBQUFqQixTQURGLEVBRUVxQixRQUZGLEVBR0U7QUFDRXBHLHFCQUFXLEVBQUUsS0FEZjtBQUVFRCw0QkFBa0IsRUFBRSxLQUZ0QjtBQUdFRixnQkFBTSxFQUFFLEtBSFY7QUFJRUMscUJBQVcsRUFBRTtBQUpmLFNBSEYsRUFTRSxVQUFTMkQsS0FBVCxFQUFnQjtBQUNkLGNBQUlBLEtBQUosRUFBVztBQUNULGtCQUFNLElBQUl6RSxNQUFNLENBQUN1RCxLQUFYLENBQWlCLEdBQWpCLEVBQXNCLFNBQXRCLEVBQWlDbkQsS0FBSyxDQUFDaUksU0FBTixDQUFnQjVELEtBQUssQ0FBQ21ELFdBQXRCLENBQWpDLENBQU47QUFDRDtBQUNGLFNBYkgsQ0FIUSxFQWtCUixLQWxCUSxFQWtCRDtBQUNQaEUsY0FuQlEsRUFvQlIsS0FwQlEsQ0FvQkY7QUFwQkUsU0FBVjtBQXVCQSxlQUFPLEtBQVA7QUFDRCxPQXZESDtBQXdERWdHLFdBQUssRUFBRSxDQUFDLEtBQUQ7QUF4RFQsT0F5RE1ySSxPQUFPLENBQUNzSSxTQUFSLEtBQXNCLElBQXRCLEdBQTZCLEVBQTdCLEdBQWtDO0FBQUNBLGVBQVMsRUFBRTtBQUFaLEtBekR4QyxHQWhFNEIsQ0E0SDVCO0FBQ0E7O0FBQ0FDLGtCQUFjLENBQUNULENBQUMsQ0FBQzdCLEtBQUgsQ0FBZCxHQUEwQixJQUExQjtBQUNEO0FBQ0Y7O0FBRUQsU0FBU3pGLFlBQVQsQ0FBc0JrSSxFQUF0QixFQUEwQkMsRUFBMUIsRUFBOEI7QUFDNUIsTUFBSUEsRUFBRSxDQUFDQyxPQUFILElBQWMsQ0FBbEIsRUFBcUI7QUFDbkIsVUFBTTdJLEVBQUUsR0FBRyxJQUFJYixZQUFKLENBQWlCd0osRUFBakIsQ0FBWDtBQUNBM0ksTUFBRSxDQUFDOEksTUFBSCxDQUFVRixFQUFWO0FBQ0EsV0FBTzVJLEVBQVA7QUFDRCxHQUpELE1BSU87QUFDTCxXQUFPLElBQUliLFlBQUosQ0FBaUIsQ0FBRXdKLEVBQUYsRUFBTUMsRUFBTixDQUFqQixDQUFQO0FBQ0Q7QUFDRjs7QUEvdEJEdkssTUFBTSxDQUFDMEssYUFBUCxDQWl1QmUxSixXQWp1QmYsRTs7Ozs7Ozs7Ozs7QUNBQWhCLE1BQU0sQ0FBQzJLLE1BQVAsQ0FBYztBQUFDOUosaUJBQWUsRUFBQyxNQUFJQTtBQUFyQixDQUFkOztBQUFPLFNBQVNBLGVBQVQsQ0FBeUJxQixRQUF6QixFQUFtQztBQUN4QztBQUNBLE1BQUlvRCxLQUFLLENBQUNDLE9BQU4sQ0FBY3JELFFBQVEsQ0FBQzBJLElBQXZCLENBQUosRUFBa0M7QUFDaEMxSSxZQUFRLENBQUMwSSxJQUFULENBQWNqSSxPQUFkLENBQXNCa0ksR0FBRyxJQUFJO0FBQzNCcEgsWUFBTSxDQUFDNkQsTUFBUCxDQUFjcEYsUUFBZCxFQUF3QnJCLGVBQWUsQ0FBQ2dLLEdBQUQsQ0FBdkM7QUFDRCxLQUZEO0FBSUEsV0FBTzNJLFFBQVEsQ0FBQzBJLElBQWhCO0FBQ0Q7O0FBRUQsUUFBTTdJLEdBQUcsR0FBRyxFQUFaO0FBRUEwQixRQUFNLENBQUNxSCxPQUFQLENBQWU1SSxRQUFmLEVBQXlCUyxPQUF6QixDQUFpQyxVQUFrQjtBQUFBLFFBQWpCLENBQUNvSSxHQUFELEVBQU05QixLQUFOLENBQWlCOztBQUNqRDtBQUNBLFFBQUksQ0FBQzhCLEdBQUcsQ0FBQ0MsVUFBSixDQUFlLEdBQWYsQ0FBTCxFQUEwQjtBQUN4QixVQUFJLE9BQU8vQixLQUFQLEtBQWlCLFFBQWpCLElBQTZCQSxLQUFLLEtBQUssSUFBM0MsRUFBaUQ7QUFDL0MsWUFBSUEsS0FBSyxDQUFDZ0MsR0FBTixLQUFjdkksU0FBbEIsRUFBNkI7QUFDM0JYLGFBQUcsQ0FBQ2dKLEdBQUQsQ0FBSCxHQUFXOUIsS0FBSyxDQUFDZ0MsR0FBakI7QUFDRCxTQUZELE1BRU8sSUFBSTNGLEtBQUssQ0FBQ0MsT0FBTixDQUFjMEQsS0FBSyxDQUFDaUMsR0FBcEIsS0FBNEJqQyxLQUFLLENBQUNpQyxHQUFOLENBQVUzSSxNQUFWLEtBQXFCLENBQXJELEVBQXdEO0FBQzdEUixhQUFHLENBQUNnSixHQUFELENBQUgsR0FBVzlCLEtBQUssQ0FBQ2lDLEdBQU4sQ0FBVSxDQUFWLENBQVg7QUFDRCxTQUZNLE1BRUEsSUFBSXpILE1BQU0sQ0FBQ0MsSUFBUCxDQUFZdUYsS0FBWixFQUFtQmtDLEtBQW5CLENBQXlCaEwsQ0FBQyxJQUFJLEVBQUUsT0FBT0EsQ0FBUCxLQUFhLFFBQWIsSUFBeUJBLENBQUMsQ0FBQzZLLFVBQUYsQ0FBYSxHQUFiLENBQTNCLENBQTlCLENBQUosRUFBa0Y7QUFDdkZqSixhQUFHLENBQUNnSixHQUFELENBQUgsR0FBVzlCLEtBQVg7QUFDRDtBQUNGLE9BUkQsTUFRTztBQUNMbEgsV0FBRyxDQUFDZ0osR0FBRCxDQUFILEdBQVc5QixLQUFYO0FBQ0Q7QUFDRjtBQUNGLEdBZkQ7QUFpQkEsU0FBT2xILEdBQVA7QUFDRCxDIiwiZmlsZSI6Ii9wYWNrYWdlcy9hbGRlZWRfY29sbGVjdGlvbjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdtZXRlb3IvcmFpeDpldmVudGVtaXR0ZXInO1xuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5pbXBvcnQgeyBjaGVja05wbVZlcnNpb25zIH0gZnJvbSAnbWV0ZW9yL3RtZWFzZGF5OmNoZWNrLW5wbS12ZXJzaW9ucyc7XG5pbXBvcnQgY2xvbmUgZnJvbSAnY2xvbmUnO1xuaW1wb3J0IHsgRUpTT04gfSBmcm9tICdtZXRlb3IvZWpzb24nO1xuaW1wb3J0IGlzRW1wdHkgZnJvbSAnbG9kYXNoLmlzZW1wdHknO1xuaW1wb3J0IGlzRXF1YWwgZnJvbSAnbG9kYXNoLmlzZXF1YWwnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC5pc29iamVjdCc7XG5pbXBvcnQgeyBmbGF0dGVuU2VsZWN0b3IgfSBmcm9tICcuL2xpYic7XG5cbmNoZWNrTnBtVmVyc2lvbnMoeyAnc2ltcGwtc2NoZW1hJzogJz49MC4wLjAnIH0sICdhbGRlZWQ6Y29sbGVjdGlvbjInKTtcblxuY29uc3QgU2ltcGxlU2NoZW1hID0gcmVxdWlyZSgnc2ltcGwtc2NoZW1hJykuZGVmYXVsdDtcblxuLy8gRXhwb3J0ZWQgb25seSBmb3IgbGlzdGVuaW5nIHRvIGV2ZW50c1xuY29uc3QgQ29sbGVjdGlvbjIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbmNvbnN0IGRlZmF1bHRDbGVhbk9wdGlvbnMgPSB7XG4gIGZpbHRlcjogdHJ1ZSxcbiAgYXV0b0NvbnZlcnQ6IHRydWUsXG4gIHJlbW92ZUVtcHR5U3RyaW5nczogdHJ1ZSxcbiAgdHJpbVN0cmluZ3M6IHRydWUsXG4gIHJlbW92ZU51bGxzRnJvbUFycmF5czogZmFsc2UsXG59O1xuXG4vKipcbiAqIE1vbmdvLkNvbGxlY3Rpb24ucHJvdG90eXBlLmF0dGFjaFNjaGVtYVxuICogQHBhcmFtIHtTaW1wbGVTY2hlbWF8T2JqZWN0fSBzcyAtIFNpbXBsZVNjaGVtYSBpbnN0YW5jZSBvciBhIHNjaGVtYSBkZWZpbml0aW9uIG9iamVjdFxuICogICAgZnJvbSB3aGljaCB0byBjcmVhdGUgYSBuZXcgU2ltcGxlU2NoZW1hIGluc3RhbmNlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnRyYW5zZm9ybT1mYWxzZV0gU2V0IHRvIGB0cnVlYCBpZiB5b3VyIGRvY3VtZW50IG11c3QgYmUgcGFzc2VkXG4gKiAgICB0aHJvdWdoIHRoZSBjb2xsZWN0aW9uJ3MgdHJhbnNmb3JtIHRvIHByb3Blcmx5IHZhbGlkYXRlLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5yZXBsYWNlPWZhbHNlXSBTZXQgdG8gYHRydWVgIHRvIHJlcGxhY2UgYW55IGV4aXN0aW5nIHNjaGVtYSBpbnN0ZWFkIG9mIGNvbWJpbmluZ1xuICogQHJldHVybiB7dW5kZWZpbmVkfVxuICpcbiAqIFVzZSB0aGlzIG1ldGhvZCB0byBhdHRhY2ggYSBzY2hlbWEgdG8gYSBjb2xsZWN0aW9uIGNyZWF0ZWQgYnkgYW5vdGhlciBwYWNrYWdlLFxuICogc3VjaCBhcyBNZXRlb3IudXNlcnMuIEl0IGlzIG1vc3QgbGlrZWx5IHVuc2FmZSB0byBjYWxsIHRoaXMgbWV0aG9kIG1vcmUgdGhhblxuICogb25jZSBmb3IgYSBzaW5nbGUgY29sbGVjdGlvbiwgb3IgdG8gY2FsbCB0aGlzIGZvciBhIGNvbGxlY3Rpb24gdGhhdCBoYWQgYVxuICogc2NoZW1hIG9iamVjdCBwYXNzZWQgdG8gaXRzIGNvbnN0cnVjdG9yLlxuICovXG5Nb25nby5Db2xsZWN0aW9uLnByb3RvdHlwZS5hdHRhY2hTY2hlbWEgPSBmdW5jdGlvbiBjMkF0dGFjaFNjaGVtYShzcywgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAvLyBBbGxvdyBwYXNzaW5nIGp1c3QgdGhlIHNjaGVtYSBvYmplY3RcbiAgaWYgKCFTaW1wbGVTY2hlbWEuaXNTaW1wbGVTY2hlbWEoc3MpKSB7XG4gICAgc3MgPSBuZXcgU2ltcGxlU2NoZW1hKHNzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGF0dGFjaFRvKG9iaikge1xuICAgIC8vIHdlIG5lZWQgYW4gYXJyYXkgdG8gaG9sZCBtdWx0aXBsZSBzY2hlbWFzXG4gICAgLy8gcG9zaXRpb24gMCBpcyByZXNlcnZlZCBmb3IgdGhlIFwiYmFzZVwiIHNjaGVtYVxuICAgIG9iai5fYzIgPSBvYmouX2MyIHx8IHt9O1xuICAgIG9iai5fYzIuX3NpbXBsZVNjaGVtYXMgPSBvYmouX2MyLl9zaW1wbGVTY2hlbWFzIHx8IFsgbnVsbCBdO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnNlbGVjdG9yID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAvLyBTZWxlY3RvciBTY2hlbWFzXG5cbiAgICAgIC8vIEV4dGVuZCBzZWxlY3RvciBzY2hlbWEgd2l0aCBiYXNlIHNjaGVtYVxuICAgICAgdmFyIGJhc2VTY2hlbWEgPSBvYmouX2MyLl9zaW1wbGVTY2hlbWFzWzBdO1xuICAgICAgaWYgKGJhc2VTY2hlbWEpIHtcbiAgICAgICAgc3MgPSBleHRlbmRTY2hlbWEoYmFzZVNjaGVtYS5zY2hlbWEsIHNzKTtcbiAgICAgIH1cblxuICAgICAgLy8gSW5kZXggb2YgZXhpc3Rpbmcgc2NoZW1hIHdpdGggaWRlbnRpY2FsIHNlbGVjdG9yXG4gICAgICB2YXIgc2NoZW1hSW5kZXg7XG5cbiAgICAgIC8vIExvb3AgdGhyb3VnaCBleGlzdGluZyBzY2hlbWFzIHdpdGggc2VsZWN0b3JzLFxuICAgICAgZm9yIChzY2hlbWFJbmRleCA9IG9iai5fYzIuX3NpbXBsZVNjaGVtYXMubGVuZ3RoIC0gMTsgMCA8IHNjaGVtYUluZGV4OyBzY2hlbWFJbmRleC0tKSB7XG4gICAgICAgIHZhciBzY2hlbWEgPSBvYmouX2MyLl9zaW1wbGVTY2hlbWFzW3NjaGVtYUluZGV4XTtcbiAgICAgICAgaWYgKHNjaGVtYSAmJiBpc0VxdWFsKHNjaGVtYS5zZWxlY3Rvciwgb3B0aW9ucy5zZWxlY3RvcikpIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2NoZW1hSW5kZXggPD0gMCkge1xuICAgICAgICAvLyBXZSBkaWRuJ3QgZmluZCB0aGUgc2NoZW1hIGluIG91ciBhcnJheSAtIHB1c2ggaXQgaW50byB0aGUgYXJyYXlcbiAgICAgICAgb2JqLl9jMi5fc2ltcGxlU2NoZW1hcy5wdXNoKHtcbiAgICAgICAgICBzY2hlbWE6IHNzLFxuICAgICAgICAgIHNlbGVjdG9yOiBvcHRpb25zLnNlbGVjdG9yLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdlIGZvdW5kIGEgc2NoZW1hIHdpdGggYW4gaWRlbnRpY2FsIHNlbGVjdG9yIGluIG91ciBhcnJheSxcbiAgICAgICAgaWYgKG9wdGlvbnMucmVwbGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIFJlcGxhY2UgZXhpc3Rpbmcgc2VsZWN0b3Igc2NoZW1hIHdpdGggbmV3IHNlbGVjdG9yIHNjaGVtYVxuICAgICAgICAgIG9iai5fYzIuX3NpbXBsZVNjaGVtYXNbc2NoZW1hSW5kZXhdLnNjaGVtYSA9IHNzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEV4dGVuZCBleGlzdGluZyBzZWxlY3RvciBzY2hlbWEgd2l0aCBuZXcgc2VsZWN0b3Igc2NoZW1hLlxuICAgICAgICAgIG9iai5fYzIuX3NpbXBsZVNjaGVtYXNbc2NoZW1hSW5kZXhdLnNjaGVtYSA9IGV4dGVuZFNjaGVtYShvYmouX2MyLl9zaW1wbGVTY2hlbWFzW3NjaGVtYUluZGV4XS5zY2hlbWEsIHNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBCYXNlIFNjaGVtYVxuICAgICAgaWYgKG9wdGlvbnMucmVwbGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBSZXBsYWNlIGJhc2Ugc2NoZW1hIGFuZCBkZWxldGUgYWxsIG90aGVyIHNjaGVtYXNcbiAgICAgICAgb2JqLl9jMi5fc2ltcGxlU2NoZW1hcyA9IFt7XG4gICAgICAgICAgc2NoZW1hOiBzcyxcbiAgICAgICAgICBzZWxlY3Rvcjogb3B0aW9ucy5zZWxlY3RvcixcbiAgICAgICAgfV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTZXQgYmFzZSBzY2hlbWEgaWYgbm90IHlldCBzZXRcbiAgICAgICAgaWYgKCFvYmouX2MyLl9zaW1wbGVTY2hlbWFzWzBdKSB7XG4gICAgICAgICAgcmV0dXJuIG9iai5fYzIuX3NpbXBsZVNjaGVtYXNbMF0gPSB7IHNjaGVtYTogc3MsIHNlbGVjdG9yOiB1bmRlZmluZWQgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBFeHRlbmQgYmFzZSBzY2hlbWEgYW5kIHRoZXJlZm9yZSBleHRlbmQgYWxsIHNjaGVtYXNcbiAgICAgICAgb2JqLl9jMi5fc2ltcGxlU2NoZW1hcy5mb3JFYWNoKChzY2hlbWEsIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKG9iai5fYzIuX3NpbXBsZVNjaGVtYXNbaW5kZXhdKSB7XG4gICAgICAgICAgICBvYmouX2MyLl9zaW1wbGVTY2hlbWFzW2luZGV4XS5zY2hlbWEgPSBleHRlbmRTY2hlbWEob2JqLl9jMi5fc2ltcGxlU2NoZW1hc1tpbmRleF0uc2NoZW1hLCBzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhdHRhY2hUbyh0aGlzKTtcbiAgLy8gQXR0YWNoIHRoZSBzY2hlbWEgdG8gdGhlIHVuZGVybHlpbmcgTG9jYWxDb2xsZWN0aW9uLCB0b29cbiAgaWYgKHRoaXMuX2NvbGxlY3Rpb24gaW5zdGFuY2VvZiBMb2NhbENvbGxlY3Rpb24pIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uLl9jMiA9IHRoaXMuX2NvbGxlY3Rpb24uX2MyIHx8IHt9O1xuICAgIGF0dGFjaFRvKHRoaXMuX2NvbGxlY3Rpb24pO1xuICB9XG5cbiAgZGVmaW5lRGVueSh0aGlzLCBvcHRpb25zKTtcbiAga2VlcEluc2VjdXJlKHRoaXMpO1xuXG4gIENvbGxlY3Rpb24yLmVtaXQoJ3NjaGVtYS5hdHRhY2hlZCcsIHRoaXMsIHNzLCBvcHRpb25zKTtcbn07XG5cbltNb25nby5Db2xsZWN0aW9uLCBMb2NhbENvbGxlY3Rpb25dLmZvckVhY2goKG9iaikgPT4ge1xuICAvKipcbiAgICogc2ltcGxlU2NoZW1hXG4gICAqIEBkZXNjcmlwdGlvbiBmdW5jdGlvbiBkZXRlY3QgdGhlIGNvcnJlY3Qgc2NoZW1hIGJ5IGdpdmVuIHBhcmFtcy4gSWYgaXRcbiAgICogZGV0ZWN0IG11bHRpLXNjaGVtYSBwcmVzZW5jZSBpbiB0aGUgY29sbGVjdGlvbiwgdGhlbiBpdCBtYWRlIGFuIGF0dGVtcHQgdG8gZmluZCBhXG4gICAqIGBzZWxlY3RvcmAgaW4gYXJnc1xuICAgKiBAcGFyYW0ge09iamVjdH0gZG9jIC0gSXQgY291bGQgYmUgPHVwZGF0ZT4gb24gdXBkYXRlL3Vwc2VydCBvciBkb2N1bWVudFxuICAgKiBpdHNlbGYgb24gaW5zZXJ0L3JlbW92ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gSXQgY291bGQgYmUgPHVwZGF0ZT4gb24gdXBkYXRlL3Vwc2VydCBldGNcbiAgICogQHBhcmFtIHtPYmplY3R9IFtxdWVyeV0gLSBpdCBjb3VsZCBiZSA8cXVlcnk+IG9uIHVwZGF0ZS91cHNlcnRcbiAgICogQHJldHVybiB7T2JqZWN0fSBTY2hlbWFcbiAgICovXG4gIG9iai5wcm90b3R5cGUuc2ltcGxlU2NoZW1hID0gZnVuY3Rpb24gKGRvYywgb3B0aW9ucywgcXVlcnkpIHtcbiAgICBpZiAoIXRoaXMuX2MyKSByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5fYzIuX3NpbXBsZVNjaGVtYSkgcmV0dXJuIHRoaXMuX2MyLl9zaW1wbGVTY2hlbWE7XG5cbiAgICB2YXIgc2NoZW1hcyA9IHRoaXMuX2MyLl9zaW1wbGVTY2hlbWFzO1xuICAgIGlmIChzY2hlbWFzICYmIHNjaGVtYXMubGVuZ3RoID4gMCkge1xuXG4gICAgICB2YXIgc2NoZW1hLCBzZWxlY3RvciwgdGFyZ2V0O1xuICAgICAgLy8gUG9zaXRpb24gMCByZXNlcnZlZCBmb3IgYmFzZSBzY2hlbWFcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2NoZW1hcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzY2hlbWEgPSBzY2hlbWFzW2ldO1xuICAgICAgICBzZWxlY3RvciA9IE9iamVjdC5rZXlzKHNjaGVtYS5zZWxlY3RvcilbMF07XG5cbiAgICAgICAgLy8gV2Ugd2lsbCBzZXQgdGhpcyB0byB1bmRlZmluZWQgYmVjYXVzZSBpbiB0aGVvcnkgeW91IG1pZ2h0IHdhbnQgdG8gc2VsZWN0XG4gICAgICAgIC8vIG9uIGEgbnVsbCB2YWx1ZS5cbiAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBoZXJlIHdlIGFyZSBsb29raW5nIGZvciBzZWxlY3RvciBpbiBkaWZmZXJlbnQgcGxhY2VzXG4gICAgICAgIC8vICRzZXQgc2hvdWxkIGhhdmUgbW9yZSBwcmlvcml0eSBoZXJlXG4gICAgICAgIGlmIChkb2MuJHNldCAmJiB0eXBlb2YgZG9jLiRzZXRbc2VsZWN0b3JdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRhcmdldCA9IGRvYy4kc2V0W3NlbGVjdG9yXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jW3NlbGVjdG9yXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0YXJnZXQgPSBkb2Nbc2VsZWN0b3JdO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zZWxlY3Rvcikge1xuICAgICAgICAgIHRhcmdldCA9IG9wdGlvbnMuc2VsZWN0b3Jbc2VsZWN0b3JdO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXJ5ICYmIHF1ZXJ5W3NlbGVjdG9yXSkgeyAvLyBvbiB1cHNlcnQvdXBkYXRlIG9wZXJhdGlvbnNcbiAgICAgICAgICB0YXJnZXQgPSBxdWVyeVtzZWxlY3Rvcl07XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZSBuZWVkIHRvIGNvbXBhcmUgZ2l2ZW4gc2VsZWN0b3Igd2l0aCBkb2MgcHJvcGVydHkgb3Igb3B0aW9uIHRvXG4gICAgICAgIC8vIGZpbmQgcmlnaHQgc2NoZW1hXG4gICAgICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCAmJiB0YXJnZXQgPT09IHNjaGVtYS5zZWxlY3RvcltzZWxlY3Rvcl0pIHtcbiAgICAgICAgICByZXR1cm4gc2NoZW1hLnNjaGVtYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNjaGVtYXNbMF0pIHtcbiAgICAgICAgcmV0dXJuIHNjaGVtYXNbMF0uc2NoZW1hO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZGVmYXVsdCBzY2hlbWFcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG59KTtcblxuLy8gV3JhcCBEQiB3cml0ZSBvcGVyYXRpb24gbWV0aG9kc1xuWydpbnNlcnQnLCAndXBkYXRlJ10uZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuICBjb25zdCBfc3VwZXIgPSBNb25nby5Db2xsZWN0aW9uLnByb3RvdHlwZVttZXRob2ROYW1lXTtcbiAgTW9uZ28uQ29sbGVjdGlvbi5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgbGV0IG9wdGlvbnMgPSAobWV0aG9kTmFtZSA9PT0gXCJpbnNlcnRcIikgPyBhcmdzWzFdIDogYXJnc1syXTtcblxuICAgIC8vIFN1cHBvcnQgbWlzc2luZyBvcHRpb25zIGFyZ1xuICAgIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2MyICYmIG9wdGlvbnMuYnlwYXNzQ29sbGVjdGlvbjIgIT09IHRydWUpIHtcbiAgICAgIHZhciB1c2VySWQgPSBudWxsO1xuICAgICAgdHJ5IHsgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FsZGVlZC9tZXRlb3ItY29sbGVjdGlvbjIvaXNzdWVzLzE3NVxuICAgICAgICB1c2VySWQgPSBNZXRlb3IudXNlcklkKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHt9XG5cbiAgICAgIGFyZ3MgPSBkb1ZhbGlkYXRlKFxuICAgICAgICB0aGlzLFxuICAgICAgICBtZXRob2ROYW1lLFxuICAgICAgICBhcmdzLFxuICAgICAgICBNZXRlb3IuaXNTZXJ2ZXIgfHwgdGhpcy5fY29ubmVjdGlvbiA9PT0gbnVsbCwgLy8gZ2V0QXV0b1ZhbHVlc1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIE1ldGVvci5pc1NlcnZlciAvLyBpc0Zyb21UcnVzdGVkQ29kZVxuICAgICAgKTtcbiAgICAgIGlmICghYXJncykge1xuICAgICAgICAvLyBkb1ZhbGlkYXRlIGFscmVhZHkgY2FsbGVkIHRoZSBjYWxsYmFjayBvciB0aHJldyB0aGUgZXJyb3Igc28gd2UncmUgZG9uZS5cbiAgICAgICAgLy8gQnV0IGluc2VydCBzaG91bGQgYWx3YXlzIHJldHVybiBhbiBJRCB0byBtYXRjaCBjb3JlIGJlaGF2aW9yLlxuICAgICAgICByZXR1cm4gbWV0aG9kTmFtZSA9PT0gXCJpbnNlcnRcIiA/IHRoaXMuX21ha2VOZXdJRCgpIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBzdGlsbCBuZWVkIHRvIGFkanVzdCBhcmdzIGJlY2F1c2UgaW5zZXJ0IGRvZXMgbm90IHRha2Ugb3B0aW9uc1xuICAgICAgaWYgKG1ldGhvZE5hbWUgPT09IFwiaW5zZXJ0XCIgJiYgdHlwZW9mIGFyZ3NbMV0gIT09ICdmdW5jdGlvbicpIGFyZ3Muc3BsaWNlKDEsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBfc3VwZXIuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG59KTtcblxuLypcbiAqIFByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBkb1ZhbGlkYXRlKGNvbGxlY3Rpb24sIHR5cGUsIGFyZ3MsIGdldEF1dG9WYWx1ZXMsIHVzZXJJZCwgaXNGcm9tVHJ1c3RlZENvZGUpIHtcbiAgdmFyIGRvYywgY2FsbGJhY2ssIGVycm9yLCBvcHRpb25zLCBpc1Vwc2VydCwgc2VsZWN0b3IsIGxhc3QsIGhhc0NhbGxiYWNrO1xuXG4gIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IodHlwZSArIFwiIHJlcXVpcmVzIGFuIGFyZ3VtZW50XCIpO1xuICB9XG5cbiAgLy8gR2F0aGVyIGFyZ3VtZW50cyBhbmQgY2FjaGUgdGhlIHNlbGVjdG9yXG4gIGlmICh0eXBlID09PSBcImluc2VydFwiKSB7XG4gICAgZG9jID0gYXJnc1swXTtcbiAgICBvcHRpb25zID0gYXJnc1sxXTtcbiAgICBjYWxsYmFjayA9IGFyZ3NbMl07XG5cbiAgICAvLyBUaGUgcmVhbCBpbnNlcnQgZG9lc24ndCB0YWtlIG9wdGlvbnNcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgYXJncyA9IFtkb2MsIG9wdGlvbnNdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGFyZ3MgPSBbZG9jLCBjYWxsYmFja107XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZ3MgPSBbZG9jXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ1cGRhdGVcIikge1xuICAgIHNlbGVjdG9yID0gYXJnc1swXTtcbiAgICBkb2MgPSBhcmdzWzFdO1xuICAgIG9wdGlvbnMgPSBhcmdzWzJdO1xuICAgIGNhbGxiYWNrID0gYXJnc1szXTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHR5cGUgYXJndW1lbnRcIik7XG4gIH1cblxuICB2YXIgdmFsaWRhdGVkT2JqZWN0V2FzSW5pdGlhbGx5RW1wdHkgPSBpc0VtcHR5KGRvYyk7XG5cbiAgLy8gU3VwcG9ydCBtaXNzaW5nIG9wdGlvbnMgYXJnXG4gIGlmICghY2FsbGJhY2sgJiYgdHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgbGFzdCA9IGFyZ3MubGVuZ3RoIC0gMTtcblxuICBoYXNDYWxsYmFjayA9ICh0eXBlb2YgYXJnc1tsYXN0XSA9PT0gJ2Z1bmN0aW9uJyk7XG5cbiAgLy8gSWYgdXBkYXRlIHdhcyBjYWxsZWQgd2l0aCB1cHNlcnQ6dHJ1ZSwgZmxhZyBhcyBhbiB1cHNlcnRcbiAgaXNVcHNlcnQgPSAodHlwZSA9PT0gXCJ1cGRhdGVcIiAmJiBvcHRpb25zLnVwc2VydCA9PT0gdHJ1ZSk7XG5cbiAgLy8gd2UgbmVlZCB0byBwYXNzIGBkb2NgIGFuZCBgb3B0aW9uc2AgdG8gYHNpbXBsZVNjaGVtYWAgbWV0aG9kLCB0aGF0J3Mgd2h5XG4gIC8vIHNjaGVtYSBkZWNsYXJhdGlvbiBtb3ZlZCBoZXJlXG4gIHZhciBzY2hlbWEgPSBjb2xsZWN0aW9uLnNpbXBsZVNjaGVtYShkb2MsIG9wdGlvbnMsIHNlbGVjdG9yKTtcbiAgdmFyIGlzTG9jYWxDb2xsZWN0aW9uID0gKGNvbGxlY3Rpb24uX2Nvbm5lY3Rpb24gPT09IG51bGwpO1xuXG4gIC8vIE9uIHRoZSBzZXJ2ZXIgYW5kIGZvciBsb2NhbCBjb2xsZWN0aW9ucywgd2UgYWxsb3cgcGFzc2luZyBgZ2V0QXV0b1ZhbHVlczogZmFsc2VgIHRvIGRpc2FibGUgYXV0b1ZhbHVlIGZ1bmN0aW9uc1xuICBpZiAoKE1ldGVvci5pc1NlcnZlciB8fCBpc0xvY2FsQ29sbGVjdGlvbikgJiYgb3B0aW9ucy5nZXRBdXRvVmFsdWVzID09PSBmYWxzZSkge1xuICAgIGdldEF1dG9WYWx1ZXMgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIFByb2Nlc3MgcGljay9vbWl0IG9wdGlvbnMgaWYgdGhleSBhcmUgcHJlc2VudFxuICB2YXIgcGlja3MgPSBBcnJheS5pc0FycmF5KG9wdGlvbnMucGljaykgPyBvcHRpb25zLnBpY2sgOiBudWxsO1xuICB2YXIgb21pdHMgPSBBcnJheS5pc0FycmF5KG9wdGlvbnMub21pdCkgPyBvcHRpb25zLm9taXQgOiBudWxsO1xuXG4gIGlmIChwaWNrcyAmJiBvbWl0cykge1xuICAgIC8vIFBpY2sgYW5kIG9taXQgY2Fubm90IGJvdGggYmUgcHJlc2VudCBpbiB0aGUgb3B0aW9uc1xuICAgIHRocm93IG5ldyBFcnJvcigncGljayBhbmQgb21pdCBvcHRpb25zIGFyZSBtdXR1YWxseSBleGNsdXNpdmUnKTtcbiAgfSBlbHNlIGlmIChwaWNrcykge1xuICAgIHNjaGVtYSA9IHNjaGVtYS5waWNrKC4uLnBpY2tzKTtcbiAgfSBlbHNlIGlmIChvbWl0cykge1xuICAgIHNjaGVtYSA9IHNjaGVtYS5vbWl0KC4uLm9taXRzKTtcbiAgfVxuXG4gIC8vIERldGVybWluZSB2YWxpZGF0aW9uIGNvbnRleHRcbiAgdmFyIHZhbGlkYXRpb25Db250ZXh0ID0gb3B0aW9ucy52YWxpZGF0aW9uQ29udGV4dDtcbiAgaWYgKHZhbGlkYXRpb25Db250ZXh0KSB7XG4gICAgaWYgKHR5cGVvZiB2YWxpZGF0aW9uQ29udGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbGlkYXRpb25Db250ZXh0ID0gc2NoZW1hLm5hbWVkQ29udGV4dCh2YWxpZGF0aW9uQ29udGV4dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhbGlkYXRpb25Db250ZXh0ID0gc2NoZW1hLm5hbWVkQ29udGV4dCgpO1xuICB9XG5cbiAgLy8gQWRkIGEgZGVmYXVsdCBjYWxsYmFjayBmdW5jdGlvbiBpZiB3ZSdyZSBvbiB0aGUgY2xpZW50IGFuZCBubyBjYWxsYmFjayB3YXMgZ2l2ZW5cbiAgaWYgKE1ldGVvci5pc0NsaWVudCAmJiAhY2FsbGJhY2spIHtcbiAgICAvLyBDbGllbnQgY2FuJ3QgYmxvY2ssIHNvIGl0IGNhbid0IHJlcG9ydCBlcnJvcnMgYnkgZXhjZXB0aW9uLFxuICAgIC8vIG9ubHkgYnkgY2FsbGJhY2suIElmIHRoZXkgZm9yZ2V0IHRoZSBjYWxsYmFjaywgZ2l2ZSB0aGVtIGFcbiAgICAvLyBkZWZhdWx0IG9uZSB0aGF0IGxvZ3MgdGhlIGVycm9yLCBzbyB0aGV5IGFyZW4ndCB0b3RhbGx5XG4gICAgLy8gYmFmZmxlZCBpZiB0aGVpciB3cml0ZXMgZG9uJ3Qgd29yayBiZWNhdXNlIHRoZWlyIGRhdGFiYXNlIGlzXG4gICAgLy8gZG93bi5cbiAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBNZXRlb3IuX2RlYnVnKHR5cGUgKyBcIiBmYWlsZWQ6IFwiICsgKGVyci5yZWFzb24gfHwgZXJyLnN0YWNrKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIElmIGNsaWVudCB2YWxpZGF0aW9uIGlzIGZpbmUgb3IgaXMgc2tpcHBlZCBidXQgdGhlbiBzb21ldGhpbmdcbiAgLy8gaXMgZm91bmQgdG8gYmUgaW52YWxpZCBvbiB0aGUgc2VydmVyLCB3ZSBnZXQgdGhhdCBlcnJvciBiYWNrXG4gIC8vIGFzIGEgc3BlY2lhbCBNZXRlb3IuRXJyb3IgdGhhdCB3ZSBuZWVkIHRvIHBhcnNlLlxuICBpZiAoTWV0ZW9yLmlzQ2xpZW50ICYmIGhhc0NhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sgPSBhcmdzW2xhc3RdID0gd3JhcENhbGxiYWNrRm9yUGFyc2luZ1NlcnZlckVycm9ycyh2YWxpZGF0aW9uQ29udGV4dCwgY2FsbGJhY2spO1xuICB9XG5cbiAgdmFyIHNjaGVtYUFsbG93c0lkID0gc2NoZW1hLmFsbG93c0tleShcIl9pZFwiKTtcbiAgaWYgKHR5cGUgPT09IFwiaW5zZXJ0XCIgJiYgIWRvYy5faWQgJiYgc2NoZW1hQWxsb3dzSWQpIHtcbiAgICBkb2MuX2lkID0gY29sbGVjdGlvbi5fbWFrZU5ld0lEKCk7XG4gIH1cblxuICAvLyBHZXQgdGhlIGRvY0lkIGZvciBwYXNzaW5nIGluIHRoZSBhdXRvVmFsdWUvY3VzdG9tIGNvbnRleHRcbiAgdmFyIGRvY0lkO1xuICBpZiAodHlwZSA9PT0gJ2luc2VydCcpIHtcbiAgICBkb2NJZCA9IGRvYy5faWQ7IC8vIG1pZ2h0IGJlIHVuZGVmaW5lZFxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidXBkYXRlXCIgJiYgc2VsZWN0b3IpIHtcbiAgICBkb2NJZCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycgfHwgc2VsZWN0b3IgaW5zdGFuY2VvZiBNb25nby5PYmplY3RJRCA/IHNlbGVjdG9yIDogc2VsZWN0b3IuX2lkO1xuICB9XG5cbiAgLy8gSWYgX2lkIGhhcyBhbHJlYWR5IGJlZW4gYWRkZWQsIHJlbW92ZSBpdCB0ZW1wb3JhcmlseSBpZiBpdCdzXG4gIC8vIG5vdCBleHBsaWNpdGx5IGRlZmluZWQgaW4gdGhlIHNjaGVtYS5cbiAgdmFyIGNhY2hlZElkO1xuICBpZiAoZG9jLl9pZCAmJiAhc2NoZW1hQWxsb3dzSWQpIHtcbiAgICBjYWNoZWRJZCA9IGRvYy5faWQ7XG4gICAgZGVsZXRlIGRvYy5faWQ7XG4gIH1cblxuICBjb25zdCBhdXRvVmFsdWVDb250ZXh0ID0ge1xuICAgIGlzSW5zZXJ0OiAodHlwZSA9PT0gXCJpbnNlcnRcIiksXG4gICAgaXNVcGRhdGU6ICh0eXBlID09PSBcInVwZGF0ZVwiICYmIG9wdGlvbnMudXBzZXJ0ICE9PSB0cnVlKSxcbiAgICBpc1Vwc2VydCxcbiAgICB1c2VySWQsXG4gICAgaXNGcm9tVHJ1c3RlZENvZGUsXG4gICAgZG9jSWQsXG4gICAgaXNMb2NhbENvbGxlY3Rpb25cbiAgfTtcblxuICBjb25zdCBleHRlbmRBdXRvVmFsdWVDb250ZXh0ID0ge1xuICAgIC4uLigoc2NoZW1hLl9jbGVhbk9wdGlvbnMgfHwge30pLmV4dGVuZEF1dG9WYWx1ZUNvbnRleHQgfHwge30pLFxuICAgIC4uLmF1dG9WYWx1ZUNvbnRleHQsXG4gICAgLi4ub3B0aW9ucy5leHRlbmRBdXRvVmFsdWVDb250ZXh0LFxuICB9O1xuXG4gIGNvbnN0IGNsZWFuT3B0aW9uc0ZvclRoaXNPcGVyYXRpb24gPSB7fTtcbiAgW1wiYXV0b0NvbnZlcnRcIiwgXCJmaWx0ZXJcIiwgXCJyZW1vdmVFbXB0eVN0cmluZ3NcIiwgXCJyZW1vdmVOdWxsc0Zyb21BcnJheXNcIiwgXCJ0cmltU3RyaW5nc1wiXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9uc1twcm9wXSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgIGNsZWFuT3B0aW9uc0ZvclRoaXNPcGVyYXRpb25bcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gUHJlbGltaW5hcnkgY2xlYW5pbmcgb24gYm90aCBjbGllbnQgYW5kIHNlcnZlci4gT24gdGhlIHNlcnZlciBhbmQgZm9yIGxvY2FsXG4gIC8vIGNvbGxlY3Rpb25zLCBhdXRvbWF0aWMgdmFsdWVzIHdpbGwgYWxzbyBiZSBzZXQgYXQgdGhpcyBwb2ludC5cbiAgc2NoZW1hLmNsZWFuKGRvYywge1xuICAgIG11dGF0ZTogdHJ1ZSwgLy8gQ2xlYW4gdGhlIGRvYy9tb2RpZmllciBpbiBwbGFjZVxuICAgIGlzTW9kaWZpZXI6ICh0eXBlICE9PSBcImluc2VydFwiKSxcbiAgICAvLyBTdGFydCB3aXRoIHNvbWUgQ29sbGVjdGlvbjIgZGVmYXVsdHMsIHdoaWNoIHdpbGwgdXN1YWxseSBiZSBvdmVyd3JpdHRlblxuICAgIC4uLmRlZmF1bHRDbGVhbk9wdGlvbnMsXG4gICAgLy8gVGhlIGV4dGVuZCB3aXRoIHRoZSBzY2hlbWEtbGV2ZWwgZGVmYXVsdHMgKGZyb20gU2ltcGxlU2NoZW1hIGNvbnN0cnVjdG9yIG9wdGlvbnMpXG4gICAgLi4uKHNjaGVtYS5fY2xlYW5PcHRpb25zIHx8IHt9KSxcbiAgICAvLyBGaW5hbGx5LCBvcHRpb25zIGZvciB0aGlzIHNwZWNpZmljIG9wZXJhdGlvbiBzaG91bGQgdGFrZSBwcmVjZWRlbmNlXG4gICAgLi4uY2xlYW5PcHRpb25zRm9yVGhpc09wZXJhdGlvbixcbiAgICBleHRlbmRBdXRvVmFsdWVDb250ZXh0LCAvLyBUaGlzIHdhcyBleHRlbmRlZCBzZXBhcmF0ZWx5IGFib3ZlXG4gICAgZ2V0QXV0b1ZhbHVlcywgLy8gRm9yY2UgdGhpcyBvdmVycmlkZVxuICB9KTtcblxuICAvLyBXZSBjbG9uZSBiZWZvcmUgdmFsaWRhdGluZyBiZWNhdXNlIGluIHNvbWUgY2FzZXMgd2UgbmVlZCB0byBhZGp1c3QgdGhlXG4gIC8vIG9iamVjdCBhIGJpdCBiZWZvcmUgdmFsaWRhdGluZyBpdC4gSWYgd2UgYWRqdXN0ZWQgYGRvY2AgaXRzZWxmLCBvdXJcbiAgLy8gY2hhbmdlcyB3b3VsZCBwZXJzaXN0IGludG8gdGhlIGRhdGFiYXNlLlxuICB2YXIgZG9jVG9WYWxpZGF0ZSA9IHt9O1xuICBmb3IgKHZhciBwcm9wIGluIGRvYykge1xuICAgIC8vIFdlIG9taXQgcHJvdG90eXBlIHByb3BlcnRpZXMgd2hlbiBjbG9uaW5nIGJlY2F1c2UgdGhleSB3aWxsIG5vdCBiZSB2YWxpZFxuICAgIC8vIGFuZCBtb25nbyBvbWl0cyB0aGVtIHdoZW4gc2F2aW5nIHRvIHRoZSBkYXRhYmFzZSBhbnl3YXkuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkb2MsIHByb3ApKSB7XG4gICAgICBkb2NUb1ZhbGlkYXRlW3Byb3BdID0gZG9jW3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIC8vIE9uIHRoZSBzZXJ2ZXIsIHVwc2VydHMgYXJlIHBvc3NpYmxlOyBTaW1wbGVTY2hlbWEgaGFuZGxlcyB1cHNlcnRzIHByZXR0eVxuICAvLyB3ZWxsIGJ5IGRlZmF1bHQsIGJ1dCBpdCB3aWxsIG5vdCBrbm93IGFib3V0IHRoZSBmaWVsZHMgaW4gdGhlIHNlbGVjdG9yLFxuICAvLyB3aGljaCBhcmUgYWxzbyBzdG9yZWQgaW4gdGhlIGRhdGFiYXNlIGlmIGFuIGluc2VydCBpcyBwZXJmb3JtZWQuIFNvIHdlXG4gIC8vIHdpbGwgYWxsb3cgdGhlc2UgZmllbGRzIHRvIGJlIGNvbnNpZGVyZWQgZm9yIHZhbGlkYXRpb24gYnkgYWRkaW5nIHRoZW1cbiAgLy8gdG8gdGhlICRzZXQgaW4gdGhlIG1vZGlmaWVyLCB3aGlsZSBzdHJpcHBpbmcgb3V0IHF1ZXJ5IHNlbGVjdG9ycyBhcyB0aGVzZVxuICAvLyBkb24ndCBtYWtlIGl0IGludG8gdGhlIHVwc2VydGVkIGRvY3VtZW50IGFuZCBicmVhayB2YWxpZGF0aW9uLiBcbiAgLy8gVGhpcyBpcyBubyBkb3VidCBwcm9uZSB0byBlcnJvcnMsIGJ1dCB0aGVyZSBwcm9iYWJseSBpc24ndCBhbnkgYmV0dGVyIHdheVxuICAvLyByaWdodCBub3cuXG4gIGlmIChNZXRlb3IuaXNTZXJ2ZXIgJiYgaXNVcHNlcnQgJiYgaXNPYmplY3Qoc2VsZWN0b3IpKSB7XG4gICAgdmFyIHNldCA9IGRvY1RvVmFsaWRhdGUuJHNldCB8fCB7fTtcbiAgICBkb2NUb1ZhbGlkYXRlLiRzZXQgPSBmbGF0dGVuU2VsZWN0b3Ioc2VsZWN0b3IpXG5cbiAgICBpZiAoIXNjaGVtYUFsbG93c0lkKSBkZWxldGUgZG9jVG9WYWxpZGF0ZS4kc2V0Ll9pZDtcbiAgICBPYmplY3QuYXNzaWduKGRvY1RvVmFsaWRhdGUuJHNldCwgc2V0KTtcbiAgfVxuICAvLyBTZXQgYXV0b21hdGljIHZhbHVlcyBmb3IgdmFsaWRhdGlvbiBvbiB0aGUgY2xpZW50LlxuICAvLyBPbiB0aGUgc2VydmVyLCB3ZSBhbHJlYWR5IHVwZGF0ZWQgZG9jIHdpdGggYXV0byB2YWx1ZXMsIGJ1dCBvbiB0aGUgY2xpZW50LFxuICAvLyB3ZSB3aWxsIGFkZCB0aGVtIHRvIGRvY1RvVmFsaWRhdGUgZm9yIHZhbGlkYXRpb24gcHVycG9zZXMgb25seS5cbiAgLy8gVGhpcyBpcyBiZWNhdXNlIHdlIHdhbnQgYWxsIGFjdHVhbCB2YWx1ZXMgZ2VuZXJhdGVkIG9uIHRoZSBzZXJ2ZXIuXG4gIGlmIChNZXRlb3IuaXNDbGllbnQgJiYgIWlzTG9jYWxDb2xsZWN0aW9uKSB7XG4gICAgc2NoZW1hLmNsZWFuKGRvY1RvVmFsaWRhdGUsIHtcbiAgICAgIGF1dG9Db252ZXJ0OiBmYWxzZSxcbiAgICAgIGV4dGVuZEF1dG9WYWx1ZUNvbnRleHQsXG4gICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgZ2V0QXV0b1ZhbHVlczogdHJ1ZSxcbiAgICAgIGlzTW9kaWZpZXI6ICh0eXBlICE9PSBcImluc2VydFwiKSxcbiAgICAgIG11dGF0ZTogdHJ1ZSwgLy8gQ2xlYW4gdGhlIGRvYy9tb2RpZmllciBpbiBwbGFjZVxuICAgICAgcmVtb3ZlRW1wdHlTdHJpbmdzOiBmYWxzZSxcbiAgICAgIHJlbW92ZU51bGxzRnJvbUFycmF5czogZmFsc2UsXG4gICAgICB0cmltU3RyaW5nczogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICAvLyBYWFggTWF5YmUgbW92ZSB0aGlzIGludG8gU2ltcGxlU2NoZW1hXG4gIGlmICghdmFsaWRhdGVkT2JqZWN0V2FzSW5pdGlhbGx5RW1wdHkgJiYgaXNFbXB0eShkb2NUb1ZhbGlkYXRlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQWZ0ZXIgZmlsdGVyaW5nIG91dCBrZXlzIG5vdCBpbiB0aGUgc2NoZW1hLCB5b3VyICcgK1xuICAgICAgKHR5cGUgPT09ICd1cGRhdGUnID8gJ21vZGlmaWVyJyA6ICdvYmplY3QnKSArXG4gICAgICAnIGlzIG5vdyBlbXB0eScpO1xuICB9XG5cbiAgLy8gVmFsaWRhdGUgZG9jXG4gIHZhciBpc1ZhbGlkO1xuICBpZiAob3B0aW9ucy52YWxpZGF0ZSA9PT0gZmFsc2UpIHtcbiAgICBpc1ZhbGlkID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBpc1ZhbGlkID0gdmFsaWRhdGlvbkNvbnRleHQudmFsaWRhdGUoZG9jVG9WYWxpZGF0ZSwge1xuICAgICAgbW9kaWZpZXI6ICh0eXBlID09PSBcInVwZGF0ZVwiIHx8IHR5cGUgPT09IFwidXBzZXJ0XCIpLFxuICAgICAgdXBzZXJ0OiBpc1Vwc2VydCxcbiAgICAgIGV4dGVuZGVkQ3VzdG9tQ29udGV4dDoge1xuICAgICAgICBpc0luc2VydDogKHR5cGUgPT09IFwiaW5zZXJ0XCIpLFxuICAgICAgICBpc1VwZGF0ZTogKHR5cGUgPT09IFwidXBkYXRlXCIgJiYgb3B0aW9ucy51cHNlcnQgIT09IHRydWUpLFxuICAgICAgICBpc1Vwc2VydCxcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBpc0Zyb21UcnVzdGVkQ29kZSxcbiAgICAgICAgZG9jSWQsXG4gICAgICAgIGlzTG9jYWxDb2xsZWN0aW9uLFxuICAgICAgICAuLi4ob3B0aW9ucy5leHRlbmRlZEN1c3RvbUNvbnRleHQgfHwge30pLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChpc1ZhbGlkKSB7XG4gICAgLy8gQWRkIHRoZSBJRCBiYWNrXG4gICAgaWYgKGNhY2hlZElkKSB7XG4gICAgICBkb2MuX2lkID0gY2FjaGVkSWQ7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHRoZSBhcmdzIHRvIHJlZmxlY3QgdGhlIGNsZWFuZWQgZG9jXG4gICAgLy8gWFhYIG5vdCBzdXJlIHRoaXMgaXMgbmVjZXNzYXJ5IHNpbmNlIHdlIG11dGF0ZVxuICAgIGlmICh0eXBlID09PSBcImluc2VydFwiKSB7XG4gICAgICBhcmdzWzBdID0gZG9jO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmdzWzFdID0gZG9jO1xuICAgIH1cblxuICAgIC8vIElmIGNhbGxiYWNrLCBzZXQgaW52YWxpZEtleSB3aGVuIHdlIGdldCBhIG1vbmdvIHVuaXF1ZSBlcnJvclxuICAgIGlmIChNZXRlb3IuaXNTZXJ2ZXIgJiYgaGFzQ2FsbGJhY2spIHtcbiAgICAgIGFyZ3NbbGFzdF0gPSB3cmFwQ2FsbGJhY2tGb3JQYXJzaW5nTW9uZ29WYWxpZGF0aW9uRXJyb3JzKHZhbGlkYXRpb25Db250ZXh0LCBhcmdzW2xhc3RdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJncztcbiAgfSBlbHNlIHtcbiAgICBlcnJvciA9IGdldEVycm9yT2JqZWN0KHZhbGlkYXRpb25Db250ZXh0LCBgaW4gJHtjb2xsZWN0aW9uLl9uYW1lfSAke3R5cGV9YCk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAvLyBpbnNlcnQvdXBkYXRlL3Vwc2VydCBwYXNzIGBmYWxzZWAgd2hlbiB0aGVyZSdzIGFuIGVycm9yLCBzbyB3ZSBkbyB0aGF0XG4gICAgICBjYWxsYmFjayhlcnJvciwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RXJyb3JPYmplY3QoY29udGV4dCwgYXBwZW5kVG9NZXNzYWdlID0gJycpIHtcbiAgbGV0IG1lc3NhZ2U7XG4gIGNvbnN0IGludmFsaWRLZXlzID0gKHR5cGVvZiBjb250ZXh0LnZhbGlkYXRpb25FcnJvcnMgPT09ICdmdW5jdGlvbicpID8gY29udGV4dC52YWxpZGF0aW9uRXJyb3JzKCkgOiBjb250ZXh0LmludmFsaWRLZXlzKCk7XG4gIGlmIChpbnZhbGlkS2V5cy5sZW5ndGgpIHtcbiAgICBjb25zdCBmaXJzdEVycm9yS2V5ID0gaW52YWxpZEtleXNbMF0ubmFtZTtcbiAgICBjb25zdCBmaXJzdEVycm9yTWVzc2FnZSA9IGNvbnRleHQua2V5RXJyb3JNZXNzYWdlKGZpcnN0RXJyb3JLZXkpO1xuXG4gICAgLy8gSWYgdGhlIGVycm9yIGlzIGluIGEgbmVzdGVkIGtleSwgYWRkIHRoZSBmdWxsIGtleSB0byB0aGUgZXJyb3IgbWVzc2FnZVxuICAgIC8vIHRvIGJlIG1vcmUgaGVscGZ1bC5cbiAgICBpZiAoZmlyc3RFcnJvcktleS5pbmRleE9mKCcuJykgPT09IC0xKSB7XG4gICAgICBtZXNzYWdlID0gZmlyc3RFcnJvck1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2UgPSBgJHtmaXJzdEVycm9yTWVzc2FnZX0gKCR7Zmlyc3RFcnJvcktleX0pYDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbWVzc2FnZSA9IFwiRmFpbGVkIHZhbGlkYXRpb25cIjtcbiAgfVxuICBtZXNzYWdlID0gYCR7bWVzc2FnZX0gJHthcHBlbmRUb01lc3NhZ2V9YC50cmltKCk7XG4gIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICBlcnJvci5pbnZhbGlkS2V5cyA9IGludmFsaWRLZXlzO1xuICBlcnJvci52YWxpZGF0aW9uQ29udGV4dCA9IGNvbnRleHQ7XG4gIC8vIElmIG9uIHRoZSBzZXJ2ZXIsIHdlIGFkZCBhIHNhbml0aXplZCBlcnJvciwgdG9vLCBpbiBjYXNlIHdlJ3JlXG4gIC8vIGNhbGxlZCBmcm9tIGEgbWV0aG9kLlxuICBpZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG4gICAgZXJyb3Iuc2FuaXRpemVkRXJyb3IgPSBuZXcgTWV0ZW9yLkVycm9yKDQwMCwgbWVzc2FnZSwgRUpTT04uc3RyaW5naWZ5KGVycm9yLmludmFsaWRLZXlzKSk7XG4gIH1cbiAgcmV0dXJuIGVycm9yO1xufVxuXG5mdW5jdGlvbiBhZGRVbmlxdWVFcnJvcihjb250ZXh0LCBlcnJvck1lc3NhZ2UpIHtcbiAgdmFyIG5hbWUgPSBlcnJvck1lc3NhZ2Uuc3BsaXQoJ2MyXycpWzFdLnNwbGl0KCcgJylbMF07XG4gIHZhciB2YWwgPSBlcnJvck1lc3NhZ2Uuc3BsaXQoJ2R1cCBrZXk6JylbMV0uc3BsaXQoJ1wiJylbMV07XG5cbiAgdmFyIGFkZFZhbGlkYXRpb25FcnJvcnNQcm9wTmFtZSA9ICh0eXBlb2YgY29udGV4dC5hZGRWYWxpZGF0aW9uRXJyb3JzID09PSAnZnVuY3Rpb24nKSA/ICdhZGRWYWxpZGF0aW9uRXJyb3JzJyA6ICdhZGRJbnZhbGlkS2V5cyc7XG4gIGNvbnRleHRbYWRkVmFsaWRhdGlvbkVycm9yc1Byb3BOYW1lXShbe1xuICAgIG5hbWU6IG5hbWUsXG4gICAgdHlwZTogJ25vdFVuaXF1ZScsXG4gICAgdmFsdWU6IHZhbFxuICB9XSk7XG59XG5cbmZ1bmN0aW9uIHdyYXBDYWxsYmFja0ZvclBhcnNpbmdNb25nb1ZhbGlkYXRpb25FcnJvcnModmFsaWRhdGlvbkNvbnRleHQsIGNiKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwcGVkQ2FsbGJhY2tGb3JQYXJzaW5nTW9uZ29WYWxpZGF0aW9uRXJyb3JzKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnJvciA9IGFyZ3NbMF07XG4gICAgaWYgKGVycm9yICYmXG4gICAgICAgICgoZXJyb3IubmFtZSA9PT0gXCJNb25nb0Vycm9yXCIgJiYgZXJyb3IuY29kZSA9PT0gMTEwMDEpIHx8IGVycm9yLm1lc3NhZ2UuaW5kZXhPZignTW9uZ29FcnJvcjogRTExMDAwJyAhPT0gLTEpKSAmJlxuICAgICAgICBlcnJvci5tZXNzYWdlLmluZGV4T2YoJ2MyXycpICE9PSAtMSkge1xuICAgICAgYWRkVW5pcXVlRXJyb3IodmFsaWRhdGlvbkNvbnRleHQsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgYXJnc1swXSA9IGdldEVycm9yT2JqZWN0KHZhbGlkYXRpb25Db250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNiLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cmFwQ2FsbGJhY2tGb3JQYXJzaW5nU2VydmVyRXJyb3JzKHZhbGlkYXRpb25Db250ZXh0LCBjYikge1xuICB2YXIgYWRkVmFsaWRhdGlvbkVycm9yc1Byb3BOYW1lID0gKHR5cGVvZiB2YWxpZGF0aW9uQ29udGV4dC5hZGRWYWxpZGF0aW9uRXJyb3JzID09PSAnZnVuY3Rpb24nKSA/ICdhZGRWYWxpZGF0aW9uRXJyb3JzJyA6ICdhZGRJbnZhbGlkS2V5cyc7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwcGVkQ2FsbGJhY2tGb3JQYXJzaW5nU2VydmVyRXJyb3JzKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnJvciA9IGFyZ3NbMF07XG4gICAgLy8gSGFuZGxlIG91ciBvd24gdmFsaWRhdGlvbiBlcnJvcnNcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBNZXRlb3IuRXJyb3IgJiZcbiAgICAgICAgZXJyb3IuZXJyb3IgPT09IDQwMCAmJlxuICAgICAgICBlcnJvci5yZWFzb24gPT09IFwiSU5WQUxJRFwiICYmXG4gICAgICAgIHR5cGVvZiBlcnJvci5kZXRhaWxzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB2YXIgaW52YWxpZEtleXNGcm9tU2VydmVyID0gRUpTT04ucGFyc2UoZXJyb3IuZGV0YWlscyk7XG4gICAgICB2YWxpZGF0aW9uQ29udGV4dFthZGRWYWxpZGF0aW9uRXJyb3JzUHJvcE5hbWVdKGludmFsaWRLZXlzRnJvbVNlcnZlcik7XG4gICAgICBhcmdzWzBdID0gZ2V0RXJyb3JPYmplY3QodmFsaWRhdGlvbkNvbnRleHQpO1xuICAgIH1cbiAgICAvLyBIYW5kbGUgTW9uZ28gdW5pcXVlIGluZGV4IGVycm9ycywgd2hpY2ggYXJlIGZvcndhcmRlZCB0byB0aGUgY2xpZW50IGFzIDQwOSBlcnJvcnNcbiAgICBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIE1ldGVvci5FcnJvciAmJlxuICAgICAgICAgICAgIGVycm9yLmVycm9yID09PSA0MDkgJiZcbiAgICAgICAgICAgICBlcnJvci5yZWFzb24gJiZcbiAgICAgICAgICAgICBlcnJvci5yZWFzb24uaW5kZXhPZignRTExMDAwJykgIT09IC0xICYmXG4gICAgICAgICAgICAgZXJyb3IucmVhc29uLmluZGV4T2YoJ2MyXycpICE9PSAtMSkge1xuICAgICAgYWRkVW5pcXVlRXJyb3IodmFsaWRhdGlvbkNvbnRleHQsIGVycm9yLnJlYXNvbik7XG4gICAgICBhcmdzWzBdID0gZ2V0RXJyb3JPYmplY3QodmFsaWRhdGlvbkNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gY2IuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG59XG5cbnZhciBhbHJlYWR5SW5zZWN1cmUgPSB7fTtcbmZ1bmN0aW9uIGtlZXBJbnNlY3VyZShjKSB7XG4gIC8vIElmIGluc2VjdXJlIHBhY2thZ2UgaXMgaW4gdXNlLCB3ZSBuZWVkIHRvIGFkZCBhbGxvdyBydWxlcyB0aGF0IHJldHVyblxuICAvLyB0cnVlLiBPdGhlcndpc2UsIGl0IHdvdWxkIHNlZW1pbmdseSB0dXJuIG9mZiBpbnNlY3VyZSBtb2RlLlxuICBpZiAoUGFja2FnZSAmJiBQYWNrYWdlLmluc2VjdXJlICYmICFhbHJlYWR5SW5zZWN1cmVbYy5fbmFtZV0pIHtcbiAgICBjLmFsbG93KHtcbiAgICAgIGluc2VydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBmZXRjaDogW10sXG4gICAgICB0cmFuc2Zvcm06IG51bGxcbiAgICB9KTtcbiAgICBhbHJlYWR5SW5zZWN1cmVbYy5fbmFtZV0gPSB0cnVlO1xuICB9XG4gIC8vIElmIGluc2VjdXJlIHBhY2thZ2UgaXMgTk9UIGluIHVzZSwgdGhlbiBhZGRpbmcgdGhlIHR3byBkZW55IGZ1bmN0aW9uc1xuICAvLyBkb2VzIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIG1haW4gYXBwJ3Mgc2VjdXJpdHkgcGFyYWRpZ20uIFRoZVxuICAvLyB1c2VyIHdpbGwgc3RpbGwgYmUgcmVxdWlyZWQgdG8gYWRkIGF0IGxlYXN0IG9uZSBhbGxvdyBmdW5jdGlvbiBvZiBoZXJcbiAgLy8gb3duIGZvciBlYWNoIG9wZXJhdGlvbiBmb3IgdGhpcyBjb2xsZWN0aW9uLiBBbmQgdGhlIHVzZXIgbWF5IHN0aWxsIGFkZFxuICAvLyBhZGRpdGlvbmFsIGRlbnkgZnVuY3Rpb25zLCBidXQgZG9lcyBub3QgaGF2ZSB0by5cbn1cblxudmFyIGFscmVhZHlEZWZpbmVkID0ge307XG5mdW5jdGlvbiBkZWZpbmVEZW55KGMsIG9wdGlvbnMpIHtcbiAgaWYgKCFhbHJlYWR5RGVmaW5lZFtjLl9uYW1lXSkge1xuXG4gICAgdmFyIGlzTG9jYWxDb2xsZWN0aW9uID0gKGMuX2Nvbm5lY3Rpb24gPT09IG51bGwpO1xuXG4gICAgLy8gRmlyc3QgZGVmaW5lIGRlbnkgZnVuY3Rpb25zIHRvIGV4dGVuZCBkb2Mgd2l0aCB0aGUgcmVzdWx0cyBvZiBjbGVhblxuICAgIC8vIGFuZCBhdXRvLXZhbHVlcy4gVGhpcyBtdXN0IGJlIGRvbmUgd2l0aCBcInRyYW5zZm9ybTogbnVsbFwiIG9yIHdlIHdvdWxkIGJlXG4gICAgLy8gZXh0ZW5kaW5nIGEgY2xvbmUgb2YgZG9jIGFuZCB0aGVyZWZvcmUgaGF2ZSBubyBlZmZlY3QuXG4gICAgYy5kZW55KHtcbiAgICAgIGluc2VydDogZnVuY3Rpb24odXNlcklkLCBkb2MpIHtcbiAgICAgICAgLy8gUmVmZXJlbmNlZCBkb2MgaXMgY2xlYW5lZCBpbiBwbGFjZVxuICAgICAgICBjLnNpbXBsZVNjaGVtYShkb2MpLmNsZWFuKGRvYywge1xuICAgICAgICAgIG11dGF0ZTogdHJ1ZSxcbiAgICAgICAgICBpc01vZGlmaWVyOiBmYWxzZSxcbiAgICAgICAgICAvLyBXZSBkb24ndCBkbyB0aGVzZSBoZXJlIGJlY2F1c2UgdGhleSBhcmUgZG9uZSBvbiB0aGUgY2xpZW50IGlmIGRlc2lyZWRcbiAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgIGF1dG9Db252ZXJ0OiBmYWxzZSxcbiAgICAgICAgICByZW1vdmVFbXB0eVN0cmluZ3M6IGZhbHNlLFxuICAgICAgICAgIHRyaW1TdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICBleHRlbmRBdXRvVmFsdWVDb250ZXh0OiB7XG4gICAgICAgICAgICBpc0luc2VydDogdHJ1ZSxcbiAgICAgICAgICAgIGlzVXBkYXRlOiBmYWxzZSxcbiAgICAgICAgICAgIGlzVXBzZXJ0OiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICAgICAgaXNGcm9tVHJ1c3RlZENvZGU6IGZhbHNlLFxuICAgICAgICAgICAgZG9jSWQ6IGRvYy5faWQsXG4gICAgICAgICAgICBpc0xvY2FsQ29sbGVjdGlvbjogaXNMb2NhbENvbGxlY3Rpb25cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uKHVzZXJJZCwgZG9jLCBmaWVsZHMsIG1vZGlmaWVyKSB7XG4gICAgICAgIC8vIFJlZmVyZW5jZWQgbW9kaWZpZXIgaXMgY2xlYW5lZCBpbiBwbGFjZVxuICAgICAgICBjLnNpbXBsZVNjaGVtYShtb2RpZmllcikuY2xlYW4obW9kaWZpZXIsIHtcbiAgICAgICAgICBtdXRhdGU6IHRydWUsXG4gICAgICAgICAgaXNNb2RpZmllcjogdHJ1ZSxcbiAgICAgICAgICAvLyBXZSBkb24ndCBkbyB0aGVzZSBoZXJlIGJlY2F1c2UgdGhleSBhcmUgZG9uZSBvbiB0aGUgY2xpZW50IGlmIGRlc2lyZWRcbiAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgIGF1dG9Db252ZXJ0OiBmYWxzZSxcbiAgICAgICAgICByZW1vdmVFbXB0eVN0cmluZ3M6IGZhbHNlLFxuICAgICAgICAgIHRyaW1TdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICBleHRlbmRBdXRvVmFsdWVDb250ZXh0OiB7XG4gICAgICAgICAgICBpc0luc2VydDogZmFsc2UsXG4gICAgICAgICAgICBpc1VwZGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGlzVXBzZXJ0OiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICAgICAgaXNGcm9tVHJ1c3RlZENvZGU6IGZhbHNlLFxuICAgICAgICAgICAgZG9jSWQ6IGRvYyAmJiBkb2MuX2lkLFxuICAgICAgICAgICAgaXNMb2NhbENvbGxlY3Rpb246IGlzTG9jYWxDb2xsZWN0aW9uXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgZmV0Y2g6IFsnX2lkJ10sXG4gICAgICB0cmFuc2Zvcm06IG51bGxcbiAgICB9KTtcblxuICAgIC8vIFNlY29uZCBkZWZpbmUgZGVueSBmdW5jdGlvbnMgdG8gdmFsaWRhdGUgYWdhaW4gb24gdGhlIHNlcnZlclxuICAgIC8vIGZvciBjbGllbnQtaW5pdGlhdGVkIGluc2VydHMgYW5kIHVwZGF0ZXMuIFRoZXNlIHNob3VsZCBiZVxuICAgIC8vIGNhbGxlZCBhZnRlciB0aGUgY2xlYW4vYXV0by12YWx1ZSBmdW5jdGlvbnMgc2luY2Ugd2UncmUgYWRkaW5nXG4gICAgLy8gdGhlbSBhZnRlci4gVGhlc2UgbXVzdCAqbm90KiBoYXZlIFwidHJhbnNmb3JtOiBudWxsXCIgaWYgb3B0aW9ucy50cmFuc2Zvcm0gaXMgdHJ1ZSBiZWNhdXNlXG4gICAgLy8gd2UgbmVlZCB0byBwYXNzIHRoZSBkb2MgdGhyb3VnaCBhbnkgdHJhbnNmb3JtcyB0byBiZSBzdXJlXG4gICAgLy8gdGhhdCBjdXN0b20gdHlwZXMgYXJlIHByb3Blcmx5IHJlY29nbml6ZWQgZm9yIHR5cGUgdmFsaWRhdGlvbi5cbiAgICBjLmRlbnkoe1xuICAgICAgaW5zZXJ0OiBmdW5jdGlvbih1c2VySWQsIGRvYykge1xuICAgICAgICAvLyBXZSBwYXNzIHRoZSBmYWxzZSBvcHRpb25zIGJlY2F1c2Ugd2Ugd2lsbCBoYXZlIGRvbmUgdGhlbSBvbiBjbGllbnQgaWYgZGVzaXJlZFxuICAgICAgICBkb1ZhbGlkYXRlKFxuICAgICAgICAgIGMsXG4gICAgICAgICAgXCJpbnNlcnRcIixcbiAgICAgICAgICBbXG4gICAgICAgICAgICBkb2MsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRyaW1TdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICAgICAgcmVtb3ZlRW1wdHlTdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgYXV0b0NvbnZlcnQ6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDAsICdJTlZBTElEJywgRUpTT04uc3RyaW5naWZ5KGVycm9yLmludmFsaWRLZXlzKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGZhbHNlLCAvLyBnZXRBdXRvVmFsdWVzXG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGZhbHNlIC8vIGlzRnJvbVRydXN0ZWRDb2RlXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24odXNlcklkLCBkb2MsIGZpZWxkcywgbW9kaWZpZXIpIHtcbiAgICAgICAgLy8gTk9URTogVGhpcyB3aWxsIG5ldmVyIGJlIGFuIHVwc2VydCBiZWNhdXNlIGNsaWVudC1zaWRlIHVwc2VydHNcbiAgICAgICAgLy8gYXJlIG5vdCBhbGxvd2VkIG9uY2UgeW91IGRlZmluZSBhbGxvdy9kZW55IGZ1bmN0aW9ucy5cbiAgICAgICAgLy8gV2UgcGFzcyB0aGUgZmFsc2Ugb3B0aW9ucyBiZWNhdXNlIHdlIHdpbGwgaGF2ZSBkb25lIHRoZW0gb24gY2xpZW50IGlmIGRlc2lyZWRcbiAgICAgICAgZG9WYWxpZGF0ZShcbiAgICAgICAgICBjLFxuICAgICAgICAgIFwidXBkYXRlXCIsXG4gICAgICAgICAgW1xuICAgICAgICAgICAge19pZDogZG9jICYmIGRvYy5faWR9LFxuICAgICAgICAgICAgbW9kaWZpZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRyaW1TdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICAgICAgcmVtb3ZlRW1wdHlTdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgYXV0b0NvbnZlcnQ6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDAsICdJTlZBTElEJywgRUpTT04uc3RyaW5naWZ5KGVycm9yLmludmFsaWRLZXlzKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGZhbHNlLCAvLyBnZXRBdXRvVmFsdWVzXG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGZhbHNlIC8vIGlzRnJvbVRydXN0ZWRDb2RlXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGZldGNoOiBbJ19pZCddLFxuICAgICAgLi4uKG9wdGlvbnMudHJhbnNmb3JtID09PSB0cnVlID8ge30gOiB7dHJhbnNmb3JtOiBudWxsfSksXG4gICAgfSk7XG5cbiAgICAvLyBub3RlIHRoYXQgd2UndmUgYWxyZWFkeSBkb25lIHRoaXMgY29sbGVjdGlvbiBzbyB0aGF0IHdlIGRvbid0IGRvIGl0IGFnYWluXG4gICAgLy8gaWYgYXR0YWNoU2NoZW1hIGlzIGNhbGxlZCBhZ2FpblxuICAgIGFscmVhZHlEZWZpbmVkW2MuX25hbWVdID0gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBleHRlbmRTY2hlbWEoczEsIHMyKSB7XG4gIGlmIChzMi52ZXJzaW9uID49IDIpIHtcbiAgICBjb25zdCBzcyA9IG5ldyBTaW1wbGVTY2hlbWEoczEpO1xuICAgIHNzLmV4dGVuZChzMik7XG4gICAgcmV0dXJuIHNzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgU2ltcGxlU2NoZW1hKFsgczEsIHMyIF0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxlY3Rpb24yO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5TZWxlY3RvcihzZWxlY3Rvcikge1xuICAvLyBJZiBzZWxlY3RvciB1c2VzICRhbmQgZm9ybWF0LCBjb252ZXJ0IHRvIHBsYWluIG9iamVjdCBzZWxlY3RvclxuICBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3Rvci4kYW5kKSkge1xuICAgIHNlbGVjdG9yLiRhbmQuZm9yRWFjaChzZWwgPT4ge1xuICAgICAgT2JqZWN0LmFzc2lnbihzZWxlY3RvciwgZmxhdHRlblNlbGVjdG9yKHNlbCkpO1xuICAgIH0pO1xuXG4gICAgZGVsZXRlIHNlbGVjdG9yLiRhbmRcbiAgfVxuXG4gIGNvbnN0IG9iaiA9IHt9XG5cbiAgT2JqZWN0LmVudHJpZXMoc2VsZWN0b3IpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIC8vIElnbm9yaW5nIGxvZ2ljYWwgc2VsZWN0b3JzIChodHRwczovL2RvY3MubW9uZ29kYi5jb20vbWFudWFsL3JlZmVyZW5jZS9vcGVyYXRvci9xdWVyeS8jbG9naWNhbClcbiAgICBpZiAoIWtleS5zdGFydHNXaXRoKFwiJFwiKSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKHZhbHVlLiRlcSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZS4kZXFcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlLiRpbikgJiYgdmFsdWUuJGluLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIG9ialtrZXldID0gdmFsdWUuJGluWzBdXG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXModmFsdWUpLmV2ZXJ5KHYgPT4gISh0eXBlb2YgdiA9PT0gXCJzdHJpbmdcIiAmJiB2LnN0YXJ0c1dpdGgoXCIkXCIpKSkpIHtcbiAgICAgICAgICBvYmpba2V5XSA9IHZhbHVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWVcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIFxuICByZXR1cm4gb2JqXG59XG4iXX0=
