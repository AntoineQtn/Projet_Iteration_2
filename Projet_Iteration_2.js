const container = document.getElementById('Brewery'); //création d'une variable 'container' corerspondant à l'id 'Brewery' du html
const containerFormulaire = document.getElementById('zoneFormulaire');
const deletePost = document.getElementById('deletePost');

function getAPIBreweries() { //fonction utilisant la fonction fetch pour récupérer les données de l'API
  fetch('https://api.openbrewerydb.org/v1/breweries/random?size=10')
    .then(res => res.json())
    .then(function (json) {
      displayBreweries(json); //Appel de la fonction affichant le contenu .json de l'API
    });
}
getAPIBreweries(); 

function affichageDropdown() {  //fonction affichant le menu déroulant du header
  document.getElementById("myDropdown").classList.toggle("show"); //récupération de la div 'myDropdown' du html, et utilisation de la propriété 'classList' et de la méthode toggle("show") pour afficher ou nom le menu déroulant
}

const reloadButton = // création du bouton clickable de rechargement du feed
  document.getElementById('reloadBreweries');
reloadButton.addEventListener("click", function () {
  container.innerHTML = '';
  getAPIBreweries();
})

window.onclick = function (event) {//création de l'aspect cliquable du menu : si l'on clique sur le 'dropbtn' on accède aux possibilités de clics
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

const postContainer = document.getElementById('postContainer');
const commentButton = document.getElementById('Formulaire');
const deleteBtn = document.getElementById('deletePost');

commentButton.addEventListener("click", function () {
  const zoneTexte = document.createElement('textarea');
  const addBtn = document.createElement('button');
  addBtn.textContent = "Ajouter un commentaire";

  containerFormulaire.appendChild(zoneTexte);
  containerFormulaire.appendChild(addBtn);

  addBtn.addEventListener("click", function () {
    const content = zoneTexte.value;
    localStorage.setItem('textareaContent', content);
    displayPost();
  });
});

function displayPost() {
  const postContent = localStorage.getItem('textareaContent');
  if (postContent) {
    postContainer.innerHTML = `<p>${postContent}</p>`;
  }
}

deleteBtn.addEventListener("click", function () {
  if (containerFormulaire.lastChild) {
    containerFormulaire.removeChild(containerFormulaire.lastChild);
    localStorage.removeItem('textareaContent');
    postContainer.innerHTML = '';
  }
});

// Afficher le contenu sauvegardé au chargement de la page
displayPost();

function displayBreweries(breweries) { //fonction d'affichage des donnée de l'API
  breweries.forEach(brewery => { //à chaque nouvel objet du tableau d'objet de l'API
    const card = document.createElement('div'); //création d'une variable correspondant à une div du html

    card.innerHTML = `           
    <h2>${brewery.name}</h2>
    <p>${brewery.brewery_type}</p>
    <p>${brewery.street}, ${brewery.city}, ${brewery.state}</p>
    <p>${brewery.phone}</p>
    <a href="${brewery.website_url}" target="_blank">Visit Website</a><br>
  `;
    //mise en page des propriétés de l'objet
    container.appendChild(card);//Ajout des div card dans le block parent création d'un formulaire container
  });
}

const goUpBtn = document.getElementById('goUpBtn'); // création d'une variable pour le goUpButton qui prend en compte le scrolling
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() { //création de la fonction scrollFunction qui permet de faire apparaître le bouton 'goUpBtn' lorsque l'on scroll
  if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
    goUpBtn.style.display = "block";
  } else {
    goUpBtn.style.display = "none";
  }
}

goUpBtn.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
