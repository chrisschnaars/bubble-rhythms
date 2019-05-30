/************************************************
TONE BLOCK SETUP
************************************************/

// TONE BLOCKS SETTINGS
let toneblocks = [];

// TONE TOGGLE DOM ELEMENTS
let toneBlockDivs; // array of all div containers for each toggle
let toneBlockContainerDivs; // array of each container of toggles

// CREATE TONE BLOCKS
function createToneBlocks() {
  // SET INDEX FOR UNIQUE TONE BLOCK ID
  let index = 0;

  for (var i=0; i<numBeats; i++) {
    // CREATE TONE BLOCK CONTAINER FOR BEAT
    let tbc = document.createElement('div');
    tbc.classList.add('tone-blocks-beat-container', 'beat-' + i);

    // ADD TONE BLOCKS CONTAINER TO PARENT DIV
    let pD = document.querySelector('#tone-blocks-container');
    pD.append(tbc);

    for (var j=0; j<numOrbs; j++) {
      // CREATE TONE BLOCK DIV ELEMENT
      let t = document.createElement('div');
      t.id = index; // add id
      t.classList.add('tone-block'); // add tone-toggle class

      // APPEND TO TONE BLOCK CONTAINER
      tbc.append(t); // add to parent div

      // GET X AND Y POSITIONS
      let x = xPos[i];
      let y = yPos[j];

      // CREATE TONE BLOCKS
      toneblocks[index] = new ToneBlock(x, y, orbColors[j][0], i,  j, index);

      index++;
    }
  }

  // SET TOGGLE DIVS VARIABLE
  toneBlockDivs = document.getElementsByClassName('tone-block');
  // toneBlockContainerDivs = document.getElementsByClassName('tone-block-container');
}

// CLEAR ALL TONE BLOCK SELECTIONS
function clearToneBlocks() {
  for (let i=0; i<toneblocks.length; i++) {
    let t = toneblocks[i];
    if (t.active) {
      t.toggle();
    }
  }
}

// RANDOMLY TOGGLE BLOCKS
function setRandomBlocks() {
  for (let i=0; i<toneblocks.length; i++) {
    let b = getRandomNumber(0, 2);
    if (b < 1) {
      toneblocks[i].toggle();
    }
  }
}

/************************************************
TONE BLOCK OBJECT
************************************************/

// TONE BLOCK CONSTRUCTOR
function ToneBlock(x, y, col, xId, yId, id) {
  this.x = x; // X POSITION
  this.y = y; // Y POSITION
  this.activeColor = col;  // COLOR FILL
  this.active = false;
  this.beatId = xId; // ID OF BEAT NUMBER
  this.toneId = yId; // ID OF BLOCK TONE
  this.index = id; // UNIQUE ID OF EACH TONE BLOCK
}

// TOGGLE BETWEN ON AND OFF STATES
ToneBlock.prototype.toggle = function() {
  let t = toneBlockDivs[this.index];
  let o = orbs[this.toneId];

  // TOGGLE ACTIVE FLAG
  if (this.active) {
    t.classList.remove('active');
    o.rhythm[this.beatId] = false;
    this.active = false;
  } else {
    t.classList.add('active');
    o.rhythm[this.beatId] = true;
    this.active = true;
  }

  // TOGGLE BACKGROUND COLOR
  this.setBackground();
}

ToneBlock.prototype.setBackground = function() {
  // BG COLOR VARIABLE
  let b;

  if (this.active) {
    b = this.activeColor;
  } else {
    b = null;
  }

  toneBlockDivs[this.index].style.backgroundColor = b;
}
