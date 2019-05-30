/************************************************
TONE SETUP
************************************************/

// GLOBAL KEY VARIABLE
const key = 110;
const intervals = [ 1, 5/4, 4/3, 3/2, 2 ];

/************************************************
OSCILLATOR SETUP
************************************************/

// Create Audio Context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// OSCILLATOR
let osc;
let wave;
let selectedWave = celesteWave;
let currentWave = 0;

// GAIN
let masterGainNode;
let gainNode;

// TONE SETTINGS
let toneLength = 3;
let fadeInTime = 0.025;
let gainValue = 0.75;

// SETUP AUDIO
function setupAudioPlayback() {
  setupMasterGain();  // set master gain
  initOsc();  // initialize oscillators
}

// MASTER GAIN VALUE FOR ALL OSCILLATORS
function setupMasterGain() {
  // Master Gain
  masterGainNode = audioCtx.createGain();
  masterGainNode.connect(audioCtx.destination);
  masterGainNode.gain.value = gainValue;
}

// INITIALIZE OSCILLATOR
function initOsc() {
  // Setup Wave
  wave = audioCtx.createPeriodicWave(selectedWave.real, selectedWave.imag);

  // Oscillator
  osc = audioCtx.createOscillator();
  osc.setPeriodicWave(wave);

  // Gain Node
  gainNode = audioCtx.createGain();

  // Connect Oscillator tp Gain, Gain to Destination
  osc.connect(gainNode);
  gainNode.connect(masterGainNode);
}

// SET PERIODIC WAVE
function setWave(id) {
  // ARRAY OF ALL WAVETABLES
  const w = [ celesteWave, tromboneWave, organWave, bassWave, stringsWave ];
  // ARRAY OF LABEL NAMES
  const waveLabels = [ "Celeste", "Trombone", "Organ", "Bass", "Strings" ];

  // SET WAVE VALUE
  if (id != null) {
    selectedWave= w[id];
  } else {
    currentWave++;
    if (currentWave >= w.length) {
      currentWave = 0;
    }

    selectedWave = w[currentWave];
    document.querySelector('#sound-selector-mini-label').innerHTML = waveLabels[currentWave];
  }


  // UPDATE MINI BUTTON
}

// START OSCILLATORS
function playOsc(id) {
  // Re-initialize Oscillator
  initOsc();

  // Configure Osc
  var time = audioCtx.currentTime;
  osc.frequency.value = key * intervals[id];
  gainNode.gain.linearRampToValueAtTime(0, time);
  gainNode.gain.linearRampToValueAtTime(gainValue, time + fadeInTime);

  // Play
  osc.start(time);
  stopOsc(time);
}

// STOP OSCILLATORS
function stopOsc(time) {
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + toneLength);
  osc.stop(time + toneLength);
}


// **************************************
// PLAYBACK CONTROLS
// **************************************

// // TOGGLE PLAYING
// function updatePlaying() {
//   // PLAY TOGGLE DOM ELEMENT
//   var playToggle = document.querySelector("#play-toggle");
//
//   // TOGGLE PLAYING
//   if (playing) {
//     // STOP OSCILLATORS
//     stopTones();
//     // Update Button State
//     playToggle.classList.remove("pause-btn");
//     playToggle.classList.add("play-btn");
//     // Update boolean
//     playing = false;
//   } else {
//     // START OSCILLATORS
//     playTones();
//     // Update Button State
//     playToggle.classList.remove("play-btn");
//     playToggle.classList.add("pause-btn");
//     // Update boolean
//     playing = true;
//   }
// }
