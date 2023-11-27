const express = require('express');
const { sequelize, Proizvod, Kategorija, CvetUProizvodu, Cvet, StavkaNarudzbine, Narudzbina } = require("./models");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

// routes for the app
const cvetRoutes = require("./routes/cvet.js");
const kategorijaRoutes = require("./routes/kategorija.js");
const proizvodRoutes = require("./routes/proizvod.js");
const narudzbinaRoutes = require("./routes/narudzbina.js");

app.use("/cvet", cvetRoutes);
app.use("/kategorija", kategorijaRoutes);
app.use("/proizvod", proizvodRoutes);
app.use("/narudzbina", narudzbinaRoutes);

app.listen(9000);
// establish connection to the database
// app.listen({ port:8000 }, async () => {
// 	console.log("Started server on localhost:8000");
// 	await sequelize.sync({force:true});
// 	console.log("DB synced");
// });