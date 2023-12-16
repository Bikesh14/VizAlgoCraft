function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
}

async function runAlgorithmWithDelay(algorithm, elements_array, timeElementId) {
  let startMicroTime = performance.now();
  algorithm([...elements_array]);
  let endMicroTime = performance.now();
  configurations.executionTime[algorithm.name] = (
    endMicroTime - startMicroTime
  ).toFixed(10);

  // Update the time element
  const timeElement = document.getElementById(timeElementId);
  if (timeElement) {
    timeElement.innerText = configurations.executionTime[algorithm.name];
  }

  // Introduce a 1-second delay between algorithms
  await sleep(1000);
}
