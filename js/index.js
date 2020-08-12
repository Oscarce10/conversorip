var tabla = document.getElementById("tabla");
(function leerConversiones(){
    firebase.database().ref('/conversiones').once('value').then(function(snapshot) {
        var tableContent = "";
        var res = snapshot.toJSON();
        for (var c in res){
            tableContent += '<tr>';
            tableContent += "<td>" + res[c]["punteada"] + "</td>";
            tableContent += "<td>" + res[c]["binaria"] + "</td>";
            tableContent += "</tr>";
            tabla.innerHTML = tableContent;
        }
    });

})();
const regexPunteada = "^(?:(2[0-5]{2}|1[0-9]{2}|[1-9][0-9]|[0-9])\\.)(?:(2[0-5]{2}|1[0-9]{2}|[1-9][0-9]|[0-9])\\.)(?:(2[0-5]{2}|1[0-9]{2}|[1-9][0-9]|[0-9])\\.)(2[0-5]{2}|1[0-9]{2}|[1-9][0-9]|[0-9])$";
const regexPunteadaAux = "^(?:(2[0-5]{2}|1[0-9]{2}|[1-9][0-9]|[0-9])\\b[\\.]?){1,4}$"
var rePunteada1 = new RegExp(regexPunteada);
var rePunteada2 = new RegExp(regexPunteadaAux);
var btn = document.querySelector("#btn-convertir");
var binaria = document.querySelector("#binaria");
var punteada = document.querySelector("#punteada");

btn.style.display = "none";
btn.addEventListener("click", function () {
    var action = ((punteada.value === "")?"funPun":"funBin");
    if ( action === "funBin"){
        funBin();
    }else{
        funPun();
    }
    (function writeUserData() {
        firebase.database().ref('conversiones/' + Date.now()).set({
            punteada: punteada.value,
            binaria: binaria.value,
        });
    })();
    firebase.database().ref('/conversiones').endAt().limitToLast(1).on("child_added", function(snapshot, prevChildKey) {
        var content = "<tr>";
        content += "<td>" + snapshot.val().punteada + "</td>";
        content += "<td>" + snapshot.val().binaria + "</td>";
        content += "</tr>";
        tabla.innerHTML += content;
    });
});

punteada.addEventListener("keyup", function () {
    if (!rePunteada2.test(punteada.value)){
        var aux = punteada.value;
        punteada.value = aux.substring(0, aux.length -1);
    } else {
        punteada.style.backgroundColor = "#DCF8C6";
        btn.style.display = "block";
    }
    if(!rePunteada1.test(punteada.value)){
        punteada.style.backgroundColor = "#F8D7DA";
        binaria.value = "";
        binaria.style.backgroundColor = "white";
        btn.style.display = "none";
    }
});

const regexBinaria = "^([0-1]{8})\\.([0-1]{8})\\.([0-1]{8})\\.([0-1]{8})$";
var  reBinaria1 = new RegExp(regexBinaria);

binaria.addEventListener("keyup", function () {
    if(!reBinaria1.test(binaria.value)){
        binaria.style.backgroundColor = "#F8D7DA";
        punteada.value = "";
        punteada.style.backgroundColor = "white";
        btn.style.display = "none";
    }else {
        binaria.style.backgroundColor = "#DCF8C6";
        btn.style.display = "block";
    }
});

var funBin = function() {
    var answer="";
    for (let i = 1; i < 5; i++){
        answer += ("000000000" + Number(punteada.value.match(regexPunteada)[i]).toString(2)).substr(-8) + ((i < 4)?".":"");
    }
    binaria.value = (answer);
}

var funPun = function() {
    var answer = ""
    for (let i = 1; i < 5; i++) {
        answer += parseInt(binaria.value.match(regexBinaria)[i], 2) + ((i < 4) ? "." : "");
    }
    punteada.value = (answer);
}



