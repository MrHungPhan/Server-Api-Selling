const Sequelize = require("sequelize");
const db = require('../database/data');


module.exports = db.sequelize.define(
    'catalog',
    {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : Sequelize.STRING,
        },
        avatar : {
            type : Sequelize.STRING
        },
        id_parent : {
            type : Sequelize.INTEGER
        }
    },
    {
        timestamps : false
    }
)