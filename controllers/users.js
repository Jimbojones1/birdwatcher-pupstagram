const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;




module.exports = {
  signup,
  login,
  profile
};


const S3 = require('aws-sdk/clients/s3');
// initialize the constructor function
// this object can make requests to our s3 bucket!
const s3 = new S3();

// we'll use the module uuid to generate random names for our aws file
const { v4: uuidv4 } = require('uuid')

// our s3 aws bucket from our .env file!
const BUCKET_NAME = process.env.BUCKET


async function signup(req, res) {

  console.log(req.body, ' < req.body', req.file, " <- req.filed")
  
  // first check to make sure the user uploaded a file
  if(!req.file) return res.status(400).json({error: "Please Submit a Photo!"});

  // create our path of where we want to strore file in our s3 bucket
  const filePath = `pupstagram/${uuidv4()}-${req.file.originalname}`;
  const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; // req.file.buffer is the image uploaded from the client
  // sd.upload to make a request to s3 bucket
  s3.upload(params, async function(err, data){
    if(err){
      console.log('===========================================')
      console.log(err, ' err from aws, either your bucket name is wrong or your keys arent correct');
      console.log('===========================================')
      res.status(400).json({error: 'Error from aws, check your terminal!'})
    }

    const user = new User({...req.body, photoUrl: data.Location}); // data.Location is the is the url of our image on AWS
    try {
      await user.save(); // user model .pre('save') will run which hashes our password
      // create our jwt token
      const token = createJWT(user);
      res.json({token}); // sends the token to the client (userService.signup function) which stores to the token in localstorage!
      // our user model toJSON removes the password

    } catch(err){
      res.status(400).json({error: err})
    }

  }) // end of s3.upload


}
// https://git.generalassemb.ly/SEI-CC/sei-2-21-birdwatchers/blob/main/work/w11/d1/jwt-boilerplatec-code.md
async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res){
  try {
    // First find the user using the params from the request
    // findOne finds first match, its useful to have unique usernames!
    const user = await User.findOne({username: req.params.username})
    // Then find all the posts that belong to that user
    if(!user) return res.status(404).json({error: 'User not found'})

    // using the post model to find all the users posts (the user from req.params)
    // finding all posts by a user, and populating the user property!
    const posts = await Post.find({user: user._id}).populate("user").exec();
    console.log(posts, ' this posts')
    res.status(200).json({posts: posts, user: user})
  } catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}
/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
