const express = require("express");
const route = express.Router();
const Joi = require("joi");
const { sequelize, CvetUProizvodu, Cvet } = require("../models");

// Middleware for parsing application/json
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

// Export Route object 
module.exports = route;

// GET 
route.get("/", async (req, res) => {

    try {
        const cvetovi = await Cvet.findAll();
        return res.json(cvetovi);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// GET by id
route.get("/:id", async (req, res) => {

    try {
        const cvet = await Cvet.findByPk(req.params.id);
        return res.json(cvet);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// POST
route.post("/", async (req, res) => {

    // Validate Cvet data
    if (!validateCvet(req.body)) {
        return res.status(400).json({ error: "Invalid data" });
    }

    try {
        const novi = await Cvet.create(req.body);
        return res.json(novi);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// PUT
route.put("/:id", async (req, res) => {

    // Validate Cvet data
    if (!validateCvet(req.body)) {
        return res.status(400).json({ error: "Invalid data" });
    }

    try {
        const cvet = await Cvet.findByPk(req.params.id);
        cvet.naziv = req.body.naziv;
        await cvet.save();
        return res.json(cvet);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// DELETE
route.delete("/:id", async (req, res) => {

    try {
        const cvet = await Cvet.findByPk(req.params.id);
        await cvet.destroy();
        return res.json(cvet.id);         //id obrisanog
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

function validateCvet(cvet) {
    const schema = Joi.object({
        naziv: Joi.string().required()
    });
    return schema.validate(cvet);
}