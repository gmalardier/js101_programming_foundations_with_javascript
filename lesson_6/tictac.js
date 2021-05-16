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

let board = {
  1: ' ',
  2: ' ',
  3: ' ',
  4: ' ',
  5: ' ',
  6: ' ',
  7: ' ',
  8: ' ',
  9: ' '};

function displayBoard() {
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

displayBoard();




