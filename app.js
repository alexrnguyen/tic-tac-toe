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
  let _board = [];

  // Create a board with 9 empty squares
  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      const square = squareFactory(i, "");
      _board.push(square);
    }
  };

  // Set square on gameboard to given marker
  const setSquare = (index, marker) => {
    _board[index].marker = marker;
  };

  // Getter for board
  const getBoard = () => {
    return _board;
  };

  // Reset the state of the board
  const resetBoard = () => {
    _board = [];
  };

  return {
    createBoard,
    setSquare,
    getBoard,
    resetBoard,
  };
})();

// Contains all game logic
const displayController = (() => {
  const player1 = playerFactory("Player X", "X");
  const player2 = playerFactory("Player O", "O");
  let currentPlayer = player1;

  // DOM Elements
  const restartButtons = document.querySelectorAll(".restart-button");
  const playerNameForm = document.getElementById("player-name-form");
  const squares = document.querySelectorAll(".square");
  const startGameModal = document.querySelector(".start-of-game");
  const endGameModal = document.querySelector(".end-of-game");
  const modalText = document.querySelector(".modal-text");
  const overlay = document.querySelector(".overlay");

  // Starts a game of Tic-Tac-Toe with an empty board.
  const startGame = () => {
    gameboard.createBoard();
    currentPlayer = player1;
    updateDisplay(currentPlayer);
  };

  // Handles square clicks
  const handleClick = (square) => {
    playTurn(currentPlayer, square);
    checkIfGameOver();
    updateDisplay(currentPlayer);
  };

  // Marks a square with the given player's marker
  const playTurn = (player, selectedSquare) => {
    // Players can only choose empty squares while the game is still being played (no winner)
    const winningPlayer = checkForWinner();
    if (selectedSquare.textContent === "" && winningPlayer === null) {
      gameboard.setSquare(selectedSquare.dataset.index, player.marker);
      selectedSquare.textContent = player.marker;
      selectedSquare.classList.add();

      if (player === player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    }
  };

  // Updates the display to show that it is the next player's turn
  const updateDisplay = (currentPlayer) => {
    const playerTurnDisplay = document.querySelector(".player-turn");
    playerTurnDisplay.textContent = `${currentPlayer.name}\'s Turn`;
  };

  // Checks if a player has won or if all squares have been filled (tie)
  const checkIfGameOver = () => {
    const winningPlayer = checkForWinner();
    if (winningPlayer !== null) {
      reportWinner(winningPlayer);
    } else if (checkForTie()) {
      reportTie();
    }
  };

  // Checks if either player has three markers in a row
  const checkForWinner = () => {
    const winConditions = [
      [0, 3, 6], //Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2], //Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8], //Diagonals
      [2, 4, 6],
    ];

    for (condition of winConditions) {
      const player1Wins = gameboard
        .getBoard()
        .filter((square) => condition.includes(square.index))
        .every((square) => square.marker === player1.marker);
      const player2Wins = gameboard
        .getBoard()
        .filter((square) => condition.includes(square.index))
        .every((square) => square.marker === player2.marker);

      if (player1Wins) {
        return player1;
      } else if (player2Wins) {
        return player2;
      }
    }
    return null;
  };

  // Checks if all squares are filled
  const checkForTie = () => {
    return gameboard.getBoard().every((square) => square.marker !== "");
  };

  // Display a modal showing the winning player
  const reportWinner = (winningPlayer) => {
    console.log(`${winningPlayer.name} Wins!`);
    modalText.textContent = `${winningPlayer.name} Wins!`;
    toggleModal(endGameModal);
  };

  // Display a modal showing that the game was a tie
  const reportTie = () => {
    console.log("It's a Tie!");
    modalText.textContent = "It's a Tie!";
    toggleModal(endGameModal);
  };

  // Show the modal if it is hidden, otherwise hide the modal
  const toggleModal = (modal) => {
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  };

  // Event listeners
  playerNameForm.onsubmit = (event) => {
    const player1Name = document.getElementById("player1-name").value;
    const player2Name = document.getElementById("player2-name").value;

    player1.name = player1Name;
    player2.name = player2Name;
    updateDisplay(currentPlayer);
    toggleModal(startGameModal);
    event.preventDefault();
  };

  squares.forEach((square) => {
    square.addEventListener("click", () => handleClick(square));
  });

  restartButtons.forEach((restartButton) =>
    restartButton.addEventListener("click", () => {
      gameboard.resetBoard();
      squares.forEach((square) => (square.textContent = ""));
      startGame();
    })
  );

  // Toggle modal only for the restart button inside the modal
  restartButtons[1].addEventListener("click", () => {
    toggleModal(endGameModal);
    toggleModal(startGameModal);
  });
  return {
    startGame,
  };
})();
displayController.startGame();
