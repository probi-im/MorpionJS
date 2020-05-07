let playerNames = ["Joueur 1", "Joueur 2"];
let currentPlayer = 0;
let currentMatrice = [
  [".", ".", "."],
  [".", ".", "."],
  [".", ".", "."],
];
let gameFinished = false;
init();
function init() {
  updateView();
}
function toggle(x, y) {
  if (isCaseEmpty(x, y) && !gameFinished) {
    currentMatrice[y][x] = currentPlayer === 0 ? "x" : "o";
    currentPlayer = (currentPlayer + 1) % 2;
    updateView();
    const res = checkWin();
    if (res !== -1) {
      gameFinished = true;
      document.getElementById("info-msg").innerText =
        "Fini! " + playerNames[res] + " a gagné!";
    } else {
      if (!gameFinished && isGridFull()) {
        gameFinished = true;
        document.getElementById("info-msg").innerText =
          "Fini! Personne n'a gagné!";
      }
    }
  }
}
function isGridFull() {
  for (let i = 0; i < currentMatrice.length; i++) {
    for (let j = 0; j < currentMatrice[0].length; j++) {
      if (currentMatrice[i][j] === ".") return false;
    }
  }
  return true;
}
function isCaseEmpty(x, y) {
  if (currentMatrice[y][x] === ".") {
    return true;
  }
  return false;
}
function checkWin() {
  // horizontal win
  for (let lineIndex = 0; lineIndex < currentMatrice.length; lineIndex++) {
    line = currentMatrice[lineIndex];
    if (line[0] === "x" && line[1] === "x" && line[2] === "x") {
      return 0;
    } else if (line[0] === "o" && line[1] === "o" && line[2] === "o") {
      return 1;
    }
  }
  // vertical win
  for (
    let columnIndex = 0;
    columnIndex < currentMatrice[0].length;
    columnIndex++
  ) {
    column = [
      currentMatrice[0][columnIndex],
      currentMatrice[1][columnIndex],
      currentMatrice[2][columnIndex],
    ];
    if (column[0] === "x" && column[1] === "x" && column[2] === "x") {
      return 0;
    } else if (column[0] === "o" && column[1] === "o" && column[2] === "o") {
      return 1;
    }
  }
  // diagonal win
  const diag1 = [
    currentMatrice[0][0],
    currentMatrice[1][1],
    currentMatrice[2][2],
  ];
  const diag2 = [
    currentMatrice[0][2],
    currentMatrice[1][1],
    currentMatrice[2][0],
  ];
  if (diag1[0] === "x" && diag1[1] === "x" && diag1[2] === "x") {
    return 0;
  } else if (diag1[0] === "o" && diag1[1] === "o" && diag1[2] === "o") {
    return 1;
  }
  if (diag2[0] === "x" && diag2[1] === "x" && diag2[2] === "x") {
    return 0;
  } else if (diag2[0] === "o" && diag2[1] === "o" && diag2[2] === "o") {
    return 1;
  }
  return -1;
}
function updateView() {
  const listCases = document.getElementsByClassName("case");
  currentMatrice.forEach((line, lineIndex) => {
    line.forEach((column, columnIndex) => {
      if (column === "x")
        listCases.item(lineIndex * 3 + columnIndex).classList.add("croix");
      else if (column === "o")
        listCases.item(lineIndex * 3 + columnIndex).classList.add("rond");
      else listCases.item(lineIndex * 3 + columnIndex).classList.value = "case";
    });
  });

  document.getElementById("info-msg").innerHTML =
    'C\'est au tour de : <span id="current-player"></span>';
  document.getElementById("current-player").innerText =
    playerNames[currentPlayer];
}
function resetGame() {
  currentPlayer = 0;
  currentMatrice = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  updateView();
  gameFinished = false;
}
function updatePlayerName(player, playerName) {
  playerNames[player] = playerName;
  updateView();
}
