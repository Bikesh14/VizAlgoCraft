/**
 * Performs the bubble sort algorithm on an array and generates sorting actions.
 * @param {number[]} array - The array to be sorted.
 * @returns {Object[]} - An array of sorting actions representing the steps of the algorithm.
 */
const bubbleSort = (array) => {
    let actions = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length-1; j++) {
        actions.push(sortActions.comparing(j, j + 1));
        if (array[j] > array[j + 1]) {
          let tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;
          actions.push(sortActions.swap(j, j + 1));
        }
      }
      actions.push(sortActions.sorted(array.length - i - 1));
    }
    return actions;
  };
  