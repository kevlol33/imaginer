const Post       = require("../database/models/Article");

module.exports   = async (req, res) => {
    const posts  = await Post.find({});
    
    res.render("index", {posts} )
}