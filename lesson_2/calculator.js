let userInput = require('readline-sync');
// Welcome user
console.log('Welcome to the calculator!');
// Ask for a number
let number1 = Number(userInput.question('Enter a first number: '));
// Ask for another number
let number2 = Number(userInput.question('Enter a second number: '));
// Ask for the type of caculation
let operator = userInput.question('What operation would you like to do?\n1) Add\n2) Subtract\n3) Multiply\n4) Divide\n');
// Do the math
let result;

if (operator === '1') {
  result = number1 + number2;
} else if (operator === '2') {
  result = number1 - number2;
} else if (operator === '3') {
  result = number1 * number2;
} else if (operator === '4') {
  result = number1 / number2;
} else {
  console.log('The information you input is incorrect. Please try again.');
}

// Display the result
console.log(`The result is ${result}.`);



