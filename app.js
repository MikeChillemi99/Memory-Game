// Au chargement de ma page j'affiche mes cartes
document.body.onload = fnAddCards;
// Tableau des couleurs et tableau de couleurs mélanger
const tblColors = ["red","red","blue","blue","green","green","yellow","yellow","orange","orange","purple","purple","gray","gray","lime","lime"];
const tblRandomColors = fnShuffleTable(tblColors)
// Tableau des cartes retournées
const tblFlippedCards = [];

/* Fonction pour ajouter les cartes */
function fnAddCards() {

  // Boucle pour ajouter un nombre de cartes en fonction du nombre de couleurs
  for (let i = 0; i < tblColors.length; i++) {
    // Création d'une carte en ajoutant class et attribut
    const newCard = document.createElement("button");
    newCard.classList.add("card","back");
    newCard.setAttribute('id', i);

    // Ajouter un dataset-color pour que nos cartes possèdent leur couleur
    newCard.dataset.color = tblRandomColors[i];

    // Au click retourner notre carte
    newCard.addEventListener("click", function () {
      fnRevealCard(newCard);
    });

    // Ajouter les cartes au container
    const cardsContainer = document.getElementById("cardsContainer")
    cardsContainer.appendChild(newCard);
  }
}

/* Fonction pour retourner une carte */
function fnRevealCard(card) {

  // Contrôler si la carte est déjà retournée
  if (!card.classList.contains("back")) return;

  // Retourner la carte en changement de class css
  card.classList.remove("back");
  card.classList.add(card.dataset.color);

  // Ajouter la couleur de la carte retournée dans mon tableau pour une futur comparaison
  tblFlippedCards.push(card);

  // Check si 2 cartes sont de la même couleur
  if (tblFlippedCards.length === 2) {
    const [card1, card2] = tblFlippedCards;

    if (card1.dataset.color === card2.dataset.color) {
      tblFlippedCards.length = 0;
      // Check si toutes les cartes sont retournées
      checkWin();
    }
    // Sinon retourne les cartes si on ne trouve pas de paire
    else {
      setTimeout(() => {
        card1.classList.add("back");
        card1.classList.remove(card1.dataset.color);

        card2.classList.add("back");
        card2.classList.remove(card2.dataset.color);

        tblFlippedCards.length = 0;
      }, 500);
    }
  }
}

/* Fonction pour mélanger un tableau */
function fnShuffleTable(array) { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array
}

/* Fonction pour mélanger un tableau */
function checkWin() {
  // Sélectionner toutes les cartes avec la classe "back"
  const remainingCards = document.querySelectorAll(".card.back");

  // Si aucune carte n'a la classe "back", c'est gagné !
  if (remainingCards.length === 0) {
    win();
  }
}

/* Fonction pour mélanger un tableau */
function win() {
  const youWon = document.getElementById("youWon");
  // Affiche le message gagné
  youWon.classList.remove("hidden");
}
