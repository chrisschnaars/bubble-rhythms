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

  // START BY CREATING BEAT CONTAINERS
  for (var i=0; i<numBeats; i++) {

    // CREATE BEAT CONTAINER DIV FOR EACH BEAT
    let tbc = document.createElement('div');
    tbc.classList.add('tone-blocks__beat-container', 'beat-' + i);

    // ADD BEAT CONTAINER TO TONE BLOCKS CONTAINER
    let pD = document.querySelector('.tone-blocks');
    pD.append(tbc);


    // ADD TONE BLOCKS TO BEAT
    for (var j=0; j<numOrbs; j++) {

      // CREATE TONE BLOCK DIV ELEMENT
      let t = document.createElement('div');
      t.id = index; // add id
      t.classList.add('tone-blocks__tone-block'); // add tone-toggle class

      // ADD TONE BLOCK TO BEAT CONTAINER
      tbc.append(t); // add to parent div

      // GET X AND Y POSITION OF TONE BLOCK
      let x = xPos[i];
      let y = yPos[j];

      // CREATE TONE BLOCKS JAVSCRIPT OBJECT
      // THIS IS FOR SOUND PURPOSES ONLY
      toneblocks[index] = new ToneBlock(x, y, orbColors[j][0], i,  j, index);

      index++;
    }
  }

  // CREATE ARRAY OF ALL TONE BLOCKS
  toneBlockDivs = document.getElementsByClassName('tone-blocks__tone-block');
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
    t.classList.remove('tone-block--active');
    o.rhythm[this.beatId] = false;
    this.active = false;
  } else {
    t.classList.add('tone-block--active');
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
