// CALCULATE POSITIONING OF ORB AND BEAT ELEMENTS
function setupGrid() {

  // CALCULATE THE SPACING BETWEEN BEAT BLOCKS ON X-AXIS
  let xSpacer = canvas.width / numBeats;

  // CALCULATE X POS OF EACH BEAT
  // THIS IS USED TO DETERMINE WHERE ORB HAS TO INTERSECT TO TRIGGER AUDIO
  for (let i=0; i<numBeats; i++) {
    xPos[i] = Math.floor((xSpacer / 2) + (xSpacer * i));
  }

  //  VERTICAL SPACING
  let yPadding = 64; // TOTAL VERTICAL PADDING OF TONE BLOCKS CONTAINER
  let ySpacer = (canvas.height - yPadding) / numOrbs;

  // CALCULATE Y POSITION GRID
  for (var i = 0; i < numOrbs; i++) {
    yPos[i] = Math.floor(yPadding/2 + ySpacer/2 + (i * ySpacer));
  }
}

// SHOW OUTLINE OF GRID FOR DEBUGGING
function showGrid() {
  // DRAW HORIZONTAL LINES
  for (var i = 0; i < xPos.length; i++) {
    ctx.beginPath();
    ctx.moveTo(0, yPos[i]);
    ctx.lineTo(canvas.width, yPos[i]);
    ctx.stroke();
  }

  // DRAW VERTICAL LINES
  for (var i = 0; i < xPos.length; i++) {
    ctx.beginPath();
    ctx.moveTo(xPos[i], 0);
    ctx.lineTo(xPos[i], canvas.height);
    ctx.stroke();
  }
}

// END ONBOARDING
function endOnboarding() {
  // ONBOARDING CONTAINER
  let ob = document.querySelector('.onboarding');
  // ADD HIDDEN CLASS
  ob.classList.add('onboarding--hidden');
  // TOGGLE ONBOARDING FLAG
  onboarding = false;
}

// GENERATE A RANDOM NUMBER
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
