//
const ficheBrasserie = document.getElementById("content");

fetch('https://api.openbrewerydb.org/v1/breweries')
  .then(response => response.json())
  .then(breweries => {
    for (const brewery of breweries) {
      const divElement = document.createElement('div');
      divElement.className = 'card'; // Création d'une classe CSS pour styliser la carte

      divElement.innerHTML = `
        <h2>${brewery.name}</h2>
        <p><strong>Type :</strong> ${brewery.brewery_type}</p>
        <p><strong>Ville :</strong> ${brewery.city}, ${brewery.state}</p>
        ${brewery.website_url ? `<p><a href="${brewery.website_url}" target="_blank">Visiter le site web</a></p>` : ''}
      `;
//la fonction variable.appendChild() permet d'intégrer l'objet dans un conteneur parent
      ficheBrasserie.appendChild(divElement);
    }
  })
  //Affichage d'un message d'erreur si problème d'API ou de requête
  .catch(error => {
    console.error('Erreur : ', error);
  });

