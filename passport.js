const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const GooglePlusTokenStartegy = require('passport-google-plus-token');
const FaceBookTokenStartegy = require('passport-facebook-token');
const { ExtractJwt } = require('passport-jwt');
const shortid = require('shortid');

const UserAccount = require('./models/UserAccount');
const UserProfile = require('./models/UserProfile');
const GoogleAccount = require('./models/GoogleAccount');
const FaceBookAccount = require('./models/FaceBookAccount');
const config = require('./config/config');
hihih

// json web token strategy
passport.use(new jwtStrategy({
	jwtFromRequest : ExtractJwt.fromHeader("authorization"),
	secretOrKey : process.env.SECRET_AUTHENCATION
}, async (payload, done)=> {
	try{
		// find User
		const user  = await UserProfile.findOne({
			where : {
				id: payload.sub
			}
		})
		if(!user){
			return done(null, false)
		}

		done(null, user);
	}catch(err){
		done(err, false);
	}

}))

// Google OAUTH strategy
passport.use('googleToken', new GooglePlusTokenStartegy({
	// header
	clientID : config.google.clientID,
	clientSecret : config.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => { // body
	
	try{
		console.log('accsessToken', accessToken);
	console.log('refreshToken', refreshToken);
	console.log('profile', profile);

	const exstingUser = await GoogleAccount.findOne({
		include : [
		{
			model : UserProfile,
		}],
		where : {
			id_google : profile.id
		}
	})

	if(exstingUser){
		console.log('existed')
		return done(null, exstingUser);
	}

	console.log('create new');
	// else create new account
	let idUserProfile = shortid.generate();
	const newUserProfile = new UserProfile({
		id : idUserProfile,
		display_name : profile.displayName,
		email : profile.emails[0].value
	})
	await newUserProfile.save();

	const newUserGG = new GoogleAccount({
		id_user_profile : idUserProfile,
		id_google : profile.id
	})
	await newUserGG.save();

	const newUser = await GoogleAccount.findOne({
		include : [
			{
				model : UserProfile
			}
		],
		where : {
			id_google : profile.id
		}
	})
	done(null, newUser)
	}catch(error){
		done(error, false, error.message);
	}
}))

// Facebook OAUTH strategy
passport.use('facebookToken', new FaceBookTokenStartegy({
	// header
	clientID : config.facebook.clientID,
	clientSecret : config.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => { // body
	
	try{
		console.log('accsessToken', accessToken);
		console.log('refreshToken', refreshToken);
		console.log('profile', profile);

		const exstingUser = await FaceBookAccount.findOne({
			include : [
			{
				model : UserProfile,
			}],
			where : {
				id_facebook : profile.id
			}
		})

		if(exstingUser){
			console.log('existed')
			return done(null, exstingUser);
		}

		console.log('create new');
		// else create new account
		let idUserProfile = shortid.generate();
		const newUserProfile = new UserProfile({
			id : idUserProfile,
			display_name : profile.displayName,
			email : profile.emails[0].value
		})
		await newUserProfile.save();

		const newUserFB = new FaceBookAccount({
			id_user_profile : idUserProfile,
			id_facebook : profile.id
		})
		await newUserFB.save();

		const newUser = await FaceBookAccount.findOne({
			include : [
				{
					model : UserProfile
				}
			],
			where : {
				id_facebook : profile.id
			}
		})
		done(null, newUser)
	}catch(error){
		done(error, false, error.message);
	}
}))

// local strategy
passport.use(new localStrategy({
	usernameField : 'email',
}, async (email, password, done) => {
	try{
		// find user by email
	const user = await UserAccount.findOne({
			where : {
				email
			}
		})
		// if not, handle it
		if(!user){
			return done(null, false);
		}
		// check if the passport is correct
		const isMatch = user.isValidPassword(email, password);
		if(!isMatch){
			return done(null, false);
		}
		// return user
		done(null, user);
	}catch(error){
		done(error, false);
	}
}))