const Sequelize = require("sequelize");
const db = require('../database/data');

const Product = require('./Product');
const Slider = require('./Slider');

const Catalog = db.sequelize.define(
    'catalog',
    {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : Sequelize.STRING,
        },
        avatar : {
            type : Sequelize.STRING
        },
        id_parent : {
            type : Sequelize.INTEGER
        }
    },
    {
        timestamps : false
    }
)

// relation
Catalog.hasMany(Product, { foreignKey : 'id_catalog'});
Catalog.hasMany(Slider, { foreignKey : 'id_catalog'});

Product.belongsTo(Catalog, { foreignKey : 'id_catalog'});
Slider.belongsTo(Catalog, { foreignKey : 'id_catalog'});

module.exports = Catalog;