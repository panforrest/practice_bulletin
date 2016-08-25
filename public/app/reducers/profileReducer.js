import constants from '../constants/constants'

var initialState = {
    profiles: {},
    profilesArray: []
}

export default function(state=initialState, action){
    switch (action.type) {
        case constants.PROFILES_RECEIVED:
            console.log('PROFILES RECEIVED: '+action.profiles)
            var newState = Object.assign({}, state)

            var array = []
            for (var i=0; i<action.profiles.length; i++) {
            	var profile = action.profiles[i]
                array.push(profile)
            }

            newState['profilesArray'] = array
            return newState

        default:
            return state





    }
}