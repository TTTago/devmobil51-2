import Circle from "./class/CircleVerlet";
import { TAU, getRandomInt } from "./utils/math";
import MainLoop from "./utils/mainloop";

const ctx = document.querySelector('canvas').getContext('2d');

// set canvas size to match the parent container
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;


const circles = [];
for (let i = 0; i < 100; i++) {
  const radius = getRandomInt(3, 80);
  circles.push(new Circle({
    x: Math.random() * ctx.canvas.width,
    y: Math.random() * ctx.canvas.height,
    speed: radius / 10 * 20,
    dir: 0,
    radius,
    color: `hsl(${Math.random() * 360}, 75%, 50%)`,
  }));
}
// circles.push(new Circle({
//   x: ctx.canvas.width / 2,
//   y: ctx.canvas.height / 2,
//   radius: 50,
//   color: "tomato"
// }));

circles.sort((c1, c2) => c1.compareTo(c2));

MainLoop.setUpdate((dt) => {
  for (const circle of circles) {
    circle.applyForceY(0.003);
    circle.move(dt);
    circle.constraintBox(ctx.canvas.width, ctx.canvas.height);
  }
});

MainLoop.setDraw((dt) => {
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  for (const circle of circles) circle.draw(ctx);
});

MainLoop.start();

// function tick(timestamp) {
//   // Main animation loop
//   requestAnimationFrame(tick);

//   const dt = timestamp - lastTick;
//   lastTick = timestamp;


//   if (dt < 1000 / 30) {
//     // do nothing
//     return;
//   }

//   // Manage user input
//   let angle = false;
//   if (keyboard.isKeyDown("KeyW")) {
//     angle = TAU * 0.75;
//   } else if (keyboard.isKeyDown("KeyS")) {
//     angle = TAU * 0.25;
//   }
//   // Update the world
//   if (angle !== false) {
//     for (const circle of circles) {
//       circle.setDirection(angle);
//       circle.move(dt);
//     }
//   }

//   // Render the WORLD
//   ctx.canvas.width = ctx.canvas.clientWidth;
//   ctx.canvas.height = ctx.canvas.clientHeight;
//   for (const circle of circles) circle.draw(ctx);
// }

// let lastTick = 0;
// requestAnimationFrame(tick);