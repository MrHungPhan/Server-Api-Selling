require('dotenv').config();

const express = require('express');
const cors = require('cors');
const formData = require('express-form-data')
const bodyParser = require('body-parser');
var app = express();
var path = require('path')
var port = process.env.PORT || 4000;

var server = require('http').Server(app);

const io = require('socket.io')(server);
var countUser = 0;
//ket noi server
io.on('connection', function(socket){
	console.log("co nguoi ket noi" + socket.id);
	countUser ++;
	//Server send all user connect
	io.sockets.emit('count-users', countUser)
	// event ngat ket noi
	socket.on('disconnect', function(){
		console.log(socket.id + 'da ngat ket noi');
		countUser--;
		io.sockets.emit('count-users', countUser)
	})
})

// app.get('/api/getUserOnline', (req, res)=> {
// 	console.log('user online ' + countUser)
// })


app.use(cors());
app.use(formData.parse())

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));


//routes
const catalogRoute = require('./routes/admin/catalogRoute');
const productRoute = require('./routes/admin/productRoute');
const postRoute = require('./routes/admin/postRoute');

const homeRoute = require('./routes/pages/homeRoute');
const menuRoute = require('./routes/pages/menuRoute');
const cataPageRoute = require('./routes/pages/cataPageRoute')
const productDetailtPageRoute = require ('./routes/pages/productDetailtPageRoute');
const userPageActionRoute = require('./routes/pages/userPageActionRoute');
const cartRoute = require('./routes/pages/cartRoute');
const orderRoute = require('./routes/pages/orderRoute')
const searchRoute = require('./routes/pages/searchRoute')
const postPageRoute = require('./routes/pages/postRoute')


app.get('/', (req, res) => {
	res.send('hello')
})

app.use('/api/admin/catalog', catalogRoute);
app.use('/api/admin/products', productRoute);
app.use('/api/admin/post', postRoute);

app.use('/api/menu', menuRoute);
app.use('/api/home', homeRoute);
app.use('/api/catapage', cataPageRoute);
app.use('/api/product', productDetailtPageRoute)
app.use('/api/user', userPageActionRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute)
app.use('/api/search', searchRoute)
app.use('/api/post', postPageRoute)


server.listen(port, () => {
    console.log("server is running on port : "+ port);
})