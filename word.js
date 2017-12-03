// Constructor function for the title to guess
var displayArray = [];
var numSpaces = 0;
var numLetters = 0;

function Target(title) {
    this.title = title;
    this.strung = JSON.stringify(this.title);
    this.length = this.strung.length;
    this.displayArray = displayArray;
    this.filler = function() {
        for (var i = 0; i < this.length; i++) {
            if (this.strung[i] != "-") {
                displayArray.push("_");
            }
            else {
                displayArray.push("  ");
                numSpaces++;
            }
        } // End of for
    }; // End of filler function
    this.numSpaces = numSpaces;
    this.numLetters = (this.length - 2) - this.numSpaces;
} // End of function Target

module.exports = Target;
