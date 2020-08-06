const randomNumber1 = Math.floor(Math.random() * 6) + 1;
const diceImage1 = document.querySelector('.img1').setAttribute('src', `./images/dice${randomNumber1}.png`);

const randomNumber2 = Math.floor(Math.random() * 6) + 1;
const diceImage2 = document.querySelector('.img2').setAttribute('src', `./images/dice${randomNumber2}.png`);

let message = document.querySelector('h1');
if (randomNumber1 > randomNumber2){
  message.innerHTML = "🚩Player 1 wins!";
} else if (randomNumber2 > randomNumber1){
  message.innerHTML = "Player 2 wins! 🚩";
} else {
  message.innerHTML = "Draw!";
};


