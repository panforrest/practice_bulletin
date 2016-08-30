import React, { Component } from 'react'
import api from '../utils/api'
import store from '../stores/store'
import actions from '../actions/actions'
import { connect } from 'react-redux'

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

    componentDidMount(){
        console.log('componentDidMount: ')
        api.handleGet('/api/community', null, function(err, response){
            if (err){
                alert('oops! '+err)
                return
            }

            store.dispatch(actions.communitiesReceived(response.results))
        })

    }

    addNewCommunity(event){
        // console.log('submit: ')

        api.handlePost('/api/community', this.state.newCommunity, function(err, response){
            if(err){
                alert('oops! '+err)
                return
            } 

            // console.log('addNewCommunity:'+JSON.stringify(result))
            store.dispatch(actions.communityCreated(response.result))
        })
    }

	updateNewCommunity(event){
		// console.log('updateNewcommunity: '+event.target.id+' = '+event.target.value)
		var community = Object.assign({}, this.state.newCommunity)
        community[event.target.id] = event.target.value
        this.setState({
        	newCommunity: community
        })
	}

    render() {
        // console.log('RENDER: '+this.props.communities)
        var communityList = this.props.communities.map(function(community, i){
            return <li key={community.id}> <a href={'/community/'+community.slug}>{community.name}, {community.city}</a></li>
        })

    	return(
    		<div>
    		    This is community Component!
                <br />
    		    <input onChange={this.updateNewCommunity} type="text" id="name" name="name" placeholder="Name" /><br />
                <input onChange={this.updateNewCommunity} type="text" id="address" name="address" placeholder="Address" /><br />
                <input onChange={this.updateNewCommunity} type="text" id="city" name="city" placeholder="City" /><br />
                <input onChange={this.updateNewCommunity} type="text" id="state" name="state" placeholder="State" /><br />
                <button onClick={this.addNewCommunity}>Add</button> <br/>

                {communityList}
    		</div>

    	)
    }
}

const propsToState = function(state){
    // console.log('POPS TO STATE: '+JSON.stringify(state))

    return {
        communities: state.communityReducer.communitiesArray
    }
}

export default connect(propsToState)(Communities)