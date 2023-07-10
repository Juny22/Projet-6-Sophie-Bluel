let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []
let previouslyFocusdElement = null

// Ouvrir la modale
const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll('focusableSelector'))
    previouslyFocusdElement = document.querySelector(':focus')
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopProgagation)
}
 //Fermer la modale
const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusdElement !== null) previouslyFocusdElement.focus()
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopProgagation)
    modal = null
}

//Empeche la fermeture au clic sur la modale
const stopProgagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftkey === true) {
        index--
    } else {
        index++
    }
    debugger
    if (index >= focusables.lenght) {
        index= 0
    }
    if (index < 0) {
        index = focusables.lenght - 1
    }
    focusables[index].focus()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

//Fermer la modale avec la touche Echape "Esc"
window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
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
modalAdd.addEventListener('click', function(event) {
    event.stopPropagation();
});