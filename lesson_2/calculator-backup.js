const userInput = require('readline-sync');

function prompt(msg) {
  console.log(`=> ${msg}`);
}
function invalidNumber(num) {
  return num.trimStart() === '' || Number.isNaN(Number(num));
}

let newCalculation = 'y';

// Welcome user
prompt('Welcome to the calculator!');

// Loop
while (newCalculation === 'y') {

  // Ask for a number
  let number1 = userInput.question(prompt('Enter a first number: '));
  while (invalidNumber(number1)) {
    number1 = userInput.question(prompt('Hummm... that doesn\'t look like a valid number!\n Please enter a number: '));
  }
  // Ask for another number
  let number2 = userInput.question(prompt('Enter a second number: '));
  while (invalidNumber(number2)) {
    number2 = userInput.question(prompt('Hummm... that doesn\'t look like a valid number!\n Please re-enter the second number: '));
  }
  // Ask for the type of caculation
  let operator = userInput.question(prompt('What operation would you like to do?\n1) Add 2) Subtract 3) Multiply 4) Divide'));
  while (!['1', '2', '3', '4'].includes(operator)) {
    operator = userInput.question(prompt('Your input isn\'t valid! Please choose one of the following:\n1) Add 2) Subtract 3) Multiply 4) Divide'));
  }

  // Do the math
  let result;

  switch (operator) {
    case '1':
      result = Number(number1) + Number(number2);
      break;
    case '2':
      result = Number(number1) - Number(number2);
      break;
    case '3':
      result = Number(number1) * Number(number2);
      break;
    case '4':
      result = Number(number1) / Number(number2);
      break;
    default:
      console.log('The information you input is incorrect. Please try again.');
  }

  // Display the result
  console.log(`The result is ${result}.`);
  newCalculation = userInput.question(prompt('Would you like to make anoter calculation? (y/n)'));
  while (!['y', 'n'].includes(newCalculation)) {
    newCalculation = userInput.question(prompt('Your input isn\'t valid! Would you like to make another calculation? (y/n)'));
  }
}

