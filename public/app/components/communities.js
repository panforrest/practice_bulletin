import React, { Component } from 'react'
import api from '../utils/api'
import store from '../stores/store'
import actions from '../actions/actions'
import { connect } from 'react-redux'
import CommunityPreview from './CommunityPreview'
import Nav from '../components/Nav'

class Communities extends Component {

	constructor(context, props){
		super(context, props)
        this.updateCredentials = this.updateCredentials.bind(this)
        this.login = this.login.bind(this)
		this.updateNewCommunity = this.updateNewCommunity.bind(this)
		this.addNewCommunity = this.addNewCommunity.bind(this)
		this.state = {
            newCommunity: {
            	name:'',
            	address:'',
            	city:'',
            	state:''
            },
            credentials: {
                email:'',
                password:'' 
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

    updateCredentials(event){
        var credentials = Object.assign({}, this.state.credentials)
        credentials[event.target.id] = event.target.value
        this.setState({
            credentials: credentials
        })
    }

    login(event){
        event.preventDefault()
        // console.log('LOGIN: '+JSON.stringify(this.state.user))
        api.handlePost('/account/login', this.state.credentials, function(err, response){
            // console.log('LOGIN TEST: ')
            if (err != null) {
                alert(err.message)
                return
            }

            console.log('USER LOGGED IN: '+JSON.stringify(response))
            window.location.href = '/account'
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
        var communityList = this.props.communities.map(function(community, i){
            return <CommunityPreview key={community.id} community={community} />

        })

        var loginOrAddCommunity = ""
        if (this.props.currentUser.id == null) {

            loginOrAddCommunity = <div className="well well-lg nobottommargin">

                                    <h2>Login</h2>
                                    <input type="text" onChange={this.updateCredentials} id="email" placeholder="Email" /><br />
                                    <input type="text" onChange={this.updateCredentials} id="password" placeholder="Password" /><br />
                                    <button onClick={this.login}>Login</button>
                                  </div>
        }
        else {                        
            loginOrAddCommunity = <div>
                                    <h2>Add Community</h2>
                                    <input type="text" onChange={this.updateNewCommunity} id="name" placeholder="Name" /><br />
                                    <input type="text" onChange={this.updateNewCommunity} id="address" placeholder="Address" /><br />
                                    <input type="text" onChange={this.updateNewCommunity} id="city" placeholder="City" /><br />
                                    <input type="text" onChange={this.updateNewCommunity} id="state" placeholder="State" /><br /><button onClick={this.addNewCommunity}>Submit</button>
                                  </div>
        }



    	






        return(
    		<div>
                <Nav transparent="yes" />

                <section id="slider" style={{background: 'url("/images/nyc.jpg") center', overflow:'visible'}} data-height-lg="450" data-height-md="450" data-height-sm="600" data-height-xs="600" data-height-xxs="600" >
                </section>

                <section id="content">

                    <div className="col_three_fifth bothsidebar nobottommargin">
                        <div className="fancy-title title-border">
                            <h3>Communities</h3>
                        </div>

                        <div id="posts" className="events small-thumbs">
                            {communityList}
                        </div>    
                    </div>

                    {loginOrAddCommunity}


                


                </section>
    		</div>

    	)
    }
}

const propsToState = function(state){
    console.log('POPS TO STATE: '+JSON.stringify(state))

    return {
        communities: state.communityReducer.communitiesArray,
        currentUser: state.accountReducer.currentUser
    }
    
}

export default connect(propsToState)(Communities)