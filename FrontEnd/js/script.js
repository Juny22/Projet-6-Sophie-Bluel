/* test API

async function test() {
    const res = await fetch ("http://localhost:5678/api/works");
    const dataClean = await res.json();
    console.log("data", dataClean);

    const div = document.createElement("div");
    div.setAttribute("class", "project");

    const img = document.createElement('img');
    img.setAttribute('src', './assets/images');

    div.append(img)
    document.body.append(div);
    getElementById('projets')
}

fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => console.log(data));



fetch("http://localhost:5678/api/works")
    .then( function (res) {
        return res.json()
    })
    .then( function (data) {
        console.log('data', data);
    });
*/

// Enregistrer le token
// localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4Nzk3MzA2OSwiZXhwIjoxNjg4MDU5NDY5fQ.Bd465aySf1cTLckYqsqDePDMDjwLpTkdtdZM8-UkEwU');

// Récupérer le token
const token = localStorage.getItem('token');

import {
    showImages,
    showCategories,
    clearLocalStorage,
    modalAdminMode,
    displayWorks,
} from './functions.js';

//Récupérer les travaux
fetch("http://localhost:5678/api/works")
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        showImages(data);
    })
    .catch(function (error) {
        console.error(error);
    });

//Récupérer les catégories
fetch("http://localhost:5678/api/categories")
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        showCategories(data);
    })
    .catch(function(error) {
        console.error(error);
    });

// login

document.addEventListener("DOMContentLoaded", function() {

    if (localStorage.getItem('token') && localStorage.getItem('token') !== "undefined") {
       console.log("sucessfully");

       modalAdminMode();

       document.getElementById("login").innerHTML = "logout";
 
       let btnLogout = document.getElementById("login");
       btnLogout.addEventListener("click", function (event) {
            event.preventDefault();
            clearLocalStorage();
       })
    }
});

//modal travaux

async function getWorks() {
    try {
      const response = await fetch('http://localhost:5678/api/works');
      const works = await response.json();
      displayWorks(works);
    } catch (error) {
      console.log(error);
    }
  }

getWorks();