'use strict';

// Loading Page

const circles = [   document.getElementById("c1"),
                    document.getElementById("c2"),
                    document.getElementById("c3"),
                    document.getElementById("c4")];

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
const loadingForm = document.getElementById("loading-form");
const loadingBar = document.getElementById("loading-bar");
const formSent = document.getElementById("form-sent");

const circles_confirm = [document.getElementById("cl-1"),
                    document.getElementById("cl-2"),
                    document.getElementById("cl-3"),
                    document.getElementById("cl-4")]

form.addEventListener('submit', function(e){

    e.preventDefault();

    form.style.opacity = '0';
    form.style.visibility = 'hidden';

    loadingForm.style.display = "grid";

    let loadingResponse = setInterval(() => { 
  
        for(var n = 0; n <= 3; n++){
            if(circles_confirm[n] != circles_confirm[i]){
                circles_confirm[n].style.background = "#131522"
            }
        }
    
        circles_confirm[i].style.background = "#FFF";
    
        i < 3 ? i++ : i = 0;
    
    }, 300);

    var data = new FormData(form);
    
    fetch('../php/sendEmail.php',{
        method: 'POST',
        body: data
    })
        .then( answer => answer.json())
        .then( info => {
            if(info == true){
                clearInterval(loadingResponse);
                loadingBar.style.display = "none";
                loadingForm.style.display = "grid";
                formSent.style.display = "block";
            }else{
                clearInterval(loadingResponse);
                loadingForm.style.display = "none";
                form.style.opacity = '1';
                form.style.visibility = 'visible';
                confirm_text.innerHTML = "Rellene todos los campos"
            }
        });

})
