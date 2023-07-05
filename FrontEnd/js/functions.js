export {
    showImages,
    showCategories,
    clearLocalStorage,
    modalAdminMode,
    displayWorks,
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

// modal
// afficher les travaux

function displayWorks(works) {

    const gallery = document.querySelector(".gallery-container");
    gallery.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
    const work = works[i];

    const galleryItem = document.createElement("figure");
    const img = document.createElement('img');
    galleryItem.innerHTML = `<img src="${works[i].imageUrl}" alt="${works[i].title}" crossorigin="same-origin">
                            <figcaption>${works[i].title}</figcaption>`;
    gallery.appendChild(galleryItem);
    }
}