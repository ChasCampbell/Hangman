var lettersUsed = [];

function noRepeat() {
    console.log(lettersUsed.length);
    for (var q = 0; q < lettersUsed.length; q++) {
        console.log("Hi");
        if ("A" === lettersUsed[q]) {
            console.log("You have used that letter already. Please choose another.");

        }
    }
    lettersUsed.push("A");
    console.log(lettersUsed);


}
noRepeat();
