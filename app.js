// Creates a Square object
const squareFactory = (index, marker) => {
  return { index, marker };
};

// Creates a Player object
const playerFactory = (name, marker) => {
  return { name, marker };
};

// Stores every move made by both players
const gameboard = (() => {
  const boardGrid = document.querySelector(".gameboard"); // Move to displayController??? ---------------------------------------------------------------------------
  let board = [];
  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      const square = squareFactory(i, "");
      board.push(square);
    }
    console.log(board);
  };

  const placeMarker = (index, marker) => {
    // Place marker on gameboard (displayController ensures the move is valid before passing the move to this function)
    console.log("Marker placed");
    board[index].marker = marker;
  };

  const threeInARow = () => {
    return false;
  };

  const allSquaresFilled = () => {
    return board.every((square) => square.marker !== "");
  };

  const resetBoard = () => {
    board = [];
  };

  return {
    createBoard,
    placeMarker,
    threeInARow,
    allSquaresFilled,
    resetBoard,
  };
})();

// Contains all game logic
const displayController = (() => {
  const player1 = playerFactory("Player 1", "X");
  const player2 = playerFactory("Player 2", "O");
  const restartButton = document.querySelector(".restart-button");
  const squares = document.querySelectorAll(".square");

  const startGame = () => {
    gameboard.createBoard();
    playGame();
  };

  const playGame = () => {
    let currentPlayer = player1;
    squares.forEach((square) => {
      square.addEventListener("click", () => {
        playTurn(currentPlayer, square);
        if (checkIfGameOver()) {
          reportWinner();
        }
        if (currentPlayer === player1) {
          currentPlayer = player2;
        } else {
          currentPlayer = player1;
        }
      });
    });
  };

  const playTurn = (player, selectedSquare) => {
    // Players can only choose empty squares
    if (selectedSquare.textContent === "") {
      gameboard.placeMarker(selectedSquare.dataset.index, player.marker);
      selectedSquare.textContent = player.marker;
    }
  };

  const checkIfGameOver = () => {
    if (gameboard.threeInARow()) {
      return true;
    } else if (gameboard.allSquaresFilled()) {
      return true;
    } else {
      return false;
    }
  };

  const reportWinner = () => {
    console.log("Game Over!");
    squares.forEach((square) => square.removeEventListener);
  };

  restartButton.addEventListener("click", () => {
    gameboard.resetBoard();
    squares.forEach((square) => (square.textContent = ""));
    startGame();
  });
  return {
    startGame,
    playGame,
    // ...
  };
})();

displayController.startGame();
