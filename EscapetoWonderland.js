const readline = require('readline');

class Zone {
    constructor(name, nextZone = null) {
        this.name = name;
        this.puzzles = [];
        this.nextZone = nextZone;
    }

    addPuzzle(puzzle) {
        this.puzzles.push(puzzle);
    }
}

class Puzzle {
    constructor(description, question, solution) {
        this.description = description;
        this.question = question;
        this.solution = solution;
    }

    solve(playerInput) {
        return playerInput.toLowerCase() === this.solution.toLowerCase();
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.visas = 0;
    }

    earnVisas(amount) {
        this.visas += amount;
    }
}


function displayPuzzleIntro(puzzle) {
    console.log(puzzle.description);
    console.log(puzzle.question);
}


function displayZoneIntro(zone) {
    console.log(`Welcome to ${zone.name}!`);
    console.log("Choose a puzzle to solve:");
    zone.puzzles.forEach((puzzle, index) => {
        console.log(`${index + 1}. ${puzzle.description}`);
    });
}


function solvePuzzle(player, zone, choice, timeout) {
    const puzzleIndex = parseInt(choice) - 1;
    const puzzle = zone.puzzles[puzzleIndex];

    if (!puzzle) {
        console.log("Invalid choice. Please enter a valid puzzle number.");
        return;
    }

    displayPuzzleIntro(puzzle);

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

    rl.question("Enter your answer: ", (playerInput) => {
        clearTimeout(timer);
        answered = true;
        rl.close();

        if (!playerInput) {
            console.log("No answer provided. Please enter your answer.");
            return;
        }

        if (puzzle.solve(playerInput)) {
            player.earnVisas(1);
            console.log("Congratulations! You earned one visa. four more to go!" );

            if (player.visas === 1) {
                console.log("You've earned enough visas to proceed to the next zone.");
                
                if (zone.nextZone) {
                    displayZoneIntro(zone.nextZone);
                    choosePuzzle(player, zone.nextZone);
                } else {
                    console.log("Congratulations! You've completed the game.");
                   
                }
            }
        } else {
            console.log("Sorry, that's not correct. Try again.");
          
            setTimeout(() => {
                displayZoneIntro(zone);
                choosePuzzle(player, zone);
            }, 10000);
        }
    });
}


function choosePuzzle(player, zone) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter your choice: ", (choice) => {
        if (!choice || isNaN(parseInt(choice)) || parseInt(choice) <= 0 || parseInt(choice) > zone.puzzles.length) {
            console.log("Please enter a valid puzzle number.");
            choosePuzzle(player, zone);
            return;
        }
        solvePuzzle(player, zone, choice, 20000);
    });
}


const zone1 = new Zone("Survival District");
const zone2 = new Zone("Casino of Fate");
const zone3 = new Zone("Maze of Illusions");
const zone4 = new Zone("Temple of Wisdom");
const zone5 = new Zone("It's the Grand Finale");

zone1.addPuzzle(new Puzzle(
    "Riddle Me This",
    "What has a head, a tail, but no body?",
    "coin"
));
zone1.addPuzzle(new Puzzle(
    "Math Challenge",
    "What is the result of 5 * 5?",
    "25"
));

zone2.addPuzzle(new Puzzle(
    "Code Breaker",
    "Decode this word: cafe",
    "face"
));
zone2.addPuzzle(new Puzzle(
    "Dice Roll",
    "What is the sum of numbers when two six-sided dice are rolled?",
    "7"
));
zone3.addPuzzle(new Puzzle(
    "Mirror Puzzle",
    "What is always in front of you but can't be seen?",
    "future"
));
zone3.addPuzzle(new Puzzle(
    "Word Jumble",
    "Rearrange the letters: stressed (Hint: It's something you eat)",
    "desserts"
));
zone4.addPuzzle(new Puzzle(
    "Ancient Riddle",
    "What has keys but can't open locks?",
    "piano"
));
zone4.addPuzzle(new Puzzle(
    "Color Puzzle",
    "What color is formed by mixing blue and yellow?",
    "green"
));
zone5.addPuzzle(new Puzzle(
    "Final Challenge",
    "Solve the final challenge to complete the game.",
    "victory"
));

zone1.nextZone = zone2; 
zone2.nextZone = zone3; 
zone3.nextZone = zone4; 
zone4.nextZone = zone5; 


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your name: ", (playerName) => {
    if (!playerName) {
        console.log("Invalid name. Please enter a valid name.");
        rl.close();
        return;
    }

    const player1 = new Player(playerName);

 
    displayZoneIntro(zone1);

    
    choosePuzzle(player1, zone1);
});
