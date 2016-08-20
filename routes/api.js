var express = require('express');
var router = express.Router();

data = [
    {id:0, name:'nomad', address:'27 E 28 St'},
    {id:1, name: 'time square', address:'1 Time Square'}
]

/* GET users listing. */
router.get('/:resource', function(req, res, next) {
    var resource = req.params.resource

    if (resource = 'community') {
	    res.json({
	    	confirmation: 'success',
	        communities: data
	    });
    }
});

router.get('/:resource/:id', function(req, res, next) {
    var resource = req.params.resource
    var id = req.params.id

    if (resource = 'community') {
        var community = data[id]

	    res.json({
	    	confirmation: 'success',
	        community: community
	    });
    }
});

module.exports = router;