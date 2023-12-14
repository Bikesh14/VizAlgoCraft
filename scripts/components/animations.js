//Side panel animation
document.addEventListener("DOMContentLoaded", function () {
  const sidePanel = document.querySelector(".side-panel");
  const toggleBtn = document.getElementById("toggleBtn");
  const closeBtn = document.getElementById("closeBtn");
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
        console.log(action);
        sortActionsMap[action.type](action);
        lines.forEach((l) => l.draw(ctx));
        resetSpecifiedColor("yellow");
        resetSpecifiedColor("red");
        if (i === funcs.length - 1) {
          sortStatus.innerText = " Your complete list is sorted. Yayy!!!";
          playAudio("finish");
        }
      }, configurations.speed * i)
    );
  });
}
