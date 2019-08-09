const SYMBOLS = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
function game() {
  /****** shuffling program ******/
  var seconds = "00";
  var minutes = "00";
  var secondsDiv = document.getElementById("seconds");
  var minutesDiv = document.getElementById("minutes");
  
  timer = () => {
    secondsDiv.innerText = seconds;
    minutesDiv.innerText = minutes;
    setTimeout(() => {
      if (seconds < 11) {
        
        seconds++;
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        console.log(seconds);
        timer();
      }
      else {
        minutes++;
        seconds = "00";
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        timer();
      }
    }, 1000);
    
  };
  timer();
  var gameWindow = document.getElementById("gameWindow");
  var randomSymbols = [];
  // copy the items in symbols into randomSymbols in random order.
  shuffle = () => {
    for (let i = 0; i < 16; i++) {
      const RANDOM_NUMBER = Math.floor(Math.random() * SYMBOLS.length);
      randomSymbols.splice(RANDOM_NUMBER, 0, SYMBOLS[i]);
    }
    // create divs form randomSymbols with event listener.
    for (let i = 0; i < 16; i++) {
      var card = document.createElement("div");
      card.innerText = randomSymbols[i];
      card.classList.add(randomSymbols[i], "card");
      card.addEventListener("click", cardClicked);
      gameWindow.appendChild(card);
    }
  };
  shuffle();
  /*shuffling program*/

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
        e.target.classList.replace("clicked", "correct");
        firstCardDiv.classList.replace("clicked", "correct");
        scoreChecker();
      } else {
        setTimeout(() => {
          // using timeout to create transition between the state of being rested and clicked
          e.target.classList.remove("clicked");
          firstCardDiv.classList.remove("clicked");
          e.target.addEventListener("click", cardClicked);
          firstCardDiv.addEventListener("click", cardClicked);
        }, 700);
      }

      firstCard = undefined;
      secondCard = undefined;
    } else if (secondCard !== undefined) {
      for (let card of CARDS) {
        card.parentNode.removeChild(card);
      }
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
  /*clicked cards handler*/
  /***** restart button *****/
  // the restart button restart score to 1, timer to 0 and reshuffle the cards
  var restartButton = document.querySelector("#restart-button");
  restartButton.addEventListener("click", () => {

    console.log(`your timing is ${parseInt(minutes, 10)} minutes and ${parseInt(seconds, 10)} seconds`);
    console.log(`your score ${score}`);
    seconds = "00";
    minutes = "00";
    score = 1;
    scoreDiv.innerText = score;
    const CARDS = document.querySelectorAll(".card");
    for (let card of CARDS) {
      card.parentNode.removeChild(card);
    }
    randomSymbols = [];
    shuffle();
  });
  /* restart button */
  /***** timer *****/
}

game();
