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
var prompt = require("prompt");
var Target = require("./word.js");
var Letter = require("./letter.js");
var chosenLetter;
var letterInTitle;
var theLetter;
var preoutput;
var checkArray = [];
var precheck;
var toCheck;
var output;
var guessesLeft = 9;
var winCount = 0;
var lossCount = 0;
var gameCount = 0;
var target;
var inTarget = false;
var wordLetter;
var lettersUsed = [];
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

// Start of game
function startGame() {
    // Provide a message to the user.
    console.log("It's Showtime!" + "\nHere comes a word target - enter letters to see if you can guess it.\nYou get up to nine wrong letters.");
    //Get a target
    var targetTitle = targetsArray[gameCount];
    target = new Target(targetTitle);
    // Make up an output of blanks and spaces matching the target.
    target.filler();
    preoutput = target.displayArray.slice(1, (target.length - 1));
    output = preoutput.join("  ");
    // Make an array to use to check for a succesful outcome later.
    function checkfiller() {
        for (var i = 0; i < target.length; i++) {
            if (target.strung[i] != "-") {
                checkArray.push(target.strung[i]);
            }
            else {
                checkArray.push(" ");
            }
        } // End of for
    } // End of checkfiller function
    checkfiller();
    precheck = checkArray.slice(1, (target.length - 1));
    toCheck = precheck.join("  ");
    // Build an object for each letter in the target
    for (var j = 1; j < target.strung.length - 1; j++) {
        wordLetter = new Letter(letterInTitle);
        wordLetter.letterInTitle = target.strung[j];
        // console.log(wordLetter.letterInTitle);
        wordLetter.position = (j - 1);
        // console.log(wordLetter.position);
        lettersArray.push(wordLetter);
    } // End of build objects for letters
    console.log(output);
    console.log("Your target has " + target.numLetters + " letters and " + target.numSpaces + " spaces.");
    getLetter();
} // End of startGame 

// Provide a function to check for a repeated letter entry.
// function noRepeat() {
    //     for (var q = 0; q < lettersUsed.length; q++) {
    //         console.log("Hi");
    //         if (theLetter === lettersUsed[q]) {
    //             console.log("You have used that letter already. Please choose another.");
    //             getLetter();
    //         }
    //     }
    //     lettersUsed.push(theLetter);
    // } // End of no repeat.

// Get a guess from the user.
function getLetter() {
    prompt.start();
    var result;
    prompt.get(['chosenLetter'], function(err, result) {
        if (err) { return console.log(err); }
        console.log('You chose ' + result.chosenLetter);
    });
    // theLetter = result.chosenLetter.toUppercase;
    console.log("You chose " + chosenLetter);
    checkInTarget();
} // End of function getLetter

function checkInTarget() {
    noRepeat();
    for (var i = 0; i < target.length; i++) {
        //console.log(target.title[i]);
        //If the letter is in the target, break out and go find where it fits.
        if (theLetter == target.title[i]) {
            inTarget = true;
            break;
        } // End of if - letter in target
    } // End of for - all letters in target have been checked to see if letter is in target.
    if (inTarget === false) {
        guessesLeft--;
        // If no guesses left, increment game counter and loss counter,
        // reset the guessesLeft and lettersUsed, display messages, ask = Play Again?
        if (guessesLeft === 0) {
            gameCount++;
            lossCount++;
            guessesLeft = 9;
            lettersUsed.empty;
            console.log("Sorry, " + theLetter + " is not in there.\nThat was nine wrong letters - a loss for you.");
            console.log("Your standings:\n" + winCount + " Wins\n" + lossCount + " Losses");
            // Play again?
            playMore();
        } // End of if guesses left is zero
        // If letter not in target but guesses remain, add letterIn to wrongLetters,
        // display message, display wrongLetters, show the current target status, get another letter.
        else {
            console.log("Sorry - " + theLetter + " is not in there.\nYou have " + guessesLeft + " wrong tries left.\nWrong tries so far:");
            console.log(lettersUsed);
            console.log(output);
            getLetter();
        } // End of else
    } // End of if inTarget is false
    else {
        // inTarget is true, check locations and  replace blanks.
        // Reset inTarget to false for next letter test.
        inTarget = false;
        // console.log(lettersArray.length);
        for (var k = 0; k < lettersArray.length; k++) {
            if (theLetter == target.title[k]) {
                preoutput.splice(k, 1, theLetter);
                output = preoutput.join("  ");
            } // End of if
        } // End of for
        // Check if target is complete
        // var toCheck1 = JSON.stringify(target.title);
        // console.log(toCheck1);
        // var toCheck2 = toCheck1.slice(1, (toCheck1.length - 1));
        // console.log(toCheck2);
        // var toCheck = toCheck2.join("  ");
        // console.log(toCheck);
        // console.log(output);
        if (output == toCheck) {
            // Increment the win count and game count.
            winCount++;
            gameCount++;
            // Reset lettersUsed and guessesLegt.
            lettersUsed.empty;
            guessesLeft = 9;
            // Display a message - you won, wins and losses.
            console.log("YOU GOT IT! That is a win for you!");
            console.log("Your standings:\n" + winCount + " Wins\n" + lossCount + " Losses");
            // Ask - Play Again?
            playMore();
        } // End of if target matched true
        // Letter was in target, but target not yet complete
        // Display a message - good letter, guesses left and display wrong list.
        console.log("Good choice! You have " + guessesLeft + " wrong tries left.\nYou have tried: ");
        console.log(lettersUsed);
        console.log(output);
        getLetter();
    } // End of else
} // End of function checkInTarget

function playMore() {
    inquirer.prompt([{
        type: "confirm",
        name: "play",
        message: "HANGMAN! Play another game?\n(Enter n to exit, hit 'enter' to continue.",
        default: "y"
    }]).then(function(answer) {
        if (answer.play === false) {
            console.log("So long!");
            return;
        }
        else {
            getLetter();
        }
    }); // End of .then
} // End of function playMore

//LOGIC
startGame();
