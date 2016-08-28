var express = require('express')
var router = express.Router()
var profileController = require('../controllers/profileController')


router.get('/:action', function(req, res, next){

	var action = req.params.action
	if (action == 'currentuser') {

        if (req.session == null) {
        	res.json({confirmation:'fail', message: 'User not logged in'})
        	return
        }

        if (req.session.user == null) {
        	res.json({confirmation:'fail', message: 'User not logged in'})
        	return	
        }

        res.json({
        	confirmation:'success',
        	user: req.session.user
        })

        return
	}

})

module.exports = router


















