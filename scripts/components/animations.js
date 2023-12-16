//Side panel animation
document.addEventListener("DOMContentLoaded", function () {
  const sidePanel = document.querySelector(".side-panel");
  const toggleBtn = document.getElementById("toggle-btn");
  const closeBtn = document.getElementById("close-btn");
  const compareAlgoButton = document.getElementById("compare-algo-button");
  const winExitButton = document.querySelector(".window-exit-btn");

  const soundOff = document.getElementById("sound-off");
  const soundOn = document.getElementById("sound-on");

  toggleBtn.style.backgroundColor = theme_color;
  sidePanel.style.backgroundColor = theme_color;

  // Toggle side panel visibility
  toggleBtn.addEventListener("click", function () {
    sidePanel.style.left = "0";
    sidePanel.style.display = "block";
    closeBtn.style.display = "block";
    toggleBtn.style.display = "none";
    toggleBtn.style.backgroundColor = theme_color;
  });

  // Close side panel
  closeBtn.addEventListener("click", function () {
    sidePanel.style.left = "-15%";
    sidePanel.style.display = "none";
    closeBtn.style.display = "none";
    toggleBtn.style.display = "block";
  });

  soundOn.addEventListener("click", function () {
    soundOff.style.display = "block";
    soundOn.style.display = "none";
    configurations.isMuted = true;
  });

  soundOff.addEventListener("click", function () {
    soundOn.style.display = "block";
    soundOff.style.display = "none";
    configurations.isMuted = false;
  });

  compareAlgoButton.addEventListener("click", function () {
    compareAlgorithms(elements_array);
  });

  winExitButton.addEventListener("click", function () {
    showDisplay("#visualize-canvas");
    showDisplay(".side-panel-button");
    hideDisplay(".window");
  });
});

/**
 * Animates the sorting process based on the selected algorithm.
 */
function animate() {
  funcs = sortingStates[configurations.algorithm]();
  funcs.forEach((action, i) => {
    timers.push(
      setTimeout(() => {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        console.log(action); //printing what action is being performed at the time in console
        sortActionsMap[action.type](action);
        lines.forEach((l) => l.draw(ctx));
        resetSpecifiedColor("yellow");
        resetSpecifiedColor("red");
        if (i === funcs.length - 1) {
          sortStatus.style.color = custom_green;
          sortStatus.innerHTML =
            " Your complete list is sorted. <strong style='display:block; font-size:1.6em'>Yayy!!!</strong>";
          if (!configurations.isMuted) {
            playAudio("finish");
          }
        }
      }, configurations.speed * i)
    );
  });
}
