var Catalog = require('../../models/Catalog');
var Product = require('../../models/Product')
var Slider = require('../../models/Slider')
var change = require('../../utils/change-alias');
var _ = require('lodash');

function findIdCataParent(catalog, nameCata) {
	var idCata = []
	for(let item of catalog){
		if(change(item.name) === nameCata){
			idCata = item.id;
		}
	}
	return idCata;
}

module.exports.getProductsWithCatalog =  async (req, res, next) => {
	var nameCata = req.params.name;
	var catalog = await Catalog.findAll();
	var idCataPrent = findIdCataParent(catalog, nameCata);

	var idCataChild =  await Catalog.findAll({
		attributes: ['id'],
		where : {
			id_parent : idCataPrent
		}
	})
	var idCata = [];
	if(idCataChild.length > 0){
		for(item of idCataChild){
			idCata.push(item.id)
		}

	}else {
		idCata.push(idCataPrent)
	}
	var resuilt = await Product.findAll({
		where : {
			id_catalog : idCata
		}
	})

	var slider = await Slider.findAll({
		where : {
			id_catalog : idCataPrent
		}
	})

	var catalogPath = await Catalog.findOne({
		where : {
			id : idCataPrent
		}
	})

	res.json({
		path : catalogPath.name,
		slider : slider,
		products : resuilt
	})
}

module.exports.getProductsWithChildName = async (req, res, next) => {

	var childName = req.params.childName;
	var catalog = await Catalog.findAll();
	var idCataChild = findIdCataParent(catalog, childName);

	var childCatalog = await Catalog.findOne({
		where : {
			id  : idCataChild 
		}
	})

	var resuilt = await Product.findAll({
		where : {
			id_catalog : idCataChild
		}
	})

	var parent_id = childCatalog.id_parent

	var slider = await Slider.findAll({
		where : {
			id_catalog : parent_id
		}
	})  

	res.json({
		path : childCatalog.name,
		slider : slider,
		products  : resuilt
	})
}
