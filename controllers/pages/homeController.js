var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var Product = require('../../models/Product');
var Catalog = require('../../models/Catalog');

function getIdCata (arrCata){
    var idCata = [];
    for(let i = 0;i < arrCata.length; i++){
        idCata.push(arrCata[i].id);
    }
    return idCata;
}

module.exports.getProductsHome = async (req, res) => {
    var shirtCata = await Catalog.findAll({
       where : {
           [Op.or] : [{id_parent : 1}, {id : 2}]
       }
    })

    var trousersCata = await Catalog.findAll({
        where : {
            id_parent : 3
        }
    })


    var shirtProducts = await Product.findAll({
        where : {
            id_catalog : {
                [Op.in] : getIdCata(shirtCata)
            }
        }
    }, {
        limit: 32
    })

    var trousersProducts = await Product.findAll({
        where : {
            id_catalog : {
                [Op.in] : getIdCata(trousersCata)
            }
        }
    }, {
        limit: 32
    })

    var cloakProducts = await Product.findAll({
        where : {
            id_catalog: {
                [Op.in] : [23, 24, 20]
            }
        }
    }, {
        limit: 32
    })

    var winnerProducts = await Product.findAll({
        where : {
            id_catalog: {
                [Op.in] : [25, 21]
            }
        }
    }, {
        limit: 32
    })

    var shoeseProducts = await Product.findAll({
        where : {
            id_catalog: 4
        }
    }, {
        limit: 32
    })

    res.json({
        shirt : shirtProducts,
        trousers : trousersProducts,
        cloak : cloakProducts,
        winner : winnerProducts,
        shose : shoeseProducts
    })
}