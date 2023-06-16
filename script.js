// Game variables
var board = [['', '', ''], ['', '', ''], ['', '', '']];
var currentPlayer = 'X';
var turnIndicator = $('#turn-indicator');
var cells = $('.cell');
var restartButton = $('#restart-button');
var winnerModal = $('#winner-modal');
var winnerMessage = $('#winner-message');

// Make a move
function makeMove(cell, row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        $(cell).text(currentPlayer);
        $(cell).css('pointer-events', 'none');
        checkWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnIndicator.text("It's " + currentPlayer + "'s turn");
    }
}

// Restart the game
function restartGame() {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    currentPlayer = 'X';
    turnIndicator.text("It's X's turn");
    cells.text('');
    cells.css('pointer-events', 'auto');
    winnerModal.modal('hide');
}

// Check for a win
function checkWin() {
    var winConditions = [
        [[0, 0], [0, 1], [0, 2]], // Rows
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]], // Columns
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]], // Diagonals
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (var i = 0; i < winConditions.length; i++) {
        var [a, b, c] = winConditions[i];
        if (board[a[0]][a[1]] !== '' && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
            showWinnerModal(board[a[0]][a[1]]);
            return;
        }
    }

    if (boardIsFull()) {
        showWinnerModal('Draw');
    }
}

// Check if the board is full
function boardIsFull() {
    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                return false;
            }
        }
    }
    return true;
}

// Show winner modal
function showWinnerModal(winner) {
    if (winner === 'Draw') {
        winnerMessage.text('It\'s a draw!');
    } else {
        winnerMessage.text('Player ' + winner + ' wins!');
    }
    winnerModal.modal('show');
}

// Event listener for restart button
restartButton.on('click', restartGame);
