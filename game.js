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
var Letter = require("./letter.js");
var letterIn;
var theLetter;
//var displayArray;
//var strung;
var length;
var preoutput;
var output;
var guessesLeft = 9;
var wrongLetters = [];
var winCount = 0;
var lossCount = 0;
var gameCount = 0;
//var title;
var target;
var inTarget = false;
var letterInTitle;
var position;
var lettersArray = [];
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

// Check if the letter is in the target.

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
    // console.log(target.title);
    // console.log(target.strung);
    // console.log(target.length);
    // console.log(target.numSpaces);
    // console.log(target.numLetters);
    // console.log(target.displayArray);
    // console.log(preoutput);

    // Build an object for each letter in the target
    for (var j = 0; j < target.output.length; j++) {
        var wordLetter = new Letter(wordLetter);
        wordLetter.letterInTitle = target.output(j);
        console.log(wordLetter.letterInTitle);
        wordLetter.position = (j);
        console.log(wordLetter.position);
        wordLetter.push(lettersArray);
    } // End of build objects for letters

    console.log(output);
    console.log("Your target has " + target.numLetters + " letters and " + target.numSpaces + " spaces.");
    getLetter();
} // End of startGame 

// Get a guess from the user.
function getLetter() {
    inquirer.prompt([{
        type: "input",
        message: "Try a letter.",
        name: "letterIn"
    }]).then(function(inquirerResponse) {
        theLetter = inquirerResponse.letterIn.toUpperCase();
        console.log(theLetter);
        checkInTarget();
    }); // End of .then
} // End of function getLetter

function checkInTarget() {
    for (var i = 0; i < target.length; i++) {
        // console.log(target.title[i]);
        if (theLetter == target.title[i]) {
            inTarget = true;
            break;
        } // End of if - letter in target
    } // End of for - all letters in target checked to see if letter is in target
    // console.log(inTarget);
    if (inTarget === false) {
        guessesLeft--;
        // If no guesses left, increment game counter and loss counter, display messages, ask = Play Again?
        if (guessesLeft === 0) {
            gameCount++;
            lossCount++;
            console.log("Sorry, " + theLetter + " is not in there.\nThat was nine wrong letters = a loss for you.");
            console.log("Your standings:\n" + winCount + " Wins\n" + lossCount + " Losses");
            // Play again?
            return;
        }
        // If letter not in target but guesses remain, add letterIn to wrongLetters,
        // display message, display wrongLetters, show the current target status, get another letter.
        else {
            wrongLetters.push(theLetter);
            console.log("Sorry - " + theLetter + " is not in there.\nYou have " + guessesLeft + " wrong tries left.\nWrong tries so far:");
            console.log(wrongLetters);
            console.log(output);
            getLetter();
        }
    }
    else {
        // inTarget is true, check locations and  replace blanks.
        // Display a message - good letter, guesses left and display wrong list.
        console.log("Good choice! You have " + guessesLeft + " wrong tries left.\nYou have tried: ");
        console.log(wrongLetters);
        // update the output, and show the line.
    } // End of else
} // End of function checkInTarget

//LOGIC
startGame();
