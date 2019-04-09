const Sequelize = require("sequelize");
const db = require('../database/data');


module.exports = db.sequelize.define(
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
        unit : {
            type : Sequelize.STRING
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