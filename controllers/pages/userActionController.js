const JWT = require('jsonwebtoken');
const shortid = require('shortid');

const UserAccount = require('../../models/UserAccount');
const UserProfile = require('../../models/UserProfile');

signToken = (user) => {
	return JWT.sign({
		iss : 'UserAccount',
		sub : user.id_user_profile,
		iat : new Date().getTime(),
		exp : new Date().setDate(new Date().getDate() + 1)
	}, process.env.SECRET_AUTHENCATION);
}

module.exports.postSingUp = async (req, res, next) => {
	const { email, password } = req.body;
	// check user exist ?
	const foundUser = await UserAccount.findOne({
		where : {
			email
		}
	});
	if(foundUser){
		return res.status(403).json({error : 'Email đã tồn tại'});
	}
	// create new userProfile
	let idUserAccount =  shortid.generate();
	const newUserProfile = new UserProfile({
		id : idUserAccount,
		email
	})
	await newUserProfile.save();

	// create newUser Account ( dang ki truc tiep ko thong qua fb, google)
	const newUser = new UserAccount({
		id_user_profile : idUserAccount,
		email,
		password
	});
	await newUser.save();

	// get token
	const token = signToken(newUser);

	// rsponse token
	res.status(200).json({token});
}

module.exports.postSingIn = async (req, res, next) => {
	// get token
	const token = signToken(req.user);
	//response token
	res.status(200).json({token})
	console.log('login success');
}

module.exports.googleOauth = async (req, res, next) => {
	const token = signToken(req.user);

	res.status(200).json({token})
}

module.exports.facebookOauth = async (req, res, next) => {
	const token = signToken(req.user);

	res.status(200).json({token})
}


module.exports.getUserProfile = async (req, res, next) => {
	console.log('im heare user')
	res.status(200).json({
		user : req.user
	});
}