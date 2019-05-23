const Sequelize = require("sequelize");
const db = require('../database/data');

const Post = db.sequelize.define(
    'post',
    {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        title: {
            type : Sequelize.STRING,
        },
        image : {
            type : Sequelize.STRING
        },
        sumary : {
            type : Sequelize.STRING
        },
        content : {
            type : Sequelize.INTEGER
        },
        create_date : {
             type: 'TIMESTAMP',
             defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        create_by : {
            type : Sequelize.STRING
        },
        status : {
            type : Sequelize.BOOLEAN
        }
    },
    {
        timestamps : false
    }
)

module.exports = Post