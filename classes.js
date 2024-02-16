class Player {
constructor(name) {
this.name = name;
this.visas = 0;
}
   
earnVisas(amount) {
this.visas += amount;
}
}

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

module.exports = { Player, Zone, Puzzle };
