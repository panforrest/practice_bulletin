import constants from '../constants/constants'

var initialState = {
	posts: {},
	postsArray: []
}

export default function(state = initialState, action){

	switch (action.type){
		case constants.POSTS_RECEIVED:
		    var posts = action.posts
		    console.log('POSTS RECEIVED: '+JSON.stringify(posts))
            var newState = Object.assign({}, state)
            var result = []
            for (var i=0; i<posts.length; i++){
            	var post = posts[i]
            	result.push(post)
            }
            newState['postsArray'] = result
            return newState

        case constants.POST_CREATED:
            var posts = action.posts
            var newState = Object.assign({}, state)  
            var array = Object.assign([], newState.postsArray)
            array.unshift(action.post)
            newState['postsArray'] = array

            return newState

		default:
		    return state    
	}
}