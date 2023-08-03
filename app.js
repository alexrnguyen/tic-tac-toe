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

  const getBoard = () => {
    return _board;
  };

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
  const player1 = playerFactory("Player 1", "X");
  const player2 = playerFactory("Player 2", "O");
  let currentPlayer = player1;
  const restartButtons = document.querySelectorAll(".restart-button");
  const squares = document.querySelectorAll(".square");
  const modal = document.querySelector(".modal");
  const modalText = document.querySelector(".modal-text");
  const overlay = document.querySelector(".overlay");

  const startGame = () => {
    gameboard.createBoard();
    currentPlayer = player1;
    updateDisplay(currentPlayer);
  };

  const handleClick = (square) => {
    playTurn(currentPlayer, square);
    checkIfGameOver();
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    updateDisplay(currentPlayer);
  };

  const playTurn = (player, selectedSquare) => {
    // Players can only choose empty squares while the game is still being played (no winner)
    const winningPlayer = checkForWinner();
    if (selectedSquare.textContent === "" && winningPlayer === null) {
      gameboard.setSquare(selectedSquare.dataset.index, player.marker);
      selectedSquare.textContent = player.marker;
    }
  };

  const updateDisplay = (currentPlayer) => {
    const playerTurnDisplay = document.querySelector(".player-turn");
    playerTurnDisplay.textContent = `${currentPlayer.name}\'s Turn`;
  };

  const checkIfGameOver = () => {
    const winningPlayer = checkForWinner();
    if (winningPlayer !== null) {
      reportWinner(winningPlayer);
    } else if (checkForTie()) {
      reportTie();
    }
  };

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

  const checkForTie = () => {
    return gameboard.getBoard().every((square) => square.marker !== "");
  };

  const reportWinner = (winningPlayer) => {
    console.log(`${winningPlayer.name} Wins!`);
    modalText.textContent = `${winningPlayer.name} Wins!`;
    toggleModal();
  };

  const reportTie = () => {
    console.log("It's a Tie!");
    modalText.textContent = "It's a Tie!";
    toggleModal();
  };

  const toggleModal = () => {
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  };

  // Event listeners
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

  restartButtons[1].addEventListener("click", () => {
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  });
  return {
    startGame,
  };
})();

displayController.startGame();
