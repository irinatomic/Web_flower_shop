const express = require("express");
const route = express.Router();
const Joi = require("joi");
const { sequelize, Proizvod, Kategorija } = require("../models");

// Middleware for parsing application/json
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

// Export Route object 
module.exports = route;

// GET 
route.get("/", async (req, res) => {

    try {
        const kategorije = await Kategorija.findAll();
        return res.json(kategorije);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// GET by id
route.get("/:id", async (req, res) => {

    try {
        const kat = await Kategorija.findByPk(req.params.id);
        return res.json(kat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// POST
route.post("/", async (req, res) => {

    // Validate Kategorija data
    if(!validateKategorija(req.body)) {
        return res.status(400).json({ error: "Invalid data" });
    }

    try {
        const novi = await Kategorija.create(req.body);
        return res.json(novi);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// PUT
route.put("/:id", async (req, res) => {

    // Validate Kategorija data
    if(!validateKategorija(req.body)) {
        return res.status(400).json({ error: "Invalid data" });
    }
    
    try {
        const kat = await Kategorija.findByPk(req.params.id);
        kat.naziv = req.body.naziv;
        await kat.save();
        return res.json(kat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


// DELETE
route.delete("/:id", async (req, res) => {

    try {
        const kat = await Kategorija.findByPk(req.params.id);
        await kat.destroy();
        return res.json(kat.id);         //id obrisanog
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

function validateKategorija(kat) {
    const schema = Joi.object({
        naziv: Joi.string().required()
    });
    return schema.validate(kat);
}