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

}

function raderaVara(id) {
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

function appendProducts(data) {

    tabell = document.getElementById("varatable");
    tabell.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');
        let td_text = document.createElement("td");
        td_text.innerHTML = data[i].namn;

        // Skapar Checkbox cell
        let td_checkbox = document.createElement('td');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'checkbox' + checkbox;
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
            if (confirm("Vill du radera varan med nummer " + data[i].id + "?")) {
                raderaVara(data[i].id)
            }
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
    let table = document.getElementById("varatable");

    // Få mängden rows i table: n
    raknaRows = table.rows.length;

    // Radera alla rows, men inte en
    while (raknaRows > 1) {
        table.raderaAlla(raknaRows - 2);
        raknaRows--;
    }
}
// redigerar varan
function redigeraVara(id) {
    document.getElementById("item-input").innerHTML = "Redigera Vara";
    document.getElementById("item-input").value = document.getElementById(id).innerHTML;
    document.getElementById("add-button").onclick = function () {
        saveProduct(id, "save");
    }
}