// Arrays to hold states of input and output bytes
let byteA = [0, 0, 0, 0, 0, 0, 0, 0];
let byteB = [0, 0, 0, 0, 0, 0, 0, 0];
let byteY = [0, 0, 0, 0, 0, 0, 0, 0];

// Byte divs
const byteDivs = document.querySelectorAll(".byte");
const byteYBits = document.querySelector('.byte-Y').children;

// Binary and integer divs for rendering
const byteABinary = document.querySelector(".binary.byte-A");
const byteBBinary = document.querySelector(".binary.byte-B");
const byteYBinary = document.querySelector(".binary.byte-Y");

const byteAInt= document.querySelector(".integer.byte-A");
const byteBInt= document.querySelector(".integer.byte-B");
const byteYInt= document.querySelector(".integer.byte-Y");

// Operator buttons
const operatorBtns = document.getElementById("operators");
operatorBtns.addEventListener('change', () => {
  render();
});


// Create byte divs and 8 bits for each
for (let byteDiv of byteDivs) {
  for (let i=0; i < 8; i++) {
    const button = document.createElement("button");
    button.classList.add("bit");
    button.classList.add(`bit-${i}`);
    if (byteDiv.classList.contains('input')) {
      button.addEventListener("click", function () {
        this.classList.toggle("toggle");
        if (byteDiv.classList.contains('byte-A')) {
          byteA[i] = byteA[i] ? 0 : 1;
        } else {
          byteB[i] = byteB[i] ? 0 : 1;
        }
        render();
      });
    }
    byteDiv.appendChild(button);
  }
}

render();


function render() {
  updateByteY();
  updateByteYButtons();
  renderBinary();
  renderInteger();
}

function updateByteY() {
  let byteAInt = binArrToInt(byteA);
  let byteBInt = binArrToInt(byteB);
  let operator = document.querySelector('input[name="operator"]:checked').value;

  if (operator === 'AND') {
    byteY = intToBinArr(byteAInt & byteBInt);
  } else if (operator === 'OR') {
    byteY = intToBinArr(byteAInt | byteBInt);
  } else if (operator === 'XOR') {
    byteY = intToBinArr(byteAInt ^ byteBInt);
  }
}

function updateByteYButtons() {
  for (let i = 0; i < 8; i++) {
    byteYBits[i].classList.toggle("toggle", byteY[i] == 1);
  }
}

function renderBinary() {
  byteABinary.textContent = binArrToBinStr(byteA);
  byteBBinary.textContent = binArrToBinStr(byteB);
  byteYBinary.textContent = binArrToBinStr(byteY);
}

function renderInteger() {
  byteAInt.textContent = binArrToInt(byteA);
  byteBInt.textContent = binArrToInt(byteB);
  byteYInt.textContent = binArrToInt(byteY);
}

function intToBinArr(num) {
  b = num.toString(2);
  b = '00000000'.substr(b.length) + b;
  return b.split('');
}

function binArrToBinStr(binArr) {
  return binArr.join('');
}

function binStrToInt(binStr) {
  return Number(`0b${binStr}`);
}

function binArrToInt(binArr) {
  return binStrToInt(binArrToBinStr(binArr));
}
