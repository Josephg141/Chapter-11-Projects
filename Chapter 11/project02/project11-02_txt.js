"use strict";
/*    JavaScript 7th Edition
      Chapter 11
      Project 11-02

      Project to city and state information from a provided postal code
      Author: Joseph Gjelaj 
      Date:   7-21-24

      Filename: project11-02.js
*/

let postalCode = document.getElementById("postalCode");
let place = document.getElementById("place");
let region = document.getElementById("region");
let country = document.getElementById("country");

postalCode.onblur = function() {
    let codeValue = postalCode.value;
    let countryValue = country.value;
    
    place.textContent = "";
    region.textContent = "";
    
    fetch(`https://api.zippopotam.us/${countryValue}/${codeValue}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {
            place.textContent = json.places[0]["place name"];
            region.textContent = json.places[0]["state abbreviation"];
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};


