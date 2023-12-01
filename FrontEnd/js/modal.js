import { fetchWorks } from "./script.js";

let modal = null;
const focusableSelector = 'button, a, input, textarea';
let focusables = [];

// Ouvrir la modale
const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'));
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    Array.from(modal.querySelectorAll('.js-modal-close')).forEach((closeBtn) => closeBtn.addEventListener('click', closeModal));
}
 //Fermer la modale
const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    Array.from(modal.querySelectorAll('.js-modal-close')).forEach((closeBtn) => closeBtn.removeEventListener('click', closeModal));
    modal = null;
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
})

//Fermer la modale avec la touche Echape "Esc"
window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
})

//Cacher la modal-delete par la modal-add
const modalDelete = document.getElementById('modal-delete');
const modalAdd = document.getElementById('modal-add');
const modalTrigger = document.getElementById('modal-trigger');
const modalBack = document.getElementById('modal-arrowback');

modalTrigger.addEventListener('click', function() {
  modalDelete.style.display = 'none';
  modalAdd.style.display = 'block';
});
modalBack.addEventListener('click', function() {
    modalAdd.style.display = 'none';
    modalDelete.style.display = 'block';
});

//Afficher l'image choisit
document.querySelector("#file").addEventListener("change", (e) => {
    e.preventDefault();
    document.querySelector(".fa-image").style.display = "none";
    document.querySelector(".hide-label").style.display = "none";
    document.querySelector(".hide-jpg").style.display = "none";
    console.log("change");
    // L'image img#image
    var image = document.getElementById("preview-img");
    // e.files contient un objet FileList
    console.log("e", e);
    const [picture] = e.srcElement.files;
  
    if (picture) {
      // On change l'URL de l'image
      image.src = URL.createObjectURL(picture);
    }
  });

//Rajouter un travail
const addPictureForm = document.getElementById('add-picture-form');

addPictureForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(addPictureForm);
   
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: formData
    })
      .then(response => {
        if (response.status === 201) {
          fetchWorks();
        } else {
          throw new Error('Failed to add work.');
        }
      })
      .catch(error => {
        console.error(error);
        alert('Échec de l\'ajout de la photo.');
      });
  });

//Fermer la modal au clic quand un projet est ajouté

const closeButton = document.getElementById('submit-button');

closeButton.addEventListener('click', function() {
    closeButtonModal();
});

const closeButtonModal = function() {
  if (modal === null) return;
  modalAdd.style.display = 'none';
  modalDelete.style.display = 'block';
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  Array.from(modal.querySelectorAll('.js-modal-close')).forEach((closeBtn) => closeBtn.removeEventListener('click', closeModal));
  modal = null;
};

//change la couleur du bouton valider lorsque le formulaire est rempli

const submitButton = document.querySelector('.valid-form');

addPictureForm.querySelectorAll('[required]').forEach(input => {
  input.addEventListener('input', function() {
    const isFormValid = Array.from(addPictureForm.querySelectorAll('[required]')).every(input => input.value.trim() !== '');
    if (isFormValid) {
      submitButton.classList.add('valid-color');
      console.log("changer la couleur")
    } else {
      submitButton.classList.remove('valid-color');
    }
  });
});