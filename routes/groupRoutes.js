const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);
router.post('/create', groupController.createGroup);
router.get('/', groupController.getGroups); 

module.exports = router;