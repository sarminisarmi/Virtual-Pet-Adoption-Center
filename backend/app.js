const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', petRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error' });
});

module.exports = app;
