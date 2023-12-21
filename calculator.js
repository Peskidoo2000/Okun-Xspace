let operationalsEnclose = [];
let numbersEnclose = [];
let secondnumberEnclose = [];
let displayResult = document.querySelector(".displayResult");
displayResult.innerHTML = "0";
let result = "0";


function performOperator(num1, operator, num2){
    switch(operator){
        case "+": 
        return num1 + num2;

        case "-":
            return num1-num2;

        case "*":
            return num1 * num2;

        case"/":
        if(num1 === 0){
            displayResult.innerHTML = "Zero is indivisible"
        } else{
            return num1 / num2;
        } 
        default:
            return num2;
    }
}

function clearAllInput(){
    numbersEnclose = [];
    operationalsEnclose = [];
    secondnumberEnclose = [];
    displayResult.innerHTML = "0";
}
function clearInput(){
    if(displayResult.innerHTML.length > 0){
        const lascChardisResult = displayResult.innerHTML.slice(0, -1);
        const lastCharCode = lascChardisResult.toString().slice(-1);
        if(numbersEnclose.length > 0 && lascChardisResult === numbersEnclose.toString().slice(0, -1) ){
            numbersEnclose = [result.toString().slice(0, -1)];
            numbersEnclose = [lascChardisResult]
        }else if(numbersEnclose.length >1){
            numbersEnclose.pop();
        }else if(operationalsEnclose.length > 0 && lastCharCode === operationalsEnclose [operationalsEnclose.length -2]){
            operationalsEnclose.pop();
        }else if( secondnumberEnclose.length > 0 && lastCharCode === secondnumberEnclose[secondnumberEnclose.length - 2]){
             secondnumberEnclose.pop();
        } else if(secondnumberEnclose.length === 1){
            secondnumberEnclose.pop();
        }
    
        displayResult.innerHTML = displayResult.innerHTML.slice(0, -1);
        console.log(lascChardisResult);
        console.log("result after splice", result.toString().slice(0, -1))
        console.log(lastCharCode);
        console.log(numbersEnclose[numbersEnclose.length-1]);
        console.log(numbersEnclose);
        
    } else{
        numbersEnclose = [];
        operationalsEnclose = [];
        secondnumberEnclose = [];
    }
    }

function handleUserInput(userInput){
    try{
    if(!isNaN(userInput) ){
        if((numbersEnclose.length === 0 || displayResult.innerHTML === "0")){
            numbersEnclose.push(userInput);
            displayResult.innerHTML = userInput;
            console.log(numbersEnclose);
        } 
        else if(operationalsEnclose.length > 0){
                secondnumberEnclose.push(userInput);
                displayResult.innerHTML += userInput;
                console.log(secondnumberEnclose[secondnumberEnclose.length-1]);
                console.log(secondnumberEnclose);
        }
            else{
            numbersEnclose.push(userInput);
            displayResult.innerHTML += userInput;
            console.log(numbersEnclose);
           
        }
       
    }
    else if (["+", "-", "*", "/"].includes(userInput)) {
    if (numbersEnclose.length > 0) {
        if (["+", "-", "*", "/"].includes(operationalsEnclose[operationalsEnclose.length - 1]) && secondnumberEnclose.length > 0) {
            displayResult.innerHTML += userInput;
            operationalsEnclose.push(userInput);
            if(operationalsEnclose.length >= 2){
            let fisrtNum = (numbersEnclose.join(""));
              let num1 = parseFloat(fisrtNum);
              
        for (let i =0; i < operationalsEnclose.length; i++){
            let operandi = operationalsEnclose[i - 1];
            console.log(operandi)
            let secondNum = (secondnumberEnclose.join(""));
            let num2 = parseFloat(secondNum);
            if(isNaN(num2)){
            throw new Error("Invalid Input")
            } 
            result = performOperator(num1, operandi, num2)
        } 
       
        displayResult.innerHTML = result.toString();
        numbersEnclose = [result.toString()];
        console.log(numbersEnclose);
        operationalsEnclose = [];
        console.log(operationalsEnclose);
        secondnumberEnclose =[];
}
        
    } else {
            operationalsEnclose.push(userInput);
            displayResult.innerHTML += userInput;
        }
        console.log(operationalsEnclose);
    } else {
        displayResult.innerHTML = "Input a number first";
    }
    
}

    
    else if(userInput === "="){
    if(numbersEnclose.length === 0 && operationalsEnclose.length ===0){
        displayResult.textContent = "0"
    } 
    else{
              let fisrtNum = (numbersEnclose.join(""));
              let num1 = parseFloat(fisrtNum);
              
      

for (let i = 0; i < operationalsEnclose.length; i++) {
    let operandi = operationalsEnclose[i];
    let secondNum = secondnumberEnclose.join("");
    let num2 = parseFloat(secondNum);
    if (isNaN(num2)) {
        throw new Error("Invalid Input");
    } 
    result = performOperator(num1, operandi, num2);
}

displayResult.innerHTML = result.toString();
numbersEnclose = result.toString();


operationalsEnclose = [];
console.log(operationalsEnclose);

secondnumberEnclose = [];
    }

    if(numbersEnclose.length === 0 || operationalsEnclose.length ===0){
        displayResult.innerHTML = result.toString();
        numbersEnclose = [result.toString()];
        console.log(numbersEnclose);
        
        operationalsEnclose = [];
        secondnumberEnclose =[];        
    }
}
    else if(userInput === "C"){
        clearAllInput()
    }

    else if(userInput === "C-"){
        clearInput();
    }
    else{
        displayResult.innerHTML = "inavlid calculations"
    }
}
catch(error){
        console.log("Error:", error.message)
        displayResult.innerHTML = "Perform a valid operation"
}
}


