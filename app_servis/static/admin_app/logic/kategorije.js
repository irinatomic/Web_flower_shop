// Calls the function when the page is loaded
window.addEventListener("load", async function () {

    try {
        const response = await fetch('http://localhost:9000/kategorija');
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

    const table = document.getElementById("kategorije");
    const row = table.insertRow();
    const nazivCell = row.insertCell(0);
    const izmenaCell = row.insertCell(1);

    row.id = item.id;
    nazivCell.textContent = item.naziv;

    // IZMENI BUTTON
    const izmeniButton = document.createElement("button");
    izmeniButton.className = "btn btn-primary";
    izmeniButton.textContent = "Izmeni";
    izmeniButton.addEventListener("click", function () { openUpdateCategoryModal(row) });

    // IZBRISI BUTTON
    const izbrisiButton = document.createElement("button");
    izbrisiButton.className = "btn btn-danger";
    izbrisiButton.textContent = "Izbrisi";
    izbrisiButton.addEventListener("click", function () { deleteCategory(row) });

    izmenaCell.appendChild(izmeniButton);
    izmenaCell.appendChild(izbrisiButton);
}

// Add new category to DB and table
async function addCategory(naziv) {

    // Validate input
    if (!(naziv.length > 2 && /^[A-Za-z\s]+$/.test(naziv))){
        alert("Naziv kategorije mora sadržavati barem 3 slova i smeti sadržavati samo slova i razmake.");
        return;
    }

    // Add to DB
    const url = `http://localhost:9000/kategorija`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ naziv: naziv })
    });

    if (!response.ok) throw new Error(`Greska prilikom dodavanja kategorije: ${response.status}`);

    // Add to table
    const responseData = await response.json();
    addRowToTable(responseData);
}

// Open the modal to change category name
async function openUpdateCategoryModal(row) {

    var categoryNameInput = document.getElementById("changeCategoryInput");
    var updateCategoryButton = document.getElementById("updateCategoryButton");

    // Get the category name from the corresponding table cell
    var categoryName = row.cells[0].innerText;

    // Set the input value to the current category name
    categoryNameInput.value = `${categoryName}`
    categoryNameInput.focus();

    // Show the modal
    $('#changeCategoryModal').modal('show');

    // Add a click event to update the category name
    updateCategoryButton.addEventListener("click", function () { 
        updateCategory(row, categoryNameInput.value);
        closeNewCategoryModal();
    });
}

// Update category in DB and table
async function updateCategory(row, noviNaziv) {

    // Validate input
    if (!(noviNaziv.length > 2 && /^[A-Za-z\s]+$/.test(noviNaziv))){
        alert("Naziv kategorije mora sadržavati barem 3 slova i smeti sadržavati samo slova i razmake.");
        return;
    }

    // Update DB
    const url = `http://localhost:9000/kategorija/${row.id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ naziv: noviNaziv })
    });
   
    if (!response.ok) throw new Error(`Greska prilikom izmene kategorije: ${response.status}`);

    // Update table
    const responseData = await response.json();
    row.cells[0].innerText = responseData.naziv;
}

// Deletes the category from DB and table
async function deleteCategory(row) {

    if (!confirm("Potvrdite brisnje")) return;

    // Delete from DB
    const url = `http://localhost:9000/kategorija/${row.id}`;
    const response = await fetch(url, { method: 'DELETE' });

    if (!response.ok) throw new Error(`Greska prilikom brisanja kategorije: ${response.status}`);

    // Delete from table
    row.remove();
}
    
function closeNewCategoryModal() {
    var categoryNameInput = document.getElementById("newCategoryInput");
    categoryNameInput.value = '';
    $('#addCategoryModal').modal('hide');
}
