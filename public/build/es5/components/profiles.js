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

var connect = require("react-redux").connect;
var actions = _interopRequire(require("../actions/actions"));

var Profiles = (function (Component) {
	function Profiles(props, context) {
		_classCallCheck(this, Profiles);

		_get(Object.getPrototypeOf(Profiles.prototype), "constructor", this).call(this, props, context);
		this.updateNewProfile = this.updateNewProfile.bind(this);
		this.addProfile = this.addProfile.bind(this);
		this.state = {
			newProfile: {
				firstName: "",
				lastName: "",
				email: "",
				password: ""
			}
		};
	}

	_inherits(Profiles, Component);

	_prototypeProperties(Profiles, null, {
		componentDidMount: {
			value: function componentDidMount() {
				// console.log('componentDidMount:')
				api.handleGet("/api/profile", null, function (err, response) {
					if (err) {
						alert("oops! " + err);
						return;
					}

					console.log("componentDidMount: " + JSON.stringify(response));
					store.dispatch(actions.profilesReceived(response.results));
				});
			},
			writable: true,
			configurable: true
		},
		addProfile: {
			value: function addProfile(event) {
				console.log("addProfile: " + JSON.stringify(this.state.newProfile));
				api.handlePost("/api/profile", this.state.newProfile, function (err, response) {
					if (err) {
						alert("oops! " + err);
						return;
					}

					//console.log('Profile Created: '+JSON.stringify(result))
					store.dispatch(actions.profileCreated(response.result));
				});
			},
			writable: true,
			configurable: true
		},
		updateNewProfile: {
			value: function updateNewProfile(event) {
				console.log("updateNewProfile: " + event.target.id + " - " + event.target.value);
				var profile = Object.assign({}, this.state.newProfile);
				profile[event.target.id] = event.target.value;
				this.setState({
					newProfile: profile
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				console.log("RENDER: " + JSON.stringify(this.props.profiles));
				var profileList = this.props.profiles.map(function (profile, i) {
					return React.createElement(
						"li",
						{ key: profile.id },
						" ",
						profile.firstName,
						", ",
						profile.lastName
					);
				});


				return React.createElement(
					"div",
					null,
					React.createElement(
						"h3",
						null,
						"This is Profiles Component!"
					),
					" ",
					React.createElement("br", null),
					profileList,
					React.createElement("input", { onChange: this.updateNewProfile, type: "text", name: "firstName", id: "firstName", placeholder: "First Name" }),
					React.createElement("br", null),
					React.createElement("input", { onChange: this.updateNewProfile, type: "text", name: "laststName", id: "lastName", placeholder: "Last Name" }),
					React.createElement("br", null),
					React.createElement("input", { onChange: this.updateNewProfile, type: "text", name: "email", id: "email", placeholder: "Email Address" }),
					React.createElement("br", null),
					React.createElement("input", { onChange: this.updateNewProfile, type: "text", name: "password", id: "password", placeholder: "Password" }),
					React.createElement("br", null),
					React.createElement(
						"button",
						{ onClick: this.addProfile },
						"Add"
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Profiles;
})(Component);

var stateToProps = function (state) {
	console.log("STATE TO PROPS: " + JSON.stringify(state.profileReducer.profilesArray));
	return {
		profiles: state.profileReducer.profilesArray
	};
};

module.exports = connect(stateToProps)(Profiles);