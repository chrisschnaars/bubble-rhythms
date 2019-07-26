// Tone Orbs
// Chris Schnaars

// OPERATING FLAGS
let onboarding = true;

// ORB SETTINGS
const numOrbs = 5;
const orbSize = 40;

// TONE BLOCK SETTINGS
const numBeats = 8;
const toneBlockSize = 24;

//  GRID POSITION ARRAYS
let yPos = []; // GRID Y POSITIONS
let xPos = []; // GRID X POSITIONS

// INITIALIZE
window.onload = function() {

  // INITIALIZE CANVAS
  setCanvasSize();
  setupGrid();

  // CREATE ORBS
  createOrbs();
  createToneBlocks();
  createOffscreenCanvas();

  // SETUP INTERACTION
  setupInteraction();

  // EVENT LISTENER FOR ONBOARDING CTA
  document.querySelector('.js-onboarding-cta').addEventListener('click', function(e) {
    if (onboarding) {
      startBubbleRhythms();
    }
  }, false);
}

// START AUDIO AND ANIMATION
function startBubbleRhythms() {
  // SETUP AUDIO
  setupAudioPlayback()
  // START ANIMATION
  drawOrbs();
  // END ONBOARDING
  endOnboarding();
}
