// Calls the function when the page is loaded
window.addEventListener("load", async function () {

    try {
        const response = await fetch('http://localhost:9000/proizvod');
        const data = await response.json();

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
        kategorijaCell.textContent = item.kategorija.naziv;
        opisCell.textContent = item.opis;
        cenaCell.textContent = item.cena;

        opisCell.classList.add("opis-cell"); 

        // PROMENA CENE BUTTON
        const promenaCeneButton = document.createElement("button");
        promenaCeneButton.className = "btn btn-primary";
        promenaCeneButton.textContent = "Promena cene";

        promenaCeneButton.onclick = async function () {
            const novaCena = prompt("Unesite novu cenu:");
            if (novaCena) {
                const url = `http://localhost:9000/proizvod/promeni-cenu/${item.id}`;
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cena: novaCena })
                });

                if (!response.ok) {
                    throw new Error(`Greska prilikom promene cene: ${response.status}`);
                } 
                const responseData = await response.json();
                cenaCell.textContent = responseData.cena;
            }
        }

        // OBRISI BUTTON
        const obrisiButton = document.createElement("button");
        obrisiButton.className = "btn btn-danger";
        obrisiButton.textContent = "Obrisi";

        obrisiButton.onclick = async function () {
            if( !confirm("Potvrdite brisanje") ) return;
            
            const url = `http://localhost:9000/proizvod/${item.id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                body: JSON.stringify({ id: item.id })
            });

            if (!response.ok) {
                window.location.href('ponuda.html');
                throw new Error(`Greska prilikom brisanja proizvoda: ${response.status}`);
            }

            row.remove();
            window.location.href = 'ponuda.html';
        }

        const izmeniLink = document.createElement("a");
        izmeniLink.className = "btn btn-primary";
        izmeniLink.href = `proizvod.html?id=${item.id}`;
        izmeniLink.textContent = "Izmeni";

        akcijeCell.appendChild(promenaCeneButton);
        akcijeCell.appendChild(izmeniLink);
        akcijeCell.appendChild(obrisiButton);
    });
}