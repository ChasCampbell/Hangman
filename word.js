// Constructor function for the title to guess
var displayArray = [];
var output = [];

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
            }
        } // End of for
    }; // End of filler function
} // End of function Target

module.exports = Target;
