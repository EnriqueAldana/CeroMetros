(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Accounts = Package['accounts-base'].Accounts;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var ECMAScript = Package.ecmascript.ECMAScript;
var Collection2 = Package['aldeed:collection2'].Collection2;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"socialize:user-model":{"common":{"common.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/socialize_user-model/common/common.js                                                           //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
module.export({
  User: () => User,
  UsersCollection: () => UsersCollection
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let LinkableModel, LinkParent;
module.link("meteor/socialize:linkable-model", {
  LinkableModel(v) {
    LinkableModel = v;
  },

  LinkParent(v) {
    LinkParent = v;
  }

}, 2);
let construct;
module.link("./user-model.js", {
  default(v) {
    construct = v;
  }

}, 3);
const {
  User,
  UsersCollection
} = construct({
  Meteor,
  Package,
  check,
  LinkableModel,
  LinkParent
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"user-model.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/socialize_user-model/common/user-model.js                                                       //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
let SimpleSchema;
module.link("simpl-schema", {
  default(v) {
    SimpleSchema = v;
  }

}, 0);
module.exportDefault((_ref) => {
  let {
    Meteor,
    Package,
    check,
    LinkableModel,
    LinkParent
  } = _ref;

  /**
  * Represents a User
  * @class User
  * @param {Object} document An object representing a user ususally a Mongo document
  */
  class User extends LinkParent {
    //eslint-disable-line
    static addFieldsToPublish(fieldsObj) {
      Object.assign(this.fieldsToPublish, fieldsObj);
    }
    /**
    * The personal name of the user account, You if the the user represents the
    * currently logged in user, or this.username otherwise
    * @returns {String} A name representation of the user account
    */


    displayName() {
      return this.isSelf() ? 'You' : this.username;
    }
    /**
    * Check if the this user is the current logged in user or the specified user
    * @param   {Object}  user The user to check against
    * @returns {Boolean} Whether or not this user is the same as the specified user
    */


    isSelf(user) {
      const userId = user && user._id || Meteor.userId();
      return this._id === userId;
    }

  }

  User.fieldsToPublish = {
    username: 1
  };
  User.attachCollection(Meteor.users);
  const UsersSchema = new SimpleSchema({
    username: {
      type: String,
      // For accounts-password, either emails or username is required, but not both. It is OK to make this
      // optional here because the accounts-password package does its own validation.
      // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
      optional: true
    },
    emails: {
      type: Array,
      // For accounts-password, either emails or username is required, but not both. It is OK to make this
      // optional here because the accounts-password package does its own validation.
      // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
      optional: true
    },
    'emails.$': {
      type: Object
    },
    'emails.$.address': {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    'emails.$.verified': {
      type: Boolean
    },
    'emails.$.default': {
      type: Boolean,
      optional: true
    },
    createdAt: {
      type: Date
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
      type: Object,
      optional: true,
      blackbox: true
    },
    heartbeat: {
      type: Date,
      optional: true
    }
  });
  User.attachSchema(UsersSchema);
  LinkableModel.registerParentModel(User);

  if (Package['accounts-password']) {
    Meteor.methods && Meteor.methods({
      /**
      * Sets the default email for the currently logged in users
      * @param {String} emailAddress The email address to set as the current
      */
      setDefaultEmail(emailAddress) {
        check(emailAddress, String);

        if (this.userId) {
          const user = Meteor.users.findOne({
            _id: this.userId,
            'emails.address': emailAddress
          });

          if (user) {
            Meteor.users.update({
              _id: this.userId,
              'emails.default': true
            }, {
              $set: {
                'emails.$.default': false
              }
            });
            Meteor.users.update({
              _id: this.userId,
              'emails.address': emailAddress
            }, {
              $set: {
                'emails.$.default': true
              }
            });
          }
        } else {
          throw new Meteor.Error('NotAuthorized', 'You must be logged in to perform this operation.');
        }
      }

    });
    User.methods({
      /**
      * Set the default email address for the user
      * @param {[type]} emailAddress [description]
      */
      setDefaultEmail(emailAddress) {
        if (Meteor.user().isSelf()) {
          Meteor.call('setDefaultEmail', emailAddress);
        }
      },

      /**
      * Get the default email address for the user
      * @returns {String} The users default email address
      */
      defaultEmail() {
        const obj = this.emails.find(rec => rec.default === true);
        return obj && obj.address || this.emails[0].address;
      }

    });
  }

  return {
    User,
    UsersCollection: Meteor.users
  };
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/socialize:user-model/common/common.js");

/* Exports */
Package._define("socialize:user-model", exports);

})();

//# sourceURL=meteor://💻app/packages/socialize_user-model.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvc29jaWFsaXplOnVzZXItbW9kZWwvY29tbW9uL2NvbW1vbi5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvc29jaWFsaXplOnVzZXItbW9kZWwvY29tbW9uL3VzZXItbW9kZWwuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0IiwiVXNlciIsIlVzZXJzQ29sbGVjdGlvbiIsIk1ldGVvciIsImxpbmsiLCJ2IiwiY2hlY2siLCJMaW5rYWJsZU1vZGVsIiwiTGlua1BhcmVudCIsImNvbnN0cnVjdCIsImRlZmF1bHQiLCJQYWNrYWdlIiwiU2ltcGxlU2NoZW1hIiwiZXhwb3J0RGVmYXVsdCIsImFkZEZpZWxkc1RvUHVibGlzaCIsImZpZWxkc09iaiIsIk9iamVjdCIsImFzc2lnbiIsImZpZWxkc1RvUHVibGlzaCIsImRpc3BsYXlOYW1lIiwiaXNTZWxmIiwidXNlcm5hbWUiLCJ1c2VyIiwidXNlcklkIiwiX2lkIiwiYXR0YWNoQ29sbGVjdGlvbiIsInVzZXJzIiwiVXNlcnNTY2hlbWEiLCJ0eXBlIiwiU3RyaW5nIiwib3B0aW9uYWwiLCJlbWFpbHMiLCJBcnJheSIsInJlZ0V4IiwiUmVnRXgiLCJFbWFpbCIsIkJvb2xlYW4iLCJjcmVhdGVkQXQiLCJEYXRlIiwic2VydmljZXMiLCJibGFja2JveCIsImhlYXJ0YmVhdCIsImF0dGFjaFNjaGVtYSIsInJlZ2lzdGVyUGFyZW50TW9kZWwiLCJtZXRob2RzIiwic2V0RGVmYXVsdEVtYWlsIiwiZW1haWxBZGRyZXNzIiwiZmluZE9uZSIsInVwZGF0ZSIsIiRzZXQiLCJFcnJvciIsImNhbGwiLCJkZWZhdWx0RW1haWwiLCJvYmoiLCJmaW5kIiwicmVjIiwiYWRkcmVzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBQ0MsTUFBSSxFQUFDLE1BQUlBLElBQVY7QUFBZUMsaUJBQWUsRUFB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YWNrYWdlcy9zb2NpYWxpemVfdXNlci1tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBQYWNrYWdlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBjaGVjayB9IGZyb20gJ21ldGVvci9jaGVjayc7XG5pbXBvcnQgeyBMaW5rYWJsZU1vZGVsLCBMaW5rUGFyZW50IH0gZnJvbSAnbWV0ZW9yL3NvY2lhbGl6ZTpsaW5rYWJsZS1tb2RlbCc7XG4vKiBlc2xpbnQtZW5hYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5cbmltcG9ydCBjb25zdHJ1Y3QgZnJvbSAnLi91c2VyLW1vZGVsLmpzJztcblxuY29uc3QgeyBVc2VyLCBVc2Vyc0NvbGxlY3Rpb24gfSA9IGNvbnN0cnVjdCh7IE1ldGVvciwgUGFja2FnZSwgY2hlY2ssIExpbmthYmxlTW9kZWwsIExpbmtQYXJlbnQgfSk7XG5cbmV4cG9ydCB7IFVzZXIsIFVzZXJzQ29sbGVjdGlvbiB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBTaW1wbGVTY2hlbWEgZnJvbSAnc2ltcGwtc2NoZW1hJztcbi8qIGVzbGludC1lbmFibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCAoeyBNZXRlb3IsIFBhY2thZ2UsIGNoZWNrLCBMaW5rYWJsZU1vZGVsLCBMaW5rUGFyZW50IH0pID0+IHtcbiAgICAvKipcbiAgICAqIFJlcHJlc2VudHMgYSBVc2VyXG4gICAgKiBAY2xhc3MgVXNlclxuICAgICogQHBhcmFtIHtPYmplY3R9IGRvY3VtZW50IEFuIG9iamVjdCByZXByZXNlbnRpbmcgYSB1c2VyIHVzdXNhbGx5IGEgTW9uZ28gZG9jdW1lbnRcbiAgICAqL1xuICAgIGNsYXNzIFVzZXIgZXh0ZW5kcyBMaW5rUGFyZW50IHsgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIHN0YXRpYyBmaWVsZHNUb1B1Ymxpc2ggPSB7IHVzZXJuYW1lOiAxIH07XG5cbiAgICAgICAgc3RhdGljIGFkZEZpZWxkc1RvUHVibGlzaChmaWVsZHNPYmopIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5maWVsZHNUb1B1Ymxpc2gsIGZpZWxkc09iaik7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgKiBUaGUgcGVyc29uYWwgbmFtZSBvZiB0aGUgdXNlciBhY2NvdW50LCBZb3UgaWYgdGhlIHRoZSB1c2VyIHJlcHJlc2VudHMgdGhlXG4gICAgICAgICogY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyLCBvciB0aGlzLnVzZXJuYW1lIG90aGVyd2lzZVxuICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IEEgbmFtZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdXNlciBhY2NvdW50XG4gICAgICAgICovXG4gICAgICAgIGRpc3BsYXlOYW1lKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTZWxmKCkgPyAnWW91JyA6IHRoaXMudXNlcm5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgKiBDaGVjayBpZiB0aGUgdGhpcyB1c2VyIGlzIHRoZSBjdXJyZW50IGxvZ2dlZCBpbiB1c2VyIG9yIHRoZSBzcGVjaWZpZWQgdXNlclxuICAgICAgICAqIEBwYXJhbSAgIHtPYmplY3R9ICB1c2VyIFRoZSB1c2VyIHRvIGNoZWNrIGFnYWluc3RcbiAgICAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gV2hldGhlciBvciBub3QgdGhpcyB1c2VyIGlzIHRoZSBzYW1lIGFzIHRoZSBzcGVjaWZpZWQgdXNlclxuICAgICAgICAqL1xuICAgICAgICBpc1NlbGYodXNlcikge1xuICAgICAgICAgICAgY29uc3QgdXNlcklkID0gKHVzZXIgJiYgdXNlci5faWQpIHx8IE1ldGVvci51c2VySWQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lkID09PSB1c2VySWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBVc2VyLmF0dGFjaENvbGxlY3Rpb24oTWV0ZW9yLnVzZXJzKTtcblxuICAgIGNvbnN0IFVzZXJzU2NoZW1hID0gbmV3IFNpbXBsZVNjaGVtYSh7XG4gICAgICAgIHVzZXJuYW1lOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICAvLyBGb3IgYWNjb3VudHMtcGFzc3dvcmQsIGVpdGhlciBlbWFpbHMgb3IgdXNlcm5hbWUgaXMgcmVxdWlyZWQsIGJ1dCBub3QgYm90aC4gSXQgaXMgT0sgdG8gbWFrZSB0aGlzXG4gICAgICAgICAgICAvLyBvcHRpb25hbCBoZXJlIGJlY2F1c2UgdGhlIGFjY291bnRzLXBhc3N3b3JkIHBhY2thZ2UgZG9lcyBpdHMgb3duIHZhbGlkYXRpb24uXG4gICAgICAgICAgICAvLyBUaGlyZC1wYXJ0eSBsb2dpbiBwYWNrYWdlcyBtYXkgbm90IHJlcXVpcmUgZWl0aGVyLiBBZGp1c3QgdGhpcyBzY2hlbWEgYXMgbmVjZXNzYXJ5IGZvciB5b3VyIHVzYWdlLlxuICAgICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGVtYWlsczoge1xuICAgICAgICAgICAgdHlwZTogQXJyYXksXG4gICAgICAgICAgICAvLyBGb3IgYWNjb3VudHMtcGFzc3dvcmQsIGVpdGhlciBlbWFpbHMgb3IgdXNlcm5hbWUgaXMgcmVxdWlyZWQsIGJ1dCBub3QgYm90aC4gSXQgaXMgT0sgdG8gbWFrZSB0aGlzXG4gICAgICAgICAgICAvLyBvcHRpb25hbCBoZXJlIGJlY2F1c2UgdGhlIGFjY291bnRzLXBhc3N3b3JkIHBhY2thZ2UgZG9lcyBpdHMgb3duIHZhbGlkYXRpb24uXG4gICAgICAgICAgICAvLyBUaGlyZC1wYXJ0eSBsb2dpbiBwYWNrYWdlcyBtYXkgbm90IHJlcXVpcmUgZWl0aGVyLiBBZGp1c3QgdGhpcyBzY2hlbWEgYXMgbmVjZXNzYXJ5IGZvciB5b3VyIHVzYWdlLlxuICAgICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgICdlbWFpbHMuJCc6IHtcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgfSxcbiAgICAgICAgJ2VtYWlscy4kLmFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICByZWdFeDogU2ltcGxlU2NoZW1hLlJlZ0V4LkVtYWlsLFxuICAgICAgICB9LFxuICAgICAgICAnZW1haWxzLiQudmVyaWZpZWQnOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICB9LFxuICAgICAgICAnZW1haWxzLiQuZGVmYXVsdCc6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlZEF0OiB7XG4gICAgICAgICAgICB0eXBlOiBEYXRlLFxuICAgICAgICB9LFxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhpcyBzZXJ2aWNlcyBmaWVsZCBpcyBpbiB5b3VyIHNjaGVtYSBpZiB5b3UncmUgdXNpbmcgYW55IG9mIHRoZSBhY2NvdW50cyBwYWNrYWdlc1xuICAgICAgICBzZXJ2aWNlczoge1xuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgICAgICBibGFja2JveDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgaGVhcnRiZWF0OiB7XG4gICAgICAgICAgICB0eXBlOiBEYXRlLFxuICAgICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBVc2VyLmF0dGFjaFNjaGVtYShVc2Vyc1NjaGVtYSk7XG5cbiAgICBMaW5rYWJsZU1vZGVsLnJlZ2lzdGVyUGFyZW50TW9kZWwoVXNlcik7XG5cblxuICAgIGlmIChQYWNrYWdlWydhY2NvdW50cy1wYXNzd29yZCddKSB7XG4gICAgICAgIE1ldGVvci5tZXRob2RzICYmIE1ldGVvci5tZXRob2RzKHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBTZXRzIHRoZSBkZWZhdWx0IGVtYWlsIGZvciB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2Vyc1xuICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW1haWxBZGRyZXNzIFRoZSBlbWFpbCBhZGRyZXNzIHRvIHNldCBhcyB0aGUgY3VycmVudFxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHNldERlZmF1bHRFbWFpbChlbWFpbEFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICBjaGVjayhlbWFpbEFkZHJlc3MsIFN0cmluZyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlcklkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBNZXRlb3IudXNlcnMuZmluZE9uZSh7IF9pZDogdGhpcy51c2VySWQsICdlbWFpbHMuYWRkcmVzcyc6IGVtYWlsQWRkcmVzcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1ldGVvci51c2Vycy51cGRhdGUoeyBfaWQ6IHRoaXMudXNlcklkLCAnZW1haWxzLmRlZmF1bHQnOiB0cnVlIH0sIHsgJHNldDogeyAnZW1haWxzLiQuZGVmYXVsdCc6IGZhbHNlIH0gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBNZXRlb3IudXNlcnMudXBkYXRlKHsgX2lkOiB0aGlzLnVzZXJJZCwgJ2VtYWlscy5hZGRyZXNzJzogZW1haWxBZGRyZXNzIH0sIHsgJHNldDogeyAnZW1haWxzLiQuZGVmYXVsdCc6IHRydWUgfSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ05vdEF1dGhvcml6ZWQnLCAnWW91IG11c3QgYmUgbG9nZ2VkIGluIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24uJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgVXNlci5tZXRob2RzKHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBTZXQgdGhlIGRlZmF1bHQgZW1haWwgYWRkcmVzcyBmb3IgdGhlIHVzZXJcbiAgICAgICAgICAgICogQHBhcmFtIHtbdHlwZV19IGVtYWlsQWRkcmVzcyBbZGVzY3JpcHRpb25dXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2V0RGVmYXVsdEVtYWlsKGVtYWlsQWRkcmVzcykge1xuICAgICAgICAgICAgICAgIGlmIChNZXRlb3IudXNlcigpLmlzU2VsZigpKSB7XG4gICAgICAgICAgICAgICAgICAgIE1ldGVvci5jYWxsKCdzZXREZWZhdWx0RW1haWwnLCBlbWFpbEFkZHJlc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICogR2V0IHRoZSBkZWZhdWx0IGVtYWlsIGFkZHJlc3MgZm9yIHRoZSB1c2VyXG4gICAgICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSB1c2VycyBkZWZhdWx0IGVtYWlsIGFkZHJlc3NcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBkZWZhdWx0RW1haWwoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0gdGhpcy5lbWFpbHMuZmluZChyZWMgPT4gcmVjLmRlZmF1bHQgPT09IHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiAob2JqICYmIG9iai5hZGRyZXNzKSB8fCB0aGlzLmVtYWlsc1swXS5hZGRyZXNzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgVXNlciwgVXNlcnNDb2xsZWN0aW9uOiBNZXRlb3IudXNlcnMgfTtcbn07XG4iXX0=
