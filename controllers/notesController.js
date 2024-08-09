const Note = require('../models/Notes');
const Group = require('../models/Group');

// Add a new note
const addNote = async (req, res) => {
    try {
        const { content, groupId } = req.body;
        const userId = req.userId;  // Assume userId is extracted from token in middleware

        // Create a new note
        const newNote = new Note({
            content,
            userId,
            groupId: groupId || null  // Set groupId if provided, otherwise null
        });

        await newNote.save();

        // If the note is part of a group, add it to the group's notes
        if (groupId) {
            const group = await Group.findById(groupId);
            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }
            group.notes.push(newNote._id);
            await group.save();
        }

        res.status(201).json({ message: 'Note added successfully', newNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding note' });
    }
};

// Get all notes for a specific user
const getNotes = async (req, res) => {
    try {
        const userId = req.userId;  // Assume userId is extracted from token in middleware

        // Fetch all notes for the user
        const notes = await Note.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching notes' });
    }
};

// Delete a specific note
const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.body;
        const userId = req.userId;  // Assume userId is extracted from token in middleware

        // Find and delete the note
        const deletedNote = await Note.findOneAndDelete({ _id: noteId, userId });

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found or not authorized' });
        }

        res.status(200).json({ message: 'Note deleted successfully', deletedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting note' });
    }
};

module.exports = {
    addNote,
    getNotes,
    deleteNote
};