// function to render row board, ex: 123, 456, etc.
export function rowMatrix(size) {
  const result = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 1; j <= size; j++) {
      row.push(i * size + j);
    }
    result.push(row);
  }
  return result;
}

// function to render column board, ex: 147, 258, etc.
export function columnMatrix(size) {
  const result = [];
  for (let i = 1; i <= size; i++) {
    const column = [];
    for (let j = 0; j < size; j++) {
      column.push(j * size + i);
    }
    result.push(column);
  }
  return result;
}

// function to render diagonal board, ex: 159 and 357.
export function diagonalMatrix(size) {
  const diagonal1 = [];
  const diagonal2 = [];
  for (let i = 1; i <= size; i++) {
    diagonal1.push((i - 1) * size + i);
    diagonal2.push(i * size - (i - 1));
  }
  return [diagonal1, diagonal2];
}

//function to render fulll board.
export function renderMatrix(size) {
  const rows = rowMatrix(size);
  const columns = columnMatrix(size);
  const diagonals = diagonalMatrix(size);

  return [...rows, ...columns, ...diagonals];
}

// function to render a Tic Tac Toe board based on button text
export function renderBoard(elements) {
  const result = [];
  elements.each(function () {
    result.push($(this).text());
  });

  return result;
}

// function to check the winner.
export function checkWinner(size, board) {
  const conditions = renderMatrix(size);
  for (let condition of conditions) {
    const indexes = condition;
    const elements = indexes.map((index) => board[index - 1]);

    if (elements.every((element) => element !== '+' && element === elements[0])) {
      return elements[0]; // Return the winning player (X or O)
    }
  }
  return null;
}
