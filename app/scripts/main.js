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
  // SET ONBOARDING COLOR
  setOnboardColor();

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
  document.querySelector('#begin-cta').addEventListener('click', function(e) {
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

function endOnboarding() {
  // ONBOARDING CONTAINER
  const ob = document.querySelector('.onboarding-container');
  // ADD HIDDEN CLASS
  ob.classList.add('onboarding-container-hidden');
  // TOGGLE ONBOARDING FLAG
  onboarding = false;
}
