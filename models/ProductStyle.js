const Sequelize = require("sequelize");
const db = require('../database/data');


module.exports = db.sequelize.define(
    'products_color_size',
    {
        id_product_color : {
            type : Sequelize.INTEGER,
            primaryKey : true,
        },
        id_product_size : {
            type : Sequelize.INTEGER,
            primaryKey : true,
        }
    },
    {
        timestamps : false
    }
)