const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const fs = require('fs');
const Joi = require('joi');
const BP = require('body-parser');
const app = express();

// MIDDLEWARE (.use) -> public folder
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(8000);