const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');


const userRoutes = require('./routes/userRoutes')
const groupRoutes = require('./routes/groupRoutes')
const notesRoutes = require('./routes/notesRoutes')
dotenv.config();


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected Succesfully'))
    .catch((error) => console.log(error));
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyparser.json());
app.use('/api/user', userRoutes)
app.use('/api/group', groupRoutes)
app.use('/api/notes', notesRoutes)
app.listen(port, () => {
    console.group('server running on the port')
})

app.use('/', (req, res) => {
    res.send('<h1>Welcome to Pocket-notes')
})