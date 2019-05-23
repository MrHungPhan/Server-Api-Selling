var Product = require('../../models/Product');
var Catalog = require('../../models/Catalog');
var ProductSize = require('../../models/ProductSize');
var ProductImage = require('../..//models/ProductImage');
var ProductColor = require('../..//models/ProductColor');
var ProductStyle = require('../../models/ProductStyle');

var FormData = require('form-data')
var cloudinary = require('cloudinary');
var axios = require('axios');
const _ = require('lodash');

cloudinary.config({
    cloud_name : "dxvmlrh16",
    api_key: "898996513592412", 
    api_secret: "r06JC3uh_dCxLhThQqe4WVLe4xI"
})

 const getAllProducts = async ()=>{
    var resuilt = [];
    var products = await Product.findAll({
        order :[["create_time", 'DESC']]
    });
    for(let item of products){
        const nameCatalog = await Catalog.findOne({
            attributes : ['name'],
            where : {
                id : item.id_catalog
            }
        })
        resuilt.push({
            product : item,
            nameCatalog : nameCatalog.name
        })
    }
    return resuilt
}


module.exports.getProducts = async (req, res) => {
    const resuilt = await getAllProducts();
    console.log(resuilt)
    res.json(resuilt);
}

module.exports.getProductsById = (req, res) => {
    Product.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(product => {
            res.json({ product: product });
        })
}

module.exports.getProductsWithPage = (req, res) => {
    var pageNumber = req.params.page;
    const pageLimit = 3;
    var pageOffset = (pageNumber - 1) * pageLimit;
    Product.findAll({ offset: pageOffset, limit: pageLimit })
        .then(products => {
            res.json({ products: products })
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.getStyle = async (req, res) => {
    const sizes = await ProductSize.findAll();
    res.status(200).json(sizes)
}

function findSizes(id, sizes){
    console.log(id, sizes);
    for(let size of sizes){
        if(_.keys(size)[0] === id){
            return _.values(size)[0]
        }
    }
}

module.exports.uploadImage = async (req, res) => {
    const values = Object.values(req.files)
    // console.log(values[values.length-1]);
    console.log(values)
    var resuilt = []
    try{
        for(value of values){
            const img = await cloudinary.uploader.upload(value.path)
            resuilt.push(img)
        }
        if(resuilt.length !== 1){
             _.reverse(resuilt)
        }
        res.json(resuilt)
    }catch(err){
        console.log(err)
    }
   
}


module.exports.addProduct = async (req, res) => {
    var { catalog, 
        name,
        price,
        quantity,
        fileImage,
        fileImageServer,
        fileColor,
        fileColorServer,
        sizes,
        content } = req.body;

    /// Add product
    try{
             const newProduct = new Product({
            name : name,
            id_catalog : catalog.value,
            image : fileImageServer[0].url,
            price : price,
            quantity : quantity,
            description : content
        })

        await newProduct.save();
        const idProduct = newProduct.id;

        /// Add Image Product
        for(let img of fileImageServer){
             const newImage = new ProductImage({
                 image : img.url,
                 id_product : idProduct
            })

            await newImage.save();
        }

        // Add Color and Size Product
         for( let color of fileColorServer){
             const newColor = new ProductColor({
                 src_image : color.url,
                 id_product : idProduct
            })
            await newColor.save();
            const idColor = newColor.id

            const sizeColor = findSizes(color.public_id, sizes);
            console.log(sizeColor);
            for(let sc of sizeColor){
                var newStyle = new ProductStyle({
                    id_product_color : idColor,
                    id_product_size : sc.value
                })
                await newStyle.save();
            }
        }

        res.json({
            status : 1,
            message : "Thêm mới thành công"
        })
    }catch(err){
        console.log(err)
    }
}


module.exports.removeProduct = async (req, res) => {
    const { id } = req.params;
    try{
        //delete product image cloundinary
        const productImage = await ProductImage.findAll({
            where : {
                id_product : id
            }
        });
        if(productImage){
               for(let img of productImage){
                var arrImg = img.image.split('/');
                const public_id = arrImg[arrImg.length-1].split('.')[0];
                cloudinary.uploader.destroy(public_id, (resuilt, error) => {
                    console.log(resuilt, error)
                })
            }
        }
        // delete product color cloudinary
        const productColor = await ProductColor.findAll({
            where : {
                id_product : id
            }
        });
        if(productColor){
                 for(let img of productColor){
                var arrImg = img.src_image.split('/');
                const public_id = arrImg[arrImg.length-1].split('.')[0];
                cloudinary.uploader.destroy(public_id, (resuilt, error) => {
                     console.log(resuilt, error)
                })
            }
        }

        ///delete img descriptiom
        const product = await Product.findOne({
            where : {
                id : id
            }
        });
         var content = product.description;
         const imageArr = content.match(/"http(.*?)"/gm);
         if(imageArr){
            for(let img of imageArr){
                var arrImg = img.split('/');
                const public_id = arrImg[arrImg.length-1].split('.')[0];
                cloudinary.uploader.destroy(public_id, (resuilt, error) => {
                     console.log(resuilt, error)
                })
            }
         }
        /// delete product
        await Product.destroy({
        where : {
            id : id
        }
     })
        const resuilt = await getAllProducts();

        res.json({
            products : resuilt,
            message : 'Xóa thành công'
        })
    }catch(error){
        console.log(error)
    }
    
}

module.exports.removeImage = (req, res) => {
    console.log('delete image')

    cloudinary.uploader.destroy(req.body.id, (resuilt, error) => {
        console.log(resuilt,'----', error)
    })
}

