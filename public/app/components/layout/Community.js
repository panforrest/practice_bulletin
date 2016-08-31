import React, { Component } from 'react'
import api from '../../utils/api'
import Nav from '../../components/Nav'
import actions from '../../actions/actions'
import store from '../../stores/store'
import { connect } from 'react-redux'

class Community extends Component {

    constructor(props, context){
    	super(props, context)
        this.updatePost = this.updatePost.bind(this)
    	this.state = {
    		community: {
    			name: ''
    		},
            post: {

            }

    	}
    }

    componentDidMount(){


    	var _this = this
    	var endpoint = '/api/community?slug='+this.props.slug
    	api.handleGet(endpoint, null, function(err, response){
    		if (err) {
    			alert(err.message)
    			return
    		}
    		// console.log('Community Page: componentDidMount '+JSON.stringify(response.results))
    		var results = response.results
    		// var community = results[0]
    		// _this.setState({
    		// 	community: community
    		// })
            store.dispatch(actions.communitiesReceived(results))  //THIS LINE OF CODE DON'T UNDERSTAND
    	})
    }

    updatePost(event){
        console.log('updatePost: '+event.target.id+' - '+event.target.value)
        // var updatedPost = Object.assign({}, )
        // updatedPost[event.target.id] = event.target.value
        // this.setState({
        //     post: updatedPost
        // })
    }

    render(){
		return(
			<div>
                <Nav transparent="no" />

                <section id="content">
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="postcontent nobottommargin clearfix">

                                <h4>{this.props.community.name}</h4>
                                <input onChange={this.updatePost} id="title" placeholder="Post Title" className="form-control" type="text" /><br />
                                <textarea onChange={this.updatePost} id="text" placeholder="Post Text" className="form-control"></textarea><br /> 
                                <button className="btn btn-success">Add Post</button><br />
                                <hr style={{borderTop: '1px solid red #444'}} />

                                <div className="list-group">
                                    <a href="#" className="list-group-item">
                                        <h4 className="list-group-item-heading">List group item heading</h4>
                                        <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.</p>
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <h4 className="list-group-item-heading">List group item heading</h4>
                                        <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.</p>
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <h4 className="list-group-item-heading">List group item heading</h4>
                                        <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

			</div>
		)
	}
}

const stateToProps = function(state){
    var communitiesArray = state.communityReducer.communitiesArray

    return{
        community: (communitiesArray.length == 0) ? {name:''} : communitiesArray[0]
    }

}

export default connect(stateToProps)(Community)