const searchFormat = require('../../utils/search_format');
const _ = require('lodash')
const Product = require('../../models/Product');


function sortNameFuntion(resuilt, sortValue){
    resuilt.sort((proPrev, proNext) => {
        if(proPrev.name > proNext.name) return -parseInt(sortValue)
        else if(proPrev.name < proNext.name) return parseInt(sortValue)
        else return 0;
    })
}

function sortPriceFuntion(resuilt, sortValue){
    resuilt.sort((proPrev, proNext) => {
        if(proPrev.price > proNext.price) return parseInt(sortValue)
        else if(proPrev.price < proNext.price) return -parseInt(sortValue)
        else return 0;
    })
}

module.exports.searchProducts = async (req, res) => {
    console.log(req.query);
    const { key } = req.query;
    if(key){
         try{
            const keyFormat = searchFormat(key);
             const products = await Product.findAll();
             var resuilt = products.filter(product => {
                console.log(product.name.toLowerCase())
                const nameFormat = searchFormat(product.name)
                return nameFormat.toLowerCase().indexOf(keyFormat) !== -1
             })
             
             /// filter
             const lengthQuery = _.keys(req.query);
            const { sortBy, sortValue, filterPrice } = req.query
            switch(lengthQuery.length){
                case 2: {
                    if(filterPrice){
                        const filter = filterPrice.split('>');
                            if(filter.length === 1){
                                if(_.isNaN(parseInt(filter[0]))) break;
                                else{
                                    resuilt = resuilt.filter(product => {
                                        return product.price > parseInt(filter[0])
                                    })
                                }
                            }else{
                                resuilt = resuilt.filter(product => {
                                    return product.price > parseInt(filter[0]) && product.price <= parseInt(filter[1])
                                })
                            }
                    }
                    break;
                }
                case 3 : {
                    if(sortBy && sortValue){
                        if(sortBy === 'name'){
                            sortNameFuntion(resuilt, sortValue);
                        }else{
                            sortPriceFuntion(resuilt, sortValue)
                        }
                    }
                    break;
                }
                case 4 : {
                    if(sortBy, sortValue, filterPrice){
                        if(sortBy === 'name'){
                            sortNameFuntion(resuilt, sortValue);

                            const filter = filterPrice.split('>');
                            if(filter.length === 1){
                                if(_.isNaN(parseInt(filter[0]))) break;
                                else{
                                    resuilt = resuilt.filter(product => {
                                        return product.price > parseInt(filter[0])
                                    })
                                }
                            }else{
                                resuilt = resuilt.filter(product => {
                                    return product.price > parseInt(filter[0]) && product.price <= parseInt(filter[1])
                                })
                            }
                        }else{
                            sortPriceFuntion(resuilt, sortValue)

                            const filter = filterPrice.split('>');
                            if(filter.length === 1){
                                if(_.isNaN(parseInt(filter[0]))) break;
                                else{
                                    resuilt = resuilt.filter(product => {
                                        return product.price > parseInt(filter[0])
                                    })
                                }
                            }else{
                                resuilt = resuilt.filter(product => {
                                    return product.price > parseInt(filter[0]) && product.price <= parseInt(filter[1])
                                })
                            }
                        }
                    }
                    break;
                }
                default : 
                    break;
            }

            res.status(200).json(resuilt)
         }catch(error){
            console.log(error)
         }
    }
    
}
