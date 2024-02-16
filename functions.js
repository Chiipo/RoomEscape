const readline = require('readline');

const displayPuzzleIntro = (puzzle) => {
console.log(puzzle.description);
console.log(puzzle.question);
};

const displayZoneIntro = (zone) => {
console.log(`Welcome to ${zone.name}!`);
console.log("Choose a puzzle to solve:");
zone.puzzles.forEach((puzzle, index) => {
console.log(`${index + 1}. ${puzzle.description}`);
 });
};

const solvePuzzle = (player, zone, choice, timeout) => {
const puzzleIndex = parseInt(choice) - 1;
const puzzle = zone.puzzles[puzzleIndex];

if (!puzzle) {
console.log("Invalid choice. Please enter a valid puzzle number.");
return;
}

displayPuzzleIntro(puzzle);
const solutionLetters = puzzle.solution.split('');
let displayedLetters = [];

for (let i = 0; i < solutionLetters.length; i++) {
displayedLetters.push('_');
}

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
let answered = false;

const timer = setTimeout(() => {
if (!answered) {
console.log("Time's up! You failed to answer within the time limit.");
rl.close();
return;
}
}, timeout);

console.log("Enter your answer: " + displayedLetters.join(' '));

rl.on('line', (playerInput) => {

if (playerInput.length === 1) {
let correctGuess = false;
for (let i = 0; i < solutionLetters.length; i++) {

if (playerInput.toLowerCase() === solutionLetters[i].toLowerCase()) {
displayedLetters[i] = solutionLetters[i];
correctGuess = true;
}
}

console.log("Enter your answer: " + displayedLetters.join(' '));
if (displayedLetters.join('') === puzzle.solution.toLowerCase()) {
clearTimeout(timer);
answered = true;

rl.close();
player.earnVisas(1);
console.log("Congratulations! You earned one visa. You now have " + player.visas + " visa. " + (5 - player.visas) + " more to go!");

if (zone.puzzles.length === 1 || puzzleIndex === zone.puzzles.length - 1) {
console.log("You've completed all puzzles in this zone!");
if (zone.nextZone) {
console.log("Moving to the next zone...");
displayZoneIntro(zone.nextZone);
 choosePuzzle(player, zone.nextZone);
} else {

console.log("Congratulations! You've completed the game.");
}
}

} else if (!correctGuess) {
console.log("Sorry, that letter is not in the solution. Try again.");
}

} else {
console.log("Please enter only one letter at a time.");
}
});

rl.on('close', () => {
if (!answered) {
console.log("No answer provided. Please enter your answer.");
}
});
};

const choosePuzzle = (player, zone) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout

}); 
rl.question("Enter your choice: ", (choice) => {
if (!choice || isNaN(parseInt(choice)) || parseInt(choice) <= 0 || parseInt(choice) > zone.puzzles.length) {
console.log("Please enter a valid puzzle number.");
displayZoneIntro(zone);
choosePuzzle(player, zone);
}
solvePuzzle(player, zone, choice, 20000);
});
};

module.exports = { displayPuzzleIntro, displayZoneIntro, solvePuzzle, choosePuzzle };
