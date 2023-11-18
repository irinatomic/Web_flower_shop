// opens a modal for adding a new flower
function addFlower() {

  var flowerNameInput = document.getElementById("newFLowerInput");
  var flowerName = flowerNameInput.value.trim();

  // Valid input
  if(flowerName.length > 2 && /^[A-Za-z\s]+$/.test(flowerName)){
    var table = document.getElementById("cvetovi");
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    cell1.innerHTML = flowerName;
    cell2.innerHTML = '<button class="btn btn-primary" onclick="openChangeFlowerModal(this)">Izmeni</button>&nbsp;' +
                      '<button class="btn btn-primary" onclick="deleteRow(this)">Izbrisi</button>';

    // Clear the input field and close the modal
    flowerNameInput.value = ''; 
    $('#addFlowerModal').modal('hide'); 
  } else {
    alert("Naziv cveta mora sadržavati barem 3 slova i smeti sadržavati samo slova i razmake.");
  }
}

function closeNewFlowerModal() {
  var categoryNameInput = document.getElementById("newFLowerInput");
  categoryNameInput.value = ''; 
  $('#addFlowerModal').modal('hide');
}

function openChangeFlowerModal(button) {

  var modal = document.getElementById("changeFlowerModal");
  var categoryNameInput = document.getElementById("changeFlowerInput");
  var updateCategoryButton = document.getElementById("updateFlowerButton");

  // Get the category name from the corresponding table cell
  var row = button.parentNode.parentNode;
  var categoryName = row.cells[0].innerText;

  // Set the input value to the current category name
  categoryNameInput.value = `${categoryName}`

  // Display the modal
  $('#changeFlowerModal').modal('show');

  // Add a click event to update the category name
  updateCategoryButton.addEventListener("click", function() {
    var newCategoryName = categoryNameInput.value;
    if (newCategoryName.length > 2) {
      row.cells[0].innerText = newCategoryName;
      $('#changeFlowerModal').modal('hide');
    } else {
      alert("Naziv cveta mora sadržavati barem 3 slova.");
    }
  });

}

// delete a row from the table
function deleteRow(button) {

  // get the row and the table
  var row = button.parentNode.parentNode; 
  var table = document.getElementById("cvetovi"); 
  table.deleteRow(row.rowIndex); 
}