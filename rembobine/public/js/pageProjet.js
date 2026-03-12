"use strict";

let Institutionnel = null;
let Mediatique = null;
let Public = null;
let Judiciaire = null;

let count_institutionnel = 0;
let count_mediatique = 0;
let count_judiciaire = 0;
let count_public = 0;

let State = [false, false, false, false]; //[SInstitutionnel, SMediatique, SJudiciaire, SPublic]

function createButtonBox(boxId = "box1", aRow = 1, aColumn = 1) {
  const box = document.createElement("div");
  box.id = boxId;
  box.isFree = false;
  box.className = "box";
  box.row = aRow;
  box.column = aColumn;
  box.color = null; //In which group the box is a part of
  box.ngroup = null;//It's id in the group

  box.addEventListener('click', () => {
    // Do not trigger while choice buttons are still visible.
    if (box.querySelector('button')) {
      return;
    }

    const overlay = document.getElementById('popup-overlay');
    const popupText = document.getElementById('popup-text');
    popupText.textContent = box.querySelector('p') ? box.querySelector('p').textContent : '';
    overlay.classList.remove('popup-hidden');
  });

  for (let rowIndex = 0; rowIndex < 2; rowIndex += 1) {
    const row = document.createElement("div");
    row.className = "row";

    for (let columnIndex = 0; columnIndex < 2; columnIndex += 1) {
      const buttonNumber = rowIndex * 2 + columnIndex + 1;
      const button = document.createElement("button");
      button.id = `button${buttonNumber}`;

      button.textContent = ` ${buttonNumber} `;

      switch (buttonNumber) {
        case 1:
          button.className ="jud"; // Change color as desired
          break;
        case 2:
          button.className ="med"; // Change color as desired 
          break;
        case 3:
          button.className ="pub";
          break;
        case 4:
          button.className ="inst";
          break;
        default:
          button.style.backgroundColor = '#d5d5d5d1';
          break;
      }

      row.appendChild(button);
      if(State[button.textContent] === true){button.disabled = true; console.log(button.disabled);}
      box.appendChild(row);
    }

    
  }


  box.querySelectorAll('button').forEach(option => {
    option.addEventListener('click', async (event) => {
      // Prevent this click from bubbling to the box click handler.
      event.stopPropagation();

      const value = option.textContent;

      //const box = option.parentElement.parentElement;
      // Remove all buttons
      option.parentElement.querySelectorAll('button').forEach(btn => btn.remove());

      // Remove all rows
      box.querySelectorAll('.row').forEach(row => row.remove());

        // Change box background color
        const textDisplay = document.createElement('p');
        textDisplay.id = "base";
        switch (parseInt(value)) {
          case 1:
            box.color = 1;
            box.ngroup = count_public;
            count_public ++;

            if (box.ngroup >= Public.length){

              textDisplay.textContent = "Vous avez vu tout les impact !";
              State[value] = true;


            } else{

              textDisplay.textContent = Public[box.ngroup].Base;

            }
            
            break;
          case 2:
            box.color = 2;
            box.ngroup = count_mediatique;
            count_mediatique ++;

            if (box.ngroup >= Mediatique.length){

              textDisplay.textContent = "Vous avez vu tout les impact !";
              State[value] = true;

            } else{

              textDisplay.textContent = Mediatique[box.ngroup].Base;

            }

            break;
          case 3:
            box.color = 3;
            box.ngroup = count_institutionnel;
            count_institutionnel ++;

            if (box.ngroup >= Institutionnel.length){

              textDisplay.textContent = "Vous avez vu tout les impact !";
              State[value] = true;

            } else{

              textDisplay.textContent = Institutionnel[box.ngroup].Base;

            }
            
            break;
          case 4:
            box.color = 4;
            box.ngroup = count_judiciaire;
            count_judiciaire ++;

            if (box.ngroup >= Judiciaire.length){

              textDisplay.textContent = "Vous avez vu tout les impact !";
              State[value] = true;

            } else{

              textDisplay.textContent = Judiciaire[box.ngroup].Base;

            }

            break;
          default: 
            box.style.backgroundColor = '#d5d5d5d1';
            break;
        }
        // Display clicked button text
        box.appendChild(textDisplay);
        console.log(textDisplay);

      if (getBoxByPosition(box.row + 1, box.column) == null) {
        addEmptyRow(box.row + 1);
      }

      const boxsFreeList = getFreeAdgacentBox(box);
      if (boxsFreeList.length === 0) {
        console.warn('No free box available to move buttons.');
        return;
      }

      let boxNum = Math.floor(Math.random() * boxsFreeList.length);

      let theChoosenBox = boxsFreeList[boxNum];
      while (theChoosenBox.row == box.row && theChoosenBox.column == box.column) {
        console.warn('The chosen box is the same as the current box. Choosing another one.');
        boxNum = Math.floor(Math.random() * boxsFreeList.length);
        theChoosenBox = boxsFreeList[boxNum];
      }
      let newbox = createButtonBox(`box${theChoosenBox.row}${theChoosenBox.column}`, theChoosenBox.row, theChoosenBox.column)


      if(box.column>theChoosenBox.column) newbox.className +=" animate__animated animate__fadeInRight"
      if(box.column<theChoosenBox.column) newbox.className +=" animate__animated animate__fadeInLeft"
      if(box.row>theChoosenBox.row) newbox.className +=" animate__animated animate__fadeInUp"
      if(box.row<theChoosenBox.row) newbox.className +=" animate__animated animate__fadeInDown"
      
      replaceBox(theChoosenBox,newbox)

      box.className ="box text-box";
      

      switch (parseInt(value)) {
        case 1:
          box.className +=" jud"; // Change color as desired
          break;
        case 2:
          box.className +=" med"; // Change color as desired 
          break;
        case 3:
          box.className +=" pub";
          break;
        case 4:
          box.className +=" inst";
          break;
        default:
          box.style.backgroundColor = '#d5d5d5d1';
          break;
      }
      
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

  const popupOverlay = document.getElementById('popup-overlay');

  document.getElementById('popup-close').addEventListener('click', () => {
    popupOverlay.classList.add('popup-hidden');
  });

  popupOverlay.addEventListener('click', (event) => {
    if (event.target === popupOverlay) {
      popupOverlay.classList.add('popup-hidden');
    }
  });

  const response2 = (await fetch('/rembobine/data/article.json'));
  const article = await response2.json()
  Institutionnel = article.Institutionnel;
  Mediatique = article.Mediatique;
  Public = article.Public;
  Judiciaire = article.Judiciaire;

  addEmptyRow();

  replaceBox(getBoxByPosition(1, 1), createButtonBox("box11", 1, 1));

};