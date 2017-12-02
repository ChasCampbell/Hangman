/*
Create a list of words to use as puzzles. Save in an array.
Step through the list - a random selection could make for repitition.
At the start, display a message and give a hint about the topic.
Provide an object to hold the selected word.
Show a series of blanks in place of the letters of the word to guess.
Keep count of wins and losses.
Allow the user 9 unsuccesful tries with letters. List them out.
If the limit of 9 is reached, display a message and ask "Play Again?"
Remember to reset the counters, clear the list of unsuccessful letters.
*/
// VARIABLES
// Dependency for inquirer npm package
var inquirer = require("inquirer");
var Target = require("./word.js");
var Letter = require("./letter.js")
//var displayArray;
//var strung;
//var length;
var preoutput;
var output;
var guessesLeft = 9;
var wrongLetters = [];
var winCount = 0;
var lossCount = 0;
var gameCount = 0;
//var title;
var target;
var inTitle = true;
//var letterCount;
var targetsArray = [
    "OKLAHOMA",
    "WICKED",
    "MY-FAIR-LADY",
    "ALLADIN",
    "CHICAGO",
    "THE-LION-KING",
    "HAMILTON",
    "THE-BOOK-OF-MORMON",
    "THE-WIZ",
    "THE-PHANTOM-OF-THE-OPERA"
];


//FUNCTIONS
// Start of game
function startGame() {

    // Provide a message to the user.
    console.log("It's Showtime!" + "\nHere comes a word target - enter letters to see if you can guess it.\nYou get up to nine wrong letters.");
    //Get a target
    target = targetsArray[gameCount];
    target = new Target(target);
    // Make up an output of blanks and spaces matching the target.
    target.filler();
    preoutput = target.displayArray.slice(1, (target.length - 1));
    output = preoutput.join("  ");
    console.log(target.title);
    console.log(target.strung);
    console.log(target.length);
    console.log(target.displayArray);
    console.log(preoutput);
    console.log(output);
    // Get a guess from the user.
    inquirer.prompt([{
        type: "input",
        name: "letter",
        message: "Try a letter."
    }]).then(function(letter) {
        console.log(letter);
        // Check if the letter is in the target.
        for (var i = 0; i < target.length; i++) {
            if (letter !== target[i]) {
                // If not, add 1 to the loss count, add the letter to the wrong list, subtract 1 from the guesses left, and provide a message.
                inTitle = false;
                lossCount++
                letter.push(wrongLetters);
                guessesLeft--;
                // Go again?

                if (guessesLeft === 0) {
                    console.log(letter + " is not in there.\nThat was nine wrong letters = a loss for you.");
                    console.log("Your standings:\n" + winCount + " Wins\n" + lossCount + " Losses");
                } // End of if - guesses

            } // End of if - letter not in target
            else {
                // If letter is in target, check locations, replace blanks, message - good letter, display no wring, list, new display of target.
                console.log("Good choice! You have " + guessesLeft + ".\nYou have tried ")
            } // End of else after if - letter not in target. 
        } // End of for
    }); // End of .then
    gameCount++;
} // End of startGame




//LOGIC
startGame();


//
