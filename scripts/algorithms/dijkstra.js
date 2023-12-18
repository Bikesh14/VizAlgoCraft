/**
 * Inserts a node into the priority queue for Dijkstra's algorithm.
 *
 * @param {Object[]} priorityQueue - The priority queue containing nodes to be traversed.
 * @param {Object} node - The node to be inserted into the priority queue.
 */
async function insertpriorityQueueDijkstra(priorityQueue, node) {
  for (let i = 0; i < priorityQueue.length; i++) {
    if (
      node.gScore + node.weight <
      priorityQueue[i].gScore + priorityQueue[i].weight
    ) {
      priorityQueue.splice(i, 0, node);
      return;
    }
  }
  priorityQueue.push(node);
}

/**
 * Performs Dijkstra's algorithm to find the shortest path on the board.
 * Traverses nodes and discovers the optimal path from the start to the goal node.
 */
async function dijkstra() {
  let priorityQueue = [board.start];
  board.start.hasBeenDiscovered = true;

  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.grid[i][j].gScore = Infinity;
    }
  }
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
        node.gScore = current.gScore + current.weight;
        insertpriorityQueueDijkstra(priorityQueue, node);
        await sleep(1000 / fps);
      }
    }
  }
}
