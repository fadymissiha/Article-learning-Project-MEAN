var express = require('express');
var router = express.Router();


module.exports = function(passport){
	// send success login  back to angular
	router.get('/success', function(req, res){
		res.send({state: 'success', user: req.user ? req.user : null});
	});
	// send failure login  back to angular
	router.get('/failure', function(req, res){
		res.send({state: 'failure', user: null, message: "Invalid username or password"});
	});
	//login
	router.post('/signin', passport.authenticate('signin', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));
	//signup
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));
	// log out
	router.get('/signout', function(req, res){
		console.log('signout ---------- router');
		req.logout();
		res.redirect('/');
	});
	return router;
};
