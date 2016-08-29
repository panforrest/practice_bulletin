import React, { Component } from 'react'
import api from '../../utils/api'
import actions from '../../actions/actions'
import store from '../../stores/store'
import { connect } from 'react-redux'

class Register extends Component {
    
    constructor(props, context){
    	super(props, context)
    	this.updateNewProfile = this.updateNewProfile.bind(this)
    	this.submit = this.submit.bind(this)
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
        // console.log('componentDidMount: ')
        api.handleGet('/api/profile', null, function(err, response){
            if (err) {
                alert(err.message)
                return
            }
            console.log('Community Received: '+JSON.stringify(response))

            //store.dispatch(actions.profilesReceived(response.results))
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

    submit(event){
    	// console.log('submit: '+JSON.stringify(this.state.newProfile))
    	api.handlePost('/api/profile', this.state.newProfile, function(err, response){
    		if (err) {
    			alert(err.message)
    			return
    		}

    		console.log('PROFILE CREATED: '+JSON.stringify(response))
    		//store.dispatch(actions.profileCreated(response.result))
            window.location.href = '/account'
    	})
    }

	render() {
        console.log('RENDER: '+JSON.stringify(this.props.profiles))
        var profileList = this.props.profiles.map(function(profile, i){
            return <li key={profile.id}>{profile.firstName}, {profile.lastName}, {profile.email}, {profile.password}</li>
        })

		return (
			<div>
			    Register Page <br />
			    <input onChange={this.updateNewProfile} name="firstName" id="firstName" placeholder="First Name" /><br />
			    <input onChange={this.updateNewProfile} name="lastName" id="lasstName" placeholder="Last Name" /><br />
			    <input onChange={this.updateNewProfile} name="email" id="email" placeholder="Email" /><br />
			    <input onChange={this.updateNewProfile} name="password" id="password" placeholder="Password" /><br />
			    <button onClick={this.submit}>SUBMIT</button>
                <br />
                <ol>
                    {profileList}
                </ol>

			</div>

		)
	}
}

const stateToProps = function(state){
    console.log('STATE TO PROPS: '+JSON.stringify(state))
    return {
        profiles: state.profileReducer.profilesArray
    }        
}

export default connect(stateToProps)(Register)

















