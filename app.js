// Stores every move made by both players
const gameboard = (() => {
    const boardGrid = document.querySelector('.gameboard');

    return {
        // ...
    };
})();

// Contains all game logic
const gameController = (() => {
    const startGame = () => {
        const player1 = playerFactory('Player 1', 'X');
        const player2 = playerFactory('Player 2', 'O');

        // ...
    }
    return {
        startGame
        // ...
    };
})();


const playerFactory = (name, marker) => {
    const takeTurn = () => {
        // Player chooses a square to place marker
    }
    return {name, marker};
};

gameController.startGame();