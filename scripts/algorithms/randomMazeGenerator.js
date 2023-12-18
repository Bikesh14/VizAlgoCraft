/**
 * Generates a random maze on the board using the given probability.
 * The function resets the board and iterates through each cell, adding walls
 * based on the provided probability.
 *
 * @param {number} probability - The probability of a cell being a wall (0 to 1).
 * @returns {Promise<void>} - A promise that resolves once the maze generation is complete.
 */
async function randomMaze(probability) {
  board.reset();
  for (let j = 0; j < board.cols && !interrupt; j++) {
    for (let i = 0; i < board.rows && !interrupt; i++) {
      board.grid[i][j].isWall = false;
      if (Math.random() <= probability) {
        board.addWall(j, i);
        await sleep(400 / fps);
      }
    }
  }
}
