const quickSortActions = ([...array]) => {
  const actions = [];

  function swap(items, firstIndex, secondIndex) {
    actions.push(sortActions.swap(firstIndex, secondIndex));
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
  }

  function partition(items, left, right) {
    const pivotIndex = Math.floor((right + left) / 2);
    let pivot = items[pivotIndex];
    let i = left;
    let j = right;

    while (i <= j) {
      while (items[i] < pivot) {
        i++;
        actions.push(sortActions.comparing(pivotIndex, i));
      }

      while (items[j] > pivot) {
        j--;
        actions.push(sortActions.comparing(pivotIndex, j));
      }

      if (i <= j) {
        swap(items, i, j);
        i++;
        j--;
      }
    }

    return i;
  }

  function quickSort(items, left, right) {
    let index;

    if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;

      index = partition(items, left, right);
      actions.push(sortActions.pivot(index));
      if (left < index - 1) {
        quickSort(items, left, index - 1);
      }

      if (index < right) {
        quickSort(items, index, right);
      }
    }
    actions.push(sortActions.sorted(index));
    return items;
  }

  let startMicroTime = performance.now();
  quickSort(array);
  actions.push(sortActions.sorted(0));
  let endMicroTime = performance.now();
  configurations.executionTime.quickSort = (
    endMicroTime - startMicroTime
  ).toFixed(10);
  console.log(
    "time from execting side Quick SOrt",
    configurations.executionTime.quickSort
  );
  console.log("original array--", elements_array);
  console.log("Sorted array--", array);
  return actions;
};
