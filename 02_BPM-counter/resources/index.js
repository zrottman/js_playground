let counterDisplay = document.getElementById("display");
let count = 0;
let curTime;
let elapsedTime;
let lastTime;
let avg = 0;

function beat() {
  
  curTime = Date.now();

  if (lastTime) { // not first button press
    elapsedTime = curTime - lastTime;
    avg = Math.round((avg * (count - 1) + elapsedTime) / count);
    counterDisplay.textContent = Math.round(60000 / avg);
  }

  lastTime = curTime;  
  count ++;

}

function reset() {
  count = 0;
  counterDisplay.textContent = count;
  lastTime = null;
  avg = 0;

}
