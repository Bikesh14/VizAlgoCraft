function selectionSort([...elements_array]) {
  const actions = [];
  let startMicroTime = performance.now();

  for (var i = 0; i < elements_array.length; i++) {
    let min = i; //  storing the index of minimum element

    for (var j = i + 1; j < elements_array.length; j++) {
      actions.push(sortActions.comparing(min, j));
      if (elements_array[min] > elements_array[j]) {
        min = j; // updating the index of minimum element
      }
    }
    actions.push(sortActions.comparing(i, min));
    if (i !== min) {
      let temp = elements_array[i];
      actions.push(sortActions.swap(i, min));

      elements_array[i] = elements_array[min];
      elements_array[min] = temp;
    }
    actions.push(sortActions.sorted(i));
  }
  let endMicroTime = performance.now();
  configurations.executionTime.selectionSort = (
    endMicroTime - startMicroTime
  ).toFixed(6);
  return actions;
}
