var mongoose = require('mongoose');
var User = mongoose.model('User');
var localStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

					
module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user._id);
	});
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	passport.use('signup', new localStrategy({
		passReqToCallback : true
		},
		function(req, username, password, done){

			//findOrCreateUser=function(){                           // no reason for it.
				//console.log('error-2-------------------' + username + '------' + password);
				User.findOne({ 'username' : username }, function(err, user) {

					if(err){
						//console.log('error--------------------' + err);
						return done(err);
							
					}
					if (user) {

						return done(null, false);
					}
					else {
					
						var newUser = new User();
						newUser.username = username;
						newUser.password = createHash(password);
						newUser.save(function(err){
							if (err){
								throw err;
						//console.log('error-insert-------------------' + err);
							}
							return done(null, newUser);
						});

					}
				});
			//}    //no reason for it.
		}
	));
	passport.use('signin', new localStrategy({
		passReqToCallback:true
		},
		function(req, username, password, done){
			
			User.findOne({ 'username' : username }, function(err, user) {
				if(err){
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}
				if (!isPasswordValid(user, password)) {
					return done(null, false);
				}
				return done(null, user);
			});
		
		}
	));
	var isPasswordValid = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};

