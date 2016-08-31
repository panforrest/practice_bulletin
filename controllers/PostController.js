var mongoose = require('mongoose')
var Post = require('../models/Post')


//----HELPER METHOD---

function convertToJson(posts){
    var results = new Array();
    for (var i=0; i<posts.length; i++){
    	var p = posts[i]
    	results.push(p.summary())
    }

    return results
}

module.exports = {

    pluralKey: function(){
        return 'posts'
    },

    get: function(params, completion){
        
        //fetch specific post by ID:
        if (params.id != null) {
            Posts.findById(params.id, function(err, post){
            	if (err) {
            		completion({message: 'Post '+params.id+' not found'}, null)
            		return
            	}

            	if (post == null) {
            		completion({message: 'Post '+params.id+' not found'}, null)
            		return            		
            	}

            	completion(null, post.summary())
            })
            return
        }


        /* QUERY BY FILTERS PASSED INTO PARAMETER STRING: */
        var limit = params.limit
        if (limit == null)
        	limit = 0

        delete params['limit']

        Post.find(params, null, {limit:limit, sort:{priority: -1}}, function(err, posts){
        	if (err) {
        		completion({confirmation: 'fail', message: err.message}, null)
        		return
        	}

        	completion(null, convertToJson(posts))
        })
    },

    post: function(postinfo, completion){
    	var parts = postinfo.name.split(' ')

    	var slug = ''
    	for (var i=0; i<parts.length; i++){
            var word = parts[i]
            slug += word
            if (i != part.length -1)
            	slug += '-'
    	}

    	slug = slug.replace('?', '')
    	postinfo['slug'] = slug

    	Post.create(postinfo, function(err, post){
            if (err) {
            	completion({confirmation: 'fail', message: err.message}, null)
            	return
            }

            completion(null, post.summary())
            return
    	})

    },


    put: function(postId, postinfo, completion){
    	Post.findByIdAndUpdate(postId, postinfo, {new:true}, function(err, post){
    		if (err) {
    			completion({confirmation: 'fail', message: err.message}, null)
    			return
    		}

    		completion(null, post.summary())
    		return
    	})
    },

    delete: function(){

    }

}