"use strict";

let Institutionnel = null;


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
      console.log(typeof(button.id));
      console.log(button.id);
      button.textContent = ` ${buttonNumber} `;
      row.appendChild(button);
    }

    box.appendChild(row);

    box.querySelectorAll('button').forEach(option => {
      option.addEventListener('click', async () => {
        // Send the user's choice to our API
        console.log(option.textContent);
        // const value = option.textContent;

        const box = option.parentElement.parentElement;
        // Remove all buttons
        option.parentElement.querySelectorAll('button').forEach(btn => btn.remove());

        // Remove all rows
        box.querySelectorAll('.row').forEach(row => row.remove());

        // Change box background color
        box.style.backgroundColor = '#ff2ba3d1'; // Change color as desired
        console.log(option.id);
        // Display clicked button text
        const textDisplay = document.createElement('p');
        console.log(Institutionnel[option.id])
        textDisplay.textContent = Institutionnel[parseInt(option.textContent,10) - 1].Base;
        console.log(textDisplay.textContent);
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

  const response2 = (await fetch('/rembobine/data/article.json'));
  const article = await response2.json()
  Institutionnel = article.Institutionnel;
  console.log(article);
  console.log(Institutionnel);


  const titre = document.getElementById('titre');
  titre.textContent = `Our topic is "${data1.topic}".`;

  document.getElementById('mapColum1').appendChild(createButtonBox());



};