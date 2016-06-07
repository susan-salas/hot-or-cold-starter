var secretNumber;
var count = 0;

function newGame() {
    secretNumber = Math.floor((Math.random() * 100) + 1);
    count = 0;
    $("#count").text(count);
    $('#guessList').empty();
    console.log(secretNumber);
    $("#feedback").text("Make your Guess!");
    $(":text").prop("disabled", false);
    $("#guessButton").prop("disabled", false);
}

function sendInput() {
    var guess = $("#userGuess").val();
    if (guess > -1 && guess < 101 && guess != "") {
        var guess = $("#userGuess").val();
        var row = $('<li>' + guess + '</li>');
        $('#guessList').append(row);
        checkForWin(guess);
        $("#userGuess").val("");
    } else {
        $("#feedback").text("Enter a number between 1-100");
        $("#userGuess").val("");
    }
}

function checkForWin(num) {
    var feedback;
    if (num == secretNumber) {
        announceWin();
    } else {
        var difference = Math.abs(secretNumber - num);
        if (difference > 50) {
            feedback = "Ice Cold!";
        }
        if (difference < 50 && difference > 29) {
            feedback = "Cold!";
        }
        if (difference < 30 && difference > 9) {
            feedback = "Warm!";
        }
        if (difference < 10) {
            feedback = "Very Hot!";
        }
        $("#feedback").text(feedback);

    }
    count++;
    $("#count").text(count);
}

function announceWin() {
    $("#feedback").text("You Won!");
    $(":text").prop("disabled", true);
    $("#guessButton").prop("disabled", true);
}

$(document).ready(function () {
    newGame();
    $("#guessButton").submit(function (e) {
        e.preventDefault();
    });

    $("#guessButton").click(function () {
        sendInput();
    });
    $(".new").click(function () {
        newGame();
    });
    /*--- Display information modal box ---*/
    $(".what").click(function () {
        $(".overlay").fadeIn(1000);

    });
    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });


});

$(document).on('keypress', function (key) {
    if (key.keyCode == 13) {
        sendInput();
    }
});
