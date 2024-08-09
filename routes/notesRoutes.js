const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');
const verifyToken = require('../middleware/verifyToken');

// Middleware to verify token
router.use(verifyToken);

// Route to add a new note
router.post('/add-note', noteController.addNote); // POST /api/notes

// Route to get all notes for a specific user
router.get('/get-note', noteController.getNotes); // GET /api/notes

// Route to delete a specific note
router.delete('/delete-note', noteController.deleteNote); // DELETE /api/notes

module.exports = router;