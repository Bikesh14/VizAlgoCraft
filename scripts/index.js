const canvas = document.getElementById("visualize-canvas");
canvas.width = innerWidth/2;
canvas.height = innerHeight/2;
const ctx = canvas.getContext("2d");

let notCalledYet = true;
// const compares = document.getElementById("compare-count");
let lines = [];

// const elements_array = [100, 80, 1000, 200, 300, 500, 600, ];
const elements_array = randomArrayGenerator(configurations.number_of_elements);


const lineWidth = calcBarWidth(elements_array.length);
const initLines = () => {
//forEach takes (value, index, Entire_list)
  elements_array.forEach((v, i) => {
    lines.push(
      new Bar(
        lineWidth * i + i,
        0,
        lineWidth,
        v * calcLineHeightMultiplier(elements_array),
        this.color
      )
    );
  });
};

initLines();
lines.forEach((l) => l.draw(ctx));
