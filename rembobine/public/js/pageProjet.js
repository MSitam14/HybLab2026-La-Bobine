"use strict";

function createButtonBox(boxId = "box1") {
  const box = document.createElement("div");
  box.id = boxId;
  box.className = "box";

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

    box.querySelectorAll('button').forEach(option => {
      option.addEventListener('click', async () => {
        // Send the user's choice to our API

        const value = option.textContent;

        const box = option.parentElement.parentElement;
        // Remove all buttons
        option.parentElement.querySelectorAll('button').forEach(btn => btn.remove());

        // Remove all rows
        box.querySelectorAll('.row').forEach(row => row.remove());

        // Change box background color
        box.style.backgroundColor = '#ff2ba3d1'; // Change color as desired

        // Display clicked button text
        const textDisplay = document.createElement('p');
        textDisplay.textContent = value;
        box.appendChild(textDisplay);

        box.parentElement.appendChild(createButtonBox(`box`));
      });
    });
  }

  return box;
}

// async init function (because of the awaits on fetches)
const initPageProjet = async function () {


  // Retrieve the partner's topic from our API
  let response = await fetch('api/topic');
  const data1 = await response.json();

  const titre = document.getElementById('titre');
  titre.textContent = `Our topic is "${data1.topic}".`;

  document.getElementById('mapColum1').appendChild(createButtonBox());



};