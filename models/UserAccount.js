const Sequelize = require("sequelize");
const bcrypt = require('bcryptjs');
const db = require('../database/data');


const UserAccount = db.sequelize.define(
    'user_account',
    {
        id_user_profile : {
            type : Sequelize.STRING,
            primaryKey : true,
        },
        email : {
            type : Sequelize.STRING,
        },
        password : {
            type : Sequelize.STRING
        }
    },
    {
        timestamps : false
    }
)

// hash password before save item
UserAccount.addHook('beforeCreate', async (user) => {
    try{
        const salt= await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(user.password, salt);
        user.password = passwordHash;
    }catch(error){
        console.log(error)
    }
});


// compoare password method
UserAccount.prototype.isValidPassword = async (email, newPassword) => {
    try{
        const user = await UserAccount.findOne({
            where : {
                email
            }
        })
        console.log(user.password, newPassword)
        return await bcrypt.compare(newPassword, user.password);
    }catch(error){
        throw new Error(error)
    }
}

module.exports = UserAccount;