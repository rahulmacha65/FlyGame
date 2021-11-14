const birdElem = document.querySelector("[data-bird]");
const BIRD_SPEED = 0.5;
const JUMP_DURATION = 125;
let timeSinceLastJump = Number.POSITIVE_INFINITY;

export function setupBird() {
  setTop(window.innerHeight / 2);
  document.removeEventListener("keydown", handleJump);
  document.addEventListener("keydown", handleJump);
}
export function updateBird(delta) {
  if (timeSinceLastJump < JUMP_DURATION) {
    setTop(getTop() - BIRD_SPEED * delta); //moves the bird down
  } else {
    setTop(getTop() + BIRD_SPEED * delta); //moves the bird up
  }
  timeSinceLastJump += delta; //increases timeSinceLastJump
}

export function getBirdRect() {
  return birdElem.getBoundingClientRect(); //gives the postion(top,left,right,buttom) of bird
}
function setTop(top) {
  birdElem.style.setProperty("--bird-top", top);
}

function getTop() {
  return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"));
}

function handleJump(e) {
  if (e.code !== "Space") return;

  timeSinceLastJump = 0; // entering space makes it zero
}
