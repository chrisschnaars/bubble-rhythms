/************************************************
INTERACTIVITY
************************************************/

// DOM ELEMENTS
const playToggle = document.querySelector('#play-toggle');

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
  document.querySelector('.sound-selector').addEventListener('click', function(e){
    let id = e.target.value;
    setWave(id);
    updateToggleStatus(e);
  }, false);

  // MOBILE SOUND SELECTOR
  let ssm = document.querySelector("#sound-selector-mini");
  ssm.addEventListener('click', function(e){
    setWave(null);
    e.target.blur();
  }, false);

  // REFRESH SPEEDS BUTTON
  document.querySelector("#refresh-btn").addEventListener('click', function(e){
    setOrbSpeeds();
    e.target.blur();
  }, false);

  // CLEAR BUTTON
  document.querySelector("#clear-btn").addEventListener('click', function(e){
    clearToneBlocks();
    e.target.blur();
  }, false);

  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector("#about-modal-open").addEventListener("click", function(e) {
    document.querySelector("#about-modal").classList.add("visible");
    e.target.blur();
  }, false);

  // CLOSE ABOUT TOGGLE
  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector("#about-modal-close").addEventListener("click", function(e) {
    document.querySelector("#about-modal").classList.remove("visible");
    e.target.blur();
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
    console.log("random!");
    setRandomBlocks();
  }

  // TABBING
  if (e.key === 'Tab') { // the "I am a keyboard user" key
      console.log('tab key man');
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
  let toggleButtons = document.querySelectorAll('.toggle');
  for (var i=0; i<toggleButtons.length; i++) {
    toggleButtons[i].classList.remove('selected');
  }

  // ADD SELECTED CLASS TO SELECTED
  e.target.classList.add( "selected" );
}
