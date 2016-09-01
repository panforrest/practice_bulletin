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
var CommunityPreview = _interopRequire(require("./CommunityPreview"));

var Nav = _interopRequire(require("../components/Nav"));

var Communities = (function (Component) {
    function Communities(context, props) {
        _classCallCheck(this, Communities);

        _get(Object.getPrototypeOf(Communities.prototype), "constructor", this).call(this, context, props);
        this.updateCredentials = this.updateCredentials.bind(this);
        this.login = this.login.bind(this);
        this.updateNewCommunity = this.updateNewCommunity.bind(this);
        this.addNewCommunity = this.addNewCommunity.bind(this);
        this.state = {
            newCommunity: {
                name: "",
                address: "",
                city: "",
                state: ""
            },
            credentials: {
                email: "",
                password: ""
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
        updateCredentials: {
            value: function updateCredentials(event) {
                var credentials = Object.assign({}, this.state.credentials);
                credentials[event.target.id] = event.target.value;
                this.setState({
                    credentials: credentials
                });
            },
            writable: true,
            configurable: true
        },
        login: {
            value: function login(event) {
                event.preventDefault();
                // console.log('LOGIN: '+JSON.stringify(this.state.user))
                api.handlePost("/account/login", this.state.credentials, function (err, response) {
                    // console.log('LOGIN TEST: ')
                    if (err != null) {
                        alert(err.message);
                        return;
                    }

                    console.log("USER LOGGED IN: " + JSON.stringify(response));
                    window.location.href = "/account";
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
                var communityList = this.props.communities.map(function (community, i) {
                    return React.createElement(CommunityPreview, { key: community.id, community: community });
                });

                var loginOrAddCommunity = "";
                if (this.props.currentUser.id == null) {
                    loginOrAddCommunity = React.createElement(
                        "div",
                        { className: "well well-lg nobottommargin" },
                        React.createElement(
                            "h2",
                            null,
                            "Login"
                        ),
                        React.createElement("input", { type: "text", onChange: this.updateCredentials, id: "email", placeholder: "Email" }),
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", onChange: this.updateCredentials, id: "password", placeholder: "Password" }),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: this.login },
                            "Login"
                        )
                    );
                } else {
                    loginOrAddCommunity = React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "h2",
                            null,
                            "Add Community"
                        ),
                        React.createElement("input", { type: "text", onChange: this.updateNewCommunity, id: "name", placeholder: "Name" }),
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", onChange: this.updateNewCommunity, id: "address", placeholder: "Address" }),
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", onChange: this.updateNewCommunity, id: "city", placeholder: "City" }),
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", onChange: this.updateNewCommunity, id: "state", placeholder: "State" }),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: this.addNewCommunity },
                            "Submit"
                        )
                    );
                }










                return React.createElement(
                    "div",
                    null,
                    React.createElement(Nav, { transparent: "yes" }),
                    React.createElement("section", { id: "slider", style: { background: "url(\"/images/nyc.jpg\") center", overflow: "visible" }, "data-height-lg": "450", "data-height-md": "450", "data-height-sm": "600", "data-height-xs": "600", "data-height-xxs": "600" }),
                    React.createElement(
                        "section",
                        { id: "content" },
                        React.createElement(
                            "div",
                            { className: "col_three_fifth bothsidebar nobottommargin" },
                            React.createElement(
                                "div",
                                { className: "fancy-title title-border" },
                                React.createElement(
                                    "h3",
                                    null,
                                    "Communities"
                                )
                            ),
                            React.createElement(
                                "div",
                                { id: "posts", className: "events small-thumbs" },
                                communityList
                            )
                        ),
                        loginOrAddCommunity
                    )
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Communities;
})(Component);

var propsToState = function (state) {
    console.log("POPS TO STATE: " + JSON.stringify(state));

    return {
        communities: state.communityReducer.communitiesArray,
        currentUser: state.accountReducer.currentUser
    };
};

module.exports = connect(propsToState)(Communities);