const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

// if game has not started yet, press any key to start. Else nothing happens
$("body").keydown(() => {
  if (!started) {
    setTimeout(() => {
      nextSequence();
    }, 200)
    
    $("#level-title").text(`Level ${level}`)
    started = true;
  }
});

function nextSequence() {
  started = true;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  
  playSound(randomChosenColor);
  
  $(`#${randomChosenColor}`).fadeOut(70).fadeIn(70) // blinking animation for selected color
  
  level++;
  $("#level-title").html(`Level ${level}`); // change level text
};

function handleClick(e) {
  let userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
};

$("div[type='button']").click((e) => handleClick(e)); // event listener for user clicking on buttons

function playSound(name) {
  let sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
};

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");

  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed")
  }, 100);
};

$("div[type='button']").click(() => {
  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
  // checks to see if current click matches with gamePattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      console.log('success');
    } else { // game over
      let wrongSound = new Audio('sounds/wrong.mp3');
      wrongSound.play();

      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over")
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      restartGame();
    }

    // if everything matches and currentLevel === actual current level then move on to next level and reset clicks
    if (currentLevel === gamePattern.length - 1) {
      setTimeout(() => {
        nextSequence()
      }, 1000);
      userClickedPattern = [];
    }
};

function restartGame() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}



