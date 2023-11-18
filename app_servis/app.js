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

// Middleware and request
app.use('/proizvod-novi', BP.urlencoded({ extended: false }));
app.post("/proizvod-novi", (req, res) => {

    const shema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(25).required(),
        opis: Joi.string().trim().min(1).required(),
        kategorija: Joi.string().trim().min(1).required(),
        cena: Joi.number().greater(0).required()
    });

    const { error, succ } = shema.validate(req.body);
    if (error) {
        res.send("Greska: " + error.details[0].message);
        return;
    }

    // Save new product to file
    req.body.opis.replace(/\r?\n|\r/g, '<br>');
    fs.appendFile("ponuda.txt", JSON.stringify(req.body) + "\n", function (err, succ) {
        res.send("Poruka je poslana, očekujte odgovor uskoro");
    });

});

// Request for all products
app.get('/ponuda', (req, res) => {

    const ponuda = [];
    fs.readFile('ponuda.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send({ error: "Greška u čitanju fajla ponuda.txt"});
            return;
        }
        
        const redovi = data.split('\n');
        redovi.forEach(red => {
            if (red) {
                ponuda.push(JSON.parse(red));
            }
        });

        res.json(ponuda);
    });
});

app.listen(8000);