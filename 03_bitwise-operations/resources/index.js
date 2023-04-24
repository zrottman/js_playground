class Byte {

  constructor(name) {
    this.binArr = new Array(8).fill(0); // [0, 0, 0, 0, 0, 0, 0, 0];
    this.name = name;

    this.draw();
    this.render();
  }

  toBinStr() {
  // Output `this.binArr` as binary string
    return this.binArr.join('');
  }

  toInt() {
  // Output `this.binArr` as integer 
    return Number(`0b${this.toBinStr()}`);
  }

  updateBinArr(num) {
  // Translate int input `num` to binary and update `this.binArr`
    let s = num.toString(2);
    s = '00000000'.substr(s.length) + s;
    s = s.split('');
    s = s.map((x) => parseInt(x));
    this.binArr = s;
    if (this.binArr.length > 8) { this.binArr.shift(); }
  }

  draw() {
    const self = this;
    const containerDiv = document.getElementById("container2");

    this.drawOperatorsDiv(self, containerDiv);
    this.drawByteDiv(self, containerDiv);
    this.drawBinDiv(containerDiv);
    this.drawIntDiv(containerDiv);
  }

  drawBinDiv(containerDiv) {
    // Draw binary div
    this.binDiv = document.createElement("div");
    this.binDiv.classList.add("binary");
    this.binDiv.classList.add(this.name);
    containerDiv.appendChild(this.binDiv);
  }

  drawIntDiv(containerDiv) {
    // Draw integer div
    this.intDiv = document.createElement("div");
    this.intDiv.classList.add("integer");
    this.intDiv.classList.add(this.name);
    containerDiv.appendChild(this.intDiv);
  }

  render() {
    for (let i = 0; i < 8; i++ ) {
      this.bitDivs[i].classList.toggle("toggle", this.binArr[i] == 1);
    }
    this.binDiv.textContent = this.toBinStr();
    this.intDiv.textContent = this.toInt();
  }
}


class InputByte extends Byte {
  constructor(name) {
    super(name);
    this.observers = [];
  }

  flipBit(i) {
    // Flip bit `i` of `this.binArr`
    this.binArr[i] = this.binArr[i] ? 0: 1;
    this.notifyObservers();
  }

  shiftLeft() {
  // Shift bits left one place
    let i = this.toInt();
    i <<= 1;
    this.updateBinArr(i);
    this.notifyObservers();
  }

  shiftRight() {
  // Shift bits right one place
    let i = this.toInt();
    i >>= 1;
    this.updateBinArr(i);
    this.notifyObservers();
  }

  drawByteDiv(byteObj, containerDiv) {
    // Draw byte div
    this.byteDiv = document.createElement("div");
    this.byteDiv.classList.add(this.name);
    for (let i = 0; i < 8; i++) {
      const bitBtn = document.createElement("button");
      bitBtn.classList.add("bit");
      bitBtn.classList.add(`bit-${i}`);
      bitBtn.addEventListener("click", function() {
        byteObj.flipBit(i);
        byteObj.render();
      });
      this.byteDiv.appendChild(bitBtn);
    }
    this.bitDivs = this.byteDiv.children;
    containerDiv.appendChild(this.byteDiv);
  }

  drawOperatorsDiv(byteObj, containerDiv) {
    // Draw operators div
    this.operatorsDiv = document.createElement("div");
    this.operatorsDiv.classList.add("operators");
    this.operatorsDiv.classList.add(this.name);
    const shiftLeft = document.createElement("button");
    const shiftRight = document.createElement("button");
    shiftLeft.innerText = '<<';
    shiftRight.innerText = '>>';
    shiftLeft.addEventListener("click", function() {
      byteObj.shiftLeft()
      byteObj.render();
    });
    shiftRight.addEventListener("click", function() {
      byteObj.shiftRight();
      byteObj.render();
    });
    this.operatorsDiv.append(shiftLeft, shiftRight);
    containerDiv.appendChild(this.operatorsDiv);
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers() {
    this.observers.forEach(observer => observer.update());
  }
}


class OutputByte extends Byte {
  constructor(name, inputByteA, inputByteB) {
    super(name);
    this.inputByteA = inputByteA;
    this.inputByteB = inputByteB;
    this.update();
  }

  update() {
    this.updateBinArr(this.inputByteA.toInt() & this.inputByteB.toInt());
    this.render();
  }

  drawByteDiv(byteObj, containerDiv) {
    // Draw byte div
    this.byteDiv = document.createElement("div");
    this.byteDiv.classList.add(this.name);
    for (let i = 0; i < 8; i++) {
      const bitBtn = document.createElement("button");
      bitBtn.classList.add("bit");
      bitBtn.classList.add(`bit-${i}`);
      this.byteDiv.appendChild(bitBtn);
    }
    this.bitDivs = this.byteDiv.children;
    containerDiv.appendChild(this.byteDiv);
  }

