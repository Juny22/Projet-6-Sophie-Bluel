
// Récupérer le token
const token = localStorage.getItem('token');
let works = [];

import {
    showImages,
    showCategories,
    clearLocalStorage,
    modalAdminMode,
    displayWorks,
    createContainerEdition,
    displayCategories,
} from './functions.js';

export {fetchWorks}

function fetchWorks () {
//Récupérer les travaux
fetch("http://localhost:5678/api/works")
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        works = data;
        showImages(data);
        if (token && token !== "undefined") {
            displayWorks(works);
        }
    })
    .catch(function (error) {
        console.error(error);
    });
}
fetchWorks();

//Récupérer les catégories
fetch("http://localhost:5678/api/categories")
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        showCategories(data);
        displayCategories(data);
    })
    .catch(function(error) {
        console.error(error);
    });

// login
//document.addEventListener("DOMContentLoaded", function() {

    if (token && token !== "undefined") {
       console.log("login sucessfully");

       modalAdminMode();
       createContainerEdition();
       const modifPicture = document.getElementById('mod-picture');
        modifPicture.style.display = 'block';

       document.getElementById("login").innerHTML = "logout";
 
       let btnLogout = document.getElementById("login");
       btnLogout.addEventListener("click", function (event) {
            event.preventDefault();
            clearLocalStorage();
       })
    }
//});