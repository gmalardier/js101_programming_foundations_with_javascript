//Variables
let userInput = require('readline-sync');
let userStart;
let player1;
let player2;
let choicesLeft;
let winner;
const EMPTY_MARKER = ' ';
const MARKER_X = 'X';
const MARKER_O = 'O';
const MATCH_WIN = 5;
const COMPUTER_NAME = 'Watt';
const PLAYER_1 = { name: '', marker: '', gameWin: 0, matchWin: 0 };
const PLAYER_2 = { name: COMPUTER_NAME, marker: '', gameWin: 0, matchWin: 0 };
const GAME_SCORES = `${PLAYER_1.name}: ${PLAYER_1.gameWin}, ${PLAYER_2.name}: ${PLAYER_2.gameWin}`;

function prompt(msg) {
  return `=> ${msg}`;
}

function randomChoice(arr) {
  let choice = Math.floor(Math.random() * arr.length);
  return arr[choice];
}

// User input validtaions
function userInputValidation(choice, choices, errorMsg) {
  while (true) {
    choice = choice.trim();
    choice = choice.toLowerCase();
    if (choices.includes(choice)) {
      return choice;
    } else {
      choice = userInput.question(prompt(errorMsg));
    }
  }
}

function usersNameValidation(choice, errorMsg) {
  while (true) {
    choice = choice.trim();
    if (choice === '') {
      choice = userInput.question(prompt(errorMsg));
    } else {
      return choice;
    }
  }
}

// Users and Game setup
function whoIsPlaying() {
  console.log(prompt("Do you want to play against me or another ‘real’ person?"));
  console.log(prompt("Type 1 to play against me.\n=> Type 2 to play against a friend."));
  userChoice = userInput.question();
  userChoice = userInputValidation(userChoice, ['1', '2'], "Maybe I wasn't clear enough! The options are: '1' to play with me or '2' to play against a friend.\n");
  if (userChoice === '1') {
    console.clear();
    playWithComputer();
    whoStarts('computer');
  } else {
    console.clear();
    playWithFriend();
    whoStarts('friend');
  }
}

function playWithComputer() {
  console.log(prompt("Great choice, but you probably are going to lose! HAHA!!!\n"));
  console.log(prompt("Now choose your weapon!! 'X' or 'O'?"));
  PLAYER_1.marker = userInput.question();
  PLAYER_1.marker = userInputValidation(PLAYER_1.marker, ['x', 'o'], "That's not a correct choice! If you want to win, you need to be more focus!\nThe options are: 'X' or 'O'\n");
  if (PLAYER_1.marker === 'x') {
    PLAYER_1.marker = MARKER_X;
    PLAYER_2.marker = MARKER_O;
  } else {
    PLAYER_1.marker = MARKER_O;
    PLAYER_2.marker = MARKER_X;
  }
}

function playWithFriend() {
  console.log(prompt("Alright, at least you’ll have a chance to win…\n"));
  console.log(prompt("Hi friend! What is your name?"));
  PLAYER_2.name = userInput.question();
  PLAYER_2.name = usersNameValidation(PLAYER_2.name, "Hum, a name usually contains letters! Let's try again, what is your name?\n")

  console.log(prompt(`${PLAYER_1.name}, choose your weapon!! 'X' or 'O'?`));
  PLAYER_1.marker = userInput.question();
  PLAYER_1.marker = userInputValidation(PLAYER_1.marker, ['x', 'o'], "That's not a correct choice! If you want to win, you need to be more focus!\nThe options are: 'X' or 'O'\n");
  if (PLAYER_1.marker === 'x') {
    PLAYER_1.marker = MARKER_X;
    PLAYER_2.marker = MARKER_O;
  } else {
    PLAYER_1.marker = MARKER_O;
    PLAYER_2.marker = MARKER_X;
  }
}

function whoStarts(user) {
  if (user === 'computer') {
    console.log(prompt("Ok let’s go! Oh wait! Who’s starts?"));
    console.log(prompt("Options are: 1. You / 2. Me / 3. I can ask my random friend to make a choice for us! ;)"));
  } else {
    console.log(prompt(`${PLAYER_2.name}, you choose who starts.`));
    console.log(prompt(`Options are: 1. ${PLAYER_1.name} / 2. ${PLAYER_2.name} / 3. I can ask my random friend to make a choice for you! ;)`));
  }
  userStart = userInput.question();
  userStart = userInputValidation(userStart, ['1', '2', '3'], "That's not a correct choice! If you want to win, you need to be more focus!\nThe options are: '1', '2' or '3'\n");
  setPlayers();
}

