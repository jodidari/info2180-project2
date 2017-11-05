var puzzle;
var emptySquare;
var i = 0;
var xempty = "300px";
var yempty = "300px";
var pieceX;
var pieceY;

window.onload = function() {
    var shuf = document.getElementById("shufflebutton");
    var puzzlearea = document.getElementById("puzzlearea");
    var overall = document.getElementById("overall");
    puzzle = puzzlearea.getElementsByTagName("div");
    shuf.onclick = shuffle;

    while (i < puzzle.length) {
        puzzle[i].className = "puzzlepiece"; // set the regular style
        puzzle[i].style.left = ((i % 4) * 100) + "px";
        puzzle[i].style.top = (parseInt(i / 4) * 100) + "px";
        puzzle[i].style.backgroundPosition = "-" + puzzle[i].style.left + " " + "-" + puzzle[i].style.top; //set background
        puzzle[i].addEventListener("mouseover", function() { //used to highlight or unhighlight a tile when cursor is placed on it or removed 
            if (movable(parseInt(this.innerHTML))) {
                highlight(this);
            } else {
                unhighlight(this);
            }
        });

        puzzle[i].onclick = function() {//used to move a tile when clicked and also checks if the game is solved

            if (movable(parseInt(this.innerHTML))) {
                swap(this.innerHTML - 1);
                if (checkFinish()) { //if the game is solved
                    overall.innerHTML += '<div style="color:blue; font-size:24px; text-align: center;"> You Won! <img src="http://www.fileformat.info/info/unicode/char/1f44d/thumbs_up_sign.png" style="margin:auto" align="center"> </div>'; //displays you won and an image
                }
            }
        };
        i++;
    }
};

function unhighlight(tile) {// when the cursor is no longer hovering over the square, it should revert to its original state

    tile.setAttribute("class", 'puzzlepiece');

}

function highlight(tile){ //changes appearance when the mouse hovers over a square

    tile.setAttribute('class', 'puzzlepiece movablepiece');

}

function moveLeft(tileA, tileB) {

    pieceX = parseInt(tileA);
    pieceY = parseInt(tileB);

    if (pieceX >= 1) {
        for (var j = 0; j < puzzle.length; j++) {
            if ((parseInt(puzzle[j].style.left) + 100 == pieceX) && (parseInt(puzzle[j].style.top) == pieceY)) {
                return j;
            }
        }
    } else {
        return -1;
    }
}


function moveRight(tileA, tileB) {

    pieceX = parseInt(tileA);
    pieceY = parseInt(tileB);

    if (pieceX < 300) {
        for (var j = 0; j < puzzle.length; j++) {
            if ((parseInt(puzzle[j].style.left) - 100 == pieceX) && (parseInt(puzzle[j].style.top) == pieceY)) {
                return j;
            }
        }
    } else {
        return -1;
    }
}



function moveUp(tileA, tileB) {

    pieceX = parseInt(tileA);
    pieceY = parseInt(tileB);

    if (pieceY >= 1) {
        for (var j = 0; j < puzzle.length; j++) {
            if (parseInt(puzzle[j].style.top) + 100 == pieceY && parseInt(puzzle[j].style.left) == pieceX) {
                return j;
            }
        }
    } else {
        return -1;
    }
}



function moveDown(tileA, tileB) {

    pieceX = parseInt(tileA);
    pieceY = parseInt(tileB);

    if (pieceY < 300) {
        for (var j = 0; j < puzzle.length; j++) {
            if (parseInt(puzzle[j].style.top) - 100 == pieceY && parseInt(puzzle[j].style.left) == pieceX) {
                return j;
            }
        }
    } else {
        return -1;
    }
}

function movable(tile) {//checks if the clicked tile can be moved
    if (moveLeft(xempty, yempty) == (tile - 1)) {
        return true;

    } else if (moveRight(xempty, yempty) == (tile - 1)) {
        return true;

    } else if (moveUp(xempty, yempty) == (tile - 1)) {
        return true;

    } else if (moveDown(xempty, yempty) == (tile - 1)) {
        return true;

    } else {
        return false
    }
}



function swap(tile) {//swaps the empty tile and tile clicked

    var temp = puzzle[tile].style.top;
    puzzle[tile].style.top = yempty;
    yempty = temp;

    var temp2 = puzzle[tile].style.left;
    puzzle[tile].style.left = xempty;
    xempty = temp2;
}

function shuffle() {

    for (var count = 0; count < 100; count++) {//shuffles a hundred times 
        var random = Math.floor(Math.random() * 100) % 4;//used to randomly select where to move 
        if (random == 0) {
            var tmp = moveUp(xempty, yempty);
            if (tmp != -1) {
                swap(tmp);
            }
        }

        if (random == 1) {
            var tmp = moveDown(xempty, yempty);
            if (tmp != -1) {
                swap(tmp);
            }
        }

        if (random == 2) {
            var tmp = moveLeft(xempty, yempty);
            if (tmp != -1) {
                swap(tmp);
            }
        }

        if (random == 3) {
            var tmp = moveRight(xempty, yempty);
            if (tmp != -1) {
                swap(tmp);
            }
        }
    }
}

function checkFinish() {//checks if the players has won
    var check = true;

    for (var i = 0; i < puzzle.length; i++) {
        var xpiec = parseInt(puzzle[i].style.left);
        var ypiec = parseInt(puzzle[i].style.top);

        if (xpiec != (i % 4 * 100) || ypiec != parseInt(i / 4) * 100) {
            check = false;
            break;
        }
    }
    return check;
}
