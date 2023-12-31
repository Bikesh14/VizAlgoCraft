/**
 * Performs Depth-First Search algorithm to find a path from the start to the goal node.
 * Uses a stack to explore nodes and backtracks when necessary.
 * The algorithm stops when the goal is reached or all nodes are explored.
 */
async function depthFirstSearch() {
  let Stack = [board.start];
  board.goal.hasBeenDiscovered = false;

  // While the Stack has elements, i.e., a path could exist
  while (Stack.length > 0 && !interrupt) {
    let current = Stack.pop();
    current.visitNode();

    // IF current is the goal, then exit
    if (current == board.goal) {
      await drawPath();
      return;
    }

    // Checking every neighbor of current node
    for (let pos of board.getNeighbors(current).reverse()) {
      let node = board.grid[pos[0]][pos[1]];

      if (interrupt) {
        return;
      }

      if (node.hasBeenDiscovered == false && node.isWall == false) {
        node.discoverNode(current);
        Stack.push(node);
      }
    }
    await sleep(1000 / fps);
  }
}
