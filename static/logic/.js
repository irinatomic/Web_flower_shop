
// Wait for the DOM to be fully loaded
window.addEventListener("load", function(){

    const forma = document.getElementById('forma');
    const nazivInput = document.getElementById('naziv');
    const brojKomadaInput = document.getElementById('broj-komada');
    const dodajCvetBtn = document.getElementById('dodaj-cvet');
    const hiddenPolje = document.getElementById('cvetovi-input');

    forma.addEventListener("submit", function(){
        var spanovi = document.querySelectorAll("#spisak-cvetova > span.badge");
        var idSastojaka = [];
        for(let i=0; i<spanovi.length; i++){
            niz.push(spanovi[i].dataset.id);
        }

        hiddenPolje.value = JSON.stringify(idSastojaka);
    });

    nazivInput.addEventListener("keypress", function(){
        this.classList.remove('success');
        this.classList.remove('error');
    });

    dodajCvetBtn.addEventListener("click", function(){
        var id = document.getElementById("spisak-cvetova").value;
        if(!id){
            alert("Izaberite cvet");
            return;
        }

        // get how many flowers to add
        var amount = brojKomadaInput.value;
        if(!amount){
            alert("Unesite broj komada");
            return;
        }

        dodajCvet(id, amount);
    });

    function dodajCvet(id, amount) {

        // get ingredient by id and disable it
        document.querySelector(`#spisak-cvetova > option[value='${id}']`).disabled = true;
        document.getElementById("spisak-cvetova").selectedIndex = 0;
        var naziv = document.querySelector(`#spisak-cvetova > option[value='${id}']`).innerHTML;

        // return amount to 'empty'
        brojKomadaInput.value = "";
        
        // create new ingredient element (span in html)
        var span = document.createElement("span");
        span.classList.add("badge");
        span.classList.add("bg-secondary");
        span.dataset.id = id;
        span.innerHTML = `${naziv} x ${amount}`;

        // create the X button to remove the ingredient
        var button = document.createElement("button");
        button.type="button";
        button.classList.add("btn");
        button.classList.add("btn-x-option");
        button.classList.add("btn-sm");
        button.innerHTML = "X";

        span.appendChild(button);
        document.getElementById("izabrano").appendChild(span);

        // add a space after each ingredient
        document.getElementById("izabrano").appendChild(document.createTextNode(" "));

        // add event listener to the X button for removing the ingredient
        button.addEventListener("click", function(){ 
            var id = this.parentNode.dataset.id;
            // remove parent node from the DOM
            this.parentNode.remove();
            document.querySelector(`#spisak-cvetova > option[value='${id}']`).disabled = false;
        });
    }

})