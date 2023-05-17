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
                appendProducts(data);
            })
    }

function appendProducts(data){
    console.log(data);
    tabell = document.getElementById("varatable");
    tabell.innerHTML="";
}

for (let i = 0; i < data.length; i++) {


    }
    