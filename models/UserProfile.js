const Sequelize = require("sequelize");
const db = require('../database/data');

const UserAccount = require('./UserAccount');
const FaceBookAccount = require('./FaceBookAccount');
const GoogleAccount = require('./GoogleAccount');
const Order = require('./Order');

const UserProfile = db.sequelize.define(
    'user_profile',
    {
        id: {
            type : Sequelize.STRING,
            primaryKey : true,
        },
        display_name : {
            type : Sequelize.STRING,
        },
        email : {
            type : Sequelize.STRING
        }
    },
    {
        timestamps : false
    }
)

// relations User - user account - google - facebook
UserProfile.hasMany(UserAccount, {foreignKey : 'id_user_profile'});
UserProfile.hasMany(FaceBookAccount, {foreignKey : 'id_user_profile'});
UserProfile.hasMany(GoogleAccount, {foreignKey : 'id_user_profile'});

UserAccount.belongsTo(UserProfile, { foreignKey : 'id_user_profile'});
FaceBookAccount.belongsTo(UserProfile, { foreignKey : 'id_user_profile'});
GoogleAccount.belongsTo(UserProfile, { foreignKey : 'id_user_profile'});

// relation user - order
UserProfile.hasMany(Order, {foreignKey : 'id_user'});
Order.belongsTo(UserProfile, {foreignKey : 'id_user'});


module.exports = UserProfile;