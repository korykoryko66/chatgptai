const board = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');
let cells = [];
let currentPlayer = 'X'; // 玩家
let gameActive = true;

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(index) {
  if (!gameActive || cells[index].textContent !== '') return;

  // 玩家下棋
  cells[index].textContent = 'X';

  if (checkWinner()) {
    setTimeout(() => alert('玩家 X 獲勝！'), 100);
    gameActive = false;
    restartBtn.style.display = 'inline-block';
    return;
  }

  if (cells.every(cell => cell.textContent !== '')) {
    setTimeout(() => alert('平手！'), 100);
    gameActive = false;
    restartBtn.style.display = 'inline-block';
    return;
  }

  // 電腦下棋
  setTimeout(computerMove, 300);
}

// AI 核心邏輯
function computerMove() {
  if (!gameActive) return;

  let move = findWinningMove('O'); // 看自己能否贏
  if (move === null) {
    move = findWinningMove('X'); // 阻擋玩家
  }
  if (move === null) {
    // 隨機下
    let emptyIndices = cells.map((cell, idx) => cell.textContent === '' ? idx : null).filter(idx => idx !== null);
    move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  cells[move].textContent = 'O';

  if (checkWinner()) {
    setTimeout(() => alert('電腦 O 獲勝！'), 100);
    gameActive = false;
    restartBtn.style.display = 'inline-block';
    return;
  }

  if (cells.every(cell => cell.textContent !== '')) {
    setTimeout(() => alert('平手！'), 100);
    gameActive = false;
    restartBtn.style.display = 'inline-block';
    return;
  }
}

// 找可能贏的步數，返回索引，沒有就回傳 null
function findWinningMove(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of winPatterns) {
    let [a,b,c] = pattern;
    let values = [cells[a].textContent, cells[b].textContent, cells[c].textContent];
    if (values.filter(v => v === player).length === 2 && values.includes('')) {
      return pattern[values.indexOf('')];
    }
  }
  return null;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
  });
}

function restartGame() {
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  restartBtn.style.display = 'none';
}

createBoard();
