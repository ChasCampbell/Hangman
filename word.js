// Constructor function for the title to guess
var displayArray = [];

function Target(title) {
    this.title = title;
    this.strung = JSON.stringify(this.title);
    this.length = this.strung.length;
    this.displayArray = displayArray;
    this.filler = function() {
        for (var i = 0; i < this.strung.length; i++) {
            if (this.strung[i] == "+") {
                this.displayArray.push(" ");
            }
            else {

                this.displayArray.push(this.strung[i]);
            }
            console.log(i);

        } // End of for
    }; // End of filler function
} // End of function Target

module.exports = Target;
