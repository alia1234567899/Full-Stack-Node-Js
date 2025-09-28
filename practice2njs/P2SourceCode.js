const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let cards = [
  { id: 1, suit: 'Hearts', value: 'Ace' },
  { id: 2, suit: 'Spades', value: 'King' },
  { id: 3, suit: 'Diamonds', value: 'Queen' }
];

function showMenu() {
  console.log(`\nPlaying Cards Collection (Terminal API Simulation)`);
  console.log(`1. GET /cards (List all cards)`);
  console.log(`2. GET /cards/:id (Get card by ID)`);
  console.log(`3. POST /cards (Add a new card)`);
  console.log(`4. DELETE /cards/:id (Delete card by ID)`);
  console.log(`5. Exit`);
  rl.question("Enter your choice: ", handleMenu);
}

function handleMenu(choice) {
  switch (choice.trim()) {
    case '1':
      console.log("\n== GET /cards Response ==");
      console.log(JSON.stringify(cards, null, 2));
      showMenu();
      break;

    case '2':
      rl.question("Enter Card ID: ", (id) => {
        const card = cards.find(c => c.id === parseInt(id));
        if (card) {
          console.log("\n== GET /cards/" + id + " Response ==");
          console.log(JSON.stringify(card, null, 2));
        } else {
          console.log(`Card with ID ${id} not found.`);
        }
        showMenu();
      });
      break;

    case '3':
      rl.question("Enter suit: ", (suit) => {
        rl.question("Enter value: ", (value) => {
          const newCard = { id: cards.length + 1, suit, value };
          cards.push(newCard);
          console.log("\n== POST /cards Response (201 Created) ==");
          console.log(JSON.stringify(newCard, null, 2));
          showMenu();
        });
      });
      break;

    case '4':
      rl.question("Enter Card ID to delete: ", (id) => {
        const index = cards.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
          const removed = cards.splice(index, 1)[0];
          console.log("\n== DELETE /cards/" + id + " Response ==");
          console.log({
            message: `Card with ID ${id} removed`,
            removed
          });
        } else {
          console.log(`Card with ID ${id} not found.`);
        }
        showMenu();
      });
      break;

    case '5':
      console.log("Exiting...");
      rl.close();
      break;

    default:
      console.log("Invalid choice. Try again.");
      showMenu();
  }
}

// Start simulation
showMenu();
