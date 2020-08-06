let buttons = document.querySelectorAll('button.drum');
buttons.forEach((button) => button.addEventListener('click', handleClick));

function playAudio(key){
  switch (key) {
    case "w":
      let tom1 = new Audio('sounds/tom-1.mp3');
      tom1.play();
    case "a":
      let tom2 = new Audio('sounds/tom-2.mp3');
      tom2.play();
    case "s":
      let tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
    case "d":
      let tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
    case "j":
      let snare = new Audio('sounds/snare.mp3');
      snare.play();
    case "k":
      let crash = new Audio('sounds/crash.mp3');
      crash.play();
    case "l":
      let kick = new Audio('sounds/kick-bass.mp3');
      kick.play();
    default:
      console.log(key);
  }
}

function buttonAnimation(key) {
  let activeButton = document.querySelector(`.${key}`);
  activeButton.classList.add("pressed");

  setTimeout(function(){
    activeButton.classList.remove("pressed");
  }, 100)
}

function handleClick(){
  let buttonInnerHTML = this.innerHTML;
  playAudio(buttonInnerHTML);
  buttonAnimation(buttonInnerHTML);
};

document.addEventListener('keydown', function(e) {
  let key = e.key;
  playAudio(key);
  buttonAnimation(key);
})

