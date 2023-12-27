// Calls the function when the page is loaded
window.addEventListener("load", async function () {

    // fetch with the id from the url parameter
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    try {
        const response = await fetch(`http://localhost:9000/narudzbina/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        fillOutData(data);
    } catch (error) {
        console.error('Error:', error);
    }

    // Status event listener
    const statusSelect = document.getElementById('status');
    statusSelect.addEventListener('change', function () {
        changeStatus(id, statusSelect.options[statusSelect.selectedIndex].text, token);
    });

    // Logout event listener
    const logoutButton = document.getElementById('logout-btn');
    logoutButton.addEventListener('click', function () {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
});

function fillOutData(responseData) {

    // Accessing form elements
    const zakazanoVremePlaceholder = document.getElementById('zakazano-vreme-placeholder');
    const adresaPlaceholder = document.getElementById('adresa-placeholder');
    const cenaPlaceholder = document.getElementById('cena-placeholder');
    const statusSelect = document.getElementById('status');
    const stavkeList = document.getElementById('sadrzaj');

    // Zakazano vreme
    const zakazanoVreme = new Date(responseData.zakazano_vreme).toLocaleString();
    zakazanoVremePlaceholder.textContent = zakazanoVreme;

    // Adresa
    adresaPlaceholder.textContent = responseData.adresa;

    // Cena
    let totalCena = 0;
    responseData.stavke.forEach(stavka => {
        totalCena += stavka.jedinicna_cena;
    });
    cenaPlaceholder.textContent = totalCena;

    // Status
    const statusNarudzbine = responseData.status_narudzbine;
    Array.from(statusSelect.options).forEach(option => {
        if (option.text.trim() === statusNarudzbine) {
            option.selected = true;
        }
    });

    // Sadrzaj narudzbine
    responseData.stavke.forEach(stavka => {
        const listItem = document.createElement('li');
        listItem.textContent = `${stavka.Proizvod.naziv} x${stavka.kolicina}`;
        stavkeList.appendChild(listItem);
    });
}

async function changeStatus(id, newStatus, token) {

    // change the status in DB
    const url = `http://localhost:9000/narudzbina/promeni-status/${id}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status_narudzbine: newStatus })
    });

    if (!response.ok) throw new Error(`Greska prilikom promene statusa: ${response.status}`);

    // change the status in the page
    const responseData = await response.json();
    console.log(responseData)
    const statusSelect = document.getElementById('status');
    Array.from(statusSelect.options).forEach(option => {
        if (option.text.trim() === responseData.status_narudzbine) {
            option.selected = true;
        }
    });
}