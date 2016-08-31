"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var api = _interopRequire(require("../../utils/api"));

var Nav = _interopRequire(require("../../components/Nav"));

var actions = _interopRequire(require("../../actions/actions"));

var store = _interopRequire(require("../../stores/store"));

var connect = require("react-redux").connect;
var Community = (function (Component) {
    function Community(props, context) {
        _classCallCheck(this, Community);

        _get(Object.getPrototypeOf(Community.prototype), "constructor", this).call(this, props, context);
        this.updatePost = this.updatePost.bind(this);
        this.addPost = this.addPost.bind(this);
        this.state = {
            community: {
                name: ""
            },
            post: {
                title: "",
                text: "",
                community: "",
                profile: "",
                timestamp: ""
            }

        };
    }

    _inherits(Community, Component);

    _prototypeProperties(Community, null, {
        componentDidMount: {
            value: function componentDidMount() {


                var _this = this;
                var endpoint = "/api/community?slug=" + this.props.slug;
                api.handleGet(endpoint, null, function (err, response) {
                    if (err) {
                        alert(err.message);
                        return;
                    }
                    // console.log('Community Page: componentDidMount '+JSON.stringify(response.results))
                    var results = response.results;
                    // var community = results[0]
                    // _this.setState({
                    // 	community: community
                    // })
                    store.dispatch(actions.communitiesReceived(results));
                });
            },
            writable: true,
            configurable: true
        },
        updatePost: {
            value: function updatePost(event) {
                console.log("updatePost: " + event.target.id + " - " + event.target.value);
                var updatedPost = Object.assign({}, this.state.post);
                updatedPost[event.target.id] = event.target.value;
                this.setState({
                    post: updatedPost
                });
            },
            writable: true,
            configurable: true
        },
        addPost: {
            value: function addPost(event) {
                console.log("addPost: " + JSON.stringify(this.state.post));
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(Nav, { transparent: "no" }),
                    React.createElement(
                        "section",
                        { id: "content" },
                        React.createElement(
                            "div",
                            { className: "content-wrap" },
                            React.createElement(
                                "div",
                                { className: "container clearfix" },
                                React.createElement(
                                    "div",
                                    { className: "postcontent nobottommargin clearfix" },
                                    React.createElement(
                                        "h4",
                                        null,
                                        this.props.community.name
                                    ),
                                    React.createElement("input", { onChange: this.updatePost, id: "title", placeholder: "Post Title", className: "form-control", type: "text" }),
                                    React.createElement("br", null),
                                    React.createElement("textarea", { onChange: this.updatePost, id: "text", placeholder: "Post Text", className: "form-control" }),
                                    React.createElement("br", null),
                                    React.createElement(
                                        "button",
                                        { onClick: this.addPost, className: "btn btn-success" },
                                        "Add Post"
                                    ),
                                    React.createElement("br", null),
                                    React.createElement("hr", { style: { borderTop: "1px solid red #444" } }),
                                    React.createElement(
                                        "div",
                                        { className: "list-group" },
                                        React.createElement(
                                            "a",
                                            { href: "#", className: "list-group-item" },
                                            React.createElement(
                                                "h4",
                                                { className: "list-group-item-heading" },
                                                "List group item heading"
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "list-group-item-text" },
                                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio."
                                            )
                                        ),
                                        React.createElement(
                                            "a",
                                            { href: "#", className: "list-group-item" },
                                            React.createElement(
                                                "h4",
                                                { className: "list-group-item-heading" },
                                                "List group item heading"
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "list-group-item-text" },
                                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio."
                                            )
                                        ),
                                        React.createElement(
                                            "a",
                                            { href: "#", className: "list-group-item" },
                                            React.createElement(
                                                "h4",
                                                { className: "list-group-item-heading" },
                                                "List group item heading"
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "list-group-item-text" },
                                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio."
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Community;
})(Component);

var stateToProps = function (state) {
    var communitiesArray = state.communityReducer.communitiesArray;

    return {
        community: communitiesArray.length == 0 ? { name: "" } : communitiesArray[0]
    };
};

module.exports = connect(stateToProps)(Community);
//THIS LINE OF CODE DON'T UNDERSTAND