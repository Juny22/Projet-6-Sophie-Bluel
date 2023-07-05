/*

const form = document.getElementById('login_form');

form.addEventListener('submit', event => {
    event.preventDefault();
  
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(response => response.json())
  .then(data => { 
    let userId = data.userId;
    if (userId == 1){
      let token = data;
      localStorage.setItem('token', token.token);
      document.location.href="index.html";
    }else{
      let errorMsg = document.getElementById('error-message');
      errorMsg.textContent="Identifiant ou mot de passe incorrect !";
    }
  })
  .catch(error => {
    console.error(error);
   
  });
});

*/

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data && data.userId && data.token) {
        localStorage.setItem("token", data.token);
        document.location.href = "index.html";
      } else {
        let errorMsg = document.getElementById("error-message");
        errorMsg.textContent = "Identifiant ou mot de passe incorrect !";
      }
    })
    .catch((error) => {
      console.error(error);
      let errorMsg = document.getElementById("error-message");
      errorMsg.textContent = error;
    });
});