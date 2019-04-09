const Sequelize = require("sequelize");
const db = require('../database/data');


module.exports = db.sequelize.define(
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