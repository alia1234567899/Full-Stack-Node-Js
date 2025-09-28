const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Seat states
let seats = {};
for (let i = 1; i <= 10; i++) {
  seats[`S${i}`] = { status: "available", lockedBy: null, timer: null };
}

// Show menu
function showMenu() {
  console.log("\n Ticket Booking System");
  console.log("1. Show Available Seats");
  console.log("2. Lock a Seat");
  console.log("3. Confirm Booking");
  console.log("4. Exit");
  rl.question("Enter your choice: ", handleMenu);
}

// Handle menu
function handleMenu(choice) {
  switch (choice.trim()) {
    case "1":
      showSeats();
      break;
    case "2":
      rl.question("Enter Seat ID to lock (e.g., S1): ", lockSeat);
      return;
    case "3":
      rl.question("Enter Seat ID to confirm (e.g., S1): ", confirmSeat);
      return;
    case "4":
      console.log("Goodbye ");
      rl.close();
      return;
    default:
      console.log(" Invalid choice!");
  }
  showMenu();
}

// Show all seats
function showSeats() {
  console.log("\nSeats Status:");
  for (let id in seats) {
    console.log(`${id}: ${seats[id].status}`);
  }
  showMenu();
}

// Lock a seat
function lockSeat(seatId) {
  seatId = seatId.toUpperCase();
  if (!seats[seatId]) {
    console.log(" Invalid seat ID!");
  } else if (seats[seatId].status !== "available") {
    console.log(` Seat ${seatId} is already ${seats[seatId].status}`);
  } else {
    seats[seatId].status = "locked";
    seats[seatId].lockedBy = "user"; // simple simulation
    console.log(` Seat ${seatId} locked for 60 seconds!`);

    // Auto unlock after 60 sec
    seats[seatId].timer = setTimeout(() => {
      if (seats[seatId].status === "locked") {
        seats[seatId].status = "available";
        seats[seatId].lockedBy = null;
        console.log(`⏳ Seat ${seatId} lock expired.`);
      }
    }, 60000);
  }
  showMenu();
}

// Confirm booking
function confirmSeat(seatId) {
  seatId = seatId.toUpperCase();
  if (!seats[seatId]) {
    console.log(" Invalid seat ID!");
  } else if (seats[seatId].status !== "locked") {
    console.log(`Cannot confirm seat ${seatId}. Current status: ${seats[seatId].status}`);
  } else {
    seats[seatId].status = "booked";
    clearTimeout(seats[seatId].timer);
    seats[seatId].timer = null;
    console.log(` Seat ${seatId} successfully booked!`);
  }
  showMenu();
}

// Start app
showMenu();

