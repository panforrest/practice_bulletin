import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '../../utils/api'
import Nav from '../../components/Nav'
import actions from '../../actions/actions'
import store from '../../stores/store'

class Community extends Component {

    constructor(props, context){
    	super(props, context)
        this.updatePost = this.updatePost.bind(this)
        this.addPost = this.addPost.bind(this)
        this.fetchPosts = this.fetchPosts.bind(this)
    	this.state = {
            post: {
                title:'',
                text:'',
                community:'',
                profile:''
            },

            currentUser: {
                firstName:'',
                lastName:'',
                email:''
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
            _this.fetchPosts()
    	})


    }
    
    fetchPosts() {
        if (this.props.community.id  == null) 
            return

        var endpoint = '/api/post?community='+this.props.community.id
        api.handleGet(endpoint, null, function(err, response){
            if (err) {
                alert(err.message)
            }

            //console.log('fetchPosts: '+JSON.stringify(response.results))
            store.dispatch(actions.postsReceived(response.results))
        })

    }

    updatePost(event){



        console.log('updatePost: '+event.target.id+' - '+event.target.value)
        var updatedPost = Object.assign({}, this.state.post)
        updatedPost[event.target.id] = event.target.value
        this.setState({
             post: updatedPost
        })
    }

    addPost(event){
        //console.log('addPost: '+JSON.stringify(this.state.post))



        if (this.props.currentUser.id == null) {
            alert('Please log in to submit a post!')
            return
        }
        
        var newPost = Object.assign({}, this.state.post)
        newPost['community'] = this.props.community.id
        newPost['profile'] = this.props.currentUser.id


        var _this = this 
        api.handlePost('/api/post', newPost, function(err, response){
            if (err) {
                alert('ERROR - '+err.message)
                return
            }

            _this.setState({       //BUT WHY IS THIS NECESSARY?
                post: {
                    title:'',
                    text:'',
                    profile:'',
                    community:''
                }
            })


            // var result = response.result
            // console.log('POST CREATED: '+JSON.stringify(response))
            store.dispatch(actions.postCreated(response.result))
            //console.log('addPost: '+JSON.stringify(response.result))
        })
    }

    render(){
        var postList = this.props.posts.map(function(post, i){
            return (

                <a key={post.id} her="#" className="list-group-item">
                        <h4 className="list-group-item-heading">{post.title}</h4>
                        <p className="list-group-item-text">{post.text}</p>
                </a> 



            )
        })

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
                                <button onClick={this.addPost} className="btn btn-success">Add Post</button><br />
                                <hr style={{borderTop: '1px solid red #444'}} />

                                {postList}

                                
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
    console.log('STATE TO PROPS: '+JSON.stringify(state.accountReducer.currentUser))

    return{
        community: (communitiesArray.length == 0) ? {name:''} : communitiesArray[0],
        posts: state.postReducer.postsArray,
        currentUser: state.accountReducer.currentUser
    }

}

export default connect(stateToProps)(Community)