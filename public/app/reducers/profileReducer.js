import constants from '../constants/constants'

var initialState = {
    profile: {},
    profilesArray: []
}

export default function(state=initialState, action){
    switch (action.type) {
        case constants.PROFILES_RECEIVED:
            console.log('PROFILES RECEIVED: '+action.profiles)
            var newState = Object.assign({}, state)
            for (i=0; i<array.profiles.length; i++) {
            	var profile = array.profiles[i]
                array.push(profile)
            }

            newState['profilesArray'] = array
            return newState

        default:
            return state





    }
}