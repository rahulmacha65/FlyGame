import { updateBird, setupBird, getBirdRect } from "./bird.js";
import {
  updatePipes,
  setupPipes,
  getPassedPipeCount,
  getPipeRects,
} from "./pipe.js";

document.addEventListener("keypress", handleStart, { once: true });
const title = document.querySelector("[data-title]");
const subtitle = document.querySelector("[data-subtitle]");

let lastTime;
function updateLoop(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
    return;
  }
  const delta = time - lastTime;
  updateBird(delta);
  updatePipes(delta);
  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(updateLoop);
}
function checkLose() {
  const birdRect = getBirdRect();
  const insidePipe = getPipeRects().some((rect) => isCollision(birdRect, rect));
  const outSideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;
  return outSideWorld || insidePipe;
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}
function handleStart() {
  title.classList.add("hide");
  setupBird();
  setupPipes();
  lastTime = null;
  window.requestAnimationFrame(updateLoop);
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove("hide");
    subtitle.classList.remove("hide");
    if (getPassedPipeCount() == 1) {
      subtitle.textContent = `${getPassedPipeCount()} Pipe Passed`;
    } else {
      subtitle.textContent = `${getPassedPipeCount()} Pipes Passed`;
    }
    document.addEventListener("keypress", handleStart, { once: true }); // To Restart the Game
  }, 100);
}
