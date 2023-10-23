// opens a modal for adding a new category
function addNewCategory() {

  var categoryNameInput = document.getElementById("newCategoryInput");
  var categoryName = categoryNameInput.value.trim();

  // Valid input
  if (categoryName.length > 2 && /^[A-Za-z\s]+$/.test(categoryName)) {
    var table = document.getElementById("kategorije");
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    cell1.innerHTML = categoryName;
    cell2.innerHTML = '<button class="btn btn-primary" onclick="openChangeCategoryModal(this)">Izmeni</button>&nbsp;' +
                      '<button class="btn btn-primary" onclick="deleteRow(this)">Izbrisi</button>';

    // Clear the input field and close the modal
    categoryNameInput.value = ''; 
    $('#addCategoryModal').modal('hide'); 
  } else {
    alert("Naziv kategorije mora sadržavati barem 3 slova i smeti sadržavati samo slova i razmake.");
  }
}

function closeNewCategoryModal() {
  var categoryNameInput = document.getElementById("newCategoryInput");
  categoryNameInput.value = ''; 
  $('#addCategoryModal').modal('hide');
}

function openChangeCategoryModal(button) {

  var modal = document.getElementById("changeCategoryModal");
  var categoryNameInput = document.getElementById("changeCategoryInput");
  var updateCategoryButton = document.getElementById("updateCategoryButton");

  // Get the category name from the corresponding table cell
  var row = button.parentNode.parentNode;
  var categoryName = row.cells[0].innerText;

  // Set the input value to the current category name
  categoryNameInput.value = `${categoryName}`

  // Display the modal
  $('#changeCategoryModal').modal('show');

  // Add a click event to update the category name
  updateCategoryButton.addEventListener("click", function() {
    var newCategoryName = categoryNameInput.value;
    if (newCategoryName.length > 2) {
      row.cells[0].innerText = newCategoryName;
      $('#changeCategoryModal').modal('hide');
    } else {
      alert("Naziv kategorije mora sadržavati barem 3 slova.");
    }
  });
}

// delete a row from the table
function deleteRow(button) {

  // get the row and the table
  var row = button.parentNode.parentNode; 
  var table = document.getElementById("kategorije"); 
  table.deleteRow(row.rowIndex); 
}
  
  