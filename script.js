let isPaused = false;
let isOver = false;
let hitCount = 0;
let score = 0;
let timerCount = 30;
function playGame(ptime = 30) {
  function runTimer(time = ptime) {
    timerCount = time;
    let timer = setInterval(function () {
      if(isPaused == true){
        clearInterval(timer);
      }
      if (timerCount > 0) {
        document.querySelector("#timerVal").textContent = timerCount;
        timerCount--;
        makeBubble();
      } else {
        clearInterval(timer);
        gameover();
      }
    }, 1000);
  }

  function makeBubble() {
    let cluster = "";
    for (i = 1; i <= 70; i++) {
      cluster += `<div id="${i}" class="bubble">${Math.floor(
        Math.random() * 10
      )}</div>`;
    }
    document.querySelector("#game").innerHTML = cluster;
  }

  // Playing Feature...
  document.getElementById("game").addEventListener("click", function (dets) {
    console.log(dets.target.id);
    if (dets.target.id != "game") {
      score += parseInt(
        document.getElementById(`${dets.target.id}`).textContent
      );
      document.getElementById("score").textContent = score;
      hitCount++;
      document.getElementById("hit").textContent = hitCount;
    }
  });

  runTimer();

  function gameover() {
    // Game Over Function
    document.getElementById("board").style.zIndex = 10;
    document.getElementById("gameover").style.zIndex = 20;
    document.getElementById("overHit").textContent = hitCount;
    document.getElementById("overScore").textContent = score;
    let highscore =
      parseInt(JSON.parse(localStorage.getItem("highscore"))) || 0;
    if (highscore < score) {
      highscore = score;
      document.getElementById("highscore").textContent = highscore;
      localStorage.setItem("highscore", JSON.stringify(highscore));
    }
    else{
      document.getElementById("highscore").textContent = highscore;
    }
  }

}

  // Play Again Feature...
  document
    .getElementById("playAgain")
    .addEventListener("click", function () {
      document.getElementById("board").style.zIndex = 20;
      document.getElementById("gameover").style.zIndex = 10;
      timerCount = 30;
      hitCount = 0;
      score = 0;
      document.getElementById("score").textContent = score;
      document.getElementById("hit").textContent = hitCount;
      document.querySelector("#timerVal").textContent = timerCount;
      playGame();
    });

// GameStart();
document.getElementById("startbtn")
.addEventListener("click", function(){
  document.getElementById("gamestart").style.scale = 0;
  if(isPaused == true){
    isPaused = false;
    console.log(timerCount);
    playGame(timerCount+1);
  }
  else{
    playGame();
  }
})


// Pause Feature...
document.getElementById("pausetag").addEventListener("click", function(){
  isPaused = true;
  document.getElementById("gamestart").style.scale = 1;
})
