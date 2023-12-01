<<<<<<< HEAD
export {
    showImages,
    showCategories,
    clearLocalStorage,
    modalAdminMode,
    displayWorks,
    createContainerEdition,
    displayCategories,
};

// Montrer les images
function showImages(images) {
    const conteneurImages = document.querySelector('.gallery');
    conteneurImages.innerHTML = "";
    images.forEach(element => {
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const img = document.createElement('img');

        img.setAttribute('src', element.imageUrl);
        img.setAttribute('alt', element.title);
        img.setAttribute('category', element.categoryId);
        img.setAttribute('crossorigin', 'anonymous');
        figcaption.textContent = element.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        conteneurImages.appendChild(figure);
        });
    }

// Categories
function showCategories(categories) {
    const divPortfolio = document.getElementById('portfolio');
    const divBoutons = document.createElement('div');
    divBoutons.className = 'categories';
        if (localStorage.getItem('token')) {
            divBoutons.style.display = 'none';
        }

    const btnAll = document.createElement('button');
    btnAll.textContent = 'Tous';
    divBoutons.appendChild(btnAll);

        categories.forEach(categorie => {
            const button = document.createElement('button');
            button.textContent = categorie.name;
            button.id = categorie.id;
            divBoutons.appendChild(button);
            divPortfolio.querySelector('h2').insertAdjacentElement('afterend', divBoutons);

            button.addEventListener('click', function() {
                const id = this.id;
                document.querySelectorAll('.gallery img').forEach(image => {
                    if (image.getAttribute('category') === id) {
                        image.parentElement.style.display = 'block';
                    } else {
                        image.parentElement.style.display = 'none';
                    }
                });
            });
        });

        btnAll.addEventListener('click', function() {
            document.querySelectorAll('.gallery img').forEach(image => {
                image.parentElement.style.display = 'block';
            });
        });
    }

function modalAdminMode() {
    if (localStorage.getItem ('token')) {
        document.getElementById("admin-modal").style.display = "inline";
    }
}

// Deconnexion
function clearLocalStorage() {
    localStorage.clear();
    document.location.href = "./index.html";
}

// Admin mode
function createContainerEdition() {
    const containerEdition = createAndAppendElement(document.body, 'div', ['container-edition'], '', 'afterbegin');
    const icon = createAndAppendElement(containerEdition, 'i', ['far', 'fa-edit', 'fa-pen-to-square']);
    const text = createAndAppendElement(containerEdition, 'div', ['text']);
    const p1 = createAndAppendElement(text, 'p', [], "Mode éditon");
    p1.setAttribute('id', 'thin');
    const p2 = createAndAppendElement(text, 'button', [], "publier les changements");
    p2.setAttribute('id', 'bold');
 }

function createAndAppendElement(parent, elementType, classList = [], textContent = '', position = 'beforeend') {
    const element = document.createElement(elementType);
    element.classList.add(...classList);
    element.textContent = textContent;
    parent.insertAdjacentElement(position, element);
    return element;
}

// modal
// afficher les travaux

function displayWorks(works) {

    const gallery = document.querySelector(".gallery-container");
    gallery.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
    const work = works[i];

    const galleryItem = document.createElement("figure");
    const img = document.createElement('img');
    galleryItem.innerHTML = `<div class="gallery-item">
                                <i class="fa-solid fa-arrows-up-down-left-right arrows-icon" aria-hidden="true"></i>
                                <a href="#" data-work-id="${work.id}" class="trashbin" title="Supprimer ce projet">
                                <i class="fa fa-trash delete-icon" aria-hidden="true"></i>
                                </a>
                                <img src="${work.imageUrl}" alt="${work.title}" crossorigin="same-origin">
                                <figcaption>éditer</figcaption>
                            </div>`;
    //supprimer les travaux                      
    const deleteButton = galleryItem.querySelector('.trashbin');
    deleteButton.addEventListener('click', function(event) {
        event.preventDefault();
        const workId = this.getAttribute('data-work-id');
        deleteWorksData(workId);
    });

    gallery.appendChild(galleryItem);
    }
}

function deleteWorksData(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': "application/Json",
            'authorization': "Bearer " + localStorage.getItem("token"),
        },
    })
        .then((response) => {
            if (response.status === 201) {
                displayWorksModal();
                displayWorks();
            } else {
                throw new Error ('Failed to delete work');
            }
        })
        .catch ((error) => {
            console.error(error);
            alert('Échec de la suppression.');
        });
};