  drawOperatorsDiv(byteObj, containerDiv) {
    // Draw operators div
    this.operatorsDiv = document.createElement("div");
    this.operatorsDiv.classList.add("operators");
    this.operatorsDiv.classList.add(this.name);
    containerDiv.appendChild(this.operatorsDiv);
  }

}


let byteA = new InputByte("byte-a");
let byteB = new InputByte("byte-b");
let byteY = new OutputByte("byte-y", byteA, byteB);
byteA.attach(byteY);
byteB.attach(byteY);

/*
let byteA = new Byte("byte-A");
let byteB = new Byte("byte-B");
let byteY = new Byte("byte-Y", isInputByte = false);
byteA.observer = byteY;
byteB.observer = byteY;
*/
/*
// Arrays to hold states of input and output bytes
let byteA = [0, 0, 0, 0, 0, 0, 0, 0];
let byteB = [0, 0, 0, 0, 0, 0, 0, 0];
let byteY = [0, 0, 0, 0, 0, 0, 0, 0];

// Byte divs
const byteDivs = document.querySelectorAll(".byte");
const byteYBits = document.querySelector('.byte-Y').children;
const byteABits = document.querySelector('.byte.byte-A').children;
const byteBBits = document.querySelector('.byte.byte-B').children;

// Operator divs
const operatorDivs = document.querySelectorAll(".operators");

// Binary and integer divs for rendering
const byteABinary = document.querySelector(".binary.byte-A");
const byteBBinary = document.querySelector(".binary.byte-B");
const byteYBinary = document.querySelector(".binary.byte-Y");

const byteAInt= document.querySelector(".integer.byte-A");
const byteBInt= document.querySelector(".integer.byte-B");
const byteYInt= document.querySelector(".integer.byte-Y");

// Logic buttons
const logicBtns = document.getElementById("logic");
logicBtns.addEventListener('change', () => {
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

// Create bit shift buttons
for (let operatorDiv of operatorDivs) {
  if (operatorDiv.classList.contains("input")) {
    const shiftLeft = document.createElement("button");
    const shiftRight = document.createElement("button");
    shiftLeft.innerText = '<<';
    shiftRight.innerText = '>>';
    shiftLeft.addEventListener("click", function () {
      if (operatorDiv.classList.contains("byte-A")) {
        let byteAInt = binArrToInt(byteA);
        byteAInt <<= 1;
        byteA = intToBinArr(byteAInt);
        if (byteA.length > 8) { byteA.shift(); }
      } else {
        let byteBInt = binArrToInt(byteB);
        byteBInt <<= 1;
        byteB = intToBinArr(byteBInt);
        if (byteB.length > 8) { byteB.shift(); }
      }
      render();
    });
    shiftRight.addEventListener("click", function () {
      if (operatorDiv.classList.contains("byte-A")) {
        let byteAInt = binArrToInt(byteA);
        byteAInt >>= 1;
        byteA = intToBinArr(byteAInt);
      } else {
        let byteBInt = binArrToInt(byteB);
        byteBInt >>= 1;
        byteB = intToBinArr(byteBInt);
      }
      render();
    });
    operatorDiv.append(shiftLeft, shiftRight);
  }
}

render();


function render() {
  updateByteY();
  updateByteButtons();
  renderBinary();
  renderInteger();
  renderOutput();
}

function renderOutput() {
  const outputDiv = document.getElementById("output");

  let logic = document.querySelector('input[name="logic"]:checked').value;
  if (logic === 'AND') {
    logic = '&';
  } else if (logic === 'OR') {
    logic = '|'; 
  } else if (logic === 'XOR') {
    logic = '^';
  }
  outputDiv.innerHTML = `<code>${binArrToInt(byteA)} ${logic} ${binArrToInt(byteB)} = ${binArrToInt(byteY)}</code>`;
}

function updateByteY() {
  let byteAInt = binArrToInt(byteA);
  let byteBInt = binArrToInt(byteB);
  let logic = document.querySelector('input[name="logic"]:checked').value;

  if (logic === 'AND') {
    byteY = intToBinArr(byteAInt & byteBInt);
  } else if (logic === 'OR') {
    byteY = intToBinArr(byteAInt | byteBInt);
  } else if (logic === 'XOR') {
    byteY = intToBinArr(byteAInt ^ byteBInt);
  }
}

function updateByteButtons() {
  for (let i = 0; i < 8; i++) {
    byteYBits[i].classList.toggle("toggle", byteY[i] == 1);

    byteABits[i].classList.toggle("toggle", byteA[i] == 1);
    byteBBits[i].classList.toggle("toggle", byteB[i] == 1);
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
  b = b.split('');
  b = b.map((x) => parseInt(x));
  return b;
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
*/
