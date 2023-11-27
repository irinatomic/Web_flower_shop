const express = require("express");
const route = express.Router();
const { sequelize, Kategorija, Proizvod } = require("../models");

// Middleware for parsing application/json
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

// Export Route object 
module.exports = route;

// TO-DO: POST and PUT should add flowers and their amounts

// GET 
route.get("/", async (req, res) => {

    try {
        const proizvodi = await Proizvod.findAll({
            include: [{ model: Kategorija, as: 'kategorija' }]
        });
        return res.json(proizvodi);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// GET by id
route.get("/:id", async (req, res) => {

    try {
        const proizvod = await Proizvod.findByPk(req.params.id, {
            include: [{ model: Kategorija, as: 'kategorija' }]
        });
        return res.json(proizvod);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// POST
route.post("/", async (req, res) => {

    try {
        const novi = {};
        novi.naziv = req.body.naziv;
        novi.opis = req.body.opis;
        novi.cena = req.body.cena;
        const kat = await Kategorija.findOne({ where: { naziv: req.body.kategorija } });
        novi.kategorija_id = kat.id;
        const insertovani = await Proizvod.create(novi);
        return res.json(insertovani);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// PUT
route.put("/:id", async (req, res) => {

    try {
        const proizvod = await Proizvod.findByPk(req.params.id);
        proizvod.naziv = req.body.naziv;
        proizvod.opis = req.body.opis;
        proizvod.cena = req.body.cena;
        const kat = await Kategorija.findOne({ where: { naziv: req.body.kategorija } });
        proizvod.kategorija_id = kat.id;
        await proizvod.save();
        return res.json(proizvod);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// DELETE
route.delete("/:id", async (req, res) => {

    try {
        const proizvod = await Proizvod.findByPk(req.params.id);
        proizvod.destroy();
        return res.json(proizvod.id);         //id obrisanog
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});