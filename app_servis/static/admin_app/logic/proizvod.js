
// Wait for the DOM to be fully loaded
window.addEventListener("load", async function () {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    // get all categories from the api_servis
    try {
        const response = await fetch('http://localhost:9000/kategorija', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        populateCategories(data);
    } catch (error) {
        console.error('Error:', error);
    }

    // get all flowers from the api_servis
    try {
        const response = await fetch('http://localhost:9000/cvet', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        populateFLowers(data);
    } catch (error) {
        console.error('Error:', error);
    }

    // fetch with the ide from the url parameter
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    try {
        const response = await fetch(`http://localhost:9000/proizvod/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        fillOutData(data);
    } catch (error) {
        console.error('Error:', error);
    }

    const nazivInput = document.getElementById('naziv');
    const dodajCvetBtn = document.getElementById('dodaj-cvet');
    const brojKomadaInput = document.getElementById('broj-komada');
    const sacuvajBtn = document.getElementById('sacuvaj-btn');
    const logoutButton = document.getElementById('logout-btn');

    // Add an event listener for the input element to reset classes on keypress
    nazivInput.addEventListener("keypress", function () {
        this.classList.remove('success');
        this.classList.remove('error');
    });

    // Add an event listener for focus to change border color
    nazivInput.addEventListener('focus', function () {
        nazivInput.style.borderColor = 'black';
    });

    // Modify product
    sacuvajBtn.addEventListener('click', function () {
        modifyProduct();
    });

    dodajCvetBtn.addEventListener("click", function () {
        var id = document.getElementById("spisak-cvetova").value;
        if (!id) {
            alert("Izaberite cvet");
            return;
        }

        // get how many flowers to add
        var amount = brojKomadaInput.value;
        if (!amount) {
            alert("Unesite broj komada");
            return;
        }

        dodajCvet(id, amount);
    });

    // Logout event listener
    logoutButton.addEventListener('click', function () {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });

})

function populateCategories(data) {
    const kategorijaSelect = document.getElementById('kategorija');

    data.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.naziv;

        kategorijaSelect.appendChild(option);
    });
}

function populateFLowers(data) {
    const cvetoviSelect = document.getElementById('spisak-cvetova');

    data.forEach(flower => {
        const option = document.createElement('option');
        option.value = flower.id;
        option.textContent = flower.naziv;

        cvetoviSelect.appendChild(option);
    });
}

function fillOutData(responseData) {

    // Accessing form elements
    const nazivInput = document.getElementById('naziv');
    const opisInput = document.getElementById('opis');
    const cenaInput = document.getElementById('cena');
    const kategorijaSelect = document.getElementById('kategorija');

    nazivInput.value = responseData.naziv;
    opisInput.value = responseData.opis;
    cenaInput.value = responseData.cena;

    // Kategorija
    for (const option of kategorijaSelect.children) {
        if (option.value == responseData.kategorija_id) {
            option.selected = true;
            break;
        }
    }

    // Cvetovi
    for (const cvet of responseData.cvetovi) {
        dodajCvet(cvet.cvet_id, cvet.kolicina);
    }
}

function dodajCvet(id, amount) {

    // get ingredient by id and disable it
    document.querySelector(`#spisak-cvetova > option[value='${id}']`).disabled = true;
    document.getElementById("spisak-cvetova").selectedIndex = 0;
    var naziv = document.querySelector(`#spisak-cvetova > option[value='${id}']`).innerHTML;

    // return amount to 'empty'
    const brojKomadaInput = document.getElementById('broj-komada');
    brojKomadaInput.value = "";

    // create new ingredient element (span in html)
    var span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("bg-secondary");
    span.dataset.id = id;
    span.innerHTML = `${naziv} x ${amount}`;

    // create the X button to remove the ingredient
    var button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn");
    button.classList.add("btn-x-option");
    button.classList.add("btn-sm");
    button.innerHTML = "X";

    span.appendChild(button);
    document.getElementById("izabrano").appendChild(span);

    // add a space after each ingredient
    document.getElementById("izabrano").appendChild(document.createTextNode(" "));

    // add event listener to the X button for removing the ingredient
    button.addEventListener("click", function () {
        var id = this.parentNode.dataset.id;
        // remove parent node from the DOM
        this.parentNode.remove();
        document.querySelector(`#spisak-cvetova > option[value='${id}']`).disabled = false;
    });
}

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

async function modifyProduct() {

    // Validate the form
    event.preventDefault();
    if (!validate()) return;

    // Create new product
    var noviProizvod = {};
    noviProizvod.naziv = document.getElementById('naziv').value;
    noviProizvod.opis = document.getElementById('opis').value;
    noviProizvod.kategorija = document.getElementById('kategorija').value;
    noviProizvod.cena = document.getElementById('cena').value;

    // Get cvetovi
    const izabrano = document.getElementById('izabrano');
    var sadrzaj = {};
    for (let i = 0; i < izabrano.children.length; i++) {
        var id = izabrano.children[i].dataset.id;

        var tempElement = document.createElement('div');
        tempElement.innerHTML = izabrano.children[i].innerHTML;
        var content = tempElement.textContent.replace(/\s*X\s*$/, '');
        var amount = content.split(" x ")[1];
        sadrzaj[id] = amount;
    }

    noviProizvod.sadrzaj = sadrzaj;
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    // Send to DB
    const url = `http://localhost:9000/proizvod/${idParam}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(noviProizvod),
    });

    if (!response.ok) {
        throw new Error(`Greska prilikom kreiranja proizvoda: ${response.status}`);
    }

    window.location.href = 'ponuda.html';
}