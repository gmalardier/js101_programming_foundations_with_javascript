const USER_INPUT = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');
const LANGUAGE = 'fr';

function prompt(msg) {
  console.log(`=> ${msg}`);
}
function invalidNumber(num) {
  return num.trimStart() === '' || Number.isNaN(Number(num));
}

function  calculator(message, lang = 'en') {
  return MESSAGES[lang][message];
}

let newCalculation = 'y';

// Welcome user
prompt(calculator('welcome', LANGUAGE));

// Loop
while (newCalculation === 'y') {

  // Ask for a number
  let number1 = USER_INPUT.question(prompt(calculator('firstNumber', LANGUAGE)));
  while (invalidNumber(number1)) {
    number1 = USER_INPUT.question(prompt(calculator('firstNumberInvalid', LANGUAGE)));
  }
  // Ask for another number
  let number2 = USER_INPUT.question(prompt(calculator('secondNumber', LANGUAGE)));
  while (invalidNumber(number2)) {
    number2 = USER_INPUT.question(prompt(calculator('secondNumberinvalid', LANGUAGE)));
  }
  // Ask for the type of caculation
  let operator = USER_INPUT.question(prompt(calculator('operatorQuestion', LANGUAGE)));
  while (!['1', '2', '3', '4'].includes(operator)) {
    operator = USER_INPUT.question(prompt(calculator('operatorQuestionInvalid', LANGUAGE)));
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
  }

  // Display the result
  console.log(calculator('resultStart') + result + calculator('resultEnd'));
  newCalculation = USER_INPUT.question(prompt(calculator('newCalculationQuestion', LANGUAGE)));
  while (!['y', 'n'].includes(newCalculation)) {
    newCalculation = USER_INPUT.question(prompt(calculator('newCalculationQuestionInvalid', LANGUAGE)));
  }
}

