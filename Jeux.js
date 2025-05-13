let grid = [];
let size = 10; // Taille du plateau de jeu (10x10)
let mineCount = 10; // Nombre de mines

function startGame() {
    grid = [];
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Réinitialise le plateau

    // Générer un plateau avec des cases vides
    for (let x = 0; x < size; x++) {
        grid[x] = [];
        for (let y = 0; y < size; y++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.addEventListener('click', handleLeftClick);
            cell.addEventListener('contextmenu', handleRightClick);
            gameBoard.appendChild(cell);
            grid[x][y] = { mine: false, revealed: false, flagged: false, surroundingMines: 0 };
        }
    }

    // Placer les mines aléatoirement sur le plateau
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);
        if (!grid[x][y].mine) {
            grid[x][y].mine = true;
            minesPlaced++;
        }
    }

    // Calculer le nombre de mines adjacentes pour chaque case
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (grid[x][y].mine) continue;

            let surroundingMines = 0;
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && nx < size && ny >= 0 && ny < size && grid[nx][ny].mine) {
                        surroundingMines++;
                    }
                }
            }
            grid[x][y].surroundingMines = surroundingMines;
        }
    }
}

function handleLeftClick(event) {
    const x = event.target.dataset.x;
    const y = event.target.dataset.y;
    const cell = event.target;

    if (grid[x][y].revealed || grid[x][y].flagged) return;

    grid[x][y].revealed = true;
    cell.classList.add('revealed');

    if (grid[x][y].mine) {
        cell.classList.add('mine');
        alert('Game Over!');
    } else {
        cell.textContent = grid[x][y].surroundingMines || '';
        if (grid[x][y].surroundingMines === 0) {
            revealAdjacentCells(x, y);
        }
    }
}

function handleRightClick(event) {
    event.preventDefault();
    const x = event.target.dataset.x;
    const y = event.target.dataset.y;
    const cell = event.target;

    if (grid[x][y].revealed) return;

    if (grid[x][y].flagged) {
        grid[x][y].flagged = false;
        cell.classList.remove('flag');
    } else {
        grid[x][y].flagged = true;
        cell.classList.add('flag');
    }
}

function revealAdjacentCells(x, y) {
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < size && ny >= 0 && ny < size && !grid[nx][ny].revealed && !grid[nx][ny].mine) {
                grid[nx][ny].revealed = true;
                const cell = document.querySelector(`[data-x="${nx}"][data-y="${ny}"]`);
                cell.classList.add('revealed');
                cell.textContent = grid[nx][ny].surroundingMines || '';
                if (grid[nx][ny].surroundingMines === 0) {
                    revealAdjacentCells(nx, ny);
                }
            }
        }
    }
}

// Démarrer le jeu
startGame();

const plateau = [];
const taillei = 7;
const tailleJ = 9;
function displayJeuDeLOie() {
    const gameBoard2 = document.getElementById('game-board2');
    let cellNumber = 1;
    for (let i = 0; i < taillei; i++) {
        plateau[i] = [];
        for (let j = 0; j < tailleJ; j++) {
            const cell2 = document.createElement('div');
            cell2.classList.add('cell2');
            cell2.textContent = cellNumber;
            gameBoard2.appendChild(cell2);
            cellNumber++;
        }
    }
}
displayJeuDeLOie();

const dice1 = Math.floor(Math.random() * 6) + 1;
const dice2 = Math.floor(Math.random() * 6) + 1; // Génère un nombre aléatoire entre 1 et 6
const player1Position = 0; // Position initiale du joueur 1
const player2Position = 0; // Position initiale du joueur 2

function movePlayer(player, steps) {
    const playerPosition = player === 1 ? player1Position : player2Position;
    const newPosition = playerPosition + steps;

    if (newPosition > 63) {
        alert(`Le joueur ${player} a gagné !`);
        return;
    }

    const cell = document.querySelector(`.cell2:nth-child(${newPosition})`);
    cell.classList.add(`player${player}`);
}
function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1; // Génère un nombre aléatoire entre 1 et 6
    movePlayer(1, dice1);
    movePlayer(2, dice2);
}

// Fonction pour faire défiler la page vers le haut
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

