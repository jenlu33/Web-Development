const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

let level = 0;
let start = false;

// if game has not started yet, press any key to start. Else nothing happens
// if (!start) {
//   $("body").keydown(() => nextSequence())
// } else {
//   console.log("what");
// }

function nextSequence() {
  start = true;
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



