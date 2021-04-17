const USER_IMPUT = require('readline-sync');
const MSG = require('./loan_calculator.json');

// -- Variables
let loanAmount;
let interestRate;
let loanTermInMonth;
let loanTermInYear;
let monthlyPayment;
let totalPayment;
let totalInterest;

// -- Functions
function prompt(msg) {
  return `=> ${msg}`;
}
function invalidNumber(num) {
  return num.trimStart() === '' || Number(num) <= 0 || Number.isNaN(Number(num));
}
// remove commas and other symboles in case user enter $20,000 or 5%, etc
function clean(num) {
  return num.replace(/[ ,$%]/g, "");
}
// Calculate and Print Results
function displayPayments() {
  let monthlyInterestRate = ((interestRate / 100) / 12);
  // Calculate Monthly payment
  monthlyPayment = loanAmount *
            (monthlyInterestRate /
            (1 - Math.pow((1 + monthlyInterestRate), (-loanTermInMonth))));

  totalPayment = (monthlyPayment * loanTermInMonth).toFixed(2);
  totalInterest = (totalPayment - loanAmount).toFixed(2);

  console.log(MSG.MONTHLY_PAYMENT + monthlyPayment.toFixed(2));
  console.log(MSG.TOTAL_OF + loanTermInMonth + MSG.PAYMENTS + totalPayment);
  console.log(MSG.TOTAL_INTEREST + totalInterest + "\n");
}

// New Loan Calculation
let calculateAgain = 'y';
function newCalaculation() {
  calculateAgain = USER_IMPUT.question(prompt(MSG.NEW_CALCULATION));
  calculateAgain = calculateAgain.toLowerCase();
  while (!['y', 'Y', 'n', 'N'].includes(calculateAgain)) {
    calculateAgain = USER_IMPUT.question(prompt(MSG.NEW_CALCULATION_WARN));
    calculateAgain = calculateAgain.toLowerCase();
  }
  console.clear();
}
// START HERE
//Welcome message
console.clear();
console.log(prompt(MSG.WELCOME));

while (calculateAgain === 'y') {
  // Variables
  loanAmount = clean(USER_IMPUT.question(prompt(MSG.LOAN_AMOUNT)));
  while (invalidNumber(loanAmount)) {
    loanAmount = clean(USER_IMPUT.question(prompt(MSG.LOAN_AMOUNT_WARN)));
  }
  loanAmount = Number(loanAmount);

  interestRate = clean(USER_IMPUT.question(prompt(MSG.INTEREST_RATE)));
  while (invalidNumber(interestRate)) {
    interestRate = clean(USER_IMPUT.question(prompt(MSG.INTEREST_RATE_WARN)));
  }
  interestRate = Number(interestRate);

  let monthOrYear = USER_IMPUT.question(prompt(MSG.MONTHS_OR_YEAR));
  while (!['1', '2'].includes(monthOrYear)) {
    monthOrYear = USER_IMPUT.question(prompt(MSG.MONTHS_OR_YEAR_WARN));
  }

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

  // Printing Results
  displayPayments();
  // Start a New Calculation
  newCalaculation();
}