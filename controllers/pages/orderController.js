var apiTransport = require('../../utils/apiTransport');
var _ = require('lodash');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var Order = require('../../models/Order');
var OrderDetailt = require('../../models/OrderDetailt');
var Product = require('../../models/Product');
const UserProfile = require('../../models/UserProfile');
const ProductColor = require('../../models/ProductColor');
const ProductSize = require('../../models/ProductSize');
const ProductStyle = require('../../models/ProductStyle');
const mailer = require('../../misc/mailer')

const sortLike = (dataNotLike, data) => {
    var resuilt = [];
    for(let i of dataNotLike){
        for(let j of data){
        if(j.ProvinceID === i.ProvinceID)
        resuilt.push(j);
        }
    }
    return resuilt
}

module.exports.getDistricts = async  (req, res, next)=>{
    const doc = await apiTransport('GetDistricts', 'POST', {
        token :  process.env.TOKEN_TRANSPORT    
    })
    if(doc.status===200){
        const data = doc.data.data;
        /// xoa phan tu giong nhau ProvinceName = distric name
        _.remove(data, function(item){
            return item.ProvinceName === item.DistrictName
        })
        
        var dataNotLike = [...data];
        // loai nhung phan tu giong nhau ve provinceName( Giu lai 1 phan tu )
        for(let i = 0;i<dataNotLike.length-1; i++){
            for(let j = i+1; j<dataNotLike.length ;j++){
              if(dataNotLike[i].ProvinceID === dataNotLike[j].ProvinceID){
                for(let k = j+1; k<dataNotLike.length; k++){
                  dataNotLike[k-1] = dataNotLike[k];
                }
                dataNotLike.length--;
                j--
              }
            }
        }
        _.sortBy(dataNotLike, [function(item){
            return item.ProvinceName
        }])

        // sap xep nhung phan tu giong nhau ve province nam gan nhau
        const resuilt = sortLike(dataNotLike, data)

        res.json(resuilt)
    }
}

module.exports.getWards= async (req, res)=>{
    const doc = await apiTransport('GetWards','POST',{
        token : process.env.TOKEN_TRANSPORT,
        DistrictID : req.body.districtId
    })
    if(doc.status === 200){
        res.json(doc.data.data)
    }
}

module.exports.getServices = async (req, res) => {
    const doc = await apiTransport('FindAvailableServices', 'POST', {
        token : process.env.TOKEN_TRANSPORT,
        Weight: 1,
        Length: 1,
        Width: 1,
        Height: 1,
        FromDistrictID: 1617,
        ToDistrictID: req.body.toDistrictId
    })

    if(doc.status === 200){
        const data = doc.data.data;
        var resuilt = []
        for( let item of data){
            resuilt.push({
                ExpectedDeliveryTime : item.ExpectedDeliveryTime,
                Name : item.Name,
                ServiceFee : item.ServiceFee,
                ServiceID : item.ServiceID
            })
        }
        res.status(200).json(resuilt)
    }
}

module.exports.checkoutOrder = async (req, res, next) =>{
    console.log(req.body);
    const {
        name, phone,district, ward, service, address, pay
    } = req.body
    const idUser = req.user.id;
    // update order
    const orderUser = await Order.findOne({
        where : {
            id_user : idUser,
            status : "Created"
        }
    })
    const newDate = new Date();

    if(orderUser){
            await orderUser.update({
            status : 'NotVerify',
            customer_name : name,
            customer_phone : phone,
            customer_address : address,
            create_time : newDate
        })


        //send mail verify order
        const html = `<div style="text-align: center;
        border: 1px solid #ddd;
        border-radius : 3px;
        padding : 1em;
    ">
        <h3>XÁC NHẬN ĐƠN HÀNG</h3>
        <h3>Bạn đã đặt hàng thành công !</h3>
        <p>Hãy xác nhận đơn hàng để giao hàng cho đơn vị vận chuyển </p>
        <br/>
        <a style="color: white;
        font-size : .9rem;
        text-decoration: none;
        padding: 10px 20px;
        border: 1px solid tomato;
        background: tomato;
        font-weight: 500;
        text-transform: uppercase;"
        href="http://localhost:5000/api/order/verify?orderId=${orderUser.id}&district=${district}&ward=${ward}&service=${service}">
            Xác nhận đơn hàng
        </a>
        <p style="margin-top :3em;
              font-size: .9rem;
        "><span style="text-decoration: underline">Chú ý</span> : <span style="color : red">Sau 24h nếu không xác nhận, đơn hàng của bạn sẽ bị hủy<span></p>
    </div>`;

        //send email
        await mailer.sendEmail('menshop789@gmail.com', req.user.email, 'Xác nhận đơn hàng', html) 
        res.status(200).json(orderUser)
    }
   
}

