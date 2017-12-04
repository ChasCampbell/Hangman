// Constructor function for the letters in the target title
var Target = require("./word.js");
var position;

function Letters(letterInTitle) {
    this.letterInTitle = letterInTitle;
    this.position = position;
}

module.exports = Letters;
