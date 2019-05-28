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

function sortNameFuntion(resuilt, sortValue){
	resuilt.sort((proPrev, proNext) => {
		if(proPrev.name > proNext.name) return -parseInt(sortValue)
		else if(proPrev.name < proNext.name) return parseInt(sortValue)
		else return 0;
	})
}

function sortPriceFuntion(resuilt, sortValue){
	resuilt.sort((proPrev, proNext) => {
		if(proPrev.price > proNext.price) return parseInt(sortValue)
		else if(proPrev.price < proNext.price) return -parseInt(sortValue)
		else return 0;
	})
}

module.exports.getProductsWithCatalog =  async (req, res, next) => {
	console.log("FILTER------------------------------------------------")
	console.log(req.query, req.params)
	var nameCata = req.params.name;
	var catalog = await Catalog.findAll();
	var idCataPrent = findIdCataParent(catalog, nameCata);
	// let offset = 0;
	// offset= 5 * (req.query.page - 1);
	if(idCataPrent.length !== 0){
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


			// count number page
			var productCount = await Product.findAll({
				where : {
					id_catalog : idCata
				}
			});
			let pageTotal = Math.ceil(productCount.length / 5)
			console.log(productCount.length)

			var resuilt = await Product.findAll({
					where : {
						id_catalog : idCata
				},
				limit: 5 * req.query.page,
			})

			// if not filter
			const lengthQuery = _.keys(req.query);
			const { sortBy, sortValue, filterPrice, page } = req.query
			switch(lengthQuery.length){
				case 2: {
					if(filterPrice){
						const filter = filterPrice.split('>');
							if(filter.length === 1){
								if(_.isNaN(parseInt(filter[0]))) break;
								else{
									resuilt = resuilt.filter(product => {
										return product.price > parseInt(filter[0])
									})
								}
							}else{
								resuilt = resuilt.filter(product => {
									return product.price > parseInt(filter[0]) && product.price <= parseInt(filter[1])
								})
							}
					}
					break;
				}
				case 3 : {
					if(sortBy && sortValue){
						if(sortBy === 'name'){
							sortNameFuntion(resuilt, sortValue);
						}else{
							sortPriceFuntion(resuilt, sortValue)
						}
					}
					break;
				}
				case 4 : {
					if(sortBy, sortValue, filterPrice){
						if(sortBy === 'name'){
							sortNameFuntion(resuilt, sortValue);

							const filter = filterPrice.split('>');
							if(filter.length === 1){
								if(_.isNaN(parseInt(filter[0]))) break;
								else{
									resuilt = resuilt.filter(product => {
										return product.price > parseInt(filter[0])
									})
								}
							}else{
								resuilt = resuilt.filter(product => {
									return product.price > parseInt(filter[0]) && product.price <= parseInt(filter[1])
								})
							}
						}else{
							sortPriceFuntion(resuilt, sortValue)

							const filter = filterPrice.split('>');
							if(filter.length === 1){
								if(_.isNaN(parseInt(filter[0]))) break;
								else{
									resuilt = resuilt.filter(product => {
										return product.price > parseInt(filter[0])
									})
								}
							}else{
								resuilt = resuilt.filter(product => {
									return product.price > parseInt(filter[0]) && product.price <= parseInt(filter[1])
								})
							}
						}
					}
					break;
				}
				default : 
					break;
			}
			res.status(200).json({
				path : catalogPath.name,
				slider : slider,
				products : resuilt,
				pageTotal
			})
	}
	
}

module.exports.getProductsWithChildName = async (req, res, next) => {
	console.log('filter -----------------------------------------')
	console.log(req.query, req.params)
	var childName = req.params.childName;
	var catalog = await Catalog.findAll();
	var idCataChild = findIdCataParent(catalog, childName);

	var childCatalog = await Catalog.findOne({
		where : {
			id  : idCataChild 
		}
	})

	// count number page
	var productCount = await Product.findAll({
		where : {
			id_catalog : idCataChild
		}
	});
	let pageTotal = Math.ceil(productCount.length / 5)
	console.log(pageTotal)

	var resuilt = await Product.findAll({
		where : {
			id_catalog : idCataChild
		},
		limit : 5 * req.query.page
	})

	var parent_id = childCatalog.id_parent

	const parentCatalog = await Catalog.findOne({
		where : {
			id : parent_id
		}
	})

	var slider = await Slider.findAll({
		where : {
			id_catalog : parent_id
		}
	})  


	// if not filter
	const lengthQuery = _.keys(req.query);
	const { sortBy, sortValue, filterPrice } = req.query
	switch(lengthQuery.length){
		case 2: {
			if(filterPrice){
				const filter = filterPrice.split('>');
					if(filter.length === 1){
						if(_.isNaN(parseInt(filter[0]))) break;
						else{
							resuilt = resuilt.filter(product => {
								return product.price > parseInt(filter[0])
							})
						}
					}else{
						resuilt = resuilt.filter(product => {
							return product.price > parseInt(filter[0]) && product.price <= parseInt(filter[1])
						})
					}
			}
			break;
		}
		case 3 : {
			if(sortBy && sortValue){
				if(sortBy === 'name'){
					sortNameFuntion(resuilt, sortValue);
				}else{
					sortPriceFuntion(resuilt, sortValue)
				}
			}
			break;
		}
		case 4: {
			if(sortBy, sortValue, filterPrice){
				if(sortBy === 'name'){
					sortNameFuntion(resuilt, sortValue);

					const filter = filterPrice.split('>');
					if(filter.length === 1){
						if(_.isNaN(parseInt(filter[0]))) break;
						else{
							resuilt = resuilt.filter(product => {
								return product.price > parseInt(filter[0])
							})
						}
					}else{
						resuilt = resuilt.filter(product => {
							return product.price > parseInt(filter[0]) && product.price <= parseInt(filter[1])
						})
					}
				}else{
					sortPriceFuntion(resuilt, sortValue)

					const filter = filterPrice.split('>');
					if(filter.length === 1){
						if(_.isNaN(parseInt(filter[0]))) break;
						else{
							resuilt = resuilt.filter(product => {
								return product.price > parseInt(filter[0])
							})
						}
					}else{
						resuilt = resuilt.filter(product => {
							return product.price > parseInt(filter[0]) && product.price <= parseInt(filter[1])
						})
					}
				}
			}
			break;
		}
		default : 
			break;
	}

	res.json({
		path : `${parentCatalog.name} / ${childCatalog.name}`,
		slider : slider,
		products  : resuilt,
		pageTotal
	})
}
