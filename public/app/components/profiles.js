import React, { Component } from 'react'
import api from '../utils/api'
import store from '../stores/store'
import { connect } from 'react-redux'
import actions from '../actions/actions'

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

	componentDidMount(){
		console.log('componentDidMount:')
		api.handleGet('/api/profile', null, function(err, response){
			if(err) {
				alert('oops! ' + err)
				return
			}

			// console.log('componentDidMount: '+JSON.stringify(results))
			store.dispatch(actions.profilesReceived(response.results))
		})
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
		console.log('RENDER: '+JSON.stringify(this.props.profiles))
		var profileList = this.props.profiles.map(function(profile, i){
			return <li key={profile.id}> {profile.firstName}, {profile.lastName}</li>
		})


		return (
			<div>
			    <h3>This is Profiles Component!</h3> <br />
			    {profileList}               

			    <input onChange={this.updateNewProfile} type="text" name="firstName" id="firstName" placeholder="First Name"/><br />
			    <input onChange={this.updateNewProfile} type="text" name="laststName" id="lastName" placeholder="Last Name"/><br />
			    <input onChange={this.updateNewProfile} type="text" name="email" id="email" placeholder="Email Address"/><br />
			    <input onChange={this.updateNewProfile} type="text" name="password" id="password" placeholder="Password"/><br />
                <button onClick={this.addProfile}>Add</button>
			</div>

		)
	}
}

const stateToProps = function(state){


	return {
		profiles: state.profileReducer.profilesArray
	}
}

export default connect(stateToProps)(Profiles)
