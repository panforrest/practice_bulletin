import React, { Component } from 'react'
import api from '../../utils/api'

class Account extends Component {

	constructor(props, context){
		super(props, context)
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

			console.log(JSON.stringify(response))
			var user = response.user
			_this.setState({
				currentUser: user
			})
			return
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

export default Account