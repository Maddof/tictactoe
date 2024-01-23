const game = (function () {
  const rows = 3;
  const columns = 3;
  const cellContent = "";
  let board = [];
  let stopPlay;

  // creating two-dimensional array
  const createBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = cellContent;
      }
    }
  };
  createBoard();
  console.log(board);
  const getBoard = () => board;
  const getBoardLength = () => board.length;

  // Checking for roundchecker before the play,
  // If roundchecker cant play, we set stopPlay to true to stop
  // the computer from playing so player can play again.
  const updateBoard = (r, c, currentMarker) => {
    if (!roundChecker(r, c)) {
      console.log("Cant play that");
      stopPlay = true;
    } else {
      stopPlay = false;
      return (board[r][c] = currentMarker);
    }
  };

  // True if computer is not allowed to play after checking
  // if player hit the same marker.
  const stopComputerRound = () => stopPlay;

  return {
    getBoard,
    updateBoard,
    getBoardLength,
    stopComputerRound,
    createBoard,
  };
})();

const players = (function (pName = "Player") {
  const players = [
    {
      name: pName,
      marker: "X",
    },
    {
      name: "Comp",
      marker: "O",
    },
  ];
  const setPlayerName = (pName) => {
    return (players[0].name = pName);
  };
  const getPlayerName = () => players[0].name;
  const getCompName = () => players[1].name;
  const getPlayerMarker = () => players[0].marker;
  const getCompMarker = () => players[1].marker;
  return {
    setPlayerName,
    getPlayerName,
    getCompName,
    getPlayerMarker,
    getCompMarker,
  };
})();

// This is the function we use to play a round as a player in the console.
// function playRound(r, c) {
//   console.log(
//     players.getPlayerName() + " Plays a round in position " + r + ", " + c
//   );
//   game.updateBoard(r, c, players.getPlayerMarker());
//   computerPlays();
//   console.log(game.getBoard());
// }

// CHAT GPT Version
function playRound(r, c) {
  console.log(
    players.getPlayerName() + " Plays a round in position " + r + ", " + c
  );
  game.updateBoard(r, c, players.getPlayerMarker());
  const winner = checkWinner();

  if (checkDraw()) {
    console.log("DRAW!!!");
    game.createBoard();
    return;
  }

  if (winner) {
    console.log(players.getPlayerName() + " is the winner!");
    game.createBoard();
    // You can reset the board or end the game here
  } else {
    computerPlays();
    const compWinner = checkWinner();

    if (compWinner) {
      console.log(players.getCompName() + " is the winner!");
      game.createBoard();
      // You can reset the board or end the game here
    } else {
      console.log(game.getBoard());
    }
  }
}

function computerPlays() {
  // Take the exposed boolen value of letting computer play
  let currentStatus = game.stopComputerRound();

  // If boolean is true, computer wont play and we skip.
  if (!currentStatus) {
    // Basically we are testing the roundchecker function
    // multiple times until we get a true (which we flip to false to stop)
    let randomRow, randomCol;
    do {
      randomRow = Math.floor(Math.random() * game.getBoardLength());
      randomCol = Math.floor(Math.random() * game.getBoardLength());
    } while (!roundChecker(randomRow, randomCol));

    game.updateBoard(randomRow, randomCol, players.getCompMarker());
  } else {
    console.log("Computer skipped");
  }
}

function roundChecker(r, c) {
  let board = game.getBoard();
  if (r > 3 || c > 3 || r < 0 || c < 0) {
    return false;
  } else if (board[r][c] === "X" || board[r][c] === "O") {
    return false;
  } else {
    return true;
  }
}

function checkWinner() {
  let board = game.getBoard();
  // Check rows and columns
  for (let i = 0; i < game.getBoardLength(); i++) {
    if (
      (board[i][0] === board[i][1] && board[i][1] === board[i][2]) ||
      (board[0][i] === board[1][i] && board[1][i] === board[2][i])
    ) {
      return board[i][i]; // Returns the winner marker ('X' or 'O')
    }
  }

  // Check diagonals
  if (
    (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
    (board[0][2] === board[1][1] && board[1][1] === board[2][0])
  ) {
    return board[1][1]; // Returns the winner marker ('X' or 'O')
  }

  return null; // No winner yet
}

function checkDraw() {
  const board = game.getBoard();

  let count = 0;
  for (let row of board) {
    for (let col of row) {
      if (col === "X" || col === "O") {
        count++;
      }
    }
  }
  if (count === 9) {
    return true;
  }
}
