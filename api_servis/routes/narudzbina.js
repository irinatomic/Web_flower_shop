const express = require("express");
const route = express.Router();
const { sequelize, StavkaNarudzbine, Narudzbina, Proizvod } = require("../models");

// Middleware for parsing application/json
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

// Export Route object 
module.exports = route;

// TO-DO: POST and PUT should add proizvodi and their amounts

// GET 
route.get("/", async (req, res) => {

    try {
        const narudzbine = await Narudzbina.findAll({
            include: [
              {
                model: StavkaNarudzbine,
                as: 'stavke',                        // this is the name of the association in models/Narduzbina.js     
                include: [{ model: Proizvod }] 
              }
            ]
          });
        return res.json(narudzbine);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// GET by id
route.get("/:id", async (req, res) => {

    try {
        const narudzbina = await Narudzbina.findOne({
            where: { id: req.params.id },
            include: [
              {
                model: StavkaNarudzbine,
                as: 'stavke',                        // this is the name of the association in models/Narduzbina.js     
                include: [{ model: Proizvod }] 
              }
            ]
          });
        return res.json(narudzbina);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// POST
route.post("/", async (req, res) => {

    try {
        const nova = {};
        nova.zakazano_vreme = req.body.zakazano_vreme;
        nova.status_narudzbine = 'Nova';
        nova.adresa = req.body.adresa;
        nova.telefon = req.body.telefon;
        nova.email = req.body.email;
        nova.ime_prezime = req.body.ime_prezime;
        const insertovana = await Narudzbina.create(nova);
        return res.json(insertovana);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// PUT
route.put("/:id", async (req, res) => {
    
    try {
        const nar = await Narudzbina.findByPk(req.params.id);
        nar.zakazano_vreme = req.body.zakazano_vreme;
        nar.status_narudzbine = req.body.status_narudzbine;
        nar.adresa = req.body.adresa;
        nar.telefon = req.body.telefon;
        nar.email = req.body.email;
        nar.ime_prezime = req.body.ime_prezime;
        await nar.save();
        return res.json(nar);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/:id", async (req, res) => {

    try {
        const nar = await Narudzbina.findByPk(req.params.id);
        await nar.destroy();
        return res.json(nar.id);         //id obrisanog
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});