//global constants
const calcchoices = Array.from(document.querySelectorAll(".allbtns"));
let firstnum = "";
let secondnum = "";
let operation = "";
//Operation functions
function add(a,b){
    return (a+b);
}

function subtract(a,b){
    return(a-b);
}

function multiply(a,b){
    return(a*b);
}

function divide(a,b){
    return(a/b);
}

function operate(a,b,operator){
    switch(true){
        case (operator == "add"): {
            return add(a,b);
        }
        case (operator == "subtract"): {
            return subtract(a,b);
        }
        case (operator == "multiply"): {
            return multiply(a,b);
        }
        case (operator == "divide"): {
            return divide(a,b);
        }
    }
}


//function to populate the display and store numbers
function populate(){
    calcchoices.addEventListener("click", )
}


calcchoices.forEach(choice => choice.addEventListener("click", e => {
    document.getElementById("display").value += e.target.textContent //updates the display with what you pressed
    if(document.getElementById("display").value.charcode <= 57 && document.getElementById("display").value.charcode >= 48){
        firstnum = //doesnt work with mult digits
    } //variable numberholder holds what you pressed
    //assign operation value to a variable 
    if(e.target.className == "operations") {
        operation = e.target.ClassName;
        secondnum = firstnum;
        firstnum = "";
    }

    if(e.target.value == "="){
        operate(firstnum,secondnum,operation)
    }

    if(e.target.textContent == "clear") {
        //clear everything
    }
    console.table(numberholder);
}))
