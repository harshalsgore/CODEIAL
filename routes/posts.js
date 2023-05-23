const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts_controller')

router.get('/latestPost', postsController.latestPost)
router.get('/oldPost', postsController.oldPost)

module.exports = router;