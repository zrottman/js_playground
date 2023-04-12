let counterDisplay = document.getElementById("display");
let count = 0;
let curTime;
let startTime;
let avg = 0;

function beat() {
  
  curTime = Date.now();

  if (startTime) { // not first button press
    counterDisplay.textContent = Math.round(60000 / ((curTime - startTime) / count));
  } else {
    startTime = curTime;
  }

  count ++;

}

function reset() {
  count = 0;
  counterDisplay.textContent = count;
  startTime = null;
  avg = 0;

}