//Catergories admin
function displayCategories(categories) {
    const categorySelect = document.getElementById("category-input");
    for (let category of categories) {
      // Ajoute l'option de catégorie au menu déroulant
      categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    } 
=======
export {
    showImages,
    showCategories,
    clearLocalStorage,
    modalAdminMode,
    displayWorks,
    createContainerEdition,
    displayCategories,
};

import { fetchWorks } from "./script.js";

// Montrer les images
function showImages(images) {
    const conteneurImages = document.querySelector('.gallery');
    conteneurImages.innerHTML = "";
    images.forEach(element => {
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const img = document.createElement('img');

        img.setAttribute('src', element.imageUrl);
        img.setAttribute('alt', element.title);
        img.setAttribute('category', element.categoryId);
        img.setAttribute('crossorigin', 'anonymous');
        figcaption.textContent = element.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        conteneurImages.appendChild(figure);
        });
    }

// Categories
function showCategories(categories) {
    const divPortfolio = document.getElementById('portfolio');
    const divBoutons = document.createElement('div');
    divBoutons.className = 'categories';
        if (localStorage.getItem('token')) {
            divBoutons.style.display = 'none';
        }

    const btnAll = document.createElement('button');
    btnAll.textContent = 'Tous';
    divBoutons.appendChild(btnAll);

        categories.forEach(categorie => {
            const button = document.createElement('button');
            button.textContent = categorie.name;
            button.id = categorie.id;
            divBoutons.appendChild(button);
            divPortfolio.querySelector('h2').insertAdjacentElement('afterend', divBoutons);

            button.addEventListener('click', function() {
                const id = this.id;
                document.querySelectorAll('.gallery img').forEach(image => {
                    if (image.getAttribute('category') === id) {
                        image.parentElement.style.display = 'block';
                    } else {
                        image.parentElement.style.display = 'none';
                    }
                });
            });
        });

        btnAll.addEventListener('click', function() {
            document.querySelectorAll('.gallery img').forEach(image => {
                image.parentElement.style.display = 'block';
            });
        });
    }

function modalAdminMode() {
    if (localStorage.getItem ('token')) {
        document.getElementById("admin-modal").style.display = "inline";
    }
}

// Deconnexion
function clearLocalStorage() {
    localStorage.clear();
    document.location.href = "./index.html";
}

// Admin mode
function createContainerEdition() {
    const containerEdition = createAndAppendElement(document.body, 'div', ['container-edition'], '', 'afterbegin');
    const icon = createAndAppendElement(containerEdition, 'i', ['far', 'fa-edit', 'fa-pen-to-square']);
    const text = createAndAppendElement(containerEdition, 'div', ['text']);
    const p1 = createAndAppendElement(text, 'p', [], "Mode éditon");
    p1.setAttribute('id', 'thin');
    const p2 = createAndAppendElement(text, 'button', [], "publier les changements");
    p2.setAttribute('id', 'bold');
 }

function createAndAppendElement(parent, elementType, classList = [], textContent = '', position = 'beforeend') {
    const element = document.createElement(elementType);
    element.classList.add(...classList);
    element.textContent = textContent;
    parent.insertAdjacentElement(position, element);
    return element;
}

// modal
// afficher les travaux

function displayWorks(works) {

    const gallery = document.querySelector(".gallery-container");
    gallery.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
    const work = works[i];

    const galleryItem = document.createElement("figure");
    const img = document.createElement('img');
    galleryItem.innerHTML = `<div class="gallery-item">
                                <i class="fa-solid fa-arrows-up-down-left-right arrows-icon" aria-hidden="true"></i>
                                <a href="#" data-work-id="${work.id}" class="trashbin" title="Supprimer ce projet">
                                <i class="fa fa-trash delete-icon" aria-hidden="true"></i>
                                </a>
                                <img src="${work.imageUrl}" alt="${work.title}" crossorigin="same-origin">
                                <figcaption>éditer</figcaption>
                            </div>`;
    //supprimer les travaux                      
    const deleteButton = galleryItem.querySelector('.trashbin');
    deleteButton.addEventListener('click', function(event) {
        event.preventDefault();
        const workId = this.getAttribute('data-work-id');
        deleteWorksData(workId);
    });

    gallery.appendChild(galleryItem);
    }
}

function deleteWorksData(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': "application/Json",
            'authorization': "Bearer " + localStorage.getItem("token"),
        },
    })
        .then((response) => {
            if (response.status === 204) {
                fetchWorks();
            } else {
                throw new Error ('Failed to delete work');
            }
        })
        .catch ((error) => {
            console.error(error);
            alert('Échec de la suppression.');
        });
};

//Catergories admin
function displayCategories(categories) {
    const categorySelect = document.getElementById("category-input");
    for (let category of categories) {
      // Ajoute l'option de catégorie au menu déroulant
      categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    } 
>>>>>>> master
  }