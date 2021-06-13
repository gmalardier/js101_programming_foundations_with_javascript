//Variables
let userInput = require('readline-sync');
let userOneChoice;
let computerChoice;
let choicesLeft;
let userSymbol = 'X';
let computerSymbol = 'O';
let winner;

// Board choices
function resetBoardChoice() {
  let boardChoice = {};
    for (let square = 1; square <= 9; square += 1) {
      boardChoice[String(square)] = String(square);
    }
    return boardChoice;
};

let boardChoice = resetBoardChoice();
function displayBoardChoice() {
  console.clear();

  console.log('');
  console.log('     |     |');
  console.log(`  ${boardChoice['1']}  |  ${boardChoice['2']}  |  ${boardChoice['3']}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${boardChoice['4']}  |  ${boardChoice['5']}  |  ${boardChoice['6']}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${boardChoice['7']}  |  ${boardChoice['8']}  |  ${boardChoice['9']}  `);
  console.log('     |     |');
  console.log('');
  console.log(`You are ${userSymbol}. Computer is ${computerSymbol}`);
}

function resetBoardResult() {
  let boardResult = {};
    for (let square = 1; square <= 9; square += 1) {
      boardResult[String(square)] = ' ';
    }
    winner = '';
    return boardResult;
};

let boardResult = resetBoardResult();

function displayBoardResult() {
  console.clear();

  console.log('');
  console.log('     |     |');
  console.log(`  ${boardResult['1']}  |  ${boardResult['2']}  |  ${boardResult['3']}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${boardResult['4']}  |  ${boardResult['5']}  |  ${boardResult['6']}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${boardResult['7']}  |  ${boardResult['8']}  |  ${boardResult['9']}  `);
  console.log('     |     |');
  console.log('');
}

// list available spots left.
function allChoicesLeft() {
  choicesLeft = Object.values(boardChoice).filter(num => {
  num = Number(num);
  if (typeof(Number(num)) === 'number') {
    return num;
  }
})
}
// Validate user input

function joinOr(arr, char = ', ', word = 'or') {
  switch (arr.length) {
    case 0:
      return '';
    case 1:
      return `${arr[0]}`;
    case 2:
      return arr.join(` ${word} `);
    default:
      return arr.slice(0, arr.length -1).join(char) + `${char}${word} ` + arr.slice(arr.length -1); 
}
}

function askForChoice(str = `Your turn. Make your choice: ${joinOr(choicesLeft)}: `) {
  allChoicesLeft();
  userOneChoice = userInput.question(str);
  if (choicesLeft.includes(userOneChoice)) {
    return userOneChoice;
  } else {
    askForChoice("Sorry your input isn't valid, choose try again! ");
  }
}
// Computer make choice.
function cChoice() {
  allChoicesLeft()
  computerChoice = choicesLeft[Math.floor(Math.floor(Math.random() * choicesLeft.length))];
    return computerChoice;
}

// Winning logic
function winningChoice(symbol) {
  let WIN_CHOICES = {
    1: [boardResult['1'], boardResult['2'], boardResult['3']],
    2: [boardResult['4'], boardResult['5'], boardResult['6']],
    3: [boardResult['7'], boardResult['8'], boardResult['9']],
    4: [boardResult['1'], boardResult['4'], boardResult['7']],
    5: [boardResult['2'], boardResult['5'], boardResult['8']],
    6: [boardResult['3'], boardResult['6'], boardResult['9']],
    7: [boardResult['1'], boardResult['5'], boardResult['9']],
    8: [boardResult['3'], boardResult['5'], boardResult['7']],
  }
  for (let prop in WIN_CHOICES) {
    if (WIN_CHOICES[prop].every(str => str === symbol)) {
      if (symbol === 'X') {
        return winner = "***** You Won! *****";
      } else {
        return winner = "***** I won! *****";
      }
    }
  }
}

function playAgainChoice(choice) {
  while (!['yes', 'no', 'y', 'n'].includes(choice)) {
    choice = userInput.question('Please type "Yes" or "No": ');
  }
  if (['no', 'n'].includes(choice)) {
    playAgain = false;
  }
}

// Show board with numbers available
console.clear();
console.log(`Welcome to the Tic Tac Toe game.\n`);
let playAgain = true;

console.log(boardChoice);

//Main Loop
while (playAgain) {
  displayBoardChoice();
  allChoicesLeft();

  //Loop for players turns
  while (choicesLeft.length > 0) {
    //Ask user to make their choice
    askForChoice();

    // Update Board with user choice
    boardResult[userOneChoice] = userSymbol;
    boardChoice[userOneChoice] = userSymbol;
    
    winningChoice(userSymbol);
    if (winner) break;
    displayBoardResult();

    // Update board with computer choice:
    cChoice();
    boardResult[computerChoice] = computerSymbol;
    boardChoice[computerChoice] = computerSymbol;
    winningChoice(computerSymbol);
    if (winner) break;
    displayBoardResult();
}

// Result
displayBoardResult();
if (winner) {
  console.log(winner);
} else {
  console.log("It's a tie!!");
}

playAgainChoice(userInput.question("\nYou'll you like to play again? Yes/No: ").toLowerCase());
boardChoice = resetBoardChoice()
boardResult = resetBoardResult();

}

console.log('\n ** Thanks for playing! **\n')