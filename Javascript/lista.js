serverurl = "php/"

window.onload = function () {

    document.getElementById("add-button").onclick = function () {
        saveLists();
    }
    getLists();
}
// Fetchar back-end funktionen som hämtar alla varor
function getLists() {
    fetch(serverurl + 'hamtaListor.php')
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data);
            appendLists(data);
        })
}

// sparar vara
function saveLists() {
    if (document.getElementById("item-input").value !== '') {
        let listor = document.getElementById('item-input').value;
        let FD = new FormData();
        FD.append("lista", listor);

        // Hämtar och sparar med fetch genom POST
        fetch(serverurl + 'sparaLista.php',
            {
                method: 'POST',
                body: FD
            })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(function (data) {
                getLists();
            })
        document.getElementById('item-input').value = '';
    }
}
// Gör så att de olika raderna och tabellerna skapas och syns
function appendLists(data) {

    tabell = document.getElementById("listTable");
    tabell.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');

        // Skapar namn cell
        let td_text = document.createElement("td");
        td_text.innerHTML = data[i].namn;
        td_text.id = "lista" + data[i].id;
        td_text.onclick = function () {
            loadList(data[i].id)
        }
    
        // Skapar redigera knapp och lägger den i tabellen
        let td_redigera = document.createElement('td');
        let redigera = document.createElement('span');
        redigera.innerHTML = "edit";
        redigera.classList = "material-icons"
        redigera.onclick = function () {
            redigeraLista(data[i].id)
        }
        td_redigera.appendChild(redigera);

        // Skapar radera knapp och lägger den i tabellen
        let td_radera = document.createElement('td');
        let a_radera = document.createElement('span');
        a_radera.classList = "material-icons";
        a_radera.innerHTML = "delete";
        a_radera.onclick = function () {
            raderaLista(data[i].id)
        }
        // Visar celler och knappar
        td_radera.appendChild(a_radera);
        tr.appendChild(td_text);
        tr.appendChild(td_redigera);
        tr.appendChild(td_radera);
        tabell.appendChild(tr);
}
}
 // Redigera lista
function redigeraLista (id) {
        
    // Genom CSS, gör det så att den raden som blir redigerad ändrar färg då den redigeras.
    var highlightedRows = document.getElementsByClassName("highlighted-row");
    for (var i = 0; i < highlightedRows.length; i++) {
        highlightedRows[i].classList.remove("highlighted-row");
    }
    var editedRow = document.getElementById("lista" + id).parentNode;
    editedRow.classList.add("highlighted-row");

    document.getElementById("add-button").innerHTML = "Spara Redigering"; // Ändrar "add-button" knappen till "Spara redigering"
    document.getElementById("item-input").value = document.getElementById("lista" + id).innerHTML; // Gör så att det som skrivs i textrutan ändrar "item-input"
    document.getElementById("add-button").onclick = function () { // När knappen trycks ner körs funktionen
        uppdateraLista(id, "save");
    }
}

function raderaLista (id) {
    if (confirm("Vill du radera listan?")) {

        let FD = new FormData();
        FD.append("id", id);
        // Hämtar och sparar med fetch genom POST
        fetch(serverurl + 'raderaLista.php',
            {
                method: 'POST',
                body: FD
            })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(function (data) {
                getLists();
            })
    }

}
// sparar vara
function uppdateraLista(id) {
    if (document.getElementById("item-input").value !== '') {
        let listor = document.getElementById('item-input').value;
        let FD = new FormData();
        FD.append("lista", listor);
        FD.append("id", id);

        // Hämtar och sparar med fetch genom POST
        fetch(serverurl + 'uppdateraLista.php',
            {
                method: 'POST',
                body: FD
            })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(function (data) {
                getLists();
            })
        // Gör så att "add-button" ändras till "lägg till" efter man har uppdaterat varan
        document.getElementById('item-input').value = '';
        document.getElementById('add-button').innerHTML = 'Lägg till';
        document.getElementById("add-button").onclick = function () {
            saveProduct();
        }
    }
}

    // Laddar listan 
function loadList (id) {
    sessionStorage.setItem("listnr", id);
    window.location.href= "https://www.datanom.ax/~47487/Shoppinglista/varor.html";
}

// Fetchar back-end funktionen som raderar alla varor
function raderaAlla() {
    if (confirm("Vill du verkligen radera alla dina listor?")) {

        fetch(serverurl + 'raderaAllaListor.php',
            {
                method: 'POST'
            })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(function (data) {
                getLists();
            })

    }
}