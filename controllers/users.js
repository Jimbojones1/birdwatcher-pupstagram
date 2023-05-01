const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;




module.exports = {
  signup,
  login
};


const S3 = require('aws-sdk/clients/s3');
// initialize the constructor function
const s3 = new S3();

// we'll use the module uuid to generate random names for our aws file
const { v4: uuidv4 } = require('uuid')

// our s3 aws bucket from our .env file!
const BUCKET_NAME = process.env.BUCKET


async function signup(req, res) {

  console.log(req.body, ' < req.body', req.file, " <- req.filed")
  res.json({data: 'hitting signup!'})
  // const user = new User(req.body);
  // try {
  //   await user.save();
  //   const token = createJWT(user);
  //   // the code that runs in response to this on the client
  //   // is in the utils/userService signup function, that last
  //   // .then! 
  //   res.json({ token });
  // } catch (err) {
  //   // Probably a duplicate email
  //   res.status(400).json(err);
  // }
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

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
