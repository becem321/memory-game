(function game() {
  // first we set the clock.
  var seconds = "00";
  var minutes = "00";
  var secondsDiv = document.getElementById("seconds");
  var minutesDiv = document.getElementById("minutes");
  // this function will execute after the first card reveal (line 157).

  function timer() {
    seconds++;
    if (seconds < 10) {
      // just so i have the dd:dd format
      seconds = "0" + seconds;
    }
    if (seconds >= 60) {
      minutes++;
      seconds = "00";
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
    }
    secondsDiv.innerText = seconds;
    minutesDiv.innerText = minutes;

    if (moves == 0) {
      runTimer = setInterval(timer, 1000);
    }
  }



  /*       shuffling program       */
  // icons names from material design.
  const SYMBOLS = [
    "spa",
    "ac_unit",
    "gesture",
    "control_camera",
    "polymer",
    "gavel",
    "local_florist",
    "whatshot",
    "spa",
    "ac_unit",
    "gesture",
    "control_camera",
    "polymer",
    "gavel",
    "local_florist",
    "whatshot"
  ];
  var cardsDiv = document.getElementById("cards");
  var randomSymbols = [];

  (shuffle = () => {
    // copy the items in symbols into randomSymbols in random order.
    for (let i = 0; i < 16; i++) {
      const RANDOM_NUMBER = Math.floor(Math.random() * SYMBOLS.length);
      randomSymbols.splice(RANDOM_NUMBER, 0, SYMBOLS[i]);
    }

    // create divs form randomSymbols with event listener.
    for (let i = 0; i < 16; i++) {
      var card = document.createElement("div");
      //card.innerHTML = `<i class="fas fa-${items[i]}"></i>`;
      card.innerHTML = `<i class="material-icons some md-36 orange600">${
        randomSymbols[i]
      }</i>`;
      card.classList.add(randomSymbols[i], "card");
      card.addEventListener("click", cardClicked);
      cardsDiv.appendChild(card);
    }
  })();



  /*      clicked cards handler      */

  // this program (cardClicked) take's care of:
  // 1- reveal the hidden symbol behind the clicked card (with fucntion revealCard(e)).
  // 2- acknowledge the card clicked and execute the game logic ( function cardsHandler(e)).
  // 3- keep track of moves and stars rating (function ScoreHandler).

  var movesDiv = document.getElementById("moves");
  var moves = 0;
  movesDiv.innerText = "Moves: " + moves;

  function revealCard(e) {
    e.target.classList.add("clicked");
    e.target.removeEventListener("click", cardClicked);
  }

  var firstCard, secondCard, firstCardDiv;
  var score = 3;
  var matchedCards = 0;
  var scoreDiv = document.querySelector("#score-board");

  function cardClicked(e) {
    if (firstCard === undefined) {
      firstCard = e.target.classList[0];
      firstCardDiv = e.target;
      console.log(`this is firstCard = ${firstCard}`);
      revealCard(e);
    } else if (firstCard !== undefined && secondCard === undefined) {
      secondCard = e.target.classList[0];
      console.log(`this is SecondCard = ${secondCard}`);
      revealCard(e);
      setTimeout(() => {
        // this is the next step :p execute the game logic and restart data to initial state.
        // setTimeout function purpose is giving a 1s window for player to memorize cards before they back face down.
        if (firstCard === secondCard) {
          e.target.classList.replace("clicked", "correct");
          firstCardDiv.classList.replace("clicked", "correct");
          matchedCards++;
          scoreHandler("match");
          Wining();
        } else {
          e.target.classList.remove("clicked");
          firstCardDiv.classList.remove("clicked");
          e.target.addEventListener("click", cardClicked);
          firstCardDiv.addEventListener("click", cardClicked);
          scoreHandler("noMatch");
        }

        firstCard = undefined;
        secondCard = undefined;
        moves++;
        movesDiv.innerText = "Moves: " + moves;
      }, 1000);
    }
  }
  var stars = "";
  var star = '<i class="material-icons">star</i>';
  for (let i = 1; i <= score; i++) {
    stars += star;
  }
  scoreDiv.innerHTML = stars;



  /*      Score Handler       */
  function scoreHandler(arg) {
    if (arg === "match") {
      score++;
      stars += star;
    } else if (arg === "noMatch") {
      if (score == 1) {
        stars = star;
      } else {
        score--;
        stars = "";
        for (let i = 1; i <= score; i++) {
          stars += star;
        }
      }
    }
    scoreDiv.innerHTML = stars;
    // start timer after the first move
    timer();

  }



  /*        Congratulations Popup        */
  function Wining(){
  if (matchedCards == 8) {
    var winningWindow = document.createElement('div');
    document.body.appendChild(winningWindow);
    winningWindow.classList.add("winning-window");
    winningWindow.innerHTML = `
    <h3>Congratulations!!</h3>
    <p>You have completed in ${minutes} minutes and ${seconds} seconds.</p>
    <div>${stars}</div>
    <button onclick="restart()">Play again</button>
    `
    setTimeout(() => {
    winningWindow.classList.add("animated")}
    , 300
    );
    clearInterval(runTimer);
  }
  }

  /*       restart button      */
  // the restart button reset the game board, the timer, and the star rating.
  var restartButton = document.querySelector("#restart-button");
  restartButton.addEventListener("click", restart = () => {
    location.reload();
  });
})();
