var Product = require('../models/Product');
var Catalog = require('../models/Catalog');

module.exports.getProducts = (req, res) => {
    Product.findAll()
        .then(product => {
            res.json({ product: product });
        }).catch(err => {
            console.log(err);
        })
}

module.exports.getProductsById = (req, res) => {
    Product.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(product => {
            res.json({ product: product });
        })
}

module.exports.addProduct = (req, res) => {
    var body = req.body;
    console.log(body);
    if (body) {
        Product.create(body).then(product => {
            res.json({ product: product })
        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports.getProductsWithPage = (req, res) => {
    var pageNumber = req.params.page;
    const pageLimit = 3;
    var pageOffset = (pageNumber - 1) * pageLimit;
    Product.findAll({ offset: pageOffset, limit: pageLimit })
        .then(products => {
            res.json({ products: products })
        })
        .catch(err => {
            console.log(err);
        })
}