function setPlayers() {
  if (userStart === '1') {
    player1 = PLAYER_1;
    player2 = PLAYER_2;
  } else if (userStart === '2') {
    player1 = PLAYER_2;
    player2 = PLAYER_1;
  } else {
    let start = randomChoice([1, 2]);
    if (start === 0) {
      player1 = PLAYER_1;
      player2 = PLAYER_2;
    } else {
      player1 = PLAYER_2;
      player2 = PLAYER_1;
    }
  }
}

// Setting board game
function boardChoice() {
  let choice = {};
  for (let square = 1; square <= 9; square += 1) {
    choice[String(square)] = String(square);
  }
  return choice;
};
let boardChoices = boardChoice(); //Will first display the grid with numbers for reference

function boardResult() {
  let board = {};
  for (let square = 1; square <= 9; square += 1) {
    board[String(square)] = EMPTY_MARKER;
  }
  return board;
};
let boardResults = boardResult();

function displayBoard(board) {
  console.clear();
  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}  `);
  console.log('     |     |');
  console.log('');
}

// list available spots left.
function allChoicesLeft(board) {
  choicesLeft = Object.keys(board).filter(key => board[key] === ' ');
  return choicesLeft;
}

function joinOr(arr, char = ', ', word = 'or') {
  switch (arr.length) {
    case 0:
      return '';
    case 1:
      return `${arr[0]}`;
    case 2:
      return arr.join(` ${word} `);
    default:
      return arr.slice(0, arr.length - 1).join(char) + `${char}${word} ` + arr.slice(arr.length - 1);
  }
}

// Player turns
let player1Choice;
function player1Turn() {
  if (player1.name === COMPUTER_NAME) {
    player1Choice = computerTurn(boardResults, player1Choice);
  } else {
    player1Choice = userInput.question(`Your turn ${player1.name}. Make your choice: ${joinOr(allChoicesLeft(boardResults))}: `);
    player1Choice = userInputValidation(player1Choice, allChoicesLeft(boardResults), "Sorry your input isn't valid, choose try again! ");
  }
  return player1Choice;
}

let player2Choice;
function player2Turn() {
  if (player2.name === COMPUTER_NAME) {
    player2Choice = computerTurn(boardResults, player2Choice);
  } else {
    player2Choice = userInput.question(`Your turn ${player2.name}. Make your choice: ${joinOr(allChoicesLeft(boardResults))}: `);
    player2Choice = userInputValidation(player2Choice, allChoicesLeft(boardResults), "Sorry your input isn't valid, choose try again! ");
  }
  return player2Choice;
}

// Winnig logic
let winningLines = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]             // diagonals
];

function detectWinner(board) {
  winner = '';
  for (let line = 0; line < winningLines.length; line++) {
    let [sq1, sq2, sq3] = winningLines[line];

    if (
      board[sq1] === player1.marker &&
      board[sq2] === player1.marker &&
      board[sq3] === player1.marker
    ) {
      return displayWinner('player1');
    } else if (
      board[sq1] === player2.marker &&
      board[sq2] === player2.marker &&
      board[sq3] === player2.marker
    ) {
      return displayWinner('player2');;
    }
  }

  return null;
}

// Computer Offense/Defence
function computerTurn(board, player) {
  for (let line = 0; line < winningLines.length; line++) {
    let [sq1, sq2, sq3] = winningLines[line];
    // Computer Offense
    if (
      board[sq1] === PLAYER_2.marker &&
      board[sq2] === PLAYER_2.marker &&
      board[sq3] === EMPTY_MARKER
    ) {
      return player = sq3;
    } else if (
      board[sq1] === PLAYER_2.marker &&
      board[sq2] === EMPTY_MARKER &&
      board[sq3] === PLAYER_2.marker
    ) {
      return player = sq2;
    } else if (
      board[sq1] === EMPTY_MARKER &&
      board[sq2] === PLAYER_2.marker &&
      board[sq3] === PLAYER_2.marker
    ) {
      return player = sq1;
      //Computer Defence
    } else if (
      board[sq1] === PLAYER_1.marker &&
      board[sq2] === PLAYER_1.marker &&
      board[sq3] === EMPTY_MARKER
    ) {
      return player = sq3;
    } else if (
      board[sq1] === PLAYER_1.marker &&
      board[sq2] === EMPTY_MARKER &&
      board[sq3] === PLAYER_1.marker
    ) {
      return player = sq2;
    } else if (
      board[sq1] === EMPTY_MARKER &&
      board[sq2] === PLAYER_1.marker &&
      board[sq3] === PLAYER_1.marker
    ) {
      return player = sq1;
    }
  }
  let is5Available = allChoicesLeft(boardResults);
  if (is5Available.includes('5')) {
    return player = '5';
  }
  player = randomChoice(allChoicesLeft(boardResults));
  return player;
}

function displayWinner(player) {
  if (player === 'player1') {
    player1.gameWin = player1.gameWin += 1;
    if (player2.name === COMPUTER_NAME) {
      return winner = "***** You win this round! *****";
    } else if (player1.name === COMPUTER_NAME) {
      return winner = "***** I win this round! *****";
    } else {
      return winner = `***** ${player1.name} wins this round! *****`;
    }
  } else if (player === 'player2') {
    player2.gameWin = player2.gameWin += 1;
    if (player2.name === COMPUTER_NAME) {
      return winner = "***** I win this round! *****";
    } if (player1.name === COMPUTER_NAME) {
      return winner = "***** You win this round! *****";
    } else {
      return winner = `***** ${player2.name} wins this round! *****`;
    }
  }
}

let tournamentWinner;
function matchWinner(num) {
  tournamentWinner = '';
  if (PLAYER_1.gameWin === num) {
    PLAYER_1.gameWin = PLAYER_1.gameWin += 1;
    tournamentWinner = PLAYER_1.name;
  } else if (PLAYER_2.gameWin === num) {
    PLAYER_2.gameWin = PLAYER_2.gameWin += 1;
    tournamentWinner = PLAYER_2.name;
  }
  return tournamentWinner;
}

function playerSwitch() {
  if (player1 === PLAYER_1) {
    player1 = PLAYER_2;
    player2 = PLAYER_1;
  } else {
    player1 = PLAYER_1;
    player2 = PLAYER_2;
  }
}

function reset() {
  PLAYER_1.gameWin = 0;
  PLAYER_2.gameWin = 0;
  boardResults = boardResult();
  displayBoard(boardChoices);
}

// Program starts
console.clear();
console.log(`*** Hi there!! Welcome the Tic Tac Toe tournament!! ***\n`);
PLAYER_1.name = userInput.question(prompt(`My name is ${PLAYER_2.name}, what is your name?\n`));
PLAYER_1.name = usersNameValidation(PLAYER_1.name, "Hum, a name usually contains letters! Let's try again, what is your name?\n")
console.clear();
console.log(prompt(`Nice to meet you ${PLAYER_1.name}. Let's get the game setup...\n`));

