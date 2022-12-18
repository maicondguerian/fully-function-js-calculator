let msgArray = ["c0d3 By M41c0nd1m45"];
let txtPositon = 1;
var speed = 300;

typewriter = () => {
    document.querySelector("#codeBy").innerHTML = msgArray[0].substring(0, txtPositon) + '<span>|</span>';
    if (txtPositon++ != msgArray[0].length)
        setTimeout(typewriter, speed);
}

document.querySelector('#c0d3r').addEventListener('click', typewriter)

const display = document.querySelector('#display');
const allNumber = document.querySelectorAll('[id*=btn]');
const allOperator = document.querySelectorAll('[id*=op_]');


document.querySelector('#copy').addEventListener('click', () => {
    if (display.textContent.length > 0) {
        navigator.clipboard.writeText(display.textContent)
        alert(`COPY: ${display.textContent}`)
    } else {
        alert(``)
    }

})


let newEntry = true;
let operator
let previslyNumber;

const incomingOperate = () => operator != undefined;

const calculate = () => {
    if (incomingOperate()) {
        const currentNumber = parseFloat(display.textContent.replace(',', '.'));
        newEntry = true
        const result = eval(`${previslyNumber}${operator}${currentNumber}`)
        refreshDisplay(result)
        // if (operator == '+'){
        //     refreshDisplay((previslyNumber + currentNumber));
        // }else if (operator == '-'){
        //     refreshDisplay((previslyNumber - currentNumber));
        // }else if (operator == 'x'){
        //     refreshDisplay(previslyNumber * currentNumber);
        // }else if (operator == '/'){
        //     refreshDisplay(previslyNumber / currentNumber);
        // }
    }
}

const refreshDisplay = (content) => {
    if (newEntry) {
        display.textContent = content;
        newEntry = false

    } else {
        display.textContent += content;
    }

}

const insertNumber = (evento) => refreshDisplay(evento.target.textContent);
allNumber.forEach(Number => Number.addEventListener('click', insertNumber));


const selectOperator = (evento) => {
    if (!newEntry) {
        calculate();
        newEntry = true;
        operator = evento.target.textContent;
        previslyNumber = parseFloat(display.textContent.replace(',', '.'));

    }

}
allOperator.forEach(operator => operator.addEventListener('click', selectOperator));


const triggerEqual = () => {
    calculate();
    operator = undefined;
}
document.querySelector('#equal').addEventListener('click', triggerEqual);

const clearDisplay = () => display.textContent = '';
document.querySelector('#cln_display').addEventListener('click', clearDisplay);

const clearCalc = () => {
    clearDisplay();
    operator = undefined;
    newEntry = true;
    previslyNumber = undefined;
}
document.querySelector('#cln_calc').addEventListener('click', clearCalc);

const eraseLastEntry = () => display.textContent = display.textContent.slice(0, -1);
document.querySelector('#back_space').addEventListener('click', eraseLastEntry);


const numberIn = () => display.textContent.length > 0;
const floatNumber = () => display.textContent.indexOf(',') != -1;
const insertFloat = () => {
    if (!floatNumber()) {
        if (numberIn()) {
            refreshDisplay(',')
        } else {
            refreshDisplay('0,')
        }
    }
}
document.querySelector('#float').addEventListener('click', insertFloat);





