const express = require("express");
const route = express.Router();
const { sequelize, StavkaNarudzbine, Narudzbina, Proizvod } = require("../models");

// Middleware for parsing application/json
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

// Export Route object 
module.exports = route;

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

    const narData = req.body;

    try {

        const nar = await Narudzbina.create({
            zakazano_vreme: narData.zakazano_vreme,
            status_narudzbine: 'Nova',
            adresa: narData.adresa,
            telefon: narData.telefon,
            email: narData.email,
            ime_prezime: narData.ime_prezime
        });

        // Fetch existing Proizvod entries
        const proizvodi = await Proizvod.findAll();

        // Add products to the order (StavkaNarudzbine
        for (const [proizvodId, kolicina] of Object.entries(narData.sadrzaj)) {
            const stavka = await StavkaNarudzbine.create({
                narudzbina_id: nar.id,
                proizvod_id: proizvodId,
                kolicina: kolicina,
                jedinicna_cena: proizvodi.find(p => p.id == proizvodId).cena * kolicina
            });
        }

        return res.json(nar);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// PUT
route.put("/:id", async (req, res) => {
    
    const narId = req.params.id;
    const narData = req.body;
    
    try {

        let nar = await Narudzbina.findByPk(narId);

        // Update Narudzbina
        await nar.update({
            zakazano_vreme: narData.zakazano_vreme,
            status_narudzbine: narData.status_narudzbine,
            adresa: narData.adresa,
            telefon: narData.telefon,
            email: narData.email,
            ime_prezime: narData.ime_prezime
        });

        // Fetch existing StavkaNarudzbine entries for the Narudzbina
        const existingEntries = await StavkaNarudzbine.findAll({
            where: { narudzbina_id: narId }
        });

        const updatedProizvodIds = Object.keys(narData.sadrzaj);

        // Delete StavkaNarudzbine entries that are not in the updated list
        await Promise.all(existingEntries.map(async (entry) => {
            if (!updatedProizvodIds.includes(entry.proizvod_id.toString())) {
                await entry.destroy();
            }
        }));

        // Fetch existing Proizvod entries
        const proizvodi = await Proizvod.findAll();

        // Update or create in table StavkaNarudzbine
        for (const [proizvodId, kolicina] of Object.entries(narData.sadrzaj)) {
            const [proizvod, created] = await Proizvod.findOrCreate({
                where: { id: proizvodId },
                defaults: { naziv: `Proizvod ${proizvodId}` }
            });

            await StavkaNarudzbine.upsert({
                narudzbina_id: nar.id,
                proizvod_id: proizvod.id,
                kolicina: kolicina,
                jedinicna_cena: proizvodi.find(p => p.id == proizvod.id).cena * kolicina
            });
        }
        
        return res.json(nar);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// DELETE
route.delete("/:id", async (req, res) => {

    try {
        const nar = await Narudzbina.findByPk(req.params.id);
        await StavkaNarudzbine.destroy({
            where: { narudzbina_id: nar.id }
        });
        await nar.destroy();
        return res.json(nar.id);         //id obrisanog
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

// PUT change status
route.put("/promeni-status/:id", async (req, res) => {

    try {
        const nar = await Narudzbina.findByPk(req.params.id);
        nar.status_narudzbine = req.body.status_narudzbine;
        await nar.save();
        return res.json(nar);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});