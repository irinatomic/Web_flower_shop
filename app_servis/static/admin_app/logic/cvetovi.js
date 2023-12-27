// Calls the function when the page is loaded
window.addEventListener("load", async function () {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    try {
        const response = await fetch('http://localhost:9000/cvet', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        populateTable(data);
    } catch (error) {
        console.error('Error:', error);
    }

    // Logout event listener
    const logoutButton = document.getElementById('logout-btn');
    logoutButton.addEventListener('click', function () {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
});

function populateTable(data) {
    data.forEach(item => { addRowToTable(item) });
}

function addRowToTable(item) {

    const table = document.getElementById("cvetovi");
    const row = table.insertRow();
    const nazivCell = row.insertCell(0);
    const izmenaCell = row.insertCell(1);

    row.id = item.id;
    nazivCell.textContent = item.naziv;

    // IZMENI BUTTON
    const izmeniButton = document.createElement("button");
    izmeniButton.className = "btn btn-primary";
    izmeniButton.textContent = "Izmeni";
    izmeniButton.addEventListener("click", function () { openUpdateFlowerModal(row) });

    // IZBRISI BUTTON
    const izbrisiButton = document.createElement("button");
    izbrisiButton.className = "btn btn-danger";
    izbrisiButton.textContent = "Izbrisi";
    izbrisiButton.addEventListener("click", function () { deleteFlower(row) });

    izmenaCell.appendChild(izmeniButton);
    izmenaCell.appendChild(izbrisiButton);
}

// Add new category to DB and table
async function addFlower(naziv) {

    // Validate input
    if (!(naziv.length > 2 && /^[A-Za-z\s]+$/.test(naziv))) {
        alert("Naziv cveta mora sadržavati barem 3 slova i smeti sadržavati samo slova i razmake.");
        return;
    }

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    // Add to DB
    const url = `http://localhost:9000/cvet`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ naziv: naziv })
    });

    // Add to table
    const data = await response.json();
    addRowToTable(data);
}

async function openUpdateFlowerModal(row) {

    const flowerNameInput = document.getElementById("changeFlowerInput");
    const updateFlowerButton = document.getElementById("updateFlowerButton");

    // Get the category name from the corresponding table cell
    const flowerName = row.cells[0].innerText;

    // Set the input value to the current category name
    flowerNameInput.value = `${flowerName}`
    flowerNameInput.focus();

    // Show the modal
    $('#changeFlowerModal').modal('show');

    // Add a click event to update the category name
    updateFlowerButton.addEventListener("click", function () {
        updateFlower(row, flowerNameInput.value);
        closeNewFlowerModal();
    });
}

// Update category name in DB and table
async function updateFlower(row, noviNaziv) {

    // Validate input
    if (!(noviNaziv.length > 2 && /^[A-Za-z\s]+$/.test(noviNaziv))) {
        alert("Naziv cveta mora sadržavati barem 3 slova i smeti sadržavati samo slova i razmake.");
        return;
    }

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    // Update in DB
    const url = `http://localhost:9000/cvet/${row.id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ naziv: noviNaziv })
    });

    // Update in table
    const responseData = await response.json();
    row.cells[0].textContent = responseData.naziv;
}

// Delete category from DB and table
async function deleteFlower(row) {

    if(!confirm("Potvrdite brisanje")) return;

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    // Delete from DB
    const url = `http://localhost:9000/cvet/${row.id}`;
    const response = await fetch(url, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` } 
    });

    if(!response.ok) throw new Error(`Greska prilikom brisanja cveta: ${response.status}`);

    // Delete from table
    row.remove();
}

function closeNewFlowerModal() {
    var categoryNameInput = document.getElementById("newFLowerInput");
    categoryNameInput.value = '';
    $('#addFlowerModal').modal('hide');
}
