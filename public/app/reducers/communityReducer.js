import constants from '../constants/constants'

var initialState = {

	communities: {},
	communitiesArray: []

}

export default function(state = initialState, action) {
    
    switch(action.type) {
        case constants.COMMUNITIES_RECEIVED:
            // console.log('COMMUNITIES_RECEIVED: '+JSON.stringify(action.communities))
            var newState = Object.assign({}, state)
            newState['communitiesArray']=action.communities
            var s = {}
            for (var i=0; i<action.communities.length; i++){
            	var community = action.communities[i]
            	s[community._id] = community
            }

            newState['communities'] = s
            return newState

        case constants.COMMUNITY_CREATED:
            var newState = Object.assign({}, state) 
            var array = Object.assign([], newState.communitiesArray) 
            array.push(action.community)  
            newState['communitiesArray'] = array
            return newState

        default:
            return state
    }

}