const sortActions = {
  swap: (i, j) => ({ type: "swap", index: [i, j] }),
  sorted: (i) => ({ type: "sorted", index: i }), // element at index 'i' sorted
  comparing: (i, j) => ({ type: "comparing", index: [i, j] }), //elements at index i and j being compared
  pivot: (i, j) => ({ type: "pivot", index: i }), //pivot element during quicksort algorithm
};

const sortActionsMap = {
  /**
   * Handles a sorted action by updating the color of the corresponding line.
   * @param {Object} action - The sorted action object.
   */
  sorted: (action) => {
    const i = action.index;
    sortStatus.style.color = custom_green;
    sortStatus.innerText = lines[i].getValue() + " is sorted.";
    lines[i].color = custom_green;
    sortStatus.style.color = custom_black;
  },

  /**
   * Handles a swap action by visually swapping values and colors of two lines.
   * @param {Object} action - The swap action object.
   */
  swap: (action) => {
    const [i, j] = action.index;
    sortStatus.innerHTML =
      "<br>Swap Action: array[" +
      (i + 1) +
      "]+ " +
      "array[" +
      (j + 1) +
      "] <br>" +
      "Swapping values " +
      lines[i].getValue() +
      " and " +
      lines[j].getValue();
    playAudio("swap");
    let tmp = lines[i].getValue();
    lines[i].setValue(lines[j].getValue(), "red");
    lines[j].setValue(tmp, "yellow");
  },

  /**
   * Handles a comparing action by updating colors and counting comparisons.
   * @param {Object} action - The comparing action object.
   */
  comparing: (action) => {
    const [i, j] = action.index;
    sortStatus.innerHTML =
      "<br>Swap Action: array[" +
      (i + 1) +
      "]+ " +
      "array[" +
      (j + 1) +
      "] <br>" +
      "Comparing values " +
      lines[i].getValue() +
      " and " +
      lines[j].getValue();
    numberOfCompares.innerText = 1 + Number(numberOfCompares.innerText);
    if (lines[i].color !== custom_green && lines[i].color !== custom_pivot) {
      lines[i].color = "blue";
    }
    if (lines[j].color !== custom_green && lines[j].color !== custom_pivot) {
      lines[j].color = "blue";
    }
  },

  /**
   * Handles a pivot action during the quicksort algorithm by updating the color.
   * @param {Object} action - The pivot action object.
   */
  pivot: (action) => {
    const i = action.index;
    sortStatus.innerText = "Setting pivot: " + lines[i].getValue();
    lines[i].color = custom_pivot;
  },
};
