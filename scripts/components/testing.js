// Easing function
function easeOutQuart(t) {
  return 1 - --t * t * t * t;
}

class Rectangle {
  constructor(x, y, width, value, color = theme_color) {
    this.x = x;
    this.y = y + 30;
    this.width = width;
    this.value = value;
    this.height = value * calcLineHeightMultiplier(elements_array);
    this.color = color;
    this.animationId = null;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  animateBar(ctx, newX, duration) {
    const startTime = performance.now();
    const initialX = this.x;
    const finalX = newX;

    const updateFrame = () => {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easedProgress = easeOutQuart(progress);
        this.x = initialX + (finalX - initialX) * easedProgress;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw(ctx);

        this.animationId = requestAnimationFrame(updateFrame);
      } else {
        this.x = finalX;
      }
    };

    updateFrame();
  }

  stopAnimation() {
    cancelAnimationFrame(this.animationId);
  }
}

// Example usage:
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const rectangle1 = new Rectangle(10, 50, 50, 5, "blue");
const rectangle2 = new Rectangle(100, 50, 50, 8, "green");

rectangle1.animateBar(ctx, rectangle1.x + 100, 1000); // Move the first
