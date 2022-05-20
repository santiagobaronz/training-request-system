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

// Select type of request
const trainingSelect = document.getElementById("training-type-label");
const examSelect = document.getElementById("exam-type-label");
const typeTitle = document.getElementById("type-title");

// Main buttons
const botonOne = document.getElementById("botonOne");
const botonTwo = document.getElementById("botonTwo");

// Inputs
const listPilot = document.getElementById("pilot");
const listControl = document.getElementById("control");
const listExamPilot = document.getElementById("exam-pilot");
const listExamAtc = document.getElementById("exam-atc");

// Submit button
const submitSection = document.getElementById("submit-section");
const submitBoton = document.getElementById("submit-boton");

// Inputs
const botonTraining = document.getElementById("training-type");
const botonExam = document.getElementById("exam-type");

// Input
const botonSelectOne = document.getElementById("pilot_img");
const botonSelectTwo = document.getElementById("control_img");


// Select types

trainingSelect.addEventListener("click", () => {
    trainingSelect.classList.add("active");
    examSelect.classList.remove("active");

    typeTitle.innerHTML = "Tipo de entrenamiento:";
    submitBoton.innerHTML = "Solicitar entrenamiento";

    if(botonSelectOne.checked){
        listControl.style.display = "none";
        listPilot.style.display = "block";
        listExamAtc.style.display = "none";
        listExamPilot.style.display = "none";
    }

    if(botonSelectTwo.checked){
        listControl.style.display = "block";
        listPilot.style.display = "none";
        listExamAtc.style.display = "none";
        listExamPilot.style.display = "none";
    }

},false)

examSelect.addEventListener("click", () => {
    examSelect.classList.add("active");
    trainingSelect.classList.remove("active");

    typeTitle.innerHTML = "Tipo de examen:";
    submitBoton.innerHTML = "Solicitar examen";

    if(botonSelectOne.checked){
        listControl.style.display = "none";
        listPilot.style.display = "none";
        listExamAtc.style.display = "none";
        listExamPilot.style.display = "block";
    }

    if(botonSelectTwo.checked){
        listControl.style.display = "none";
        listPilot.style.display = "none";
        listExamAtc.style.display = "block";
        listExamPilot.style.display = "none";
    }

},false)


// Buttons

botonOne.addEventListener("change", () => {

    submitSection.style.display = "block";

    botonTwo.style.backgroundColor  = "transparent";
    botonOne.style.backgroundColor = "#9A00FF";

    if(botonTraining.checked){
        listControl.style.display = "none";
        listPilot.style.display = "block";
        listExamAtc.style.display = "none";
        listExamPilot.style.display = "none";
    }

    if(botonExam.checked){
        listControl.style.display = "none";
        listPilot.style.display = "none";
        listExamAtc.style.display = "none";
        listExamPilot.style.display = "block";
    }

},false)

botonTwo.addEventListener("change", () => {
    
    submitSection.style.display = "block";

    botonOne.style.backgroundColor  = "transparent";
    botonTwo.style.backgroundColor = "#9A00FF";

    listPilot.style.display = "none";
    listControl.style.display = "block";

    if(botonTraining.checked){
        listControl.style.display = "block";
        listPilot.style.display = "none";
        listExamAtc.style.display = "none";
        listExamPilot.style.display = "none";
    }

    if(botonExam.checked){
        listControl.style.display = "none";
        listPilot.style.display = "none";
        listExamAtc.style.display = "block";
        listExamPilot.style.display = "none";
    }

},false)

// Main form

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
