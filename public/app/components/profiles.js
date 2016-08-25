import React, { Component } from 'react'
import api from '../utils/api'

class Profiles extends Component {
	constructor(props, context){
		super(props, context)
		this.updateNewProfile = this.updateNewProfile.bind(this)
		this.addProfile = this.addProfile.bind(this)
		this.state = {
			newProfile: {
				firstName:'',
				lastName:'',
				email:'',
				password:''
		    }  
		}
		
	}

    updateNewProfile(event){
    	console.log('updateNewProfile: '+event.target.id+' - '+event.target.value)
        var profile = Object.assign({}, this.state.newProfile)
        profile[event.target.id] = event.target.value
    	this.setState({
    		newProfile: profile
    	})

    }

    addProfile(event){
    	console.log('addProfile: '+JSON.stringify(this.state.newProfile))
    	api.handlePost('/api/profile', this.state.newProfile, function(err, result){
    		if (err) {
    			alert('oops! ' + err)
    			return
    		}

            console.log('Profile Created: '+JSON.stringify(result))
    	})
    }

	render(){


		return (
			<div>
			    <h3>This is Profiles Component!</h3>                

			    <input onChange={this.updateNewProfile} name="firstName" id="firstName" placeholder="First Name"/><br />
			    <input onChange={this.updateNewProfile} type="text" name="laststName" id="lastName" placeholder="Last Name"/><br />
			    <input onChange={this.updateNewProfile} type="text" name="email" id="email" placeholder="Email Address"/><br />
			    <input onChange={this.updateNewProfile} type="text" name="password" id="password" placeholder="Password"/><br />
                <button onClick={this.addProfile}>Add</button>
			</div>

		)
	}
}

export default Profiles
