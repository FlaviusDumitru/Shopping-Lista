serverurl = "php/"

window.onload = function () {
    document.getElementById("add-button").onclick = function () {
        saveProduct();
    }
    getProducts();
}

function getProducts() {
    fetch(serverurl + 'hamtaAlla.php')
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
    if (document.getElementById("item-input").value !=='') {
    let varor = document.getElementById('item-input').value;
    let FD = new FormData();
    FD.append("vara", varor);

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
function appendProducts(data) {

    tabell = document.getElementById("varatable");
    tabell.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');

        let td_text = document.createElement("td");
        td_text.innerHTML = data[i].namn;
        td_text.id = "vara" + data[i].id; 

        // Skapar Checkbox cell
        let td_checkbox = document.createElement('td');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        if (data[i].checked){
            checkbox.checked = 1;
        }
        checkbox.onclick = function () {
            checkaVara(data[i].id);
        }
        td_checkbox.appendChild(checkbox);
        

        // Skapar redigera knapp och lägger den i tabellen
        let td_redigera = document.createElement('td');
        let redigera = document.createElement('a');
        redigera.innerHTML = "E";
        redigera.onclick = function () {
            redigeraVara(data[i].id)
        }
        td_redigera.appendChild(redigera);

        // Skapar radera knapp och lägger den i tabellen
        let td_radera = document.createElement('td');
        let a_radera = document.createElement('a');
        a_radera.innerHTML = "D";
        a_radera.onclick = function () {
                raderaVara(data[i].id)
        }
        td_radera.appendChild(a_radera);


        td_radera.appendChild(a_radera);
        // Visar celler och knappar
        tr.appendChild(td_checkbox);
        tr.appendChild(td_text);
        tr.appendChild(td_redigera);
        tr.appendChild(td_radera);
        tabell.appendChild(tr);
    }
}

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

function raderaKryssade() {
    if (confirm("Vill du verkligen radera kryssade varor?")) {

    fetch(serverurl + 'raderaValda.php',
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
// sparar vara
function uppdateraVara(id) {
    if (document.getElementById("item-input").value !=='') {
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
        document.getElementById('item-input').value = '';
    }
}
// redigerar varan
function redigeraVara(id) {
    document.getElementById("add-button").innerHTML = "Spara Redigering";
    document.getElementById("item-input").value = document.getElementById("vara" + id).innerHTML;
    document.getElementById("add-button").onclick = function () {
        uppdateraVara(id, "save");
    }
}