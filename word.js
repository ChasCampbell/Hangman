// Constructor function for the title to guess
var displayArray = [];

function Target(title) {
    this.title = title;
    this.strung = JSON.stringify(this.title);
    this.length = this.strung.length;
    this.displayArray = displayArray;
    this.filler = function() {
        for (var i = 0; i < this.length; i++) {
            if (this.strung[i] != "%20") {
                displayArray.unshift("_ ");
            }
            else {
                displayArray.unshift("  ")
            }
        }
    };
}

module.exports = Target;



//this.title.splice()
