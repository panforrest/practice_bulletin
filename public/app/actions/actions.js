import constants from '../constants/constants'

export default {

	communityCreated: function(community){

        return {
            type: constants.COMMUNITY_CREATED,
		    community: community 

        }

	}, 

	communitiesReceived: function(communities){

		return {

			type: constants.COMMUNITIES_RECEIVED,
			communities: communities

		}

	}, 

	profileCreated: function(profile){
		return{
			type: constants.PROFILE_CREATED,
			profile: profile
		}
	},

	profilesReceived: function(profiles){
		return {
			type: constants.PROFILES_RECEIVED,
			profiles: profiles
		}
	},

	currentUserReceived: function(user){
		return {
			type: constants.CURRENT_USER_RECEIVED,
            user: user
		}
	}  

}

