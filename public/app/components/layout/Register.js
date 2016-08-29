import React, { Component } from 'react'
import api from '../../utils/api'

class Register extends Component {

	constructor(props, context){
		super(props, context)
		this.updateUser = this.updateUser.bind(this)
		this.register = this.register.bind(this)
		this.state={
			user: {
				firstName:'',
				lastName:'',
				email:'',
				password:''
			}
		}
	}

	updateUser(event){
        console.log('updateUser: '+event.target.id+' == '+event.target.value)
        var updatedUser = Object.assign({}, this.state.user)
        updatedUser[event.target.id] = event.target.value
        this.setState({
        	user: updatedUser
        })
	}

    register(event){
    	event.preventDefault()
    	console.log('updateUser: '+JSON.stringify(this.state.user))
    	api.handlePost('/api/profile', this.state.user, function(err, response){
    		if (err){
    			alert(err.message)
    			return
    		}

    		console.log('PROFILE CREATED:'+JSON.stringify(response))
    		window.location.href = '/account'
    	})
    }

	render(){
		return (
			<div>
				<input type="text" onChange={this.updateUser} id="firstName" placeholder="First Name" /><br />
				<input type="text" onChange={this.updateUser} id="lastName" placeholder="Last Name" /><br />
				<input type="text" onChange={this.updateUser} id="email" placeholder="Email" /><br />
				<input type="text" onChange={this.updateUser} id="password" placeholder="Password" /><br />
				<button onClick={this.register}>Register</button>
			</div>
		)
	}
}

export default Register