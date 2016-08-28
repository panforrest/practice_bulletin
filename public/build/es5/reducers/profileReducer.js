"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
        profiles: {},
        profilesArray: []
};

module.exports = function (_x, action) {
        var state = arguments[0] === undefined ? initialState : arguments[0];
        switch (action.type) {
                case constants.PROFILES_RECEIVED:
                        console.log("PROFILES_RECEIVED: " + JSON.stringify(action.profiles));
                        var newState = Object.assign({}, state);
                        var array = [];

                        for (var i = 0; i < action.profiles.length; i++) {
                                var profile = action.profiles[i];
                                array.push(profile);
                        }

                        newState.profilesArray = array;
                        return newState;

                default:
                        return state;
        }


};