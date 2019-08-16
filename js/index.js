(function game() {
  // first we set the clock.
  var seconds = "00";
  var minutes = "00";
  var secondsDiv = document.getElementById("seconds");
  var minutesDiv = document.getElementById("minutes");

  // this function execute after the first card reveal
  /*
  timer = () => {
    secondsDiv.innerText = seconds;
    minutesDiv.innerText = minutes;
    setTimeout(() => {
      if (seconds < 60) {
        seconds++;
        if (seconds < 10) {
          // just so i have the 00:00 format
          seconds = "0" + seconds;
        }
        timer();
      } else {
        minutes++;
        seconds = "00";
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        timer();
      }
    }, 1000);
  }
*/
  function timer(){
    setInterval( () => {

    secondsDiv.innerText = seconds;
    minutesDiv.innerText = minutes;
    
      if (seconds <= 60) {
        seconds++;
        if (seconds < 10) {
          // just so i have the dd:dd format
          seconds = "0" + seconds;
        }
      }
      else {
        minutes++;
        seconds = "00";
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
      }
    }
    ,1000)
    
  }
  

  var items = ["spa", "ac_unit", "gesture", "control_camera", "polymer", "gavel", "local_florist", "whatshot",
   "spa", "ac_unit", "gesture", "control_camera", "polymer", "gavel", "local_florist", "whatshot"]
  /****** shuffling program ******/
  //const SYMBOLS = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  const SYMBOLS = ["spa", "ac_unit", "gesture", "control_camera", "polymer", "gavel", "local_florist", "whatshot",
  "spa", "ac_unit", "gesture", "control_camera", "polymer", "gavel", "local_florist", "whatshot"]
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
      card.innerHTML = `<i class="material-icons orange600">${randomSymbols[i]}</i>`;
      card.classList.add(randomSymbols[i], "card");
      card.addEventListener("click", cardClicked);
      cardsDiv.appendChild(card);
    }
  })();

  /****** clicked cards handler ******/

  // this program (cardClicked) take's care of
  // 1- reveal the hidden symbol behind the clicked card (with fucntion revealCard(e)).
  // 2- acknowledge the card clicked and execute the game logic ( function cardsChecker(e)).
  // 3- placeholder
/*
  function cardClicked(e) {
    cardsChecker(e)
    revealCard(e)
  }
  */
  var movesDiv = document.getElementById('moves');
  
  var moves = 0;
  movesDiv.innerText = "Moves: " + moves;

  function revealCard(e) {   
    e.target.classList.add("clicked");
    e.target.removeEventListener("click", cardClicked);
    /*
    if (seconds === "00" && minutes === "00") {
      timer();
    }*/
  }

  var firstCard, secondCard, firstCardDiv;
  var score = 1;
  var scoreDiv = document.querySelector("#score-board");

  
  function cardClicked(e) {
    
    if (firstCard === undefined) {
      firstCard = e.target.classList[0];
      firstCardDiv = e.target;
      console.log(`this is firstCard = ${firstCard}`);revealCard(e)
    } else if (firstCard !== undefined && secondCard === undefined) {
      secondCard = e.target.classList[0];
      console.log(`this is SecondCard = ${secondCard}`);revealCard(e)
      setTimeout(() => {
      // this is the next step :p execute the game logic and restart data to initial state
      if (firstCard === secondCard) {
        e.target.classList.replace("clicked", "correct");
        firstCardDiv.classList.replace("clicked", "correct");
        scoreChecker();
      } else {
          e.target.classList.remove("clicked");
          firstCardDiv.classList.remove("clicked");
          e.target.addEventListener("click", cardClicked);
          firstCardDiv.addEventListener("click", cardClicked);
      }
    
      if (moves === 1) {
        timer();
      }
      
      firstCard = undefined;
      secondCard = undefined;
      moves++;
      movesDiv.innerText = "Moves: " + moves;
    }, 700);
    }
    
  }
    /******* Score Handler ******/
    function scoreChecker() {
      score++;
      scoreDiv.innerText = score;
      console.log(score);
      if (score === 9) {
        setTimeout(function alertWin() {
          alert("You Win!!!!");
        }, 1000);
      }
    }

    console.log(firstCard);
    console.log(secondCard);
  

  /***** moves handler *****/

  
  /***** restart button *****/
  // the restart button restart score, timer, moves-counter to initial state and shuffle the cards
  var restartButton = document.querySelector("#restart-button");
  restartButton.addEventListener("click", () => {
    console.log(
      `moves: ${moves} your timing is ${parseInt(minutes, 10)} minutes and ${parseInt(
        seconds,
        10
      )} seconds`
    );
    console.log(`your score ${score}`);
    seconds = "00";
    minutes = "00";
    score = 1;
    scoreDiv.innerText = score;
    moves = 0;
    movesDiv.innerText = "Moves: " + moves;
    const CARDS = document.querySelectorAll(".card");
    for (let card of CARDS) {
      card.parentNode.removeChild(card);
    }

    firstCard = undefined;
    randomSymbols = [];
    shuffle();
  });
  


})();
