const Sequelize = require("sequelize");
const db = require('../database/data');

const OrderDetailt = require('./OrderDetailt');
const ProductColor = require('./ProductColor');
const ProductImage = require('./ProductImage')

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
        quantity : {
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
        },
         create_time : {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        timestamps : false
    }
)

// relation
Product.hasMany(OrderDetailt, { foreignKey : 'id_product'});
Product.hasMany(ProductColor, { foreignKey : 'id_product'});
Product.hasMany(ProductImage, { foreignKey : 'id_product'});

OrderDetailt.belongsTo(Product, { foreignKey : 'id_product'});
ProductColor.belongsTo(Product, {foreignKey : 'id_product'});
ProductImage.belongsTo(Product, {foreignKey : 'id_product'});
module.exports = Product;