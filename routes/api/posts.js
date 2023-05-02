const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');

// /*---------- Public Routes ----------*/
router.post('/', postsCtrl.create);
router.get('/', postsCtrl.index)


/*---------- Protected Routes ----------*/




module.exports = router;