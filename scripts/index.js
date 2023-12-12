const canvas = document.getElementById("visualize-canvas");
canvas.width = innerWidth / 2;
canvas.height = innerHeight / 2;
const ctx = canvas.getContext("2d");
let notCalledYet = true;
const numberOfCompares = document.getElementById("compare-count");

// function updateArray() {
//   const customArray = document.getElementById("custom-array").value.trim();
//   try {
//     elements_array = JSON.parse(customArray);
//     console.log(elements_array);
//     console.log(typeof elements_array);
//     initLines();
//     animate();
//     console.log("Updated Array:", elements_array);
//   } catch (error) {
//     console.error(error);
//   }
// }

let lines = [];
let elements_array = [100, 80, 10, 200, 300, 50, 600];
// const elements_array = randomArrayGenerator(configurations.number_of_elements);

const lineWidth = calcBarWidth(elements_array.length);

const initLines = () => {
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

const customArraySection = document.getElementById("custom-array-section");
document
  .getElementById("array-options")
  .addEventListener("change", function () {
    const selectedOption = this.value;
    if (selectedOption === "custom") {
      customArraySection.style.display = "block";
    } else {
      customArraySection.style.display = "none";
    }
  });

initLines();
let timers = [];

document.getElementById("sort-button").addEventListener("click", function () {
  const selectedAlgorithm = document.getElementById("sort-algorithm").value;
  console.log("selectedAlgorithm:", selectedAlgorithm);
  configurations.algorithm = selectedAlgorithm;

  if (!notCalledYet) {
    // reset canvas
    timers.forEach((id) => clearTimeout(id));
    timers = [];
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    lines = [];

    // if (selectedAlgorithm === "random") {
    //   // Handle random array case if needed
    // } else if (selectedAlgorithm === "input") {
    // }

    initLines();
    numberOfCompares.innerText = "";
  }

  animate();
  notCalledYet = false;
});

lines.forEach((l) => l.draw(ctx));

//-----------------------------
