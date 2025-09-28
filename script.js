// Grab all buttons and monitor
const calculatorMonitor = document.getElementById('calc_monitor');
const buttons = document.querySelectorAll('.my-btn');
const clearAllBtn = document.getElementById('clearc_btn');
const backspaceBtn = document.getElementById('clear_btn');
const equalsBtn = document.getElementById('equals');

// Helper: check if a character is an operator
function isOperator(char) {
    return ['+', '-', 'x', '/'].includes(char);
}

// Clear everything
clearAllBtn.addEventListener('click', () => {
    calculatorMonitor.textContent = '';
});

// Backspace: remove last character
backspaceBtn.addEventListener('click', () => {
    calculatorMonitor.textContent = calculatorMonitor.textContent.slice(0, -1);
});

// Equals: calculate expression
equalsBtn.addEventListener('click', () => {
    let expression = calculatorMonitor.textContent.replace(/x/g, '*'); // replace 'x' with '*'
    try {
        let result = eval(expression); // calculate result
        calculatorMonitor.textContent = result;
    } catch {
        calculatorMonitor.textContent = 'Error';
    }
});

// Handle numbers, operators, and decimal point
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.textContent;
        const lastChar = calculatorMonitor.textContent.slice(-1);

        // Prevent two operators in a row
        if (isOperator(val) && isOperator(lastChar)) return;

        // Prevent decimal after another decimal in same number
        if (val === '.') {
            const parts = calculatorMonitor.textContent.split(/[\+\-\*\/x]/);
            if (parts[parts.length - 1].includes('.')) return;
        }

        // Append value to monitor
        if (!['C', '=', '<img>'].includes(btn.id)) {
            calculatorMonitor.textContent += val;
        }
    });
});
