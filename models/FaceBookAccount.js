const Sequelize = require("sequelize");
const db = require('../database/data');


const FaceBookAccount = db.sequelize.define(
    'facebook_account',
    {
        id_user_profile: {
            type : Sequelize.STRING,
            primaryKey : true,
        },
        id_facebook : {
            type : Sequelize.STRING,
        }
    },
    {
        timestamps : false
    }
)

module.exports = FaceBookAccount;