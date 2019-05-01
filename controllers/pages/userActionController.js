const JWT = require('jsonwebtoken');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const shortid = require('shortid');
const passport = require('passport');
const passportConf = require('../../passport');

const UserAccount = require('../../models/UserAccount');
const UserProfile = require('../../models/UserProfile');
const Order = require('../../models/Order');
const OrderDetailt = require('../../models/OrderDetailt')
const mailer = require('../../misc/mailer')

signToken = (user) => {
	return JWT.sign({
		iss : 'UserAccount',
		sub : user.id_user_profile,
		iat : new Date().getTime(),
		exp : new Date().setDate(new Date().getDate() + 1)
	}, process.env.SECRET_AUTHENCATION);
}

module.exports.postSingUp = async (req, res, next) => {
	const { email, password, username } = req.body;
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
		email,
		display_name : username,
		type : 'account'
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

	await newUser.update({
		token : token,
		active : false
	})

	// compose an email
	const html = `<h3>Hi there</h3>,
	<br/>
	<h3>Thank you for registering!</h3>
	<br/><br/>
	Please verify your email by typing the following url :
	<br/>
	<a href="http://localhost:5000/api/user/verify?uid=${newUser.id_user_profile}&email=${newUser.email}&token=${token}">
	http://localhost:5000/api/user/verify?uid=${newUser.id_user_profile}&email=${newUser.email}&token=${token}
	</a>
	<br/>
	Have a pleasant day!`;

	//send email
	await mailer.sendEmail('menshop789@gmail.com', newUser.email, 'Please verify your email', html)

	// rsponse token
	res.status(200).json({message : "Please Verify Your Email!"});
}


// sign in
module.exports.postSingIn = async (req, res, next) => {
	// get token
	// const token = signToken(req.user);
	// //response token
	// res.status(200).json({token})
	// console.log('login success');
	passport.authenticate('local', { session: false }, async function(err, user, info){
		if(err) next(err);
		if(!user){
			res.json({message : info.message})
		}else{
			// sing in add to Cart from localStorage
			const { cart } = req.body;
			if(cart){
				var orderCheckUser = await Order.findOne({
					where : {
						[Op.and] : [{ id_user : user.id_user_profile}, { status : "Created"}]
					}
				})

				var orderId = null;
				if(!orderCheckUser){
					const orderNew = new Order({
						id_user : user.id_user_profile,
						status : "Created"
					});
					await orderNew.save();

					orderId = orderNew.id;
					for(let item of cart){
						console.log(item)
						let { product, color, size, quantity } = item;
						const newOrderDetailt = new OrderDetailt({
							id_product : product.id,
							id_color : color.id,
							id_size : size.id,
							id_order : orderId,
							quantity : quantity
						});
						await newOrderDetailt.save();
					}
					

				}else{
						// if existed order
					orderId = orderCheckUser.id;

					for(let item of cart){
						let { product, color, size, quantity } = item;
							// check product style existed in order detailt ?
						const productStyleCheck = await OrderDetailt.findOne({
							where : {
								[Op.and]: [
									{ id_order : orderId },
									{ id_product : product.id },
									{ id_color : color.id },
									{ id_size : size.id }
								]
							}
						});
						// if existed product in order detailt
						if(productStyleCheck){
							await productStyleCheck.update({
								quantity : productStyleCheck.quantity + quantity
							})
						}else{
							// if not exist then create new order detailt
							const newOrderDetailt = new OrderDetailt({
								id_product : product.id,
								id_color : color.id,
								id_size : size.id,
								id_order : orderId,
								quantity : quantity
							});
							await newOrderDetailt.save();
						}
					}
					
				}

			}
			
			const token = signToken(user);
			res.json({token})
		}
	})(req,res, next);

	
}

module.exports.googleOauth = async (req, res, next) => {
	// sing in add to Cart from localStorage
	const { cart } = req.body;
	const user = req.user;
	if(cart){
		var orderCheckUser = await Order.findOne({
			where : {
				[Op.and] : [{ id_user : user.id_user_profile}, { status : "Created"}]
			}
		})

		var orderId = null;
		if(!orderCheckUser){
			const orderNew = new Order({
				id_user : user.id_user_profile,
				status : "Created"
			});
			await orderNew.save();

			orderId = orderNew.id;
			for(let item of cart){
				console.log(item)
				let { product, color, size, quantity } = item;
				const newOrderDetailt = new OrderDetailt({
					id_product : product.id,
					id_color : color.id,
					id_size : size.id,
					id_order : orderId,
					quantity : quantity
				});
				await newOrderDetailt.save();
			}
			

		}else{
				// if existed order
			orderId = orderCheckUser.id;

			for(let item of cart){
				let { product, color, size, quantity } = item;
					// check product style existed in order detailt ?
				const productStyleCheck = await OrderDetailt.findOne({
					where : {
						[Op.and]: [
							{ id_order : orderId },
							{ id_product : product.id },
							{ id_color : color.id },
							{ id_size : size.id }
						]
					}
				});
				// if existed product in order detailt
				if(productStyleCheck){
					await productStyleCheck.update({
						quantity : productStyleCheck.quantity + quantity
					})
				}else{
					// if not exist then create new order detailt
					const newOrderDetailt = new OrderDetailt({
						id_product : product.id,
						id_color : color.id,
						id_size : size.id,
						id_order : orderId,
						quantity : quantity
					});
					await newOrderDetailt.save();
				}
			}
			
		}

	}

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

module.exports.verifyEmail = async (req, res, next) => {
	const { uid, token, email } = req.query;
	var user = await UserAccount.findOne({
		where : {
			id_user_profile : uid,
		}
	})

	if(user){
		if(user.token === token){
			res.render('verifyEmail',{
			active : user.active
			})
			await user.update({
				token : '',
				active : true
			})
		}else if(user.token === ''){
			res.render('verifyEmail',{
				active : user.active
			})
		}		
	}

}