let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(op) {
    // Prevent multiple operators in a row
    if (expression === '' || /[+\-*/.]\s*$/.test(expression)) {
        return;
    }
    expression += op;
    updateDisplay();
}

function updateDisplay() {
    display.value = expression;
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        if (expression === '') {
            return;
        }
        
        // Replace × with * and − with - for calculation
        let evaluateExpression = expression
            .replace(/×/g, '*')
            .replace(/−/g, '-')
            .replace(/,/g, '.');
        
        // Evaluate the expression
        let result = Function('"use strict"; return (' + evaluateExpression + ')')();
        
        // Round to avoid floating point errors
        result = Math.round(result * 100000000) / 100000000;
        
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === '.') {
        appendOperator('.');
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});
