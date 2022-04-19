const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}
function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}


function createHcav() {
  const hcav = document.createElement('div')
  let hcavPosition = 1000;
  let randomTime = Math.random() * 6000;
  const audio = new Audio('roar.wav');
  audio.play();
  if (isGameOver) return;

  hcav.classList.add('hcav');
  background.appendChild(hcav);
  hcav.style.left = hcavPosition + 'px';

  let leftTimer = setInterval(() => {
    if (hcavPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(hcav);
    } else if (hcavPosition > 0 && hcavPosition < 15 && position < 15) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</audio></h1>';
    } else {
      hcavPosition -= 15;
      hcav.style.left = hcavPosition + 'px';
    }
  }, 20);

  setTimeout(createHcav, randomTime);
}

createHcav();
document.addEventListener('keyup', handleKeyUp);