const Sequelize = require("sequelize");
const db = require('../database/data');


module.exports = db.sequelize.define(
    'slider_catalog',
    {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
        },
        id_catalog: {
            type : Sequelize.INTEGER,
        },
        image : {
            type : Sequelize.STRING
        }
    },
    {
        timestamps : false
    }
)