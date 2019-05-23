var _ = require('lodash');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var change = require('../../utils/change-alias');

var Product = require('../../models/Product');
var ProductColor = require('../../models/ProductColor');
var ProductSize = require('../../models/ProductSize');
var ProductStyle = require('../../models/ProductStyle');
var ProductImage = require('../../models/ProductImage');

function findIdCataParent(catalog, nameCata) {
	var idCata = []
	for(let item of catalog){
		if(change(item.name) === nameCata){
			idCata = item.id;
		}
	}
	return idCata;
}

module.exports.getProductDetailt =  async (req, res, next) => {
	const id = req.params.id;
	var product = await Product.findOne({
		where : {
			id : id
		}
	})

	var colorProduct = await ProductColor.findAll({
		where : {
			id_product : id
		}
	})

	var sizeWithColor = []; 

	for(var color of colorProduct){
		let idSize = await ProductStyle.findAll({
			attributes : ['id_product_size'],
			where : {
				id_product_color : color.id
			}
		})
		var idSizeArr = [];
		for(let id of idSize){
			idSizeArr.push(id.id_product_size)
		}

		let sizeProduct = await ProductSize.findAll({
			where : {
				id : {
					[Op.in] : idSizeArr
				}
			}
		})
		let size = {};
		size[color.id] = sizeProduct;
		sizeWithColor.push(size)
	}

	const imageProduct = await ProductImage.findAll({
		where : {
			id_product : id
		}
	})

	res.json([product, colorProduct, sizeWithColor, imageProduct]);
}
