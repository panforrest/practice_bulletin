var mongoose = require('mongoose')
var Community = require('../models/Community')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(communities){
	var results = new Array()
    for (var i=0; i<communities.length; i++){
        var p = communities[i]
        results.push(p.summary())
    }

    return results
}

module.exports = {

	pluralKey: function(){
        return 'communities'
	},

	get: function(params, completion){

		//fetch specific Community by ID:
		if (params.id != null) {
			Community.findById(params.id, function(err, community){
				if (err) {
					completion({message: 'Community '+params.id+' not found'}, null)
					return
				}

	            if (community == null){
	            	completion({message: 'Community '+params.id+' not found'}, null)
	            	return
	            }

	            completion(null, community.summary())
			})
			return
		}


		/*  Query by filters passed intoparamemter string: */
		var limit = params.limit
		if (limit == null)
			limit = 0

		delete params['limit']

		Community.find(params, function(err, communities){
			if (err) {
				completion({confirmation:'fail', message:err.message}, null)
				return
			}

			completion(null, convertToJson(communities))
		})
	},

	post: function(communityinfo, completion){
		var parts = communityinfo.name.split(' ')

		var slug = ''
		for (var i=0; i<parts.length; i++){
			var word = parts[i]
			slug += word
			if (i != parts.length-1)
				slug += '-'
		}

		slug = slug.replace('?', '-')
		communityinfo['slug'] = slug

		Community.create(communityinfo, function(err, community){
			if (err) {
				completion({confirmation: 'fail', message: err.message}, null)
				return
			}

			completion(null, community.summary())
			return
		})
	},



	put: function(communityId, communityinfo, completion){
		Community.findByIdAndUpdate(communityId, communityinfo, {new:truen}, function(err, completion){
			if (err){
				completion({confirmation: 'fail', message:err.message}, null)
				return
			}

			completion(null, community.summary())
			return
		})
	},

	delete: function(){

	}

}

