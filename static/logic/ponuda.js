// Calls the function when the page is loaded
window.addEventListener("load", async function () {

    try {
        const response = await fetch('/ponuda');
        const data = await response.json();
        console.log(data);

        const ponudaTable = document.getElementById("ponuda-spisak");
        populateTable(ponudaTable, data);
    } catch (error) {
        console.error('Error:', error);
    }

});

function populateTable(table, data) {
    data.forEach(item => {

        const row = table.insertRow();

        const nazivCell = row.insertCell(0);
        const kategorijaCell = row.insertCell(1);
        const opisCell = row.insertCell(2);
        const cenaCell = row.insertCell(3);
        const akcijeCell = row.insertCell(4);

        nazivCell.textContent = item.naziv;
        kategorijaCell.textContent = item.kategorija;
        opisCell.textContent = item.opis;
        cenaCell.textContent = item.cena;

        opisCell.classList.add("opis-cell"); 

        const promenaCeneButton = document.createElement("button");
        promenaCeneButton.className = "btn btn-primary";
        promenaCeneButton.textContent = "Promena cene";
        promenaCeneButton.onclick = function () {
            const novaCena = prompt("Unesite novu cenu:");
            if (novaCena) {
                cenaCell.textContent = novaCena;
            }
        };

        const izmeniLink = document.createElement("a");
        izmeniLink.className = "btn btn-primary";
        izmeniLink.href = `./../proizvod.html`;
        //izmeniLink.href = `proizvod.html?id=${item.id}`;
        izmeniLink.textContent = "Izmeni";

        akcijeCell.appendChild(promenaCeneButton);
        akcijeCell.appendChild(izmeniLink);
    });
}