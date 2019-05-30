/************************************************
CANVAS SETUP
************************************************/

// OFFSCREEN CANVAS
let offCanvas = document.createElement('canvas');
let offContext = offCanvas.getContext('2d');

// CREATE OFFSCREEN CANVAS
function createOffscreenCanvas() {
  // SETUP
  offCanvas = document.createElement('canvas');
  offCanvas.width = orbSize * numOrbs;
  offCanvas.height = orbSize;
  offContext = offCanvas.getContext('2d');

  // DRAW TONE ORBS
  for (let i=0; i<orbs.length; i++) {
    orbs[i].render(offContext);
  }
}
