require('dotenv').config();

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 4000;

app.use(cors());

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


app.use('/api/catalog', catalogRoute);
app.use('/api/products', productRoute);

app.use('/api/menu', menuRoute);
app.use('/api/home', homeRoute);
app.use('/api/catapage', cataPageRoute);
app.use('/api/product', productDetailtPageRoute)
app.use('/api/user', userPageActionRoute);
app.use('/api/cart', cartRoute);


app.listen(port, () => {
    console.log("server is running on port : "+ port);
})