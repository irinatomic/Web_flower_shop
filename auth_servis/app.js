const { sequelize, Korisnik } = require('./models');

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('dotenv').config();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// REGISTER
app.post('/register', (req, res) => {
    const obj = {
        username: req.body.username,
        email: req.body.email,
        admin: false,
        password: bcrypt.hashSync(req.body.password, 10)
    };
    Korisnik.create(obj).then(rows => {
        const usr = {
            userId: rows.id,
            user: rows.username
        };
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token: token, id: rows.id });
    }).catch(err => res.status(500).json(err));
});

// LOGIN
app.post('/login', async (req, res) => {
    try {

        const usr = await Korisnik.findOne({ where: { username: req.body.username } });

        if (!usr || !bcrypt.compareSync(req.body.password, usr.password)) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        let usr_role;
        if (usr.admin) {
            usr_role = 'admin';
        } else {
            usr_role = 'user';
        }

        const obj = {
            userId: usr.id,
            user: usr.username,
            role: usr_role
        };

        const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token: token, id: usr.id });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen({ port: 9001 }, async () => {
    await sequelize.authenticate();
});