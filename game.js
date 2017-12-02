/*
Create a list of words to use as puzzles. Save in an array.
Step through the list - a random selection could make for repitition.
At the start, display a message and give a hint about the topic.
Provide an object to hold the selected word.
Show a series of blanks in place of the letters of the word to guess.
Allow the user 9 unsuccesful tries with letters. List them out.
If the limit of 9 is reached, display a message and ask "Play Again?"
Remember to reset the counters, clear the list of unsuccessful letters.
*/
// VARIABLES
// Dependency for inquirer npm package
var inquirer = require("inquirer");
var Target = require("./word.js");
var displayArray;
var strung;
var length;
var Letter = require("./letter.js")
var guessesLeft = 0;
var winCount = 0;
var lossCount = 0;
var gameCount = 0;
var title;
var target;
var letterCount;
var targetsArray = [
    "Oklahoma",
    "Wicked",
    "My Fair Lady",
    "Alladin",
    "Chicago",
    "The Lion King",
    "Hamilton",
    "The Book of Mormon",
    "Wicked",
    "The Phantom of the Opera"
];


//FUNCTIONS



//LOGIC

// Start of game
console.log("It's Showtime!" + "\nHere comes a word target - enter letters to see if you can guess it.\nYou get up to nine wrong letters.");
//Get a target
Hamilton = new Target("Hamilton");
Hamilton.filler();
console.log(Hamilton.title);
console.log(Hamilton.strung);
console.log(Hamilton.length);
console.log(Hamilton.displayArray);
console.log(Hamilton.displayArray[0]);

// targetsArray[gameCount]