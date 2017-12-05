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
var letterInTitle;
var theLetter;
var preoutput;
var strungArray = [];
var spacesCount = 0;
var letterCount = 0;
var output;
var matches = 0;
var guessesLeft = 9;
var winCount = 0;
var lossCount = 0;
var gameCount = 0;
var target;
var tlength;
var inTarget = false;
var wordLetter;
var lettersUsed = [];
var lettersArray = [];
var displayArray = [];
var targetsArray = [
    "THE+WIZ",
    "OKLAHOMA",
    "WICKED",
    "MY+FAIR+LADY",
    "ALLADIN",
    "CHICAGO",
    "THE+LION+KING",
    "HAMILTON",
    "THE+BOOK+OF+MORMON",
    "THE+PHANTOM+OF+THE+OPERA"
];


//FUNCTIONS
function clearNewOutput() {
    for (var f = 0; f < lettersArray.length; f++) {
        strungArray.push("_");
    }
}

// Start of game
function startGame() {
    //Initialize match count
    matches = 0;
    // Provide a message to the user.
    console.log("It's Showtime!" + "\nHere comes a word target - enter letters to see if you can guess it.\nYou get up to nine wrong letters.");
    //Get a target
    var targetTitle = targetsArray[gameCount]; //
    target = new Target(targetTitle);
    // Make up an output of blanks and spaces matching the target.
    tlength = targetTitle.length;
    preoutput = target.strung.slice(1, (target.strung.length - 1));

    function filler() {
        for (var i = 0; i < preoutput.length; i++) {
            if (preoutput[i] != "+") {
                target.displayArray.push("_");
            }
            else {
                target.displayArray.push(" ");
            }
        } // End of for
    } // End of filler function
    filler();
    output = target.displayArray.join("  ");
    // Count the spaces to use to check for a succesful outcome later.
    for (var i = 0; i < target.title.length; i++) {
        if (target.title[i] == "+") {
            spacesCount = spacesCount + 1;
        }
        else {
            letterCount = letterCount + 1;
        }
    }
    // Build an object for each letter in the target
    for (var j = 1; j < target.strung.length - 1; j++) {
        wordLetter = new Letter(letterInTitle);
        wordLetter.letterInTitle = target.strung[j];
        wordLetter.position = (j - 1);
        lettersArray.push(wordLetter.letterInTitle);
    } // End of build objects for letters
    // Provide an array for the output when letters are found.
    // Make it a function to use for resetting.
    clearNewOutput();
    console.log(output);
    console.log("Your target has " + (letterCount) + " letters and " + spacesCount + " spaces.");
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
        console.log("You chose " + theLetter);
        checkInTarget();
    }); // End of .then
} // End of function getLetter
function checkInTarget() {
    lettersUsed.push(theLetter);
    for (var i = 0; i < tlength; i++) {
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
            lettersUsed = [];
            clearNewOutput();
            lettersArray.length = 0;
            strungArray.length = 0;
            console.log("Sorry, " + theLetter + " is not in there.\nThat was nine wrong letters - a loss for you.");
            console.log("Your standings:\n" + winCount + " Wins\n" + lossCount + " Losses");
            startGame();
        } // End of if guesses left is zero
        // If letter not in target but guesses remain, add letterIn to wrongLetters,
        // display message, display wrongLetters, show the current target status, get another letter.
        else {
            console.log("Sorry - " + theLetter + " is not in there.\nYou have " + guessesLeft + " wrong tries left.\nLetters used so far:");
            console.log(lettersUsed);
            console.log(output);
            getLetter();
        } // End of else

    } // End of if inTarget is false
    else {
        // inTarget is true, check locations and  replace blanks.
        // Reset inTarget to false for next letter test.
        inTarget = false;
        for (var k = 0; k < lettersArray.length; k++) {
            if (lettersArray[k] === "+") {
                strungArray.splice(k, 1, (" "));
            }
        }
        for (var k = 0; k < lettersArray.length; k++) {
            if (lettersArray[k] === theLetter) {
                strungArray.splice(k, 1, (theLetter));
                // Increment the count of matched letters
                matches++;
            } // End of if
        } // End of for
    } // End of else after handling possible false.
    // var newOutput = JSON.stringify(preoutArray);
    var newOutput = strungArray.join("  ");
    if (matches === tlength - 1) {
        // Increment the win count and game count.
        winCount++;
        gameCount++;
        // Reset lettersUsed and guessesLeft.
        lettersUsed = [];
        guessesLeft = 9;
        clearNewOutput();
        lettersArray.length = 0;
        strungArray.length = 0;
        // Display a message - you won, wins and losses.
        console.log("YOU GOT IT! That is a win for you!");
        console.log("Your standings:\n" + winCount + " Wins\n" + lossCount + " Losses");
        startGame();
    } // End of if target matched true
    else {
        // Display message with stats and guesses left
        console.log("Good one! " + theLetter + " is in there.\nYou have " + guessesLeft + " wrong tries left.\nLetters used so far:");
        console.log(lettersUsed);
        console.log(newOutput);
        getLetter();
    }

} // End of function checkInTarget

//LOGIC
startGame();
