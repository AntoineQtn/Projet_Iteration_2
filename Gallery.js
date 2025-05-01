const imageContainer = document.getElementById('Gallery');

function getpub() {
    // Implementation goes here
}

function displayPub() {
    // Implementation goes here
}

function getImage() {
    fetch("https://rickandmortyapi.com/api/character/")
        .then(res => res.json())
        .then(function (json) {
            displayImage(json.results); // Pass the results array to displayImage
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

function addPhoto() {
    // Implementation goes here
}

function removePhoto() {
    // Implementation goes here
}

// Call getImage to test the functionality
getImage();

const goUpBtn = document.getElementById('goUpBtn'); // création d'une variable pour le goUpButton qui prend en compte le scrolling
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() { //création d'une fonction 
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      goUpBtn.style.display = "block";
  } else {
      goUpBtn.style.display = "none";
  }
}

goUpBtn.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
  
function affichageDropdown() {  //fonction affichant le menu déroulant du header
    document.getElementById("myDropdown").classList.toggle("show"); //récupération de la div 'myDropdown' du html, et utilisation de la propriété 'classList' et de la méthode toggle("show") pour afficher ou nom le menu déroulant
}

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

const commentButton =
  document.getElementById('Formulaire');
commentButton.addEventListener("click", function () {
  const zoneTexte = document.createElement('textarea');
  containerFormulaire.appendChild(zoneTexte);

})

const deleteBtn =
  document.getElementById('deletePost');
deleteBtn.addEventListener("click", function () {
  containerFormulaire.removeChild(zoneFormulaire.lastChild);
})
