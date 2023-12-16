const canvas = document.getElementById("visualize-canvas");
canvas.width = innerWidth / 1.3;
canvas.height = innerHeight / 2;
const ctx = canvas.getContext("2d");
let notCalledYet = true;
const numberOfCompares = document.getElementById("compare-count");
const sortStatus = document.getElementById("sort-status");

let lines = [];
// let elements_array = [100, 80, 30, 200, 300, 50, 600];
let elements_array = randomArrayGenerator(configurations.number_of_elements);

function visualizeBars() {
  c = new Canvas(elements_array);
  c.initLines();
  let timers = [];
  lines.forEach((l) => l.draw(ctx));
}
visualizeBars();

const customArraySection = document.getElementById("custom-array-section");
const randomArraySection = document.getElementById("random-array-section");

document
  .getElementById("array-options")
  .addEventListener("change", function () {
    const selectedOption = this.value;
    if (selectedOption === "custom") {
      customArraySection.style.display = "block";
      randomArraySection.style.display = "none";
    } else {
      customArraySection.style.display = "none";
      randomArraySection.style.display = "block";
    }
  });

// const speedSelection = document.getElementById("custom-array-section");
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
      visualizeBars();
    } else {
      console.log(
        "Invalid array format. Please enter a valid array of integers separated by commas."
      );
    }
  }, 1000);
});

const elementsCountSlider = document.getElementById("elements-count");
let timeoutNew;
elementsCountSlider.addEventListener("input", function () {
  configurations.number_of_elements = parseInt(this.value, 10);
  console.log("check?", configurations.number_of_elements);

  // Generate a random array with the specified number of elements
  elements_array = randomArrayGenerator(configurations.number_of_elements);
  console.log("Updated?", elements_array);
  visualizeBars();
});

let timers = [];
const sortButton = document.getElementById("sort-button");
const reloadButton = document.getElementById("reload-button");

sortButton.addEventListener("click", function () {
  sortButton.style.display = "none";
  reloadButton.style.display = "block";
  const algorithmSelection = document.getElementById("sort-algorithm");
  const speedSelection = document.getElementById("speed-options");
  const arrayOptionsSelection = document.getElementById("array-options");
  const randomArraySection = document.getElementById("random-array-section");
  const customArraySection = document.getElementById("custom-array-section");
  const toggleBtn = document.getElementById("toggle-btn"); //can keep them in constants file later
  const closeBtn = document.getElementById("close-btn");
  const compareAlgoButton = document.getElementById("compare-algo-button");

  const selectedAlgorithm = document.getElementById("sort-algorithm").value;
  const elementsToDisable = [
    algorithmSelection,
    speedSelection,
    arrayOptionsSelection,
    randomArraySection,
    customArraySection,
  ];
  elementsToDisable.forEach((element) => {
    element.style.pointerEvents = "none";
  });

  sidePanel = document.querySelector(".side-panel");
  toggleBtn.style.display = "none";
  closeBtn.style.display = "block";

  sidePanel.style.left = "0";
  sidePanel.style.display = "block";
  console.log("selectedAlgorithm:", selectedAlgorithm);

  const algorithmName = document.getElementById("algorithm-name");
  configurations.algorithm = selectedAlgorithm;
  algorithmName.innerText = configurations.algorithm.toUpperCase() + " Sort";

  if (!notCalledYet) {
    // reset canvas
    timers.forEach((id) => clearTimeout(id));
    timers = [];
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    lines = [];

    c.initLines();
    numberOfCompares.innerText = "";
  }
  animate();
});

reloadButton.addEventListener("click", function () {
  location.reload();
});
