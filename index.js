// let btn = document.querySelector(".grid-item10");
// let result =document.querySelector(".grid-item-showResult");

// document.addEventListener('click',function() {
//     btn.innerHTML = result.innerHTML;
// })
class Calculator {
    constructor (previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    } 

    // clear all result, default to empty string
    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.number = undefined;
    }   
    
    // delete all result
    delete() {

    }

    //show on reult screen 
    showOnResult(number) {
        if(number === '.' &&  this.currentOperand.includes('.')) return
        this.currentOperand =this.currentOperand.toString() + number.toString();
    }

    //operation option pick + - * / = 
    chooseOperation(operation) {
        if (this.currentOperand === '') return //always show the value on previousOperand
        if (this.previousOperand !== '') {
            this.conpute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    //calculating inside 
    conpute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation=undefined;
        this.previousOperand ='';
    }

    //update after compute
    updateResult() {
        this.currentOperandText.innerText = this.currentOperand; 
        this.previousOperandText.innerText = this.previousOperand; 
    }   
}
const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deletesButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButton.forEach(button  => {
    button.addEventListener('click', () => {
        calculator.showOnResult(button.innerText)
        calculator.updateResult()
    })
})

operationButton.forEach(button  => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateResult()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateResult();
})