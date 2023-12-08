const bubbleSort = (array) => {
    let actions = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
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
  