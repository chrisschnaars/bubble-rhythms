/************************************************
ORB CREATION
************************************************/

// ORB ARRAY
let orbs = [];

// GLOBAL ORB SETTINGS
const orbSpeed = 2;  // MASTER SPEED
const orbColors = [
  [ '#EC88C0', '#D96EB2'],
  [ '#AC91EE', '#967BDC'],
  [ '#48CFAE', '#37BB9B'],
  [ '#FFCF55', '#F6BB43'],
  [ '#4FC0E8', '#3CAEDA']
];
const orbStrokeSize = 4;

// ORB SPEED COEFFICIENTS
const speedCoeffecients = [0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 8.0];

function createOrbs() {
  initializeOrbs();
  setOrbSpeeds();
  setOrbRhythm();
}

// CREATE ORB OBJECTS
function initializeOrbs() {
  for (let i=0; i<numOrbs; i++) {
    // FIND Y POSITION
    let y = yPos[i];

    // GENERATE OFFSCREEN X POSITION
    let offX = i * orbSize;
    let offY = 0;

    // CREATE ORB OBJECT
    orbs[i] = new Orb(y, offX, offY, i);
  }
}

// SELECT A RANDOM ORB SPEED FOR EACH ORB
function setOrbSpeeds() {
  for (let i=0; i<orbs.length; i++) {
    // GENERATE RANDOM SPEED COEFFICIENT
    let r = getRandomNumber(0, speedCoeffecients.length-1);
    let sc = Math.round(r);

    // UPDATE SPEED COEFFICIENT
    orbs[i].sc = speedCoeffecients[sc];
  }
}

// SET THE DEFAULT RHYTHM ARRAY FOR EACH ORB
function setOrbRhythm() {
  for (let i=0; i<orbs.length; i++) {
    for (let j=0; j<numBeats; j++) {
      orbs[i].rhythm[j] = false;
    }
  }
}

// SET ORB POSITION
function setOrbPosition() {
  for (let i=0; i<orbs.length; i++) {
    orbs[i].y = yPos[i];
  }
}


/************************************************
ORB OBJECT
************************************************/

// ORB CONSTRUCTOR
function Orb(y, offX, offY, id) {
  this.x = 0; // X POSITION
  this.y = y; // Y POSITION
  this.s = orbSize;  // ORB DIAMETER W/O STROKE WIDTH
  this.fill = orbColors[id][0];  // FILL
  this.stroke = orbColors[id][1]; // STROKE
  this.d = 1; // DIRECTIONAL COEFFICIENT
  this.sc; // SPEED COEFFICIENT
  this.id = id; // ORB ID
  this.rhythm = [];
  this.playing = false; // flag if this is playing

  // OFFSCREEN CANVAS POSITION
  this.offX = offX; // X POS OF ORB ON OFFSCREEN CANVAS
  this.offY = offY; // Y POS OF ORB ON OFFSCREEN CANVAS
}

// DRAW THE ORB
Orb.prototype.render = function(c) {
  // SET OFFSET VARIABLE FOR ORB RADIUS
  let offset = this.s/2;
  let xP = this.offX + offset;
  let yP = this.offY + offset;

  // DRAW ORB STROKE
  c.strokeStyle = this.stroke;
  c.lineWidth = orbStrokeSize;
  c.beginPath();
  c.moveTo(xP + (this.s/2 - orbStrokeSize), yP);
  c.arc(xP, yP, (this.s - orbStrokeSize)/2, 0, Math.PI * 2, true);
  c.stroke();

  // DRAW ORB FILL
  c.fillStyle = this.fill;
  c.beginPath();
  c.moveTo(xP, yP);
  c.arc(xP, yP, (this.s - orbStrokeSize)/2, 0, Math.PI * 2, true);
  c.fill();
}

// DISPLAY ORB IMAGE
Orb.prototype.display = function(c, s) {
  c.drawImage(s, this.offX, this.offY, this.s, this.s, this.x, this.y - this.s/2, this.s, this.s);
}

// UPDATE ORB POSITION
Orb.prototype.update = function() {
  // CALCULATE X POS USING GLOBAL SPEED * ORB'S SPEED COEFFICIENT
  this.x += (orbSpeed * this.d * this.sc);

  // CHANGE DIRECTION OF ORB WHEN IT REACHES EDGE OF CANVAS
  if (this.x < 0 || this.x > cw) {
    this.d*=-1;
  }
}

// CHECK WHEN ORB INTERSECTING THE TONE BLOCK
// PLAY TONE WHEN TONE BLOCK IS ACTIVE
Orb.prototype.checkIntersect = function(b) {
  for (let i=0; i<xPos.length; i++) {
    let x1 = xPos[i] - (toneBlockSize/2);
    let x2 = xPos[i] + (toneBlockSize/2);

    if (this.x >= x1 && this.x <= x2) {
      if (this.rhythm[i] === true) {
        if (!this.playing) {
          this.playing = true;
          playOsc(this.id);
        }
      }
    } else {
      this.playing = false;
    }
  }
}
