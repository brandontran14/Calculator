//global constants
const calcchoices = Array.from(document.querySelectorAll(".allbtns .number"));
const decimalbtn = document.querySelector("#decimal");
var inputs = [];
let numholder = "";
let secondnum = "";
let operation = "";
decimalAllowed = true;

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

//function that backspaces
function backspace(array){
    array.pop();
    return array;
}

//function to analyze the array of nums and operands
function parser(array){
    newparsed = [];
    computednum = 0;
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
    console.log(array);
    return array;


}


function buttonpressing(e){
    document.getElementById("display").value += this.value; //updates the display with what you pressed
    //if number pressed
    if(this.className === "number") numholder += this.textContent;
    //if decimal is pressed, make sure you cant press it again
    if(this.id === "decimal") this.removeEventListener("click", buttonpressing);

    //if an operation is pressed, push it onto the array and wait for another number to be inputted
    if(this.className === "number operations"){
            if(numholder != '') inputs.push(Number(numholder));
            inputs.push(this.value)
            numholder = '';
            decimalbtn.addEventListener("click",buttonpressing);
        }

    //if = is encountered, push the number inputted and call parser function
    if(this.value == "=" && (inputs.includes("+")|| inputs.includes("-")|| inputs.includes("*")|| inputs.includes("/"))){
        if(numholder != '') inputs.push(Number(numholder));
//remember to check for logic(entering = before anything)
        if(inputs.length < 3)  {
            document.getElementById("display").value = "Math Error";
        }
        numholder = '';
        document.getElementById("display").value = parser(inputs);
        decimalbtn.addEventListener("click",buttonpressing);
    }
//if backspace is encountered
    if(this.textContent == "backspace"){
        temp = document.getElementById("display").value;
        tempnum = numholder;
        document.getElementById("display").value = temp.substr(0, temp.length - 1);
        numholder = tempnum.substr(0,tempnum.length-1);
        decimalbtn.addEventListener("click",buttonpressing);
    }

    //if clear is pressed, clear everything
    if(this.textContent == "clear") {
        document.getElementById("display").value = '';
        inputs = [];
        numholder = '';
        decimalbtn.addEventListener("click",buttonpressing);
    }
    console.log(numholder)
    console.log(inputs)
}
calcchoices.forEach(choice => choice.addEventListener("click", buttonpressing))

