'use strict';

// Loading Page

const circles = [   document.getElementById("c1"),
                    document.getElementById("c2"),
                    document.getElementById("c3"),
                    document.getElementById("c4")]

var i = 0;

let loadingPage = setInterval(() => { 
  
    for(var n = 0; n <= 3; n++){
        if(circles[n] != circles[i]){
            circles[n].style.background = "#2F3241"
        }
    }

    circles[i].style.background = "#FFF";

    i < 3 ? i++ : i = 0;

}, 300);


// Change box color when its selected and Change de select list

const botonOne = document.getElementById("botonOne");
const botonTwo = document.getElementById("botonTwo");
const listPilot = document.getElementById("pilot");
const listControl = document.getElementById("control");
const submitSection = document.getElementById("submit-section");

botonOne.addEventListener("change", () => {

    submitSection.style.display = "block";

    botonTwo.style.backgroundColor  = "transparent";
    botonOne.style.backgroundColor = "#9A00FF";

    listControl.style.display = "none";
    listPilot.style.display = "block";
},false)

botonTwo.addEventListener("change", () => {
    
    submitSection.style.display = "block";

    botonOne.style.backgroundColor  = "transparent";
    botonTwo.style.backgroundColor = "#9A00FF";

    listPilot.style.display = "none";
    listControl.style.display = "block";
},false)

// Formulario de eventos

var form = document.getElementById("form");
const confirm_text = document.getElementById("confirm_request");

form.addEventListener('submit', function(e){

    e.preventDefault();

    var data = new FormData(form);
    
    fetch('../php/sendEmail.php',{
        method: 'POST',
        body: data
    })
        .then( answer => answer.json())
        .then( info => {
            if(info == true){
                confirm_text.innerHTML = "Solicitud de entrenamiento enviada con exito!";
            }else{
                confirm_text.innerHTML = "Rellene todos los campos"
            }
        });

})
