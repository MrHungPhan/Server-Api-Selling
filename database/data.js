const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize("sql12292961", "sql12292961", "jQMhTdJ3LD", {
    host : 'sql12.freemysqlhosting.net',
    dialect : 'mysql',

    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;