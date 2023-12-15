const configurations = {
  algorithm: "",
  number_of_elements: 15,
  speed: 200,
  start: false,
  totalAnimationTime: null,
  executionTime: {
    bubbleSort: null,
    insertionSort: null,
    quickSort: null,
  },
  isMuted: false,
};

const uniques = (a) => Array.from(new Set([...a]));
const isSorted = (elements_array, i) =>
  elements_array[i].color === custom_green;

const sortingStates = {
  bubble: () => bubbleSort(elements_array),
  selection: () => selectionSort(elements_array),
  quick: () => quickSortActions(uniques(elements_array)),
};
