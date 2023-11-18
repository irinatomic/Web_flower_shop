const express = require("express");
const route = express.Router();

// Middleware for parsing application/json
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

// Export Route object 
module.exports = route;

// GET 
route.get("/", async (req, res) => {

    try {
        return res.json("svi cvetovi");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// GET by id
route.get("/:id", async (req, res) => {

    try {
        return res.json("cvet čiji je id=" + req.params.id);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// POST
route.post("/", async (req, res) => {

    try {
        return res.json("unos novog cveta ciji su podaci u req.body");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error", data: err });
    }
});

// PUT
route.put("/:id", async (req, res) => {
    
    try {
        return res.json("izmena podataka cveta čiji je id=" + req.params.id + " a podaci su u req.body");

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/:id", async (req, res) => {

    try {
        return res.json(req.params.id);         //id obrisanog
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});