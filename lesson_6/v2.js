//Variables
let userInput = require('readline-sync');
let userStart;
const MARKER_X = 'X';
const MARKER_O = 'O';
let player1;
let player2;
let emptyMarker = ' ';
let choicesLeft;
let winner;
const MATCH_WIN = 5;
const COMPUTER_NAME = 'Watt';
//Temporary username variables. Used to setup the game.
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
  PLAYER_1.marker = userInputValidation(PLAYER_1.marker, ['x', 'o'], "That's not a correct choice! If you me, you need to be more focus!\nThe options are: 'X' or 'O'\n");
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
  PLAYER_1.marker = userInputValidation(PLAYER_1.marker, ['x', 'o'], "That's not a correct choice! If you me, you need to be more focus!\nThe options are: 'X' or 'O'\n");
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
    console.log(prompt(`Options are: 1. ${PLAYER_1.name} / 2. ${PLAYER_2.name} / 3. I can ask my random friend to make a choice for us! ;)`));
  }
  userStart = userInput.question();
  userStart = userInputValidation(userStart, ['1', '2', '3'], "That's not a correct choice! If you want to win, you need to be more focus!\nThe options are: '1', '2' or '3'\n");
  setPlayers()
    ;
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
let boardChoices = boardChoice();

function boardResult() {
  let board = {};

  for (let square = 1; square <= 9; square += 1) {
    board[String(square)] = ' ';
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
      return arr.slice(0, arr.length - 1).join(char) + `${char}${word} ` + arr.slice(arr.length - 1);
  }
}
let player1Choice; 
function player1Turn() {
  if (player1.name === COMPUTER_NAME) {
    player1Choice = randomChoice(allChoicesLeft(boardResults));
  } else {
    player1Choice = userInput.question(`Your turn ${player1.name}. Make your choice: ${joinOr(allChoicesLeft(boardResults))}: `);
    player1Choice = userInputValidation(player1Choice, allChoicesLeft(boardResults), "Sorry your input isn't valid, choose try again! ");
  }
  return player1Choice;
}

let player2Choice;
// Computer make choice.
function player2Turn() {
  if (player2.name === COMPUTER_NAME) {
    player2Choice = randomChoice(allChoicesLeft(boardResults));
  } else {
    player2Choice = userInput.question(`Your turn ${player2.name}. Make your choice: ${joinOr(allChoicesLeft(boardResults))}: `);
    player2Choice = userInputValidation(player2Choice, allChoicesLeft(boardResults), "Sorry your input isn't valid, choose try again! ");
  }
  
  return player2Choice;
}

// Winnig logic
function winningChoice() {
  winner = '';
  let WIN_CHOICES = {
    1: [boardResults['1'], boardResults['2'], boardResults['3']],
    2: [boardResults['4'], boardResults['5'], boardResults['6']],
    3: [boardResults['7'], boardResults['8'], boardResults['9']],
    4: [boardResults['1'], boardResults['4'], boardResults['7']],
    5: [boardResults['2'], boardResults['5'], boardResults['8']],
    6: [boardResults['3'], boardResults['6'], boardResults['9']],
    7: [boardResults['1'], boardResults['5'], boardResults['9']],
    8: [boardResults['3'], boardResults['5'], boardResults['7']],
  }
  for (let prop in WIN_CHOICES) {
    if (WIN_CHOICES[prop].every(str => str === player1.marker)) {
      return displayWinner('player1');
    } else if (WIN_CHOICES[prop].every(str => str === player2.marker)) {
      return displayWinner('player2');
    }
  }
}

// Winner logic
function displayWinner(player) {
  if (player === 'player1') {
    player1.gameWin = player1.gameWin += 1;
    if (PLAYER_2.name === COMPUTER_NAME) {
      return winner = "***** You win this round! *****";
    } else {
      return winner = `***** ${player1.name} wins this round! *****`;
    }
  } else if (player === 'player2') {
    player2.gameWin = player2.gameWin += 1;
    if (PLAYER_2.name === COMPUTER_NAME) {
      return winner = "***** I win this round! *****";
    } else {
      return winner = `***** ${player2.name} wins this round! *****`;
    }
  }}

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

// Program start
console.clear();
console.log(`*** Hi there!! Welcome the Tic Tac Toe tournament!! ***\n`);
PLAYER_1.name = userInput.question(prompt(`My name is ${PLAYER_2.name}, what is your name?\n`));
PLAYER_1.name = usersNameValidation(PLAYER_1.name, "Hum, a name usually contains letters! Let's try again, what is your name?\n")
console.clear();
console.log(prompt(`Nice to meet you ${PLAYER_1.name}. Let get the game setup...\n`));

// Game setup
whoIsPlaying();
console.log(prompt(`Alright! ${player1.name}, you're the ${player1.marker}, ${player2.name} the ${player2.marker}`));
userInput.question(prompt(`First one to win 5 games wins the tournament. If you are ready to start, press a key!`));
displayBoard(boardChoices);

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

      winningChoice();
      if (winner) break;
      allChoicesLeft(boardResults)
      if (choicesLeft.length === 0) {
        displayBoard(boardResults)
        break;
      }

      player2Turn();
      boardResults[player2Choice] = player2.marker;

      displayBoard(boardResults);
      winningChoice();
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
  console.log(prompt(`Would you like to play anoter tournament? y/n`));
  playAgain = userInput.question().toLocaleLowerCase();
  if (playAgain !== 'y') break;
}

console.log('\n ** Thanks for playing! ** \n')