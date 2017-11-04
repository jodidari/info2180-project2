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
        var x = parseInt(100 * (i % 4));
        var y = parseInt(100 * parseInt(i / 4));
        puzzle[i].className = "puzzlepiece"; // set the regular style
        puzzle[i].style.left = x + "px";
        puzzle[i].style.top = y + "px";
        puzzle[i].style.backgroundPosition = "-" + x + "px " + " " + "-" + y + "px";
		
        puzzle[i].addEventListener("mouseover", function() {
            if (movable(parseInt(this.innerHTML))) {
                highlight(this);
            } else {
                unhighlight(this);
            }
        });
		
        puzzle[i].onclick = function() {

            if (movable(parseInt(this.innerHTML))) {
                swap(this.innerHTML - 1);
                if (checkFinish()) {
                    overall.innerHTML += '<div style="color:blue; font-size:20px; text-align: center;"> You Win! </div>';
                }
            }
        };
        i++;
    }

    xempty = "300px";
    yempty = "300px";

};

function unhighlight(tile) {

    tile.setAttribute("class", 'puzzlepiece');

}

function highlight(tile) {

    tile.setAttribute('class', 'puzzlepiece movablepiece');

}

function moveLeft(tileA, tileB) {

    var pieceX = parseInt(tileA);
    var pieceY = parseInt(tileB);
	
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

    var pieceX = parseInt(tileA);
    var pieceY = parseInt(tileB);
	
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

    var pieceX = parseInt(tileA);
    var pieceY = parseInt(tileB);
	
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

    var pieceX = parseInt(tileA);
    var pieceY = parseInt(tileB);
	
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

function movable(tile) {
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



function swap(tile) {

    var temp = puzzle[tile].style.top;
    puzzle[tile].style.top = yempty;
    yempty = temp;
	
    var temp2 = puzzle[tile].style.left;
    puzzle[tile].style.left = xempty;
    xempty = temp2;
}

function shuffle() {

    for (var count = 0; count < 100; count++) {
        var random = Math.floor(Math.random() * 100) % 4;
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

function checkFinish() {
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
