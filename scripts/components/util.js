const randomArrayGenerator = (number_of_elements=5) => {
    let arr = [];
    for (let i = 1; i <= number_of_elements; i++) arr.push(i);
    return arr.sort((a, b) => (Math.random() > 0.5 ? 1 : -1));  //While sorting,returning 1 changes the order of two elements, -1 preserves the order
  };
  

  // window.addEventListener('resize', () => {
  //   // Recalculate and update the lineWidth when the window is resized
  //   canvas.width = innerWidth/2
  //   canvas.height = innerHeight/4;
  //   calcBarWidth();
  //   initLines();
  //   animate()
  //   // Do something with the newLineWidth, e.g., update your visualization
  // });

const calcBarWidth = (array_length) => {
  return (
    Math.floor(canvas.width /array_length)
  );
};
const calcLineHeightMultiplier = (elements) => {

  let maxValue= Math.max(...elements)
  return canvas.height/maxValue
};


// function animate() {
//   sortingStates[settings.algorithm]().forEach((action, i) => {
//     timers.push(
//       setTimeout(() => {
//         ctx.clearRect(0, 0, innerWidth, innerHeight);
//         actionsMap[action.type](action);
//         lines.forEach((l) => l.draw(ctx));
//         resetSpecifiedColor("yellow");
//         resetSpecifiedColor("red");
//       }, settings.speed * i)
//     );
//   });
// }
