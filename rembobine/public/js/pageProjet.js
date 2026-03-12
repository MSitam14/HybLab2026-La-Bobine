"use strict";

function createButtonBox(boxId = "box1", aRow = 1, aColumn = 1) {
  const box = document.createElement("div");
  box.id = boxId;
  box.isFree = false;
  box.className = "box";
  box.row = aRow;
  box.column = aColumn;

  for (let rowIndex = 0; rowIndex < 2; rowIndex += 1) {
    const row = document.createElement("div");
    row.className = "row";

    for (let columnIndex = 0; columnIndex < 2; columnIndex += 1) {
      const buttonNumber = rowIndex * 2 + columnIndex + 1;
      const button = document.createElement("button");
      button.id = `button${buttonNumber}`;
      button.textContent = ` ${buttonNumber} `;
      row.appendChild(button);
    }

    box.appendChild(row);
  }

  box.querySelectorAll('button').forEach(option => {
    option.addEventListener('click', async () => {
      // Send the user's choice to our API

      const value = option.textContent;

      //const box = option.parentElement.parentElement;
      // Remove all buttons
      option.parentElement.querySelectorAll('button').forEach(btn => btn.remove());

      // Remove all rows
      box.querySelectorAll('.row').forEach(row => row.remove());

      // Change box background color

      switch (parseInt(value)) {
        case 1:
          box.style.backgroundColor = '#ff2ba3d1'; // Change color as desired
          break;
        case 2:
          box.style.backgroundColor = '#fff700d1'; // Change color as desired 
          break;
        case 3:
          box.style.backgroundColor = '#643ff793';
          break;
        case 4:
          box.style.backgroundColor = '#2bff55d1';
          break;
        default:
          box.style.backgroundColor = '#d5d5d5d1';
          break;
      }

      // Display clicked button text
      const textDisplay = document.createElement('p');
      textDisplay.textContent = value;
      box.appendChild(textDisplay);

      if (getBoxByPosition(box.row + 1, box.column) == null) {
        addEmptyRow(box.row + 1);
      }

      const boxsFreeList = getFreeAdgacentBox(box);
      if (boxsFreeList.length === 0) {
        console.warn('No free box available to move buttons.');
        return;
      }

      let boxNum = Math.floor(Math.random() * boxsFreeList.length);

      const theChoosenBox = boxsFreeList[boxNum];
      while (theChoosenBox.row == box.row && theChoosenBox.column == box.column) {
        console.warn('The chosen box is the same as the current box. Choosing another one.');
        boxNum = Math.floor(Math.random() * boxsFreeList.length);
        theChoosenBox = boxsFreeList[boxNum];
      }

      replaceBox(theChoosenBox, createButtonBox(`box${theChoosenBox.row}${theChoosenBox.column}`, theChoosenBox.row, theChoosenBox.column));

      // box.parentElement.appendChild(createButtonBox(`box`));
    });
  });

  return box;
}

function addEmptyRow(aRow = 1) {
  const mapCol1 = document.getElementById('mapColum1');
  const mapCol2 = document.getElementById('mapColum2');

  const box1 = document.createElement("div");
  box1.id = "boxFree";
  box1.isFree = true;
  box1.className = "box";
  box1.row = aRow;
  box1.column = 1;
  const text1 = document.createElement("p");
  text1.textContent = "T";
  box1.appendChild(text1);

  const box2 = document.createElement("div");
  box2.id = "boxFree";
  box2.isFree = true;
  box2.className = "box";
  box2.row = aRow;
  box2.column = 2;
  const text2 = document.createElement("p");
  text2.textContent = "T";
  box2.appendChild(text2);

  mapCol1.appendChild(box1);
  mapCol2.appendChild(box2);
}

function getBoxByPosition(row, column) {
  const boxes = document.querySelectorAll('.box');
  for (const box of boxes) {
    if (box.row === row && box.column === column) {
      return box;
    }
  }
  return null; // Return null if no box is found at the specified position
}

function getFreeAdgacentBox(box) {
  const row = box.row;
  const column = box.column;
  let boxList = [];


  let boxUp = getBoxByPosition(row - 1, column);
  if (boxUp != null && boxUp.isFree) {
    boxList.push(boxUp);
  }
  let boxDown = getBoxByPosition(row + 1, column);
  if (boxDown != null && boxDown.isFree) {
    boxList.push(boxDown);
  }
  let boxLeft = getBoxByPosition(row, column - 1);
  if (boxLeft != null && boxLeft.isFree) {
    boxList.push(boxLeft);
  }
  let boxRight = getBoxByPosition(row, column + 1);
  if (boxRight != null && boxRight.isFree) {
    boxList.push(boxRight);
  }

  if (boxList.length == 0) {
    let boxs = document.querySelectorAll('.box');

    for (const box of boxs) {
      if (box.isFree) {
        boxList.push(box);
      }
    }
  }

  return boxList;
}

function replaceBox(oldBox, newBox) {
  oldBox.parentElement.replaceChild(newBox, oldBox);
}

// async init function (because of the awaits on fetches)
const initPageProjet = async function () {


  // Retrieve the partner's topic from our API
  let response = await fetch('api/topic');
  const data1 = await response.json();

  const titre = document.getElementById('titre');
  titre.textContent = `Our topic is "${data1.topic}".`;

  addEmptyRow();

  replaceBox(getBoxByPosition(1, 1), createButtonBox("box11", 1, 1));

};