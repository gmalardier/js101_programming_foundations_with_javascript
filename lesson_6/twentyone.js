let userInput = require('readline-sync');

const MAX_VALUE = 21;
const TOURNAMENT_WIN = 5;

let cardsValues = {
  Ace: [1, 11],
  Jack: 10,
  Queen: 10,
  King: 10,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10
};
const CARDS_SUITS = ['Heart', 'Diamond', 'Club', 'Spade'];

let playerCards = ['', ''];
let playerCardsTotal = 0;
let playerTotalWin = 0;

let dealerCards = ['', ''];
let dealerCardsTotal = 0;
let dealerTotalWin = 0;

let gameWinner;
let tournamentWinner;


function userInputValidation(choice, choices, errorMsg) {
  while (true) {
    choice = choice.trim();
    choice = choice.toLowerCase();
    if (choices.includes(choice)) {
      return choice;
    } else {
      choice = userInput.question(errorMsg);
    }
  }
}

let cardList = [];
function cards(arr, obj) {
  for (let suit = 0; suit < arr.length; suit++) {
    for (let key in obj) {
      cardList.push([arr[suit], key]);
    }
  }
  return cardList;
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
  return array;
}

// function dealCards => two card each.
function dealCards() {
  playerCards[0] = cardList.pop();
  dealerCards[0] = cardList.pop();
  playerCards[1] = cardList.pop();
  dealerCards[1] = cardList.pop();
}

// function calculateCardsTotal()
function calculateCardsTotal(cards) {
  let values = cards.map(card => card[1]);
  let sum = 0;
  values.forEach(value => {
    if (value === "Ace") {
      sum += 11;
    } else if (['Jack', 'Queen', 'King'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });
  // correct for Aces
  values.filter(value => value === "A").forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

// if HIT => function getOneCard
function getOneCard(userCards, user, clearScreen) {
  if (clearScreen === 'clear') {
    console.clear();
  }
  let card = cardList.slice(-1);
  if (user === 'player') {
    console.log(`You got the ${card[0][1]} of ${card[0][0]}`);
  } else {
    console.log(`I got the ${card[0][1]} of ${card[0][0]}`);
  }
  userCards.push(cardList.pop());
}

function gameResult() {
  let result = console.log(`RESULTS: Player: ${playerCardsTotal} | Dealer: ${dealerCardsTotal}\n`);
  return result;
}
function displayWinner() {
  let winner;
  if (playerCardsTotal > dealerCardsTotal && playerCardsTotal <= MAX_VALUE) {
    winner = console.log(`YOU WIN!!\n`);
    playerTotalWin += 1;
    gameResult();
  } else if (dealerCardsTotal > playerCardsTotal &&
    dealerCardsTotal <= MAX_VALUE) {
    winner = console.log(`I WIN!!\n`);
    dealerTotalWin += 1;
    gameResult();
  } else if (playerCardsTotal === dealerCardsTotal) {
    winner = console.log(`IT'S A TIE!!\n`);
    gameResult();
  }
  return winner;
}

function tournamentResult() {
  let tournamentResult = console.log(`TOURNAMENT RESULTS: Player: ${playerTotalWin} | Dealer: ${dealerTotalWin}\n`);
  return tournamentResult;
}
function tournamentWin() {
  tournamentWinner = '';
  if (playerTotalWin === TOURNAMENT_WIN) {
    tournamentWinner = 'YOU';
  } else if (dealerTotalWin === TOURNAMENT_WIN) {
    tournamentWinner = 'I';
  }
  return tournamentWinner;
}

function resetGame() {
  playerCards = ['', ''];
  playerCardsTotal = 0;

  dealerCards = ['', ''];
  dealerCardsTotal = 0;

  gameWinner = '';
  cardList = cards(CARDS_SUITS, cardsValues);
  cardList = shuffle(cardList);
  dealCards();
}

//Game play
console.clear();
console.log("Welcome to Twenty-One!\n");
console.log(`First one to five wins the game!`);
userInput.question("Press 'enter' when you are ready to start.");
//Main Game loop
while (true) {
  resetGame();
  //Set cards
  //Show player cards and first dealer card.
  console.clear();
  console.log(`You have the ${playerCards[0][1]} of ${playerCards[0][0]} and the ${playerCards[1][1]} of ${playerCards[1][0]}`);
  console.log(`One of my card is the ${dealerCards[0][1]} of ${dealerCards[0][0]}`);
  playerCardsTotal = calculateCardsTotal(playerCards);
  console.log(`\nYour total points is ${playerCardsTotal}\n`);

  //Player turn: Hit or Stay
  while (true) {
    let playerMove = userInput.question(`Would you like to HIT or STAY?\n1: HIT\n2: STAY\n`);
    playerMove = userInputValidation(playerMove, ['1', '2'], "That's not a correct choice!!\n1: HIT\n2: STAY\n");
    if (playerMove === '2') {
      break;
    }
    getOneCard(playerCards, 'player', 'clear');
    playerCardsTotal = calculateCardsTotal(playerCards);
    if (playerCardsTotal > MAX_VALUE) {
      gameWinner = 'dealer';
      dealerTotalWin += 1;
      break;
    }
    console.log(`\nYour total points is ${playerCardsTotal}\n`);
  }

  if (gameWinner === 'dealer') {
    console.log(`\n!!! BUST !!! You lost!\n`);
  } else {
    //Dealer Turn
    console.clear();
    console.log(`I have the ${dealerCards[0][1]} of ${dealerCards[0][0]} and the ${dealerCards[1][1]} of ${dealerCards[1][0]}`);
    dealerCardsTotal = calculateCardsTotal(dealerCards);
    console.log(`My total points is ${dealerCardsTotal}\n`);

    while (true) {
      if (dealerCardsTotal > playerCardsTotal ||
        (dealerCardsTotal >= 16 && dealerCardsTotal === playerCardsTotal)) {
        break;
      } else {
        getOneCard(dealerCards);
        dealerCardsTotal = calculateCardsTotal(dealerCards);
        console.log(`\nMy total points is ${dealerCardsTotal}\n`);
      }
      if (dealerCardsTotal > MAX_VALUE) {
        console.log(`\n!!! BUST !!! I lost!\n`);
        playerTotalWin += 1;
        break;
      }
    }
  }

  displayWinner();
  tournamentResult();
  tournamentWinner = tournamentWin();
  if (tournamentWinner) {
    console.log(`*** ${tournamentWinner} WON THE TOURNAMENT! ***\n`);
    let playAgain = userInput.question("Would you like to play again? Yes/No: \n");
    playAgain = userInputValidation(playAgain, ['yes', 'y', 'no', 'n'], "Please type 'Y' for yes or 'N' for no");
    if (playAgain === 'no' || playAgain === 'n') {
      break;
    }
    dealerTotalWin = 0;
    playerTotalWin = 0;
  }
  userInput.question("Press 'enter' to start the next round.");
}
console.log("\n**** Thanks for Playing! ***\n");