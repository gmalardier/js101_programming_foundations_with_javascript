const USER_INPUT = require('readline-sync');

let playerOneChoice;
let playerTwoChoice;
let winner;
let playerOneScore = 0;
let playerTwoScore = 0;
let totalRound = 1;

const WINNING_SCORE = 5;
const CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const CHOICES_DEFINITION = {r: 'rock', p: 'paper', sc: 'scissors', l: 'lizard', sp: 'spock'};

function prompt(number, msg) {
  return `Player ${number}: ${msg}`;
}

function shortenChoices(short) {
  return CHOICES_DEFINITION[short];
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
    choice = USER_INPUT.question("!!! Your input is invalid. Please type 'yes' to play again, or 'no' to exit: ").toLowerCase();
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
  console.log(`Make your choice: ${Object.values(CHOICES_DEFINITION).join(', ')}?\n`);

  playerOneChoice = USER_INPUT.question(prompt('ONE', '')).toLowerCase();
  playerOneChoice = shortenChoices(playerOneChoice);
  playerOneChoice = playerChoiceValidation(playerOneChoice);

  playerTwoChoice = computerTurn();
  console.clear();
};

//if play with another person
let friendPlay = () => {
  console.log(`*** Round ${totalRound} ***`);
  console.log(`Make your choice: ${Object.values(CHOICES_DEFINITION).join(', ')}?\n`);

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
const WINNING_CHOICES = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock']
};

function gameLogic() {
  if (WINNING_CHOICES[playerOneChoice].includes(playerTwoChoice)) {
    playerOneScore += 1;
    winner = `Player ONE played "${playerOneChoice}" and Player TWO played "${playerTwoChoice}"\n*** PLAYER ONE WINS THIS ROUND! ***\n`;
  } else if (playerOneChoice === playerTwoChoice) {
    winner = `Player ONE played "${playerOneChoice}" and Player TWO played "${playerTwoChoice}"\n*** IT'S A TIE! ***\n`;
  } else {
    playerTwoScore += 1;
    winner = `Player ONE played "${playerOneChoice}" and Player TWO played "${playerTwoChoice}"\n*** PLAYER TWO WINS THIS ROUND! ***\n`;
  }
}

//GAME START
//Welcome
console.clear();
console.log(`Welcome to the ${CHOICES.join(', ')} game.\n`);

let playAgain = true;

while (playAgain) {
  totalRound = 1;
  playerOneScore = 0;
  playerTwoScore = 0;

  let whoIsPlayerTwo = USER_INPUT.question("Would you like to play against me or a friend? 1)ME 2)FRIEND: ");
  playerValidation(whoIsPlayerTwo);
  console.clear();

  while ((playerOneScore < WINNING_SCORE) || (playerTwoScore < WINNING_SCORE)) {
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

    if (playerOneScore === WINNING_SCORE) {
      console.log(`!!! *** PLAYER ONE WINS THE GAME ${playerOneScore} to ${playerTwoScore} *** !!!`);
      break;
    } else if (playerTwoScore === WINNING_SCORE) {
      console.log(`!!! *** PLAYER TWO WINS THE GAME ${playerTwoScore} to ${playerOneScore} *** !!!`);
      break;
    }

    console.log(`Score: Player ONE: ${playerOneScore}, Player TWO: ${playerTwoScore}\n`);
    totalRound += 1;

    //Stop the game until user press enter
    console.log(USER_INPUT.question("Press 'enter' to start next round..."));
  }

  playAgain = isPlayAgainValid(USER_INPUT.question('\nWould you like to play again? 1)Yes 2)No: ').toLowerCase());
  console.clear();
}