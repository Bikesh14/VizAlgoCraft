const configurations = {
  algorithm: "",
  number_of_elements: 10,
  speed: 500,
  start: false,
};

const uniques = (a) => Array.from(new Set([...a]));
const isSorted = (elements_array, i) =>
  elements_array[i].color === custom_green;

const sortingStates = {
  bubble: () => bubbleSort(elements_array),
  selection: () => selectionSort(elements_array),
  quick: () => quickSortActions(uniques(elements_array)),
};
