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
            return <CommunityPreview key={community.id} community={community} />
        })

    	return(
    		<div className="container clearifx">
                <Nav />




                <div className="col_three_fifth bothsidebar nobottommargin">
                    <div className="fancy-title title-border">
                        <h3>Communities</h3>
                    </div>

                    <div id="posts" className="events small-thumbs">
                        {communityList}
                    </div>    
                </div>

                <h3>Sign up</h3>

                    <div className="col_one_third nobottommargin">

                        <div className="well well-lg nobottommargin">
                            <form id="login-form" name="login-form" className="nobottommargin" action="#" method="post">

                                <h3>Free to Join</h3>

                                <div className="col_full">
                                    <label for="login-form-username">Username:</label>
                                    <input type="text" id="login-form-username" name="login-form-username" value="" className="required form-control input-block-level" />
                                </div>

                                <div className="col_full">
                                    <label for="login-form-password">Password:</label>
                                    <input type="password" id="login-form-password" name="login-form-password" value="" className="required form-control input-block-level" />
                                </div>

                                <div className="col_full nobottommargin">
                                    <button className="button button-3d nomargin" id="login-form-submit" name="login-form-submit" value="login">Login</button>
                                    <a href="#" className="fright">Forgot Password?</a>
                                </div>

                            </form>
                        </div>

                    </div>


            

                <br />

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