// Game setup
whoIsPlaying();
if (player1.name === COMPUTER_NAME) {
  console.log(prompt(`Alright! I'm the ${player1.marker}, ${player2.name} you're the ${player2.marker}`));
} else if (player2.name === COMPUTER_NAME) {
  console.log(prompt(`Alright! ${player1.name}, you're the ${player1.marker}, I'm the ${player2.marker}`));
} else {
  console.log(prompt(`Alright! ${player1.name}, you're the ${player1.marker}, ${player2.name} the ${player2.marker}`));
}
userInput.question(prompt(`First one to win 5 games wins the tournament. If you are ready to start, press 'enter'!`));
displayBoard(boardChoices);

//displayBoard(boardResults);
let playAgain = 'y';
while (true) {
  reset()

  // Single Game loop
  while (true) {
    boardResults = boardResult();
    displayBoard(boardChoices);

    // Single turn loop
    while (true) {
      player1Turn();
      boardResults[player1Choice] = player1.marker;
      displayBoard(boardResults)
      detectWinner(boardResults);
      if (winner) break;
      allChoicesLeft(boardResults)
      if (choicesLeft.length === 0) {
        displayBoard(boardResults)
        break;
      }

      player2Turn();
      boardResults[player2Choice] = player2.marker;
      displayBoard(boardResults);
      detectWinner(boardResults);
      if (winner) break;
    }
    
    if (winner) {
      console.log(winner);
    } else {
      console.log("It's a tie!!");
    }

    console.log(`Score: ${PLAYER_1.name}: ${PLAYER_1.gameWin} | ${PLAYER_2.name}: ${PLAYER_2.gameWin}\n`)
    matchWinner(MATCH_WIN);
    if (tournamentWinner) {
      break;
    }
    console.log(userInput.question(prompt("Press 'enter' to start the next round...")));
    playerSwitch();
  }

  console.log(`!!!! *** Congtatulation ${tournamentWinner} wins the tournament *** !!!!\n`.toUpperCase());
  console.log(prompt(`Would you like to play another tournament? y/n`));
  playAgain = userInput.question();
  playAgain = userInputValidation(playAgain, ['y', 'yes', 'n', 'no'], "Please type 'y' for Yes, Or 'n' for:\n");
  if (playAgain === 'n') break;
}

console.log('\n ** Thanks for playing! ** \n')