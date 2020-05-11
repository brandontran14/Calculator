//global constants
const calcchoices = Array.from(document.querySelectorAll(".allbtns"));
const decimalbtn = document.querySelector("#decimal");
var inputs = [];
let numholder = "";
let secondnum = "";
let operation = "";

//operation function with built in operations
function operate(a,b,operator){
    switch(true){
        case (operator == "+"): {
            return a+b;
        }
        case (operator == "-"): {
            return a-b;
        }
        case (operator == "*"): {
            return a*b;
        }
        case (operator == "/"): {
            if(b == 0){
                document.getElementById("display").value = "Math Error";
                return document.getElementById("display").value
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
    document.getElementById("display").value += e.target.value //updates the display with what you pressed
    //if number pressed
    if(e.target.className === "number"){
        numholder += e.target.textContent;
    }
    //if decimal is pressed, make sure you cant press it again
    if(e.target.id === "decimal"){
        //while operations or clear is not pressed
        console.log(e.target)
        decimalbtn.removeEventListener("click", buttonpressing);
    }
    //if an operation is pressed, push it onto the array and wait for another number to be inputted
    if(e.target.className === "operations"){
            operation = e.target.value;
            inputs.push(Number(numholder))
            inputs.push(operation)
            numholder = '';
            decimalbtn.addEventListener("click",buttonpressing)
        }
    //if a = is encountered, push the number inputted and call parser function
    if(e.target.value == "="){
        //if(//nonumber of operations return error)
        inputs.push(Number(numholder))
        numholder = '';
        document.getElementById("display").value = parser(inputs);
        decimalbtn.addEventListener("click",buttonpressing)
    }

    //if clear is pressed, clear everything
    if(e.target.textContent == "clear") {
       document.getElementById("display").value = '';
        inputs = [];
        numholder = '';
        decimalbtn.addEventListener("click",buttonpressing)
    }
}
decimalbtn.addEventListener("click",buttonpressing)
calcchoices.forEach(choice => choice.addEventListener("click", buttonpressing))


    // if(e.target.textContent == "backspace"){
    //     inputs.push(Number(numholder))
    //     numbholder ='';
    //     inputs.pop();
    //     temp = document.getElementById("display").value;
    //     document.getElementById("display").value = temp.substr(0, temp.length - 1);
    //     console.log(inputs)
    // }