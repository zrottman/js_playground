let counterDisplay = document.getElementById("display");
let count = 0;

function increment() {
  count++;
  counterDisplay.textContent = count;
}

function reset() {
  count = 0;
  counterDisplay.textContent = count;
}
