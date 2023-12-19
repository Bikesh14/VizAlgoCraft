canvas.width = innerWidth;
canvas.height = innerHeight / 2;
let notCalledYet = true;
const numberOfCompares = document.getElementById("compare-count");
const sortStatus = document.getElementById("sort-status");

let lines = [];
// let elements_array = [100, 80, 30, 200, 300, 50, 600];
let elements_array = randomArrayGenerator(configurations.number_of_elements);

//this is the main function for sort visualization
function visualizeBars() {
  c = new Canvas(elements_array);
  c.initLines();
  let timers = [];
  lines.forEach((l) => l.draw(ctx));
}

hideDisplay(".sort-section");
showLoading();
setTimeout(function () {
  showDisplay(".sort-section");
  visualizeBars(); // Call the function after 1 second
  hideLoading(); // Hide loading screen after your function is done
}, 100);

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

document
  .getElementById("speed-options")
  .addEventListener("change", function () {
    const selectedOption = this.value;
    switch (selectedOption) {
      case "fast":
        configurations.speed = 150;
        break;
      case "medium":
        configurations.speed = 400;
        break;
      case "slow":
        configurations.speed = 800;
        break;
      case "very-slow":
        configurations.speed = 1800;
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

  // Generate a random array with the specified number of elements
  elements_array = randomArrayGenerator(configurations.number_of_elements);
  visualizeBars();
});

let timers = [];

sortButton.addEventListener("click", function () {
  sortButton.style.display = "none";
  reloadButton.style.display = "block";
  const algorithmSelection = document.getElementById("sort-algorithm");
  const speedSelection = document.getElementById("speed-options");
  const arrayOptionsSelection = document.getElementById("array-options");
  const randomArraySection = document.getElementById("random-array-section");
  const customArraySection = document.getElementById("custom-array-section");
  const switchModeButton = document.getElementById("switch-mode-button");

  const selectedAlgorithm = document.getElementById("sort-algorithm").value;
  const elementsToDisable = [
    algorithmSelection,
    speedSelection,
    arrayOptionsSelection,
    randomArraySection,
    customArraySection,
    switchModeButton,
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
