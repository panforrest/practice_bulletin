var express = require('express')
var router = express.Router()
var profileController = require('../controllers/profileController')


router.get('/:action', function(req, res, next){

    var action = req.params.action
    if (action == 'logout') {
        req.session.reset()
        res.json({
            confirmation: 'success',
            message: 'bye'
        })

        return
    }

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

        profileController.get({id: req.session.user}, function(err, result){
            if (err) {
                res.json({confirmation:'fail', message: 'user not found'})
            }

            res.json({
            	confirmation:'success',
        	user: result
            })
            return

        })


    }
})

router.post('/:action', function(req, res, next){
    var action = req.params.action
    if (action == 'login') {
        var credentials = req.body  //email, password

        profileController.get({email: credentials.email}, function(err, results){
            if (err) {
                
                res.json({
                    confirmation: 'fail',
                    message: err
                })

                return
            }

            var profile = results[0]

            //TODO: check password

            req.session.user = profile.id  //install cookies to track current user
            res.json({
                confirmation: 'success',
                user: profile
            })
        })
    }
})

module.exports = router


















