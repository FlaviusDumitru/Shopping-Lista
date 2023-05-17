serverurl ="php/"

window.onload = function (){
    getProducts();
}

    function getProducts() {    
        fetch(serverurl+'hamtaAlla.php')
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

function appendProducts(data){
   
    tabell = document.getElementById("varatable");
    tabell.innerHTML="";


for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');
        let td_text = document.createElement ("td");
        td_text.innerHTML = data[i].namn;
        
    
    // Skapar redigera knapp och lägger den i tabellen
        let td_redigera = document.createElement('td');
        let redigera = document.createElement('a');
        redigera.innerHTML = "E";
        redigera.onclick=function(){
                redigeraVara(data[i].id)}
        td_redigera.appendChild(redigera);
              
        // Skapar radera knapp och lägger den i tabellen
        let td_radera = document.createElement('td');
        let a_radera = document.createElement('a');
        a_radera.innerHTML = "D";
        a_radera.onclick=function(){
            if(confirm("Vill du radera varan?")){
                saveActivity(tasks[i].id,"radera")}
            }
        td_radera.appendChild(a_radera);

                // Visar celler och knappar
                tr.appendChild(td_text);
                tr.appendChild(td_redigera);
                tr.appendChild(td_radera);
                tabell.appendChild(tr);
        }
}
    // redigerar varan
    function redigeraVara(id){
        document.getElementById("item-input").innerHTML="Redigera Vara";
        document.getElementById("inputKategori").value=document.getElementById("vara" + id).innerHTML;
        document.getElementById("add-button").onclick=function() {
            saveActivity(id,"save");
          }
    }