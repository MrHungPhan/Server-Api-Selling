const Sequelize = require("sequelize");
const db = require('../database/data');

const ProductImage = db.sequelize.define(
    'product_image',
    {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        image : {
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

module.exports = ProductImage