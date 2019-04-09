var Catalog = require('../../models/Catalog');
var Product = require('../../models/Product')
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
	res.json(resuilt)
}

module.exports.getProductsWithChildName = async (req, res, next) => {

	var childName = req.params.childName;
	var catalog = await Catalog.findAll();
	var idCataChild = findIdCataParent(catalog, childName);
	
	var resuilt = await Product.findAll({
		where : {
			id_catalog : idCataChild
		}
	})
	res.json(resuilt)
}
