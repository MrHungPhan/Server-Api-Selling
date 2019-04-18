const Sequelize = require("sequelize");
const db = require('../database/data');

const OrderDetailt = require('./OrderDetailt');
const ProductColor = require('./ProductColor');

const Product = db.sequelize.define(
    'product',
    {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        id_catalog: {
            type : Sequelize.INTEGER,
        },
        name : {
            type : Sequelize.STRING
        },
        price : {
            type : Sequelize.INTEGER
        }, 
        image : {
            type : Sequelize.STRING
        },
        rating : {
            type : Sequelize.INTEGER
        },
        description : {
            type : Sequelize.STRING
        }
    },
    {
        timestamps : false
    }
)

// relation
Product.hasMany(OrderDetailt, { foreignKey : 'id_product'});
Product.hasMany(ProductColor, { foreignKey : 'id_product'});

OrderDetailt.belongsTo(Product, { foreignKey : 'id_product'});
ProductColor.belongsTo(Product, {foreignKey : 'id_product'});
module.exports = Product;