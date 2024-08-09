const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');
const verifyToken = require('../middleware/verifyToken');


router.use(verifyToken);
router.post('/add', noteController.addNote); 
router.get('/get-note', noteController.getNotes);
router.get('/group/:groupId', noteController.getNotesByGroup);
router.delete('/delete', noteController.deleteNote);
module.exports = router;