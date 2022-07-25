// class Calculator {
//     constructor (previousOperandText, currentOperandText) {
//         this.previousOperandText = previousOperandText;
//         this.currentOperandText = currentOperandText;
//         this.clear();
//     } 

//     // clear all result, default to empty string
//     clear() {
//         this.previousOperand = '';
//         this.currentOperand = '';
//         this.number = undefined;
//     }   
    
//     // delete all result
//     delete() {
//         this.currentOperand = this.currentOperand.toString().slice(0, -1);
//     }

//     //show on reult screen 
//     showOnResult(number) {
//         if(number === '.' &&  this.currentOperand.includes('.')) return
//         this.currentOperand =this.currentOperand.toString() + number.toString();
//     }

//     //operation option pick + - * / = 
//     chooseOperation(operation) {
//         if (this.currentOperand === '') return //always show the value on previousOperand
//         if (this.previousOperand !== '') {
//             this.compute()
//         }
//         this.operation = operation;
//         this.previousOperand = this.currentOperand;
//         this.currentOperand = '';
//     }

//     //calculating inside 
//     compute() {
//         let computation;
//         const prev = parseFloat(this.previousOperand);
//         const curr = parseFloat(this.currentOperand);
//         if(isNaN(prev) || isNaN(curr)) return
//         switch(this.operation) {
//             case '+':
//                 computation = prev + curr;
//                 break;
//             case '-':
//                 computation = prev - curr;
//                 break;
//             case '*':
//                 computation = prev * curr;
//                 break;
//             case '/':
//                 computation = prev / curr;
//                 break;
//             default:
//                 return;
//         }
//         this.currentOperand = computation;
//         this.operation=undefined;
//         this.previousOperand ='';
//     }

//     getDisplayNumber(number) {
//         const stringNumber = number.toString()
//         const integerDigits = parseFloat(stringNumber.split('.')[0])
//         const decimalDigits = stringNumber.split('.')[1]
//         let integerDisplay
//         if (isNaN(integerDigits)) {
//           integerDisplay = ''
//         } else {
//           integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
//         }
//         if (decimalDigits != null) {
//           return `${integerDisplay}.${decimalDigits}`
//         } else {
//           return integerDisplay
//         }
//       }

//     //update after compute
//     updateResult() {
//         this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand); 
//         if (this.operation != null) {
//         this.previousOperandText.innerText = 
//         `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`; 
//         } else {
//             this.previousOperandText.innerText = ''
//         }
//     }   
// }
// const numberButton = document.querySelectorAll('[data-number]')
// const operationButton = document.querySelectorAll('[data-operation]')
// const equalsButton = document.querySelector('[data-equals]')
// const deleteButton = document.querySelector('[data-delete]')
// const allClearButton = document.querySelector('[data-all-clear]')
// const previousOperandText = document.querySelector('[data-previous-operand]')
// const currentOperandText = document.querySelector('[data-current-operand]')

// const calculator = new Calculator(previousOperandText, currentOperandText)

// numberButton.forEach(button  => {
//     button.addEventListener('click', () => {
//         calculator.showOnResult(button.innerText)
//         calculator.updateResult()
//     })
// })

// operationButton.forEach(button  => {
//     button.addEventListener('click', () => {
//         calculator.chooseOperation(button.innerText)
//         calculator.updateResult()
//     })
// })

// equalsButton.addEventListener('click', button => {
//     calculator.compute();
//     calculator.updateResult();
// })

// allClearButton.addEventListener('click', button => {
//     calculator.clear();
//     calculator.updateResult();
// })

// deleteButton.addEventListener('click', button => {
//     calculator.delete();
//     calculator.updateResult();
// })

const btn = document.querySelectorAll('.number');
const previousOperand = document.querySelector('.previous-operand')
const currentOperand = document.querySelector('.current-operand')
const operation = document.querySelectorAll('[data-operation]')
const allClear = document.querySelector('[data-all-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn =document.querySelector('[data-equals]')
let isCalculated=false;
let isStandAlone = true;
btn.forEach(button => {
    button.addEventListener('click', function() {
        if(isCalculated) {
            currentOperand.innerHTML="";
            isCalculated =false;
            previousOperand.innerHTML = "";
        }
        currentOperand.innerHTML += button.innerHTML;
    })
})

operation.forEach(operating => {
    operating.addEventListener('click', function() {
    previousOperand.innerHTML += currentOperand.innerHTML;
    currentOperand.innerHTML = "";
    previousOperand.innerHTML += operating.innerHTML;
    })  
})
equalsBtn.addEventListener('click', () => {
    if (currentOperand.innerHTML === 'xin hãy nhập phép tính mới') {
        clearScreen();
        currentOperand.style.fontFamily = "'Gamja-Flower', cursive"
        currentOperand.style.fontSize = "2.5rem"
        return;
    }
    let lastElement = previousOperand.innerHTML.slice(-1);
    let numberString = previousOperand.innerHTML.slice(0,-1);
    let curr = Number(currentOperand.innerHTML);
    let prev = Number(numberString);
    let result
    if (lastElement === '') {
        previousOperand.innerHTML = ""
        result = "nhập lại đê";
    } else if (lastElement === '+') {
        result = prev + curr;
    } else if (lastElement === '-') {
        result = prev - curr;
    } else if (lastElement === '*') {
        result = prev * curr;
    } else if (lastElement === '/') {
        result = prev / curr;
    }
    currentOperand.innerHTML = result;
    if(lastElement === '') {
        previousOperand.innerHTML = curr + ' ' + equalsBtn.innerHTML;
    } else if (lastElement !==  equalsBtn.innerHTML) {
        previousOperand.innerHTML = prev + ' ' + lastElement + ' ' + curr + ' ' + equalsBtn.innerHTML;
    } else if (lastElement === equalsBtn.innerHTML){
        previousOperand.innerHTML = '';
        currentOperand.innerHTML =  'xin hãy nhập phép tính mới';
        currentOperand.style.fontSize = '2rem'
    } else if (numberString > 2) {
        currentOperand.innerHTML = result + result;
    }
    isCalculated=true;
})

function clearScreen () {
    currentOperand.innerHTML = "";
    previousOperand.innerHTML = "";
}

allClear.addEventListener('click', () => {
    clearScreen();
})


deleteBtn.addEventListener('click', () => {
    currentOperand.innerHTML = currentOperand.innerHTML.slice(0,-1)
    if (isCalculated) {
        previousOperand.innerHTML = "";
        isCalculated = false;
    }
})