const selectionSort = ([...array]) => {
  const actions = [];
  let startMicroTime = performance.now();

  for (var i = 0; i < array.length; i++) {
    let min = i; //  storing the index of minimum element

    for (var j = i + 1; j < array.length; j++) {
      actions.push(sortActions.comparing(min, j));
      if (array[min] > array[j]) {
        min = j; // updating the index of minimum element
      }
    }
    actions.push(sortActions.comparing(i, min));
    if (i !== min) {
      let temp = array[i];
      actions.push(sortActions.swap(i, min));

      array[i] = array[min];
      array[min] = temp;
    }
    actions.push(sortActions.sorted(i));
  }
  let endMicroTime = performance.now();
  configurations.executionTime.selectionSort = (
    endMicroTime - startMicroTime
  ).toFixed(10);
  console.log(
    "time from execting side selection SOrt",
    configurations.executionTime.selectionSort
  );
  console.log("original array--", elements_array);
  console.log("Sorted array--", array);
  return actions;
  return actions;
};
