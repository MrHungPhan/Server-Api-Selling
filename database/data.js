const Sequelize = require('sequelize');
const db = {};
// ban hang, root, '', localhost.
const sequelize = new Sequelize("sql12292961" , "sql12292961", "jQMhTdJ3LD", {
    host : 'sql12.freemysqlhosting.net',
    dialect : 'mysql',

    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
})

// const sequelize = new Sequelize("banhang" , "root", "", {
//     host : 'localhost',
//     dialect : 'mysql',

//     pool : {
//         max : 5,
//         min : 0,
//         acquire : 30000,
//         idle : 10000
//     }
// })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;