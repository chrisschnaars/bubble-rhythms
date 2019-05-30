/************************************************
CANVAS SETUP
************************************************/

// ORB CANVAS SETUP
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// CANVAS HEIGHT AND WIDTH
let cw, ch;

// LOOPING FLAG
let looping = true;

// SET ORB CANVAS SIZE
function setCanvasSize() {
  // SET WIDTH
  cw = window.innerWidth || document.body.clientWidth;

  // SET HEIGHT (SANS CONTROL BAR)
  let height = window.innerHeight || document.body.clientWidth;
  let controlBarHeight = document.querySelector('#control-bar').offsetHeight;
  ch = height - controlBarHeight;

  // SET WIDTH AND HEIGHT
  canvas.width = cw;
  canvas.height = ch;
}

/************************************************
CANVAS ANIMATION
************************************************/

// ANIMATION LOOP
function drawOrbs() {
  // CLEAR BACKGROUND
  ctx.clearRect(0,0, canvas.width, canvas.height);

  // DISPLAY TONE ORBS
  for (let i=0; i<orbs.length; i++) {
    orbs[i].display(ctx, offCanvas);
    orbs[i].update();
    orbs[i].checkIntersect(toneblocks);
  }

  // console.log(orbs[0].playing);
  // GRID DEBUG
  // showGrid();

  // UPDATE ANIMATION
  if (looping) {
    window.requestAnimationFrame(drawOrbs);
  }
}

// TOGGLE LOOPING
function togglePlaying() {
  // DOM ELEMENTS
  const playToggle = document.querySelector('#play-toggle');

  // TOGGLE PLAYING
  if (looping) {
    // TOGGLE BUTTON CLASS
    playToggle.classList.remove("pause-btn");
    playToggle.classList.add("play-btn");
    looping = false;
  } else {
    playToggle.classList.remove("play-btn");
    playToggle.classList.add("pause-btn");
    looping = true;
    drawOrbs();
  }
}
