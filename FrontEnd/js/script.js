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