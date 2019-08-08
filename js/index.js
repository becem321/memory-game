const SYMBOLS = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
function game() {
  /****** shuffling program ******/

  var gameWindow = document.getElementById("gameWindow");
  const RANDOM_SYMBOLS = [];
  // copy the items in symbols into RANDOM_SYMBOLS in random order.
  shuffle = () => {
  for (let i = 0; i < 16; i++) {
    const RANDOM_NUMBER = Math.floor(Math.random() * SYMBOLS.length);
    RANDOM_SYMBOLS.splice(RANDOM_NUMBER, 0, SYMBOLS[i]);
  }
  // create divs form RANDOM_SYMBOLS with event listener.
  for (let i = 0; i < 16; i++) {
    var card = document.createElement("div");
    card.innerText = RANDOM_SYMBOLS[i];
    card.classList.add(RANDOM_SYMBOLS[i], "card");
    card.addEventListener("click", cardClicked);
    gameWindow.appendChild(card);
  }
  /*shuffling program*/
  }
  shuffle();
  /****** clicked cards handler ******/

  // this program take's care of
  // 1- reveal the hidden symbol behind the clicked card (with fucntion revealCard(e)).
  // 2- acknowledge the card clicked and execute the game logic ( function cardsChecker(e)).
  // 3- placeholder

  var firstCard;
  var secondCard;
  var firstCardDiv;
  var score = 1;
  var scoreDiv = document.querySelector("#score-board");
  function cardClicked(e) {
    revealCard(e);
    cardsChecker(e);
  }

  revealCard = e => {
    e.target.classList.add("clicked");
    e.target.removeEventListener("click", cardClicked);
  };

  cardsChecker = e => {
    // check which card is clicked for both first and second card and store data for the next step
    if (firstCard === undefined) {
      firstCard = e.target.classList[0];
      console.log(`this is firstCard = ${firstCard}`);
      firstCardDiv = e.target;
    } else if (firstCard !== undefined && secondCard === undefined) {
      secondCard = e.target.classList[0];
      console.log(`this is SecondCard = ${secondCard}`);

      // this is the next step :p execute the game logic and restart data

      if (firstCard === secondCard) {
        console.log(`firstCard (${firstCard}) | secondCard (${secondCard})`);
        console.log("You Win");
        e.target.classList.replace("clicked", "correct");
        firstCardDiv.classList.replace("clicked", "correct");
        scoreChecker();
      } else {
        setTimeout(() => {
          e.target.classList.remove("clicked");
          firstCardDiv.classList.remove("clicked");
          e.target.addEventListener("click", cardClicked);
          firstCardDiv.addEventListener("click", cardClicked);
        }, 700);
      }
      firstCard = undefined;
      secondCard = undefined;
    }
    /*
function scoreChecker(){
  score++;
  scoreDiv.innerText = score;
  console.log(score);
   if (score === 8){
     setTimeout(function alertWin(){alert("You Win!!!!")}, 1000);
     
   }

}
*/
    scoreChecker = () => {
      score++;
      scoreDiv.innerText = score;
      console.log(score);
      if (score === 8) {
        setTimeout(function alertWin() {
          alert("You Win!!!!");
        }, 1000);
      }
    };

    console.log(firstCard);
    console.log(secondCard);
  };

  /***** restart button *****/
var restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
  score = 1;
  scoreDiv.innerText = score;
  const CARDS = document.querySelectorAll('.card');
  for (let card of CARDS) {
    card.parentNode.removeChild(card);    
  }
  shuffle();
});
 /* restart button */
 
}
/*clicked cards handler*/


game();
