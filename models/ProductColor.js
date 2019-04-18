const Sequelize = require("sequelize");
const db = require('../database/data');

const OrderDetailt = require('./OrderDetailt');
const ProductStyle = require('./ProductStyle')

const ProductColor = db.sequelize.define(
    'product_color',
    {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        src_image : {
            type : Sequelize.STRING,
        },
        id_product : {
            type : Sequelize.INTEGER
        }
    },
    {
        timestamps : false
    }
)

// relation color -order detailt
ProductColor.hasMany(OrderDetailt, { foreignKey : 'id_color'});
OrderDetailt.belongsTo(ProductColor, { foreignKey : 'id_color', as : 'color' });

// relation color - product style
ProductColor.hasMany(ProductStyle, { foreignKey : 'id_product_color'});
ProductStyle.belongsTo(ProductColor , { foreignKey : 'id_product_color'})

module.exports = ProductColor;