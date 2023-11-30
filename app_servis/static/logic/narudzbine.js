// Calls the function when the page is loaded
window.addEventListener("load", async function () {

    try {
        const response = await fetch('http://localhost:9000/narudzbina');
        const data = await response.json();

        populateTable(data);
    } catch (error) {
        console.error('Error:', error);
    }
});

function populateTable(data) {
    data.forEach(item => { addRowToTable(item) });
};

function addRowToTable(item) {

    const table = document.getElementById("narudzbine");
    const row = table.insertRow();
    const zakazanoVremeCell = row.insertCell(0);
    const statusCell = row.insertCell(1);
    const cenaCell = row.insertCell(2);
    const adresaCell = row.insertCell(3);
    const sadrzajCell = row.insertCell(4);
    const akcijaCell = row.insertCell(5);

    row.id = item.id;
    const zakazanoVremeString = new Date(item.zakazano_vreme).toLocaleString();
    zakazanoVremeCell.textContent = zakazanoVremeString;
    statusCell.textContent = item.status_narudzbine;

    // Cena
    let totalCena = 0;
    item.stavke.forEach(stavka => {
        totalCena += stavka.jedinicna_cena;
    });
    cenaCell.textContent = totalCena;

    adresaCell.textContent = item.adresa;

    // Sadrzaj
    item.stavke.forEach(stavka => {
        const textContent = `${stavka.Proizvod.naziv} x${stavka.kolicina}`;
        sadrzajCell.innerHTML += `${textContent}<br>`;
    });

    // DETALJI BUTTON
    const detaljiButton = document.createElement("a");
    detaljiButton.className = "btn btn-primary";
    detaljiButton.href = `narudzbina.html?id=${item.id}`;
    detaljiButton.textContent = "Detalji";

    akcijaCell.appendChild(detaljiButton);
}