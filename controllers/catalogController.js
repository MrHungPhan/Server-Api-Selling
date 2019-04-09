const Catalog = require('../models/Catalog');

module.exports.getCatalog = (req, res) => {
    Catalog.findAll()
    .then(catalog => {
        res.json({catalog : catalog});
})
}

module.exports.getCatalogById = (req, res) => {
    Catalog.findAll({
        where : {
            id : req.params.id
        }
    })
    .then(catalog => {
        res.json({catalog : catalog});
    })
}