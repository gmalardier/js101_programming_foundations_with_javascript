const USER_IMPUT = require('readline-sync');

const MSG = require('./loan_calculator.json');

function prompt(msg) {
  return `=> ${msg}`;
}

// remove commas and other symboles in case user enter $20,000 or 5%, etc
function clean(num) {
  return num.replace(/[ ,$%]/g, "");
}

function invalidNumber(num) {
  return num.trimStart() === '' || Number(num) < 0 || Number.isNaN(Number(num));
}

let calculateAgain = 'y';

//Welcome message
console.log(prompt(MSG.WELCOME));

while (calculateAgain === 'y' || calculateAgain === 'Y') {
  // Variables
  let loanAmount = clean(USER_IMPUT.question(prompt(MSG.LOAN_AMOUNT)));
  while (invalidNumber(loanAmount)) {
    loanAmount = clean(USER_IMPUT.question(prompt(MSG.LOAN_AMOUNT_WARN)));
  }
  loanAmount = Number(loanAmount);

  let interestRate = clean(USER_IMPUT.question(prompt(MSG.INTEREST_RATE)));
  while (invalidNumber(interestRate)) {
    interestRate = clean(USER_IMPUT.question(prompt(MSG.INTEREST_RATE_WARN)));
  }
  if (interestRate === '0') {
    interestRate = clean(USER_IMPUT.question(prompt(MSG.INTEREST_RATE_WARN_0)));
  }
  interestRate = Number(interestRate);

  let monthOrYear = USER_IMPUT.question(prompt(MSG.MONTHS_OR_YEAR));
  while (!['1', '2'].includes(monthOrYear)) {
    monthOrYear = USER_IMPUT.question(prompt(MSG.MONTHS_OR_YEAR_WARN));
  }
  let loanTermInYear;
  let loanTermInMonth;

  if (monthOrYear === '1') {
    loanTermInMonth = USER_IMPUT.question(prompt(MSG.MOUTHS_LOAN_TERM));
    while (invalidNumber(loanTermInMonth)) {
      loanTermInMonth = USER_IMPUT.question(prompt(MSG.MOUTHS_LOAN_TERM_WARN));
    }
    loanTermInMonth = Number(loanTermInMonth);
  } else if (monthOrYear === '2') {
    loanTermInYear = USER_IMPUT.question(prompt(MSG.YEAR_LOAN_TERM));
    while (invalidNumber(loanTermInYear)) {
      loanTermInYear = USER_IMPUT.question(prompt(MSG.YEAR_LOAN_TERM_WARN));
    }
    loanTermInMonth = Number(loanTermInYear) * 12;

  }

  let monthlyInterestRate = ((interestRate / 100) / 12);

  // Calculate Monthly payment
  let monthlyPayment = loanAmount *
            (monthlyInterestRate /
            (1 - Math.pow((1 + monthlyInterestRate), (-loanTermInMonth))));

  // Results
  monthlyPayment = (monthlyPayment).toFixed(2);
  let totalPayment = (monthlyPayment * loanTermInMonth).toFixed(2);
  let totalInterest = (totalPayment - loanAmount).toFixed(2);

  // Printing Results
  console.log(MSG.MONTHLY_PAYMENT + monthlyPayment);
  console.log(MSG.TOTAL_OF + loanTermInMonth + MSG.PAYMENTS + totalPayment);
  console.log(MSG.TOTAL_INTEREST + totalInterest + "\n");

  calculateAgain = USER_IMPUT.question(prompt(MSG.NEW_CALCULATION));
  while (!['y', 'Y', 'n', 'N'].includes(calculateAgain)) {
    calculateAgain = USER_IMPUT.question(prompt(MSG.NEW_CALCULATION_WARN));
  }
}