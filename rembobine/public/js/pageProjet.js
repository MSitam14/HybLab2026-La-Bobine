"use strict";

let Institutionnel = null;
let Mediatique = null;
let Public = null;
let Judiciaire = null;
let Actions = null;

let count_institutionnel = 0;
let count_mediatique = 0;
let count_judiciaire = 0;
let count_public = 0;
let count_actions = 0;

let columnForCitation = 1;

let State = [false, false, false, false]; //[SInstitutionnel, SMediatique, SJudiciaire, SPublic]

function createButtonBox(boxId = "box1", aRow = 1, aColumn = 1) {
  const box = document.createElement("div");
  box.id = boxId;
  box.isFree = false;
  box.className = "box";
  box.row = aRow;
  box.column = aColumn;
  box.color = null; //In which group the box is a part of
  box.ngroup = null;//Its id in the group 
  box.nAction = null;//If the box is in the judiciaire group, the id of the action it is on

  for (let rowIndex = 0; rowIndex < 2; rowIndex += 1) {
    const row = document.createElement("div");
    row.className = "row";

    for (let columnIndex = 0; columnIndex < 2; columnIndex += 1) {
      const buttonNumber = rowIndex * 2 + columnIndex + 1;
      const button = document.createElement("button");
      button.id = `button${buttonNumber}`;
      button.number = buttonNumber;

      const img = document.createElement("img");
      let path = "img/"
      switch (buttonNumber) {
        case 1:
          button.className = "jud";
          img.src = path + "Picto_ImpactJuridique.svg";
          break;
        case 2:
          button.className = "med";
          img.src = path + "Picto_ImpactMediatique.svg";
          break;
        case 3:
          button.className = "pub";
          img.src = path + "Picto_ImpactPublic.svg";
          break;
        case 4:
          button.className = "inst";
          img.src = path + "Picto_ImpactInstitutionnel.svg";
          break;
        default:
          button.style.backgroundColor = '#d5d5d5d1';
          break;
      }

      button.appendChild(img);

      row.appendChild(button);
      if (State[button.number] === true) {
        button.disabled = true;
        button.className += " finished"
      }
      box.appendChild(row);
    }

  }


  box.querySelectorAll('button').forEach(option => {
    option.addEventListener('click', async (event) => {
      // Prevent this click from bubbling to the box click handler.
      event.stopPropagation();

      const value = option.number;

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
          box.ngroup = count_judiciaire;
          count_judiciaire++;

          if (box.ngroup >= Judiciaire.length) {

            if (Actions.length > count_actions) {
              textDisplay.textContent = Actions[count_actions].Base;
              box.nAction = count_actions;
              count_actions++;
              box.className += " finished box-action";
              box.color = 5;
            }
            else {
              textDisplay.textContent = "Vous avez vu tout les impacts !";
            }
            State[value] = true;

          } else {

            textDisplay.textContent = Judiciaire[box.ngroup].Base;

          }

          break;
        case 2:
          box.color = 2;
          box.ngroup = count_mediatique;
          count_mediatique++;

          if (box.ngroup >= Mediatique.length) {

            if (Actions.length > count_actions) {
              textDisplay.textContent = Actions[count_actions].Base;
              box.nAction = count_actions;
              count_actions++;
              box.className += " finished box-action";
              box.color = 5;
            }
            else {
              textDisplay.textContent = "Vous avez vu tout les impacts !";
            }
            State[value] = true;

          } else {

            textDisplay.textContent = Mediatique[box.ngroup].Base;

          }

          break;
        case 3:
          box.color = 3;
          box.ngroup = count_public;
          count_public++;

          if (box.ngroup >= Public.length) {

            if (Actions.length > count_actions) {
              textDisplay.textContent = Actions[count_actions].Base;
              box.nAction = count_actions;
              count_actions++;
              box.className += " finished box-action";
              box.color = 5;
            }
            else {
              textDisplay.textContent = "Vous avez vu tout les impacts !";
            }
            State[value] = true;

          } else {

            textDisplay.textContent = Public[box.ngroup].Base;

          }

          break;
        case 4:
          box.color = 4;
          box.ngroup = count_institutionnel;
          count_institutionnel++;

          if (box.ngroup >= Institutionnel.length) {

            if (Actions.length > count_actions) {
              textDisplay.textContent = Actions[count_actions].Base;
              box.nAction = count_actions;
              count_actions++;
              box.className += " finished box-action";
              box.color = 5;
            }
            else {
              textDisplay.textContent = "Vous avez vu tout les impacts !";
            }
            State[value] = true;

          } else {

            textDisplay.textContent = Institutionnel[box.ngroup].Base;

          }

          break;
        default:
          box.style.backgroundColor = '#d5d5d5d1';
          break;
      }
      // Display clicked button text
      box.appendChild(textDisplay);

      box.addEventListener('click', () => {
        // Do not trigger while choice buttons are still visible.
        if (box.querySelector('button')) {
          return;
        }

        if (box.className.includes("finished") && !box.className.includes("box-action")) {
          return;
        }

        const overlay = document.getElementById('popup-overlay');
        const popupText = document.getElementById('popup-text');
        const popupBox = document.getElementById('popup-box');

        switch (box.color) {
          case 1:
            popupBox.className = "jud";
            popupText.textContent = Judiciaire[box.ngroup].Texteplus;
            break;
          case 2:
            popupBox.className = "med";
            popupText.textContent = Mediatique[box.ngroup].Texteplus;
            break;
          case 3:
            popupBox.className = "pub";
            popupText.textContent = Public[box.ngroup].Texteplus;
            break;
          case 4:
            popupBox.className = "inst";
            popupText.textContent = Institutionnel[box.ngroup].Texteplus;
            break;
          case 5:
            popupBox.className = "action";
            console.log(box.nAction);
            popupText.textContent = Actions[box.nAction].Texteplus;
            break;
        }
        popupBox.className += " animate__animated animate__slideInUp"
        overlay.classList.remove('popup-hidden');

      });
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


      if (box.column > theChoosenBox.column) newbox.className += " animate__animated animate__fadeInRight"
      if (box.column < theChoosenBox.column) newbox.className += " animate__animated animate__fadeInLeft"
      if (box.row > theChoosenBox.row) newbox.className += " animate__animated animate__fadeInUp"
      if (box.row < theChoosenBox.row) newbox.className += " animate__animated animate__fadeInDown"

      replaceBox(theChoosenBox, newbox)
      newbox.scrollIntoView({ behavior: 'smooth', block: 'center' });


      box.className = box.className.replace(" animate__animated animate__fadeInRight", ""); // Remove action class if it exists
      box.className = box.className.replace(" animate__animated animate__fadeInLeft", ""); // Remove action class if it exists
      box.className = box.className.replace(" animate__animated animate__fadeInUp", ""); // Remove action class if it exists
      box.className = box.className.replace(" animate__animated animate__fadeInDown", ""); // Remove action class if it exists


      box.className += " text-box";


      if (box.color != 5) {
        switch (parseInt(value)) {
          case 1:
            box.className += " jud";
            break;
          case 2:
            box.className += " med";
            break;
          case 3:
            box.className += " pub";
            break;
          case 4:
            box.className += " inst";
            break;
          default:
            box.style.backgroundColor = '#d5d5d5d1';
            break;
        }
      }

      if ((box.color == 4 && box.ngroup >= Institutionnel.length) || (box.color == 2 && box.ngroup >= Mediatique.length) || (box.color == 3 && box.ngroup >= Public.length) || (box.color == 1 && box.ngroup >= Judiciaire.length)) {
        box.className += " finished";

      }

      if (box.row % 2 == 0) {
        let citationColumn = box.column == 1 ? 2 : 1
        let citationRow = box.row;
        addCitation(getBoxCitationByPosition(citationRow, citationColumn), box.color)
      }
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
  box1.appendChild(text1);

  const box2 = document.createElement("div");
  box2.id = "boxFree";
  box2.isFree = true;
  box2.className = "box";
  box2.row = aRow;
  box2.column = 2;
  const text2 = document.createElement("p");
  box2.appendChild(text2);

  if (aRow % 2 == 0) {
    if (columnForCitation == 1) {
      columnForCitation = 2;
      box1.className = "boxCitation";
    }
    else {
      columnForCitation = 1;
      box2.className = "boxCitation";
    }
  }

  mapCol1.appendChild(box1);
  mapCol2.appendChild(box2);
}

function addCitation(box, impactId) {
  switch (impactId) {
    case 1:
      box.className += " jud"; // Change color as desired
      break;
    case 2:
      box.className += " med"; // Change color as desired 
      break;
    case 3:
      box.className += " pub";
      break;
    case 4:
      box.className += " inst";
      break;
    default:
      break;
  }

  box.className += " animate__animated animate__fadeInDown"
  //TODO
  //ajouter le texte dans la boite contenant la citation

}

function getBoxByPosition(row, column) {
  const boxes = document.querySelectorAll('.box',);
  for (const box of boxes) {
    if (box.row === row && box.column === column) {
      return box;
    }
  }
  return null; // Return null if no box is found at the specified position
}

function getBoxCitationByPosition(row, column) {
  const boxes = document.querySelectorAll('.boxCitation',);
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

  document.getElementById('popup-box').addEventListener('click', () => {
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
  Actions = article.Actions;

  addEmptyRow();

  replaceBox(getBoxByPosition(1, 1), createButtonBox("box11", 1, 1));


};

const summary = document.querySelector(".summary");
const arrow = document.querySelector(".summary-container");

arrow.addEventListener("click", () => {
  summary.classList.toggle("is-open");
});

const impact_explanation = document.querySelector(".impact-explanation");
const impact_arrow = document.querySelector(".impact-unfolding");

impact_arrow.addEventListener("click", () => {
  impact_explanation.classList.toggle("is-open");
});