const Group = require('../models/Group');

// Create a new group
const createGroup = async (req, res) => {
    try {
        const { name, color } = req.body;
        const userId = req.userId; // Get userId from middleware

        const newGroup = new Group({ name, color, userId });
        await newGroup.save();

        res.status(201).json({ message: 'Group created successfully', newGroup });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating group' });
    }
};

// Get all groups for a user
const getGroups = async (req, res) => {
    try {
        const userId = req.userId;
        const groups = await Group.find({ userId });

        res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching groups' });
    }
};

module.exports = {
    createGroup,
    getGroups
};