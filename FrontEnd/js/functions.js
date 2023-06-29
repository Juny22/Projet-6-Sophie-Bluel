export {
    showImages,
    showCategories,
    logoutSessionStorage,
    createContainerEdition,
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

// Deconnexion
function logoutSessionStorage() {
    sessionStorage.clear();
    document.location.href = "login.html";
}

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

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.classList.add(...classes);
    return icon;
}

// Modal