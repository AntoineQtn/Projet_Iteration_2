const imageContainer = document.getElementById('Gallery'); // création d'une variable pour le container de la galerie
const containerFormulaire = document.getElementById('Formulaire'); // création d'une variable pour le container du formulaire 
const containerPhoto = document.getElementById('newPost'); // création d'une variable pour le container de la photo
const pubContainer = document.getElementById('emplacementPub'); // création d'une variable pour le container de la pub
const newPost = document.getElementById('addPost'); // création d'une variable pour le bouton d'ajout de photo

let pubImages = []; // tableau pour stocker les images de la pub
let currentIndex = 0; // index de l'image actuelle
let autoScrollInterval; // variable pour stocker l'intervalle de défilement automatique

function getpub() { // fonction pour récupérer les images de la pub
  fetch("https://api.thecatapi.com/v1/images/search?limit=10") // URL de l'API pour récupérer les images de la pub avec la fonction fetch()
    .then(res => res.json()) // réponse de l'API au format JSON
    .then(function (json) { // fonction pour traiter la réponse JSON
      pubImages = json; // stocker les images dans le tableau pubImages
      displayPub(pubImages[currentIndex]); // afficher la première image
      startAutoScroll(); // démarrer le défilement automatique
    })
    .catch(error => console.error('Error fetching images:', error)); // gérer les erreurs de la requête fetch

}
getpub(); // appel de la fonction pour récupérer les images de la pub

function displayPub(pub) { // fonction pour afficher les images de la pub
  pubContainer.innerHTML = ''; // vider le conteneur avant d'afficher la nouvelle image
  const cardPub = document.createElement('div'); // créer une nouvelle div pour la pub
  cardPub.innerHTML = ` 
    <img src="${pub.url}" alt='Pub' style="width:100%"> 
  `; // ajouter l'image de la pub à la div
  pubContainer.appendChild(cardPub); // ajouter la div de la pub au conteneur
}

function nextImage() { // fonction pour passer à l'image suivante
  currentIndex = (currentIndex + 1) % pubImages.length; // Passer à l'image suivante
  displayPub(pubImages[currentIndex]); // Afficher la nouvelle image
}

function startAutoScroll() { // fonction pour démarrer le défilement automatique
  autoScrollInterval = setInterval(nextImage, 3000); // Changer d'image toutes les 3 secondes
}

function stopAutoScroll() { // fonction pour arrêter le défilement automatique
  clearInterval(autoScrollInterval); // Arrêter le défilement automatique
}


function getImage() { // fonction pour récupérer les images de l'API Rick and Morty
  fetch("https://rickandmortyapi.com/api/character/")
    .then(res => res.json())
    .then(function (json) {
      displayImage(json.results); 
    })
    .catch(error => console.error('Error fetching images:', error));
}

function displayImage(characters) {
  characters.forEach(character => {
    const cardImages = document.createElement('div');
    cardImages.innerHTML = `
        <img src="${character.image}" alt="${character.name}" style="width:100%">
        `;
    imageContainer.appendChild(cardImages);
  });
}

function addPhoto() { // fonction pour ajouter une photo
  newPost.addEventListener("click", function () { // ajout de la fonction cliquable sur le bouton d'ajout de photo
    votreImage = prompt("Entrez l'URL de l'image :"); // demande à l'utilisateur de saisir l'URL de l'image
    const zonePhoto = document.createElement('div'); // création d'une nouvelle div pour la photo
    zonePhoto.innerHTML = `
        <img src="${votreImage}" alt="Votre Image" style="width:100%">
        `;
    containerPhoto.appendChild(zonePhoto);

  })
}
addPhoto(); // appel de la fonction pour ajouter une photo

function removePhoto() { // fonction pour supprimer une photo
  const deleteBtn = document.getElementById('deletePost'); // création d'une variable pour le bouton de suppression lié à la div html
  deleteBtn.addEventListener("click", function () {
    if (containerPhoto.lastChild) {
      containerPhoto.removeChild(containerPhoto.lastChild); // suppression de la dernière photo ajoutée
    }
  });
}
removePhoto();

getImage();

const goUpBtn = document.getElementById('goUpBtn'); // création d'une variable pour le goUpButton qui prend en compte le scrolling
window.onscroll = function () { 
  scrollFunction();
};

function scrollFunction() { //création de la fonction scrollFunction qui permet de faire apparaître le bouton 'goUpBtn' lorsque l'on scroll
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) { // vérification de la position du scroll en pixels
    goUpBtn.style.display = "block"; // si le scroll est supérieur à 20 pixels, le bouton s'affiche
  } else {
    goUpBtn.style.display = "none"; // sinon, il est caché
  }
}

goUpBtn.addEventListener("click", function () { // ajout d'un événement au bouton 'goUpBtn' pour le faire remonter en haut de la page
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; //
});

function affichageDropdown() {  //fonction affichant le menu déroulant du header
  document.getElementById("myDropdown").classList.toggle("show"); //récupération de la div 'myDropdown' du html, et utilisation de la propriété 'classList' et de la méthode toggle("show") pour afficher ou nom le menu déroulant
}

window.onclick = function (event) {//création de l'aspect cliquable du menu : si l'on clique sur le 'dropbtn' on accède aux possibilités de clics
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content"); //récupération de la div 'dropdown-content' du html
    var i; // création d'une variable i pour la boucle
    for (i = 0; i < dropdowns.length; i++) { // boucle pour parcourir les éléments de la classe 'dropdown-content'
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) { //vérification de la présence de la classe 'show' dans la div 'dropdown-content'
        openDropdown.classList.remove('show'); //si la classe 'show' est présente, elle est supprimée
      }
    }
  }
}

