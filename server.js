require('dotenv').config();

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var path = require('path')
var port = process.env.PORT || 4000;

app.use(cors());

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));


//routes
var catalogRoute = require('./routes/catalogRoute');
var productRoute = require('./routes/productRoute');

var homeRoute = require('./routes/pages/homeRoute');
var menuRoute = require('./routes/menuRoute');
var cataPageRoute = require('./routes/pages/cataPageRoute')
var productDetailtPageRoute = require ('./routes/pages/productDetailtPageRoute');
var userPageActionRoute = require('./routes/pages/userPageActionRoute');
var cartRoute = require('./routes/pages/cartRoute');
var orderRoute = require('./routes/pages/orderRoute')


app.use('/api/catalog', catalogRoute);
app.use('/api/products', productRoute);

app.use('/api/menu', menuRoute);
app.use('/api/home', homeRoute);
app.use('/api/catapage', cataPageRoute);
app.use('/api/product', productDetailtPageRoute)
app.use('/api/user', userPageActionRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute)


app.listen(port, () => {
    console.log("server is running on port : "+ port);
})