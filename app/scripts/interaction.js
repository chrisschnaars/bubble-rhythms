/************************************************
INTERACTIVITY
************************************************/

// DOM ELEMENTS
const playToggle = document.querySelector('.js-play-toggle');

// SET UP EVENT LISTENERS //
function setupInteraction() {

  // CANVAS RESIZE
  window.addEventListener('resize', function(e) {
    setCanvasSize();
    setupGrid();
    setOrbPosition();
  }, false);

  // TONE BLOCK CLICK
  for (let i=0; i<toneblocks.length; i++) {
    toneBlockDivs[i].addEventListener("click", function(e) {
      // e.preventDefault();
      let id = e.target.getAttribute("id");
      toneblocks[id].toggle();
    }, false);
  }

  // PLAY/PAUSE BUTTON
  playToggle.addEventListener("click", function(e) {
    togglePlaying();
    // e.preventDefault()
    e.target.blur();
  },false);
  playToggle.addEventListener("touchend", function(e) {
    togglePlaying();
    e.preventDefault();
  },false);

  // SOUND SELECTOR
  document.querySelector('.js-sound-selector').addEventListener('click', function(e){
    let id = e.target.value;
    setWave(id);
    updateToggleStatus(e);
  }, false);

  // MOBILE SOUND SELECTOR
  let ssm = document.querySelector(".js-sound-selector-mini");
  ssm.addEventListener('click', function(e){
    setWave(null);
    e.target.blur();
  }, false);

  // REFRESH SPEEDS BUTTON
  document.querySelector(".js-refresh-btn").addEventListener('click', function(e){
    setOrbSpeeds();
    e.target.blur();
  }, false);

  // CLEAR BUTTON
  document.querySelector(".js-clear-btn").addEventListener('click', function(e){
    clearToneBlocks();
    e.target.blur();
  }, false);

  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector(".js-about-open-btn").addEventListener("click", function() {
    document.querySelector(".about").classList.add("about--visible");
  }, false);

  // CLOSE ABOUT TOGGLEL
  document.querySelector(".js-about-close-btn").addEventListener("click", function() {
    document.querySelector(".about").classList.remove("about--visible");
  }, false);
}

// KEYBOARD EVENTS
document.addEventListener('keydown', function(e) {
  // TOGGLE PLAYING
  if (e.key == " " || e.key == "Spacebar") {
    togglePlaying();
  }

  // RANDOM SELECTION
  if (e.key == "Q" || e.key == "q") {
    setRandomBlocks();
  }

  // TABBING
  if (e.key === 'Tab') { // the "I am a keyboard user" key
      document.body.classList.add('user-is-tabbing');
      // window.removeEventListener('keydown', handleFirstTab);
  }
});


/************************************************
TOGGLE GROUP UPDATES
************************************************/

// UPDATE TOGGLE BUTTON GROUP FOR ACTIVE SELECTION
function updateToggleStatus(e) {
  // REMOVE SELECTED CLASS FROM ALL TOGGLES
  let toggleButtons = document.querySelectorAll('.btn--toggle');
  for (let i=0; i<toggleButtons.length; i++) {
    toggleButtons[i].classList.remove('btn--toggle-selected');
  }

  // ADD SELECTED CLASS TO SELECTED
  e.target.classList.add('btn--toggle-selected');
}
