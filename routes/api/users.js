const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");
const multer = require('multer');
const upload = multer();
/*---------- Public Routes ----------*/

// whichever route is handling a file/photo upload, you use multer
// 'photo' comes from the key on the form-data object we created 
// on the signup page in the react code!
router.post("/signup", upload.single('photo'), usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.get('/:username', usersCtrl.profile);
/*---------- Protected Routes ----------*/

module.exports = router;



/*---------- Protected Routes ----------*/



