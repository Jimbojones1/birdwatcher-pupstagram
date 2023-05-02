const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId }
})

const postSchema = new mongoose.Schema({
	// One User has many Posts, Post belongs to a User
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    caption: String,
	// One Post has many likes, like belongs to a POST
    likes: [likesSchema]
  })
 

module.exports = mongoose.model('Post', postSchema);