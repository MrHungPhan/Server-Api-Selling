const Sequelize = require("sequelize");
const db = require('../database/data');


const OrderDetailt = db.sequelize.define(
    'order_detailt',
    {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        id_product : {
            type : Sequelize.INTEGER,
        },
        id_color : {
            type : Sequelize.INTEGER
        },
        id_size : {
            type : Sequelize.INTEGER
        },
        id_order : {
            type : Sequelize.INTEGER
        },
        quantity : {
            type : Sequelize.INTEGER
        }
    },
    {
        timestamps : false
    }
)


module.exports = OrderDetailt;