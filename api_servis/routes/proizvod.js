const express = require("express");
const route = express.Router();
const Joi = require("joi");
const { authAdminToken } = require('./middleware'); 
const { sequelize, Kategorija, Proizvod, Cvet, CvetUProizvodu } = require("../models");

// Middleware for parsing application/json
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

// Export Route object 
module.exports = route;

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
            include: [
                {
                    model: CvetUProizvodu,
                    as: 'cvetovi',
                    include: [{ model: Cvet }]
                },
                {
                    model: Kategorija,
                    as: 'kategorija'
                }
            ]
        })
        return res.json(proizvod);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// POST
route.post("/", authAdminToken, async (req, res) => {

    const proizvodData = req.body;

    // Validate Proizvod data
    if(!validateProizvod(proizvodData)) {
        return res.status(400).json({ error: "Invalid data" });
    }

    try {

        const proizvod = await Proizvod.findOrCreate({
            where: { naziv: proizvodData.naziv },       // naziv je unique
            defaults: {
                opis: proizvodData.opis,
                cena: proizvodData.cena,
                kategorija_id: proizvodData.kategorija
            }
        });

        // Add flowers to the product
        for (const [cvetId, kolicina] of Object.entries(proizvodData.sadrzaj)) {
            const cvet = await Cvet.findOrCreate({
                where: { id: cvetId },
                defaults: { naziv: `Cvet ${cvetId}` }
            });

            // Add to CvetUProizvodu
            await CvetUProizvodu.create({
                cvet_id: cvet[0].id,
                proizvod_id: proizvod[0].id,
                kolicina: kolicina
            });
        }

        return res.json(proizvod);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

route.put("/:id", authAdminToken, async (req, res) => {
    const proizvodId = req.params.id;
    const proizvodData = req.body;

    // Validate Proizvod data
    if(!validateProizvod(proizvodData)) {
        return res.status(400).json({ error: "Invalid data" });
    }

    try {
        let proizvod = await Proizvod.findByPk(proizvodId);

        // Update Proizvod 
        await proizvod.update({
            naziv: proizvodData.naziv,
            opis: proizvodData.opis,
            cena: proizvodData.cena,
            kategorija_id: proizvodData.kategorija
        });

        // Fetch existing CvetUProizvodu entries for the Proizvod
        const existingEntries = await CvetUProizvodu.findAll({
            where: { proizvod_id: proizvodId }
        });

        const updatedCvetIds = Object.keys(proizvodData.sadrzaj);

        // Delete entries that are not present in the updated payload
        await Promise.all(existingEntries.map(async (entry) => {
            if (!updatedCvetIds.includes(entry.cvet_id.toString())) {
                await entry.destroy();
            }
        }));

        // Update or create in table CvetUProizvodu
        for (const [cvetId, kolicina] of Object.entries(proizvodData.sadrzaj)) {
            const [cvet, created] = await Cvet.findOrCreate({
                where: { id: cvetId },
                defaults: { naziv: `Cvet ${cvetId}` }
            });

            await CvetUProizvodu.upsert({
                cvet_id: cvet.id,
                proizvod_id: proizvodId,
                kolicina: kolicina
            });
        }

        return res.json(proizvod);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Greska", data: error });
    }
});


// DELETE
route.delete("/:id", authAdminToken, async (req, res) => {

    try {
        const proizvod = await Proizvod.findByPk(req.params.id);
        await CvetUProizvodu.destroy({
            where: { proizvod_id: req.params.id }
        });
        await proizvod.destroy();
        return res.status(200).json(proizvod.id);       // id obrisanog
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


route.put("/promeni-cenu/:id", authAdminToken, async (req, res) => {

    try {
        const proizvod = await Proizvod.findByPk(req.params.id);
        proizvod.cena = req.body.cena;
        await proizvod.save();
        return res.json(proizvod);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

function validateProizvod(proizvod) {
    const schema = Joi.object({
        naziv: Joi.string().min(3).required(),
        opis: Joi.string().min(3).required(),
        cena: Joi.number().required(),
        kategorija: Joi.string().required(),
        sadrzaj: Joi.object().pattern(Joi.string(), Joi.string()).required()
    });
    return schema.validate(proizvod);
}