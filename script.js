const themeSlider = document.getElementById('theme-slider');
const body = document.body;
themeSlider.addEventListener('input', () => {
  const theme = `theme${themeSlider.value}`;
  body.className = theme;
});
const display = document.getElementById('calc-display');
const buttons = document.querySelectorAll('.buttons button');

let currentValue = '0';
let operator = '';
let previousValue = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value) || value === '.') {
      if (currentValue === '0') {
        currentValue = value;
      } else {
        currentValue += value;
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      operator = value;
      previousValue = currentValue;
      currentValue = '';
    } else if (value === '=') {
      if (operator && previousValue) {
        currentValue = eval(`${previousValue} ${operator} ${currentValue}`);
        operator = '';
        previousValue = '';
      }
    } else if (value === 'DEL') {
      currentValue = currentValue.slice(0, -1) || '0';
    } else if (value === 'RESET') {
      currentValue = '0';
      operator = '';
      previousValue = '';
    }

    display.value = currentValue;
  });
});
