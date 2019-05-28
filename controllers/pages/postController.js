const Post = require('../../models/Post');

module.exports.getPosts = async (req, res, next) => {
    const resuilt = await Post.findAll({
        order : [['create_date', 'DESC']]
    })

    res.status(200).json(resuilt)
}

module.exports.getPostDetailt = async (req, res) => {
    const {id} = req.params
    const resuilt = await Post.findOne({
        where : {
            id : id
        }
    })

    res.status(200).json(resuilt)
}