"use strict";
/*    JavaScript 7th Edition
      Chapter 11
      Project 11-01

      Project to retrieve the Astronomy Picture of the Day from NASA
      Author: Joseph Gjelaj
      Date:   7-21-24

      Filename: project11-01.js
*/
let imageBox = document.getElementById("imageBox"); 
let dateBox = document.getElementById("dateBox");

dateBox.onchange = function() {
    let dateStr = dateBox.value;
    
    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=dateStr`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            showPicture(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

function showPicture(json) {
    if (json.media_type === "video") {
        imageBox.innerHTML = `
            <iframe width="560" height="315" src="${json.url}" frameborder="0" allowfullscreen></iframe>
            <h2>${json.title}</h2>
            <p>${json.explanation}</p>
        `;
    } else if (json.media_type === "image") {
        imageBox.innerHTML = `
            <img src="${json.url}" alt="${json.title}">
            <h2>${json.title}</h2>
            <p>${json.explanation}</p>
        `;
    } else {
        imageBox.innerHTML = "Image not Available";
    }
}
