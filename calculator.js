//global constants
const calcchoices = Array.from(document.querySelectorAll(".allbtns .number"));
const buttonchoices = Array.from(document.querySelectorAll("button[data-key]"));
const decimalbtn = document.querySelector("#decimal");
var inputs = [];
let numholder = "";
let secondnum = "";
let operation = "";
let pressedbutton = {};

//operation function with built in operations
function operate(a,b,operator){
    switch(true){
        case (operator == "+"): return a+b;
        case (operator == "-"): return a-b;
        case (operator == "*"): return a*b;
        case (operator == "/"): {
            if(b == 0){
                return document.getElementById("display").value = "Math Error";
            }
            return a/b;
        }
    }
}

//function to analyze the array of nums and operands
function parser(array){
    newparsed = [];
    computednum = 0;
    //consider parsing negatives first
    for(i=0;i<array.length;i++){
        if(array[i] === "-" && (array[i-1] == null || (array[i-1] === "+" || array[i-1] === "-" || array[i-1] === "*" || array[i-1] === "/"))) {
            computednum = operate(0,array[i+1],array[i])
            array.splice(i,2,computednum);
        }
    }
    //do multiplication and division first, and splice the array
    while(array.includes("*") || array.includes("/")){
        for(i=0; i<array.length; i++){
            //if an operator is encountered, do the operation, delete the old numbers and operation. splice the new number in
            if(array[i] === "*" || array[i] === "/"){
                computednum = operate(array[i-1],array[i+1],array[i]);
                array.splice(i-1,3,computednum);
            }
        }
    }
    //then do addition and subtraction till you reach one value
    while(array.includes("+") || array.includes("-")){
        for(i=0; i<array.length; i++){
            if(array[i] === "+" || array[i] === "-"){
                computednum = operate(array[i-1],array[i+1],array[i]);
                array.splice(i-1,3,computednum);
            }
        }
    }
    return array;
}

function buttonpressing(e){
    //if number pressed
    if(e.className === "number") {
        numholder += e.value;
        document.getElementById("display").value += e.value;
    }
    //if decimal is pressed, make sure you cant press it again
    if(e.className === "decimal") e.removeEventListener("click", buttonpressing);

    //if an operation is pressed, push it onto the array and wait for another number to be inputted
    if(e.className === "number operations"){
            if(numholder != '') inputs.push(Number(numholder));
            inputs.push(e.value)
            numholder = '';
            document.getElementById("display").value += e.textContent;
            decimalbtn.addEventListener("click",buttonpressing);
        }

    //if = is encountered, push the number inputted and call parser function
    if(e.className == "number operate" && (inputs.includes("+")|| inputs.includes("-")|| inputs.includes("*")|| inputs.includes("/"))){
        if(numholder != '') inputs.push(Number(numholder));
        if(inputs.length < 3)  {
            document.getElementById("display").value = "Math Error";
        }
        numholder = '';
        document.getElementById("display").value = parser(inputs);
        decimalbtn.addEventListener("click",buttonpressing);
    }
//if backspace is encountered
    if(e.className == "number backspace"){
        if(numholder == '' && (inputs[inputs.length-1] == '+' || inputs[inputs.length-1] == '-' || inputs[inputs.length-1] == '*' || inputs[inputs.length-1] == '/')){
            inputs.pop();
        }
        temp = document.getElementById("display").value;
        tempnum = numholder;
        document.getElementById("display").value = temp.substr(0, temp.length - 1);
        numholder = tempnum.substr(0,tempnum.length-1);
        decimalbtn.addEventListener("click",buttonpressing);
    }
    //if clear is pressed, clear everything
    if(e.className == "number clear") {
        document.getElementById("display").value = '';
        inputs = [];
        numholder = '';
        decimalbtn.addEventListener("click",buttonpressing);
    }
    console.log(inputs)
}


calcchoices.forEach(choice => choice.addEventListener("click", e => {
buttonpressing(e.target)
}));

window.addEventListener("keydown", function(e){
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    buttonpressing(key);
})

