const sortActions = {
    swap: (i, j) => ({ type: "swap", index: [i, j] }),
    sorted: (i) => ({ type: "sorted", index: i }),    // element at index 'i' sorted
    comparing: (i, j) => ({ type: "comparing", index: [i, j] }), //elements at index i and j being compared
    pivot: (i, j) => ({ type: "pivot", index: i }), //pivot element during quicksort algorithm
  };
  
const sortActionsMap = {
sorted: (action) => {
    const i = action.index;
    lines[i].color = custom_green;
},
swap: (action) => {
    const [i, j] = action.index;
    let tmp = lines[i].getValue();
    lines[i].setValue(lines[j].getValue(), "red");
    lines[j].setValue(tmp, "yellow");
},
comparing: (action) => {
    const [i, j] = action.index;
    numberOfCompares.innerText = 1 + Number(numberOfCompares.innerText);
    if (lines[i].color !== custom_green && lines[i].color !== custom_pivot){
    lines[i].color = "blue";}
    if (lines[j].color !== custom_green && lines[j].color !== custom_pivot){
    lines[j].color = "blue";}
},
pivot: (action) => {
    const i = action.index;
    lines[i].color = custom_pivot;
},
};


