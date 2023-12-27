// Calls the function when the page is loaded
window.addEventListener("load", function () {

    // login button
    const loginButton = document.getElementById('login');

    loginButton.addEventListener('click', async function (event) {
        
        event.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        const response = await fetch('http://127.0.0.1:9001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const json = await response.json();
        if (json.msg) {
            alert(json.msg);
        } else {
            document.cookie = `token=${json.token};SameSite=Lax`;
            window.location.href = 'index.html';
        }

    });
});