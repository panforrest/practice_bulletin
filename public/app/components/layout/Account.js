import React, { Component } from 'react'
import api from '../../utils/api'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import accountReducer from '../../reducers/accountReducer'

class Account extends Component {

	constructor(props, context){
		super(props, context)
		this.logout = this.logout.bind(this)
		this.state = {
			currentUser: {
				firstName:'',
				lastName:'',
				email:''
			}
		}
	}

	componentDidMount(){
		var _this = this
		api.handleGet('/account/currentuser', null, function(err, response){
			if (err) {
                alert(err.message)
                return
			}

			// console.log(JSON.stringify(response))
			// var user = response.user
			// _this.setState({
			// 	currentUser: user
			// })
			// return
			store.dispatch(actions.currentUserReceived(response.user))
            return
		})

	}

	logout(event){
		event.preventDefault()
		console.log('LOGOUT: ')
		api.handleGet('/account/logout', null, function(err, response){
			if (err) {
				alert(err.message)
				return
			}

			window.location.href = '/'
		})
	}

	render() {
		return (
            <div>
                This is the Account Page!
                <h1>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</h1>
                <button onClick={this.logout}>Logout</button>
            </div>    
		)
	}
}

const stateToProps=function(state){
	return {
		currentUser: state.accountReducer.currentUser
	}
}
export default connect (stateToProps)(Account)