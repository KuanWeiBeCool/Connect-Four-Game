var started = false;
var currPlayer;
var playerOne;
var playerTwo;
var colorOne = "rgb(81, 153, 224)";
var colorTwo = "rgb(217, 24, 46)";
$("#Start").click(function() {
    startGame();
});

// Start the game
function startGame() {
    $("td > button").css("background-color", "rgb(128, 128, 128)");
    playerOne = prompt("Player 1 (Blue) enter the name: ");
    playerTwo = prompt("Player 2 (Red) enter the name: ");
    started = true;
    $("h2").text(playerOne + " (blue) please put a chip.");
    currPlayer = 1;

}


// Change the color of the chip in a specific row/column
function changeColor(col, color) {
    // Check, from bottom to top, which row of the specific column is not filled (grey color)
    for (var i = 5; i >= 0; i--) {
        var chip = $("tr").eq(i).find("td").eq(col).find("button");
        if (chip.css("background-color") == "rgb(128, 128, 128)") {
            chip.css("background-color", color);
            // Successfully changed color
            return i;
        }
    }
    // Reached top. can't find an available spot.
    return false;
}

function checkWin(row, col, color) {
    var rowObjects = $("tr").eq(row).find("td > button");
    // check 4 same color in a row
    count = 0;
    for (var i = 0; i < rowObjects.length; i++) {
        if (rowObjects.eq(i).css("background-color") === color) {
            count++;
            if (count === 4) {
                console.log("Win by row");
                return true;
            }
        } else {
            count = 0;
        }
    }

    // check 4 same color in a column
    count = 0;
    for (var i = 0; i <= 5; i++) {
        var colObject = $("tr").eq(i).find("td > button").eq(col);
        if (colObject.css("background-color") === color) {
            count++;
            if (count === 4) {
                console.log("Win by column");
                return true;
            }
        } else {
            count = 0;
        }
    }

    // Check 4 same color in diagonal
    count = 0
    var currRow;
    var currCol;
    // Flip the rows so that row 0 is at bottom
    row = 5 - row;
    // bottom-left to top-right
    // Go back to the bottom in diagonal

    if (row >= col) {
        currRow = row - col;
        currCol = 0;
    } else {
        currRow = 0;
        currCol = col - row;
    }
    while ((currRow <= 5) && (currCol <= 6)) {
        var currObject = $("tr").eq(5 - currRow).find("td > button").eq(currCol);
        if (currObject.css("background-color") === color) {
            count++;
            if (count === 4) {
                console.log("Win by right diagonal");
                return true;
            }
        } else {
            count = 0;
        }
        currRow++;
        currCol++;
    }

    count = 0
        // bottom-right to top-left
        // Go back to the bottom in diagonal  
    if (row >= (6 - col)) {
        currRow = row - (6 - col);
        currCol = 6;
    } else {
        currRow = 0;
        currCol = 6 - col - row;
    }
    while ((currRow <= 5) && (currCol >= 0)) {
        var currObject = $("tr").eq(5 - currRow).find("td > button").eq(currCol);
        if (currObject.css("background-color") === color) {
            count++;
            if (count === 4) {
                console.log("Win by left diagonal");
                return true;
            }
        } else {
            count = 0;
        }
        currRow++;
        currCol--;
    }

    return false;

}


// Click the button
$("td > button").click(function() {
    if (started == false) {
        alert("Please click 'Play!' button to start!")
    } else {
        // Find the closest "td" (the button clicked) and get its index (column number)
        var col = $(this).closest("td").index();

        if (currPlayer == 0) {
            var row = changeColor(col, colorTwo);
            if (row === false) {
                alert("You cannot place a chip in this column anymore! Try another column.")
            } else {
                currPlayer = 1;
                if (checkWin(row, col, colorTwo)) {
                    alert(playerTwo + " won the game!");
                    $("h2").text(playerTwo + " won the game! Click 'Play!' to rematch!");
                    started = false;
                }
                $("h2").text(playerOne + " (blue) please put a chip.");

            }

        } else {
            var row = changeColor(col, colorOne);
            if (row === false) {
                alert("You cannot place a chip in this column anymore! Try another column.")

            } else {
                currPlayer = 0;
                if (checkWin(row, col, colorOne)) {
                    alert(playerOne + " won the game!");
                    $("h2").text(playerOne + " won the game! Click 'Play!' to rematch!");
                    started = false;
                }
                $("h2").text(playerTwo + " (red) please put a chip.");

            }

        }
    }
});