const readline = require('readline');

const { Zone, Puzzle, Player } = require('./classes');
const { displayZoneIntro, choosePuzzle } = require('./functions');

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

rl.question("Enter your name: ", (name) => {
console.log(`Welcome, ${name}! Let's start the game.`);

let count = 3;
const countdownInterval = setInterval(() => { 
console.log(`${count}...`);
count--;
if (count < 0) {
clearInterval(countdownInterval);
startGame(name);
}
}, 1000);
});

function startGame(name) {
const player = new Player(name);

const zone1 = new Zone(" Zone 1 - Down the Rabbit Hole");
zone1.addPuzzle(new Puzzle(
"Riddle Me This!",
"What is so fragile that saying its name breaks it??",
"Silence"
));

zone1.addPuzzle(new Puzzle(
"Code Breaker",
"Decrypt this word: nadnolrwde ", 
"Wonderland"
));

const zone2 = new Zone(" Zone 2 - Madhatters's Casino");
zone2.addPuzzle(new Puzzle(
"Word Jumble",
"Unscramble the letters: tartyhatter",
"Tea party hat"
));

zone2.addPuzzle(new Puzzle(
"Number Sequence",
"You notice a strange pattern on the roulette wheel. The numbers are arranged in the following sequence: 16, 06, 68, 88, ?. What number should replace the question mark?",
"98"
));

const zone3 = new Zone(" Zone 3 - Maze of Illusions");
zone3.addPuzzle(new Puzzle(
"Riddle Me This!",
"What is something you can keep after giving it to someone else",
"A promise"
));
zone3.addPuzzle(new Puzzle(
"Decrypt this phrase",
"teh azme tixe dnif",
"Find the maze exit."
));

const zone4 = new Zone("Zone 4 - Temple of Wisdom");
zone4.addPuzzle(new Puzzle(
"What a Riddle",
"What comes once in a minute, twice in a moment, but never in a thousand years?",
"The letter M"
));

zone4.addPuzzle(new Puzzle(
"Color Puzzle",
"What color is formed by mixing blue and yellow?",
"green"
 ));

const zone5 = new Zone("Zone 5 - It's the Grand Finale");
zone5.addPuzzle(new Puzzle(
"Final Challenge",
"I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
"An echo"
));

zone1.nextZone = zone2;
zone2.nextZone = zone3;
zone3.nextZone = zone4;
zone4.nextZone = zone5;

displayZoneIntro(zone1);
choosePuzzle(player, zone1);
}

module.exports = { startGame };
