function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Compares the execution times of different sorting algorithms on a given array of elements.
 *
 * @param {Array} elements_array - The array of elements to be sorted and compared.
 * @returns {Promise} - A promise that resolves once all algorithms are executed and compared.
 */

async function compareAlgorithms(elements_array) {
  showLoading();
  await runAlgorithmWithDelay(bubbleSort, elements_array, "bubble-sort-time");

  // Selection Sort
  await runAlgorithmWithDelay(
    selectionSort,
    elements_array,
    "selection-sort-time"
  );

  // Quick Sort
  await runAlgorithmWithDelay(
    quickSortActions,
    elements_array,
    "quick-sort-time"
  );
  hideLoading();
  // Display original array
  originalArray = document.getElementById("original-array");
  originalArray.innerText = elements_array.join(", "); //gives space between number and comma

  hideDisplay("#visualize-canvas");
  hideDisplay(".side-panel-button");
  hideDisplay(".side-panel");
  showDisplay(".window");
  hideDisplay("#compare-btn");
  hideDisplay(".navbar");
  hideDisplay(".sound-on-off");
}

/**
 * Runs a sorting algorithm with a delay, updates the execution time, and displays it.
 *
 * @param {function} algorithm - The sorting algorithm function to be executed.
 * @param {Array} elements_array - The array of elements to be sorted.
 * @param {string} timeElementId - The HTML element ID to display the execution time.
 * @returns {Promise} - A promise that resolves after the algorithm is executed with a delay.
 */
async function runAlgorithmWithDelay(algorithm, elements_array, timeElementId) {
  let startMicroTime = performance.now();
  algorithm([...elements_array]);
  let endMicroTime = performance.now();
  configurations.executionTime[algorithm.name] = (
    endMicroTime - startMicroTime
  ).toFixed(14);

  // Update the time element
  const timeElement = document.getElementById(timeElementId);
  if (timeElement) {
    timeElement.innerText = configurations.executionTime[algorithm.name];
  }
  // Introduce a 1-second delay between algorithms
  await sleep(1000);
}
