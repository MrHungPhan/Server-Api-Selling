const Sequelize = require("sequelize");
const db = require('../database/data');


module.exports = db.sequelize.define(
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