module.exports.verifyOrder = async (req, res) => {
    const { orderId, district, ward, service } = req.query;

    var orderVerify = await Order.findOne({
        where : {
            id : orderId,
            status : 'NotVerify'
        }
    })

    //////////////////////
    if(orderVerify){
        // get total cart
        var detailtOrder = await OrderDetailt.findAll({
            where : {
                id_order : orderVerify.id
            }
        })

        var total = 0;

        for(let item of detailtOrder){
            console.log(item.id_product, item.quatity)
            let product = await Product.findOne({
                where : {
                    id : item.id_product
                }
            })
            total += product.price * item.quantity
        }

        // get time Emai verify
        const currentDate = new Date();
        const orderDate = new Date(orderVerify.create_time);
        const timeVerify = Math.floor(Math.floor(currentDate.getTime() - orderDate.getTime())/60*60*1000);
        // Qua 24h email xac nhan het hieu luc
        console.log(timeVerify)
        if(timeVerify < 24){
            const resApi = await apiTransport('CreateOrder', "POST", {
                "token": "TokenStaging",
                "PaymentTypeID": 2,
                "FromDistrictID": 1617,
                "FromWardCode": "21402",
                "ToDistrictID": parseInt(district),
                "ToWardCode": `${ward}`,
                "Note": "Hàng dễ vỡ nhẹ tay!",
                "ClientContactName": "Men Shop",
                "ClientContactPhone": "0973648655",
                "ClientAddress": "06 Lê Duẩn TP Vinh Nghệ An",
                "CustomerName": orderVerify.customer_name,
                "CustomerPhone": orderVerify.customer_phone,
                "ShippingAddress": orderVerify.customer_address,
                "CoDAmount": total,
                "NoteCode": "CHOXEMHANGKHONGTHU",
                "ClientHubID": 352302,
                "ServiceID": parseInt(service),
                "Weight": 1,
                "Length": 1,
                "Width": 1,
                "Height": 1,
                "ReturnContactName": "Men Shop",
                "ReturnContactPhone": "0973648655",
                "ReturnAddress": "06 Lê Duẩn TP Vinh Nghệ An",
                "ReturnDistrictID": 1617
            })

            if(resApi.status === 200){
                await orderVerify.update({
                    status : "Verified",
                    order_code : resApi.data.data.OrderCode,
                    create_time : currentDate,
                    total : total
                })

            res.render('verifyOrderSuccess',{
                orderCode : resApi.data.data.OrderCode
            })
        }else{
                res.send(res.data.msg)
            }       
        }else{
            await orderVerify.update({
                status : 'Cancel',
                create_time : currentDate
            })
            res.render('verifyOrderError');
        }
    }else{
        res.render('verifyNotFound')
    }
}

module.exports.getOrderHistory = async (req, res) => {
    const user = req.user;
    console.log(user)
    try{
            const orders = await Order.findAll({
                include : [
                    {
                        model : OrderDetailt
                    }
                ],
                where : { status : {
                    [Op.ne] : 'Created'
                },
                id_user : user.id
            }
        })

        ////////////// JSON.parese de mute Model ///////////////////////
        var resuilt = JSON.parse(JSON.stringify(orders))
        for(let item of resuilt){
            var detailts = item.order_detailts;
            for(let i = 0; i< detailts.length; i++){
                const product = await Product.findOne({
                    where : { id : detailts[i].id_product }
                })
                const color = await ProductColor.findOne({ where : { id : detailts[i].id_color }});
                const size = await ProductSize.findOne({ where : {id : detailts[i].id_size }});
                detailts.splice(i, 1, {
                    product, 
                    size,
                    color,
                    quantity : detailts[i].quantity
                })
            }
           
        }

        res.status(200).json(resuilt)
    }catch(err){
        console.log(err)
    }
  
}