const Sequelize = require("sequelize");
const db = require('../database/data');

const GoogleAccount = db.sequelize.define(
    'google_account',
    {
        id_user_profile: {
            type : Sequelize.STRING,
            primaryKey : true,
        },
        id_google : {
            type : Sequelize.STRING,
        }
    },
    {
        timestamps : false
    }
)

module.exports = GoogleAccount;