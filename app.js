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
  };

  const placeMarker = (index, marker) => {
    // Place marker on gameboard (displayController ensures the move is valid before passing the move to this function)
    board[index].marker = marker;
  };
  return {
    createBoard,
    placeMarker,
    // ...
  };
})();

// Contains all game logic
const displayController = (() => {
  const player1 = playerFactory("Player 1", "X");
  const player2 = playerFactory("Player 2", "O");
  const restartButton = document.querySelector(".restart-button");

  const startGame = () => {
    gameboard.createBoard();
    playGame();
  };

  const playGame = () => {
    const squares = document.querySelectorAll(".square");
    let currentPlayer = player1;
    console.log("Turn started");
    squares.forEach((square) => {
      square.addEventListener("click", () => {
        // Verify square is valid
        // ...
        gameboard.placeMarker(square.dataset.index, currentPlayer.marker);
        square.textContent = currentPlayer.marker;

        if (currentPlayer === player1) {
          currentPlayer = player2;
        } else {
          currentPlayer = player1;
        }
      });
    });
  };

  const playTurn = (player) => {
    // ...
  };

  const checkForWinner = () => {
    if (checkRows() || checkColumns() || checkDiagonals()) {
      return true;
    } else if (checkForTie()) {
      return true;
    } else {
      return false;
    }
  };

  const checkRows = () => {
    return false;
    // ...
  };

  const checkColumns = () => {
    return false;
    // ...
  };

  const checkDiagonals = () => {
    return false;
    // ...
  };

  const checkForTie = () => {
    gameboard.board.every(
      (square) => square.marker === "X" || square.marker === "O"
    );
  };

  const reportWinner = () => {
    // ...
  };

  restartButton.addEventListener("click", startGame);
  return {
    startGame,
    playGame,
    // ...
  };
})();

displayController.startGame();
