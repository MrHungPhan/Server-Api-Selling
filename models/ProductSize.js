const Sequelize = require("sequelize");
const db = require('../database/data');

const OrderDetailt = require('./OrderDetailt');
const ProductStyle = require('./ProductStyle');

const ProductSize = db.sequelize.define(
    'product_size',
    {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : Sequelize.STRING,
        }
    },
    {
        timestamps : false
    }
)

// relation size - order detailt
ProductSize.hasMany(OrderDetailt , { foreignKey : 'id_size'});
OrderDetailt.belongsTo(ProductSize, { foreignKey : 'id_size', as : 'size'});

// relation size - product style
ProductSize.hasMany(ProductStyle, { foreignKey : 'id_product_size'});
ProductStyle.belongsTo(ProductSize, { foreignKey : 'id_product_size'})

module.exports = ProductSize;