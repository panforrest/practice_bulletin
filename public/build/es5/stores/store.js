"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _redux = require("redux");

var createStore = _redux.createStore;
var applyMiddleware = _redux.applyMiddleware;
var combineReducers = _redux.combineReducers;
var thunk = _interopRequire(require("redux-thunk"));

var communityReducer = _interopRequire(require("../reducers/communityReducer"));

var profileReducer = _interopRequire(require("../reducers/profileReducer"));

var accountReducer = _interopRequire(require("../reducers/accountReducer"));

var postReducer = _interopRequire(require("../reducers/postReducer"));

var reducers = combineReducers({
    communityReducer: communityReducer,
    profileReducer: profileReducer,
    accountReducer: accountReducer,
    postReducer: postReducer
});

var store = createStore(reducers, applyMiddleware(thunk));

module.exports = store;