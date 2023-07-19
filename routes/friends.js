const express = require('express');

const router = express.Router();
const friendsController = require('../controllers/friends_controller');

router.post('/create/:id', friendsController.create);
router.get('/destroy/:id', friendsController.destroy);

module.exports = router;