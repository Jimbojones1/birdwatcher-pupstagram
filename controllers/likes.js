const Post = require('../models/post')

module.exports = {
    create,
    deleteLike
}

async function create(req, res){
 
    try {
        const post = await Post.findById(req.params.id);
        post.likes.push({username: req.user.username, userId: req.user._id}); //mutating a document
        await post.save()// save it
        res.status(201).json({data: 'like added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function deleteLike(req, res){
    try {
        // Find the Post with the like, 'likes._id' and 'likes.username' comes from the embedded schema
		// on Post
        const post = await Post.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        post.likes.remove(req.params.id) // mutating a document
        // req.params.id is the like id 
        await post.save() // after you mutate a document you must save
        // res is an object that can respond to the client
        
        res.json({data: 'like removed'})
    } catch(err){
        res.status(400).json({err})
    }
}