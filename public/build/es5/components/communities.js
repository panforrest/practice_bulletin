"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var api = _interopRequire(require("../utils/api"));

var store = _interopRequire(require("../stores/store"));

var actions = _interopRequire(require("../actions/actions"));

var connect = require("react-redux").connect;
var Communities = (function (Component) {
    function Communities(context, props) {
        _classCallCheck(this, Communities);

        _get(Object.getPrototypeOf(Communities.prototype), "constructor", this).call(this, context, props);
        this.updateNewCommunity = this.updateNewCommunity.bind(this);
        this.addNewCommunity = this.addNewCommunity.bind(this);
        this.state = {
            newCommunity: {
                name: "",
                address: "",
                city: "",
                state: ""
            }

        };
    }

    _inherits(Communities, Component);

    _prototypeProperties(Communities, null, {
        componentDidMount: {
            value: function componentDidMount() {
                console.log("componentDidMount: ");
                api.handleGet("/api/community", null, function (err, response) {
                    if (err) {
                        alert("oops! " + err);
                        return;
                    }

                    store.dispatch(actions.communitiesReceived(response.results));
                });
            },
            writable: true,
            configurable: true
        },
        addNewCommunity: {
            value: function addNewCommunity(event) {
                // console.log('submit: ')

                api.handlePost("/api/community", this.state.newCommunity, function (err, response) {
                    if (err) {
                        alert("oops! " + err);
                        return;
                    }

                    // console.log('addNewCommunity:'+JSON.stringify(result))
                    store.dispatch(actions.communityCreated(response.result));
                });
            },
            writable: true,
            configurable: true
        },
        updateNewCommunity: {
            value: function updateNewCommunity(event) {
                // console.log('updateNewcommunity: '+event.target.id+' = '+event.target.value)
                var community = Object.assign({}, this.state.newCommunity);
                community[event.target.id] = event.target.value;
                this.setState({
                    newCommunity: community
                });
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                // console.log('RENDER: '+this.props.communities)
                var communityList = this.props.communities.map(function (community, i) {
                    return React.createElement(
                        "li",
                        { key: community.id },
                        " ",
                        community.name,
                        ", ",
                        community.city
                    );
                });

                return React.createElement(
                    "div",
                    null,
                    "This is community Component!",
                    React.createElement("br", null),
                    React.createElement("input", { onChange: this.updateNewCommunity, type: "text", id: "name", name: "name", placeholder: "Name" }),
                    React.createElement("br", null),
                    React.createElement("input", { onChange: this.updateNewCommunity, type: "text", id: "address", name: "address", placeholder: "Address" }),
                    React.createElement("br", null),
                    React.createElement("input", { onChange: this.updateNewCommunity, type: "text", id: "city", name: "city", placeholder: "City" }),
                    React.createElement("br", null),
                    React.createElement("input", { onChange: this.updateNewCommunity, type: "text", id: "state", name: "state", placeholder: "State" }),
                    React.createElement("br", null),
                    React.createElement(
                        "button",
                        { onClick: this.addNewCommunity },
                        "Add"
                    ),
                    " ",
                    React.createElement("br", null),
                    communityList
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Communities;
})(Component);

var propsToState = function (state) {
    // console.log('POPS TO STATE: '+JSON.stringify(state))

    return {
        communities: state.communityReducer.communitiesArray
    };
};

module.exports = connect(propsToState)(Communities);