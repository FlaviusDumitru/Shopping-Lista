serverurl = "php/"

function redirectToPage() {
    window.location.href = "https://www.datanom.ax/~47487/Shoppinglista/";  
  }
window.onload = function () {

    document.getElementById("add-button").onclick = function () {
        saveProduct();
    }
    getProducts();
}
// Fetchar back-end funktionen som hämtar alla varor
function getProducts() {
    let listnr = sessionStorage.getItem("listnr");
    console.log(listnr);
        let FD = new FormData();
        FD.append("listnr", listnr);
    fetch(serverurl + 'hamtaAlla.php',
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
            console.log(data);
            appendProducts(data);
        })
}

// sparar vara
function saveProduct() {
    if (document.getElementById("item-input").value !== '') {
        let varor = document.getElementById('item-input').value;
        let listnr = sessionStorage.getItem("listnr");
        let FD = new FormData();
        FD.append("vara", varor);
        FD.append("listnr", listnr);

        // Hämtar och sparar med fetch genom POST
        fetch(serverurl + 'sparaVara.php',
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
                getProducts();
            })
        document.getElementById('item-input').value = '';
    }
}

function raderaVara(id) {
    if (confirm("Vill du radera varan?")) {

        let FD = new FormData();
        FD.append("id", id);
        // Hämtar och sparar med fetch genom POST
        fetch(serverurl + 'raderaVara.php',
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
                getProducts();
            })
    }

}
    // Kollar om varan är icheckad
function checkaVara(id) {
    let FD = new FormData();
    FD.append("id", id);
    // Hämtar och sparar med fetch genom POST
    fetch(serverurl + 'kryssaVara.php',
        {
            method: 'POST',
            body: FD
        })
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function () {
            getProducts();
        })

}
// Gör så att de olika raderna och tabellerna skapas och syns
function appendProducts(data) {

    tabell = document.getElementById("varatable");
    tabell.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');

        // Skapar namn cell
        let td_text = document.createElement("td");
        td_text.innerHTML = data[i].namn;
        td_text.id = "vara" + data[i].id;

        // Skapar Checkbox cell
        let td_checkbox = document.createElement('td');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        if (data[i].checked) {
            checkbox.checked = 1;
        }
        checkbox.onclick = function () {
            checkaVara(data[i].id);
        }
        td_checkbox.appendChild(checkbox);


        // Skapar redigera knapp och lägger den i tabellen
        let td_redigera = document.createElement('td');
        let redigera = document.createElement('span');
        redigera.innerHTML = "edit";
        redigera.classList = "material-icons"
        redigera.onclick = function () {
            redigeraVara(data[i].id)
        }
        td_redigera.appendChild(redigera);

        // Skapar radera knapp och lägger den i tabellen
        let td_radera = document.createElement('td');
        let a_radera = document.createElement('span');
        a_radera.classList = "material-icons";
        a_radera.innerHTML = "delete";
        a_radera.onclick = function () {
            raderaVara(data[i].id)
        }

        // Visar celler och knappar
        td_radera.appendChild(a_radera);
        tr.appendChild(td_checkbox);
        tr.appendChild(td_text);
        tr.appendChild(td_redigera);
        tr.appendChild(td_radera);
        tabell.appendChild(tr);
    }
}
// Fetchar back-end funktionen som raderar alla varor
function raderaAlla() {
    if (confirm("Vill du verkligen radera alla varor?")) {

        fetch(serverurl + 'raderaAllaVaror.php',
            {
                method: 'POST'
            })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(function (data) {
                getProducts();
            })

    }
}
// Fetchar back-end funktionen som raderar de kryssade varorna
function raderaKryssade() {
    if (confirm("Vill du verkligen radera kryssade varor?")) {
        let listnr = sessionStorage.getItem("listnr");
        let FD = new FormData();
        FD.append("listnr", listnr);
        fetch(serverurl + 'raderaValda.php',
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
                getProducts();
            })

    }
}
// sparar vara
function uppdateraVara(id) {
    if (document.getElementById("item-input").value !== '') {
        let varor = document.getElementById('item-input').value;
        let FD = new FormData();
        FD.append("vara", varor);
        FD.append("id", id);

        // Hämtar och sparar med fetch genom POST
        fetch(serverurl + 'uppdateraVara.php',
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
                getProducts();
            })
        // Gör så att "add-button" ändras till "lägg till" efter man har uppdaterat varan
        document.getElementById('item-input').value = '';
        document.getElementById('add-button').innerHTML = 'Lägg till';
        document.getElementById("add-button").onclick = function () {
            saveProduct();
        }
    }
}
// redigerar varan
function redigeraVara(id) {

    // Genom CSS, gör det så att den raden som blir redigerad ändrar färg då den redigeras.
    var highlightedRows = document.getElementsByClassName("highlighted-row");
    for (var i = 0; i < highlightedRows.length; i++) {
        highlightedRows[i].classList.remove("highlighted-row");
    }
    var editedRow = document.getElementById("vara" + id).parentNode;
    editedRow.classList.add("highlighted-row");

    document.getElementById("add-button").innerHTML = "Spara Redigering"; // Ändrar "add-button" knappen till "Spara redigering"
    document.getElementById("item-input").value = document.getElementById("vara" + id).innerHTML; // Gör så att det som skrivs i textrutan ändrar "item-input"
    document.getElementById("add-button").onclick = function () { // När knappen trycks ner körs funktionen
        uppdateraVara(id, "save");
    }
}