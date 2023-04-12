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
  }

  lastTime = curTime;  
  count ++;

  counterDisplay.textContent = count;
  console.log("Count: " + count);
  console.log("Cur elapsed: " + elapsedTime);
  console.log("Cur avg: " + avg);
}

function reset() {
  count = 0;
  counterDisplay.textContent = count;
  startTime = null;
}