function userClick(){
    for(let i=0; i < 18; i++){
        if(i===0){
            document.querySelectorAll("#numbers")[0].addEventListener("click", function(){
                handleUserInput("C");
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "Delete"){
                    handleUserInput("C");
                }
            })
        }
        if(i ===2){
            document.querySelectorAll("#numbers")[1].addEventListener("click", function(){
                handleUserInput("9")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "9"){
                    handleUserInput("9");
                }
            })
        }
        if(i === 3){
            document.querySelectorAll("#numbers")[2].addEventListener("click", function(){
                handleUserInput("8");
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "8"){
                    handleUserInput("8");
                }
            })
        }
        if(i === 4){
            document.querySelectorAll("#numbers")[3].addEventListener("click", function(){
                handleUserInput("7")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "7"){
                    handleUserInput("7");
                }
            })
        }
        if(i === 5){
            document.querySelectorAll("#numbers")[4].addEventListener("click", function(){
                handleUserInput("C-")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "Backspace"){
                    handleUserInput("C-");
                }
            })
        }
        if(i === 6){
            document.querySelectorAll("#numbers")[5].addEventListener("click", function(){
                handleUserInput("6")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "6"){
                    handleUserInput("6");
                }
            })
        }
        if(i === 7){
            document.querySelectorAll("#numbers")[6].addEventListener("click", function(){
                handleUserInput("5");
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "5"){
                    handleUserInput("5");
                }
            })
        }
        if(i === 8){
            document.querySelectorAll("#numbers")[7].addEventListener("click", function(){
                handleUserInput("4")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "4"){
                    handleUserInput("4");
                }
            })
        }
        if(i === 9){
            document.querySelectorAll("#numbers")[8].addEventListener("click", function(){
                handleUserInput("*")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "X"){
                    handleUserInput("*");
                }
            })
        }
        if(i === 10){
            document.querySelectorAll("#numbers")[9].addEventListener("click", function(){
                handleUserInput("3")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "3"){
                    handleUserInput("3");
                }
            })
        }
        if(i === 11){
            document.querySelectorAll("#numbers")[10].addEventListener("click", function(){
                handleUserInput("2")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "2"){
                    handleUserInput("2");
                }
            })
        }
        if(i === 12){
            document.querySelectorAll("#numbers")[11].addEventListener("click", function(){
                handleUserInput("1")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "1"){
                    handleUserInput("1");
                }
            })
        }
        if(i === 13){
            document.querySelectorAll("#numbers")[12].addEventListener("click", function(){
                handleUserInput("-")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "-"){
                    handleUserInput("-");
                }
            })
        }
        if(i === 14){
            document.querySelectorAll("#numbers")[13].addEventListener("click", function(){
                handleUserInput("0")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "0"){
                    handleUserInput("0");
                }
            })
        }
        if(i === 15){
            document.querySelectorAll("#numbers")[16].addEventListener("click", function(){
                handleUserInput("=")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "Enter"){
                    handleUserInput("=");
                }
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "="){
                    handleUserInput("=");
                }
            })
        }
        if(i === 16){
            document.querySelectorAll("#numbers")[15].addEventListener("click", function(){
                handleUserInput("+")
            })
        }
        if(i === 17){
            document.querySelectorAll("#numbers")[14].addEventListener("click", function(){
                handleUserInput("/")
            })
            document.addEventListener("keydown", function(event){
                if(event.key === "/"){
                    handleUserInput("/");
                }
            })
        }
    }
}
userClick();
