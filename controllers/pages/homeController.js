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
           id_parent : 1
       }
    })

    var trousersCata = await Catalog.findAll({
        where : {
            id_parent: 3
        }
    })

     var accessCata = await Catalog.findAll({
        where : {
            id_parent: 5
        }
    })

     var shoseCata = await Catalog.findAll({
        where : {
            id_parent: 31
        }
    })

    var shirtProducts = await Product.findAll({
        where : {
            id_catalog : {
                [Op.in] : getIdCata(shirtCata)
            }
        },
        limit : 16
    })

    var trousersProducts = await Product.findAll({
        where : {
            id_catalog : {
                [Op.in] : getIdCata(trousersCata)
            }
        },
        limit : 16
    })

    var accesssProducts = await Product.findAll({
        where : {
           id_catalog : {
                [Op.in] : getIdCata(accessCata)
            }
        },
        limit : 16
    })

    var shoeseProducts = await Product.findAll({
        where : {
            id_catalog : {
                [Op.in] : getIdCata(shoseCata)
            }
        },
        limit : 16
    })

    res.json({
        shirt : shirtProducts,
        trousers : trousersProducts,
        accessories : accesssProducts,
        shose : shoeseProducts
    })
}