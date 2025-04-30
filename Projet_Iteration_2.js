const container = document.getElementById('Brewery'); //création d'une variable 'container' corerspondant à l'id 'Brewery' du html
const containerFormulaire = document.getElementById('zoneFormulaire');

function getAPIBreweries() { //fonction utilisant la fonction fetch pour récupérer les données de l'API
  fetch('https://api.openbrewerydb.org/v1/breweries/random?size=10')
    .then(res => res.json())
    .then(function (json) {
      displayBreweries(json); //Appel de la fonction affichant le contenu .json de l'API
    });
}

function affichageDropdown() {  //fonction affichant le menu déroulant du header
  document.getElementById("myDropdown").classList.toggle("show"); //récupération de la div 'myDropdown' du html, et utilisation de la propriété 'classList' et de la méthode toggle("show") pour afficher ou nom le menu déroulant
}

window.onclick = function (event) { //création de l'aspect cliquable du menu : si l'on clique sur le 'dropbtn' on accède aux possibilités de clics
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

const commentButton =
  document.getElementById('Formulaire');
commentButton.addEventListener("click", function () {
  const zoneTexte = document.createElement('textarea');
  containerFormulaire.appendChild(zoneTexte);
})

const reloadButton = // création du bouton clickable de rechargement du feed
  document.getElementById('reloadBreweries');
reloadButton.addEventListener("click", function () {
  container.innerHTML = '';
  getAPIBreweries();
})

function displayBreweries(breweries) { //fonction d'affichage des donnée de l'API
  breweries.forEach(brewery => { //à chaque nouvel objet du tableau d'objet de l'API
    const card = document.createElement('div'); //création d'une variable correspondant à une div du html

    card.innerHTML = `           
      <h2>${brewery.name}</h2>
      <p>${brewery.brewery_type}</p>
      <p>${brewery.street}, ${brewery.city}, ${brewery.state}</p>
      <p>${brewery.phone}</p>
      <a href="${brewery.website_url}" target="_blank">Visit Website</a>
    `;
    //mise en page des propriétés de l'objet
    container.appendChild(card);//Ajout des div card dans le block parent création d'un formulaire container
  });
}


