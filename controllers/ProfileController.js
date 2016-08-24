var mongoose = require('mongoose')
var Profile = require('../models/Profile')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(profiles){
	var restuls = new Array()
	for (var i=0; i<profiles.length; i++){
		var p = profiles[i]
		results.push(p.summary())
	}

	return results
}

module.exports = {

	pluralKey: function(){
		return 'profiles'
	},

	get: function(params, completion){

		// fetch specific profile by ID
		if (params.id !=null){
			Profile.findById(params.id, function(err, completion){
				if (err) {
					completion({message:'Profile '+profile.id+' not found'}, null)
					return
				}

                if (profile == null){
					completion({message:'Profile '+profile.id+' not found'}, null)
					return                	
                }

       			completion(null, profile.summary())
 			})
            return
		}


		/* Query by filters passed into parameter string: */
		var limit = params.limit
		    if (limit == null)
		    	limit = 0;

		delete params['limit']

		Profile.find(params, null, {limit:limit, sort:{priority: -1}}, function(err, completion){
			if (err) {
				completion({confirmation:'fail', message:err.message}, null)
				return
			}

			completion(null, converToJson(profiles))
 		})
	},

	post: function(profileinfo, completion) {
		Profile.create(profileinfo, function(err, completion){
			if (err) {
				completion({confirmation:'fail', message:err.message}, null)
				return
			}

			completion(null, profile.summary())
			return
		})
	},



	put: function(profileId, profileinfo, completion){
		Profile.findByIdAndUpdate(id, profileinfo, function(err, completion){
			if (err) {
				completion({confirmation:'fail', message:err.message}, null)
				return
			}

			completion(null, profile.summary())
            return
		})
	},

	delete: function(){

	}

}