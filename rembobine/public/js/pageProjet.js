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



  for (let rowIndex = 0; rowIndex < 2; rowIndex += 1) {
    const row = document.createElement("div");
    row.className = "row";

    for (let columnIndex = 0; columnIndex < 2; columnIndex += 1) {
      const buttonNumber = rowIndex * 2 + columnIndex + 1;
      const button = document.createElement("button");
      button.id = `button${buttonNumber}`;

      button.textContent = ` ${buttonNumber} `;
      row.appendChild(button);
      if(State[button.textContent] === true){button.disabled = true; console.log(button.disabled);}
      box.appendChild(row);
    }
    
  }
  





  box.querySelectorAll('button').forEach(option => {
    option.addEventListener('click', async () => {
        // Send the user's choice to our API

        const value = option.textContent;
        
        
        //const box = option.parentElement.parentElement;

        //remove all
        option.parentElement.querySelectorAll('button').forEach(btn => btn.remove());

        // Remove all rows
        box.querySelectorAll('.row').forEach(row => row.remove());

        // Change box background color
        const textDisplay = document.createElement('p');
        textDisplay.id = "base";
        switch (parseInt(value)) {
          case 1:
            box.style.backgroundColor = '#ff2ba3d1'; // Change color as desired
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
            box.style.backgroundColor = '#fff700d1'; // Change color as desired
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
            box.style.backgroundColor = '#643ff793';
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
            box.style.backgroundColor = '#2bff55d1';
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

        if(getBoxByPosition(box.row + 1, box.column) == null) {
          console.log("====================== add row ==========================");
          addEmptyRow(box.row + 1);
        }

        const boxsFreeList = getFreeAdgacentBox(box);

        const boxNum = Math.random() * (boxsFreeList.length - 0) + 0;

        let theChoosenBox = boxsFreeList[parseInt(boxNum)];

        //Create the new box and replace the chosen free one and scroll to it
        const newBox = createButtonBox(`box${theChoosenBox.row}${theChoosenBox.column}`, theChoosenBox.row, theChoosenBox.column);
        replaceBox(theChoosenBox, newBox);
        newBox.scrollIntoView({ behavior: 'smooth', block: 'center' });


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

  const box2 = document.createElement("div");
  box2.id = "boxFree";
  box2.isFree = true;
  box2.className = "box";
  box2.row = aRow;
  box2.column = 2;

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
  if(boxUp != null && boxUp.isFree) {
    boxList.push(boxUp);
  }
  let boxDown = getBoxByPosition(row + 1, column);
  if(boxDown != null && boxDown.isFree) {
    boxList.push(boxDown);
  }
  let boxLeft = getBoxByPosition(row, column - 1);
  if(boxLeft != null && boxLeft.isFree) {
    boxList.push(boxLeft);
  }
  let boxRight = getBoxByPosition(row, column + 1);
  if(boxRight != null && boxRight.isFree) {
    boxList.push(boxRight);
  }


  if (boxList.length == 0) {
    let boxs = document.querySelectorAll('.box');

    console.log("================================================================================================");



    for (const box of boxs) {
      if(box.isFree) {
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

  const response2 = (await fetch('/rembobine/data/article.json'));
  const article = await response2.json()
  Institutionnel = article.Institutionnel;
  Mediatique = article.Mediatique;
  Public = article.Public;
  Judiciaire = article.Judiciaire;




  const titre = document.getElementById('titre');
  titre.textContent = `Our topic is "${data1.topic}".`;

  addEmptyRow();

  replaceBox(getBoxByPosition(1, 1), createButtonBox("box11", 1, 1));
  

};