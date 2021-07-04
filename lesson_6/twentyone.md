// Twenty-One game.

1. Deck of 52 Card divide 4 4 suits (Hearts, Diamonds, Clubs, and Spades) and 13 value (2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace).
2. Goald it for player to get as close as the value 21 without passig it.
3. If player pass 21, they are 'Bust' and loose the game.
4. 2 player per game. player and dealer.
5. Both starts with 2 cards. player can see only one of the dealer card.
6. Cards Value: 2 to 10 = own vaue, Jack, Queen, King = 10, Ace 1 or 11.
7. Player always go first.
8. Play choices are 'Hit' or 'Stay'. 'Hit' for another card as many time as needed.
9. If player 'stay', dealer's turn. dealer must hit if total card value is < 17.
10. When both stay, compare total card value for each.
11. Winner is the closest to 21.
12. if both have same value, it's a tie.

// Pseudo code

1. Set default Variables:
  - 
  - player
  - dealer
  - playerCards = []
  - playerCardValue
  - dealerCards = []
  - dealerCardValue
  - roundWinner
  - DeckOfCards = {}
  - CardsValue = {}

2. function shuffleCards

3. function dealCards => two card each.
4. Show first dealer card to player.
5. function calculateCarValues()
6. function playerChoice = ['hit', 'stay'];
  - if hit => function getOneCard
  - calculate value
  - if value < 21 => function playerChoice();
  - if value > 21 = function loose.
7. function dealerTturn = ['hit', 'stay'];
  - if value < 17 => function GetOneCard.
  - calculate value.
  - if value > 17 => functn stay();
  - if value > 21 = function loose.

  8. function calculateCardsValue();
  9. function displayWinner();
  10. function playAgain();