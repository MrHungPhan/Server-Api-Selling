const Sequelize = require("sequelize");
const db = require('../database/data');

const OrderDetailt = require('./OrderDetailt');

const Order = db.sequelize.define(
    'order',
    {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        id_user : {
            type : Sequelize.STRING,
        },
        status : {
            type : Sequelize.STRING
        },
        total : {
            type : Sequelize.INTEGER
        },
        create_time : {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        customer_name : {
            type : Sequelize.STRING
        },
        customer_phone : {
            type : Sequelize.STRING
        },
        customer_address : {
            type : Sequelize.STRING
        },
        order_code : {
            type : Sequelize.STRING
        }
    },
    {
        timestamps : false
    }
)

// relation
Order.hasMany(OrderDetailt, { foreignKey : 'id_order'});

OrderDetailt.belongsTo(Order, { foreignKey : 'id_order'});

module.exports = Order;

