import React, { Component } from 'react'
import api from '../../utils/api'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import accountReducer from '../../reducers/accountReducer'

class Account extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {
			currentUser: {
				firstName:'',
				lastName:'',
				email:'',
				password: ''
			}
		}
	}

	componentDidMount(){
		// var _this = this
		api.handleGet('/account/currentuser', null, function(err, response){
			if (err) {
                alert(err.message)
                return
			}

			console.log(JSON.stringify(response))
			// var user = response.user
			// _this.setState({
			// 	currentUser: user
			// })
			// return
			store.dispatch(actions.currentUserReceived(response))

		})

	}

	render() {
		return (
            <div>
                This is the Account Page!
                <h1>{this.state.currentUser.firstName}, {this.state.currentUser.lastName}</h1>
            </div>    
		)
	}
}

const stateToProps=function(state){
	return {
		currentUser: state.accountReducer.currentUser
	}
}
export default connect(stateToProps)(Account)