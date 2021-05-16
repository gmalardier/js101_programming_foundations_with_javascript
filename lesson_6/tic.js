// 1. Display the empty gride
// 2. Ask user to mark a square
// 3. Computer marks  square
// 4. Display the updated board
// 5. If it's a winning board, dispaly the winner
// 6. if the board is full, display tie
// 7. If neither player won, and the board is not full, go to #2
// 8. Play again?
// 9. If yes, go to #1
// 10. Goodbye!

// Board choice
let boardChoice = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9'
};

function displayBoardChoice() {
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
}

// --------------------------------------------
// Board result
let boardResult = {
  1: ' ',
  2: ' ',
  3: ' ',
  4: ' ',
  5: ' ',
  6: ' ',
  7: ' ',
  8: ' ',
  9: ' '
};

function displayBoardResult() {
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


//Variables
let userInput = require('readline-sync');
let userOneChoice;
let computerChoice;
let choicesLeft;
let userSymbol = 'X';
let computerSymbol = 'O';

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
function askForChoice(str = `Your turn. Make your choice: `) {
  userOneChoice = userInput.question(str);
  allChoicesLeft()
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
let winner;
const WIN_CHOICES = {
  1: [boardResult['1'], boardResult['2'], boardResult['3']],
  2: [boardResult['4'], boardResult['5'], boardResult['6']],
  3: [boardResult['7'], boardResult['8'], boardResult['9']],
  4: [boardResult['1'], boardResult['4'], boardResult['7']],
  5: [boardResult['2'], boardResult['5'], boardResult['8']],
  6: [boardResult['3'], boardResult['6'], boardResult['9']],
  7: [boardResult['1'], boardResult['5'], boardResult['9']],
  8: [boardResult['3'], boardResult['5'], boardResult['7']],
}

function winningChoice(symbol) {
  
  for (let prop in WIN_CHOICES) {
    //Value are not past here
    console.log(WIN_CHOICES[prop])
    console.log(WIN_CHOICES[prop].every(str => str === symbol))
    if (WIN_CHOICES[prop].every(str => str === symbol)) {
      if (symbol === 'X') {
        return "You Won!"
      } else {
        return "I won!"
      }
    }
  }
}





// Show board with numbers available
displayBoardChoice();

allChoicesLeft();


//Loop for players turns
while (choicesLeft.length >= 1) {

  //Ask user to make their choice
  askForChoice();

  // Update Board with user choice
  boardResult[userOneChoice] = userSymbol;
  boardChoice[userOneChoice] = userSymbol;
  winningChoice(userSymbol);

  // Update boar with computer choice:
  //computerChoice()
  cChoice();
  boardResult[computerChoice] = computerSymbol;
  boardChoice[computerChoice] = computerSymbol;
  winningChoice(computerSymbol);

  displayBoardResult();
}

// Result

console.log("It's a tie!!");