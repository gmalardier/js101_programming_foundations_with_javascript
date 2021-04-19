const USER_INPUT = require('readline-sync');

let playerOneChoice;
let playerTwoChoice;
let winner;
let playerOneCounter = 0;
let playerTwoCounter = 0;
let totalRound = 1;

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
const LIZARD = 'lizard';
const SPOCK = 'spock';
const CHOICES = [ROCK, PAPER, SCISSORS, LIZARD, SPOCK];
const CHOICES_DEFINITION = ['r = rock', 'p = paper', 'sc = scissors', 'l = lizard', 'sp = spock'];

function prompt(number, msg) {
  return `Player ${number}: ${msg}`;
}

function shortenChoices(short) {
  if (short === 'r') {
    short = ROCK;
  } else if (short === 'p') {
    short = PAPER;
  } else if (short === 'sc') {
    short = SCISSORS;
  } else if (short === 'l') {
    short = LIZARD;
  } else if (short === 'sp') {
    short = SPOCK;
  }
  return short;
}

function playerChoiceValidation(choice) {
  while (!CHOICES.includes(choice)) {
    choice = USER_INPUT.question('!!! Your input is invalid. please try again: ').toLowerCase();
    choice = shortenChoices(choice);
  }
  return choice;
}

function playerValidation(choice) {
  while (!['1', '2'].includes(choice)) {
    choice = USER_INPUT.question("!!! Your input is invalid. Please type '1' to play with me, or '2' to play with a freind: ");
  }
  return choice;
}

function isPlayAgainValid(choice) {
  while (!['yes', 'no', 'y', 'n'].includes(choice)) {
    choice = USER_INPUT.question("!!! Your input is invalid. Please type 'yes' to play again, or 'no' to exit: ");
  }
  return choice;
}

let computerTurn = () => {
  let computerChoice = Math.floor(Math.random() * CHOICES.length);
  computerChoice = CHOICES[computerChoice];
  return computerChoice;
};

// If play with computer
let computerPlay = () => {
  console.log(`*** Round ${totalRound} ***`);
  console.log(`Make your choice: ${CHOICES_DEFINITION.join(', ')}?\n`);

  playerOneChoice = USER_INPUT.question(prompt('ONE', '')).toLowerCase();
  playerOneChoice = shortenChoices(playerOneChoice);
  playerOneChoice = playerChoiceValidation(playerOneChoice);

  playerTwoChoice = computerTurn();
  console.clear();
};

//if play with another person
let friendPlay = () => {
  console.log(`*** Round ${totalRound} ***`);
  console.log(`Make your choice: ${CHOICES_DEFINITION.join(', ')}?\n`);

  playerOneChoice = USER_INPUT.question(prompt('ONE', '')).toLowerCase();
  playerOneChoice = shortenChoices(playerOneChoice);
  playerOneChoice = playerChoiceValidation(playerOneChoice);
  console.clear();

  playerTwoChoice = USER_INPUT.question(prompt('TWO', '')).toLowerCase();
  playerTwoChoice = shortenChoices(playerTwoChoice);
  playerTwoChoice = playerChoiceValidation(playerTwoChoice);
  console.clear();
};

// Logic
function gameLogic() {
  if ((playerOneChoice === ROCK &&
    (playerTwoChoice === SCISSORS || playerTwoChoice === LIZARD)) ||
    (playerOneChoice === PAPER &&
      (playerTwoChoice === ROCK || playerTwoChoice === SPOCK)) ||
    (playerOneChoice === SCISSORS &&
      (playerTwoChoice === PAPER || playerTwoChoice === LIZARD)) ||
    (playerOneChoice === LIZARD &&
      (playerTwoChoice === SPOCK || playerTwoChoice === PAPER)) ||
    (playerOneChoice === SPOCK &&
      (playerTwoChoice === SCISSORS || playerTwoChoice === ROCK))) {
    playerOneCounter += 1;
    winner = `Player ONE played "${playerOneChoice}" and Player TWO played "${playerTwoChoice}"\n*** PLAYER ONE WINS THIS ROUND! ***\n`;
  } else if (playerOneChoice === playerTwoChoice) {
    winner = `Player ONE played "${playerOneChoice}" and Player TWO played "${playerTwoChoice}"\n*** IT'S A TIE! ***\n`;
  } else {
    playerTwoCounter += 1;
    winner = `Player ONE played "${playerOneChoice}" and Player TWO played "${playerTwoChoice}"\n*** PLAYER TWO WINS THIS ROUND! ***\n`;
  }
}

//GAME START
//Welcome
console.clear();
console.log(`Welcome to the ${CHOICES.join(', ')} game.\n`);

let playAgain = 'yes';

while (playAgain === 'yes' || playAgain === 'y') {
  totalRound = 1;
  playerOneCounter = 0;
  playerTwoCounter = 0;

  let whoIsPlayerTwo = USER_INPUT.question("Would you like to play against me or a friend? 1)ME 2)FRIEND: ");
  playerValidation(whoIsPlayerTwo);
  console.clear();

  while ((playerOneCounter < 5) || (playerTwoCounter < 5)) {
    console.clear();
    if (whoIsPlayerTwo === '1') {
      if (totalRound === 1) {
        console.log("Alright, I'll be Player TWO! First one to 5 wins! let starts!\n\n");
      }
      computerPlay();
      gameLogic();
    } else {
      if (totalRound === 1) {
        console.log("Alright, First one to 5 wins! let starts!\n\n");
      }
      friendPlay();
      gameLogic();
    }

    console.log(winner);

    if (playerOneCounter === 5) {
      console.log(`!!! *** PLAYER ONE WINS THE GAME ${playerOneCounter} to ${playerTwoCounter} *** !!!`);
      break;
    } else if (playerTwoCounter === 5) {
      console.log(`!!! *** PLAYER TWO WINS THE GAME ${playerTwoCounter} to ${playerOneCounter} *** !!!`);
      break;
    }

    console.log(`Score: Player ONE: ${playerOneCounter}, Player TWO: ${playerTwoCounter}\n`);
    totalRound += 1;

    //Stop the game until user press enter
    let nextRound = USER_INPUT.question("Press 'enter' to start next round...");
    if (nextRound) {
      continue;
    }
  }

  playAgain = isPlayAgainValid(USER_INPUT.question('\nWould you like to play again? 1)Yes 2)No: ').toLowerCase());
  console.clear();
}
