const byteDivs = document.querySelectorAll(".byte");
let byteA = [0, 0, 0, 0, 0, 0, 0, 0];
let byteB = [0, 0, 0, 0, 0, 0, 0, 0];
let byteY = [0, 0, 0, 0, 0, 0, 0, 0];
const byteYBits = document.querySelector('.byte-Y').children;

// Create byte divs and 8 bits for each
for (let byteDiv of byteDivs) {

  for (let i=0; i < 8; i++) {

    // create button el
    const button = document.createElement("button");

    // add classes
    button.classList.add("bit");
    button.classList.add(`bit-${i}`);

    // add event listeners for input bytes only
    if (byteDiv.classList.contains('input')) {
      button.addEventListener("click", function () {
        this.classList.toggle("toggle");
        if (byteDiv.classList.contains('byte-A')) {
          byteA[i] = byteA[i] ? 0 : 1;
        } else {
          byteB[i] = byteB[i] ? 0 : 1;
        }
        updateOutput(i);
      });

    }

    // append button to parent el
    byteDiv.appendChild(button);
  }
}

function updateOutput(i) {
  byteY[i] = byteA[i] & byteB[i];
  byteYBits[i].classList.toggle("toggle", byteY[i] == 1);
  console.log(byteY);
}

function arrToBinStr(arr) {
  return arr.join('');
}

function binStrToInt(binStr) {
  return Number('0b' + binStr);
}
