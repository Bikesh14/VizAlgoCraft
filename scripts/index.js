const canvas = document.getElementById("visualize-canvas");
canvas.width = innerWidth / 2;
canvas.height = innerHeight / 2;
const ctx = canvas.getContext("2d");
let notCalledYet = true;
const numberOfCompares = document.getElementById("compare-count");

let lines = [];
let elements_array = [100, 80, 30, 200, 300, 50, 600];
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

// function basicSetup(elements_array){

// }
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

const speedSelection = document.getElementById("custom-array-section");
document
  .getElementById("speed-options")
  .addEventListener("change", function () {
    const selectedOption = this.value;
    console.log("Speed", selectedOption);
    switch (selectedOption) {
      case "fast":
        configurations.speed = 200;
        break;
      case "medium":
        configurations.speed = 400;
        break;
      case "slow":
        configurations.speed = 800;
        break;
      case "very-slow":
        configurations.speed = 1600;
        break;
    }
  });

// const customArrayInput = document.getElementById("custom-array");

// customArrayInput.addEventListener("input", function () {
//   const enteredArrayString = this.value;

//   // Split the string into an array of strings
//   const enteredArray = enteredArrayString.split(",");

//   // Convert the array of strings to an array of integers
//   const numericArray = enteredArray.map((element) =>
//     parseInt(element.trim(), 10)
//   );

//   // Check if all elements are valid integers
//   if (numericArray.every((element) => Number.isInteger(element))) {
//     // Rewrite elements_array with the new array of integers
//     elements_array = numericArray;

//     // Render Initlines (replace this with your rendering logic)
//     initLines();
//     lines.forEach((l) => l.draw(ctx));
//   } else {
//     console.log(
//       "Invalid array format. Please enter a valid array of integers separated by commas."
//     );
//   }
// });

const customArrayInput = document.getElementById("custom-array");
let timeoutId;

customArrayInput.addEventListener("input", function () {
  // Clear the previous timeout
  clearTimeout(timeoutId);

  // Timeout is set for better User Experience
  timeoutId = setTimeout(function () {
    const enteredArrayString = customArrayInput.value;
    // Split the string into an array of strings
    const enteredArray = enteredArrayString.split(",");
    // Convert the array of strings to an array of integers
    const numericArray = enteredArray.map((element) =>
      parseInt(element.trim(), 10)
    );
    // Check if all elements are valid integers
    if (numericArray.every((element) => Number.isInteger(element))) {
      // Rewrite elements_array with the new array of integers
      elements_array = numericArray;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      lines = [];

      // Render Initlines (replace this with your rendering logic)
      initLines();
      lines.forEach((l) => l.draw(ctx));
    } else {
      console.log(
        "Invalid array format. Please enter a valid array of integers separated by commas."
      );
    }
  }, 3000);
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
