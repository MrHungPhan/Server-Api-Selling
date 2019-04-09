const Catalog = require('../models/Catalog');

module.exports.getMenu = async (req, res) => {
    var menuParent = await Catalog.findAll({
        where : {
            id_parent : 0
        }
    })

    var menu = [];

    for(let item of menuParent){
        let subMenu = await Catalog.findAll({
            where : {
                id_parent : item.id
            }
        })
        let subMenuItem = {};
        let nameParent = item.name;
        subMenuItem[nameParent] = subMenu
        menu.push(subMenuItem);
        
    }
    res.send(menu);
}
