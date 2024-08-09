const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const verifyToken = require('../middleware/verifyToken');

// Middleware to verify token
router.use(verifyToken);

// Route to create a new group
router.post('/create-group', groupController.createGroup); // POST /api/groups

// Route to get all groups for a user
router.get('/get-group', groupController.getGroups); // GET /api/groups

module.exports = router;