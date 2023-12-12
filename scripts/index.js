const canvas = document.getElementById("visualize-canvas");
canvas.width = innerWidth / 2;
canvas.height = innerHeight / 2;
const ctx = canvas.getContext("2d");
let notCalledYet = true;
const numberOfCompares = document.getElementById("compare-count");
let lines = [];
let elements_array = [100, 80, 10, 200, 300, 50, 600];
// const elements_array = randomArrayGenerator(configurations.number_of_elements);

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
let timers = [];

Array.from(document.getElementsByClassName("sort-buttons")).forEach(
  (option) => {
    option.onclick = () => {
      configurations.algorithm = option.getAttribute("data-value");
      if (!notCalledYet) {
        // reset canvas
        timers.forEach((id) => clearTimeout(id));
        timers = [];
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        lines = [];
        elements_array = randomArrayGenerator(
          configurations.number_of_elements
        );
        initLines();
        numberOfCompares.innerText = "";
      }
      animate();
      notCalledYet = false;
    };
  }
);

//------------------------

lines.forEach((l) => l.draw(ctx));

//-----------------------------
