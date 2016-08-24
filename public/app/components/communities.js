import React, { Component } from 'react'
import api from '../utils/api'

class Communities extends Component {

	constructor(context, props){
		super(context, props)
		this.updateNewCommunity = this.updateNewCommunity.bind(this)
		this.addNewCommunity = this.addNewCommunity.bind(this)
		this.state = {
            newCommunity: {
            	name:'',
            	address:'',
            	city:'',
            	state:''
            }
		}
	}

	updateNewCommunity(event){
		console.log('updateNewcommunity: '+event.target.id+' = '+event.target.value)
		var community = Object.assign({}, this.state.newCommunity)
        community[event.target.id] = event.target.value
        this.setState({
        	newCommunity: community
        })
	}

    addNewCommunity(event){
    	// console.log('submit: ')

    	api.handlePost('/api/community', this.state.newCommunity, function(err, result){
            if(err){
            	alert('oops! '+err)
            	return
            } 

            console.log('addNewCommunity:'+JSON.stringify(result))
    	})
    }

    render() {
    	return(
    		<div>
    		    This is community Component!
                <br />
    		    <input onChange={this.updateNewCommunity} type="text" id="name" name="name" placeholder="Name" /><br />
                <input onChange={this.updateNewCommunity} type="text" id="address" name="address" placeholder="Address" /><br />
                <input onChange={this.updateNewCommunity} type="text" id="city" name="city" placeholder="City" /><br />
                <input onChange={this.updateNewCommunity} type="text" id="state" name="state" placeholder="State" /><br />
                <button onClick={this.addNewCommunity}>Add</button>
    		</div>

    	)
    }

}

export default Communities