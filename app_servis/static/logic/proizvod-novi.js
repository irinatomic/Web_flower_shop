function validate() {
    var valid = true;
    var nazivInput = document.getElementById('naziv');
  
    if (nazivInput.value.length < 5) {
      valid = false;
      nazivInput.style.borderColor = 'red';
      alert('Naziv mora imati bar 5 karaktera :)');
    } else {
      nazivInput.style.borderColor = 'green';
    }
  
    return valid;
}
  
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    const nazivInput = document.getElementById('naziv');
    const forma = document.getElementById('forma');

    // Add an event listener for the input element to reset classes on keypress
    nazivInput.addEventListener('keypress', function () {
        this.classList.remove('success');
        this.classList.remove('error');
    });

    // Add an event listener for focus to change border color
    nazivInput.addEventListener('focus', function () {
        nazivInput.style.borderColor = 'black';
    });

    // Add an event listener for submitting the form to the api_servis
    forma.addEventListener('submit', async function (event) {
      
      event.preventDefault();
      if (!validate()) { return; }

      var noviProizvod = {};
      noviProizvod.naziv = document.getElementById('naziv').value;
      noviProizvod.opis = document.getElementById('opis').value;
      noviProizvod.kategorija = document.getElementById('kategorija').value;
      noviProizvod.cena = document.getElementById('cena').value;

      const url = `http://localhost:9000/proizvod`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noviProizvod),
      });

      if (!response.ok) {
        throw new Error(`Greska prilikom kreiranja proizvoda: ${response.status}`);
      }

      const responseData = await response.json();
      window.location.href = 'ponuda.html';
      //window.location.href = `proizvod.html?id=${responseData.id}`;

    });

});