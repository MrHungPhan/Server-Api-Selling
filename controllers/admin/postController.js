const Post = require('../../models/Post');

const  getPostAll = async () => {
	const resuilt = await Post.findAll({
		order : [['create_date', 'DESC']]
	})
	return resuilt;
}
module.exports.getPosts = async (req, res) => {
	const resuilt = await getPostAll();

	res.status(200).json(resuilt);
}

module.exports.addPost = async (req, res) => {
	console.log(req.body);
	const { title, sumary, content, create_by, status, fileImageServer } = req.body;
	// const imageArr = content.match(/"http(.*?)"/gm);
	// console.log('image - ', imageArr[0])
	try{
		var newPost = new Post({
		title : title,
		sumary : sumary,
		image : fileImageServer[0].url,
		content : content,
		create_by,
		status
		}) 

		await newPost.save();

		res.status(200).json({
			status : 1,
			message : "Thêm mới thành công"
		})
	}catch(err){
		console.log(err)
	}
	
}

module.exports.removePost = async (req, res) => {
	const {id} = req.params;
	console.log(id);

	await Post.destroy({
		where : {
			id : id
		}
	});

	const resuilt = await getPostAll();

	res.status(200).json({
		posts: resuilt,
		message : "Xóa thành công"
	})
}