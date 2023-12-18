/**
 * Inserts a node into the priority queue used in A* Search based on the combined cost (gScore + hScore + weight).
 * The insertion maintains the order of nodes in the priority queue.
 * @param {Object[]} priorityQueue - The priority queue to insert the node into.
 * @param {Object} node - The node to be inserted into the priority queue.
 */
async function insertPriorityQueueAStar(priorityQueue, node) {
  for (let i = 0; i < priorityQueue.length; i++) {
    if (
      node.hScore + node.gScore + node.weight <
      priorityQueue[i].hScore +
        priorityQueue[i].gScore +
        priorityQueue[i].weight
    ) {
      priorityQueue.splice(i, 0, node);
      return;
    }
  }
  priorityQueue.push(node);
}

/**
 * Performs A* Search algorithm to find the shortest path from the start to the goal node.
 * Uses a priority queue based on the combined cost (gScore + hScore + weight) to explore nodes.
 * The algorithm stops when the goal is reached or all nodes are explored.
 */
async function aStarSearch() {
  let priorityQueue = [board.start];
  board.start.hasBeenDiscovered = true;
  board.start.gScore = 0;

  while (priorityQueue.length > 0 && !interrupt) {
    let current = priorityQueue.splice(0, 1)[0];
    current.visitNode();

    if (current == board.goal) {
      await drawPath();
      return;
    }

    for (let pos of board.getNeighbors(current)) {
      let node = board.grid[pos[0]][pos[1]];

      if (interrupt) {
        return;
      }

      if (node.hasBeenDiscovered == false && node.isWall == false) {
        node.discoverNode(current);
        node.gScore = current.weight + current.gScore + 1;
        insertPriorityQueueAStar(priorityQueue, node);
        await sleep(1000 / fps);
      }
    }
  }
}
