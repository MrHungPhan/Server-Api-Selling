var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var Order = require('../../models/Order');
var OrderDetailt = require('../../models/OrderDetailt');
var Order = require('../../models/Order');
var ProductColor = require('../../models/ProductColor');
var ProductSize = require('../../models/ProductSize');
var Product = require('../../models/Product');

module.exports.addToCart = async (req, res, next) => {
	var productDetailt = req.body;
	var user = req.user;
	var { product, size, color, quantity } = productDetailt;

	// check order with user existed ?
	var orderCheckUser = await Order.findOne({
		where : {
			[Op.and] : [{ id_user : user.id}, { status : "Created"}]
		}
	})

	// if not existed order with user => create new order
		var orderId = null;
		if(!orderCheckUser){
			const orderNew = new Order({
			id_user : user.id,
			status : "Created"
			});
			await orderNew.save();
			orderId = orderNew.id;

			const newOrderDetailt = new OrderDetailt({
				id_product : product.id,
				id_color : color.id,
				id_size : size.id,
				id_order : orderId,
				quantity : quantity
			});
			await newOrderDetailt.save();

		}else{
		// if existed order
		orderId = orderCheckUser.id;

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

	//response cart
	var productCart = await OrderDetailt.findAll({
		attributes : ["quantity"],
		include : [
			{
				model : Product,
				require : true
			},
			{
				model : ProductColor,
				as : 'color'
			},
			{
				model : ProductSize,
				as : 'size'
			}
		],
		where : {
			id_order : orderId
		}
	});

	res.status(200).json({cart : productCart});
}

async function getCartF(user){
	var orderCheckUser = await Order.findOne({
		where : {
			[Op.and] : [{ id_user : user.id}, { status : "Created"}]
		}
	})
	var productCart = [];
	if(orderCheckUser){
		 productCart = await OrderDetailt.findAll({
		attributes : ["quantity"],
		include : [
			{
				model : Product,
				require : true
			},
			{
				model : ProductColor,
				as : 'color'
			},
			{
				model : ProductSize,
				as : 'size'
			}
		],
		where : {
			id_order : orderCheckUser.id
		}
		});
	}

	return productCart;
}

module.exports.getCart = async (req, res, next) => {
	const user = req.user;
	const productCart = await getCartF(user)
	res.status(200).json({cart : productCart});
}

module.exports.deleteCartItem = async (req, res, next) => {
	const { product, color, size } = req.body;
	const user = req.user;

	const orderCart = await Order.findOne({
		where : {
			id_user : user.id,
			status : 'Created'
		}
	})

	const detailtOrdercheck = await OrderDetailt.findAll({
		id_order : orderCart.id
	})

	if(detailtOrdercheck.length === 1){
		await orderCart.destroy({
			where : {
				id : orderCart.id
			}
		})
	}else{
			await OrderDetailt.destroy({
			where : {
				[Op.and] : [
					{ id_order : orderCart.id },
					{ id_product : product.id },
					{ id_size : size.id },
					{ id_color : color.id }
				]
			}
		})
	}

	

	const productCart = await getCartF(user)

	res.status(200).json({cart : productCart})
}

module.exports.updateCartItem = async (req, res, next) => {
	console.log(req.body)
	const { productItem, quantity } = req.body;
	const { product, color, size } = productItem
	const user = req.user;

	const orderCart = await Order.findOne({
		where : {
			id_user : user.id,
			status : 'Created'
		}
	})

	const cartItem = await OrderDetailt.findOne({
		where : {
			[Op.and] : [
				{ id_order : orderCart.id },
				{ id_product : product.id },
				{ id_size : size.id },
				{ id_color : color.id }
			]
		}
	})
	

	if(cartItem){
		await cartItem.update({
			quantity : quantity
		})
	}

	console.log(cartItem)
	const productCart = await getCartF(user)

	res.status(200).json({cart : productCart})

}