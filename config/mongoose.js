require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to Database'));
db.once('open', function () {
    console.log('Connected to database!');
});
