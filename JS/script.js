const guess = document.getElementById('guess');
const play = document.getElementById('play');
const reset = document.getElementById('reset');
const result = document.getElementById('result');
const secretInfo = document.getElementById('secret');
const chancesLabel = document.getElementById('chancesLabel');
const scoreLabel = document.getElementById('scoreLabel');

let secret = 0;
let remainingChances = 0;
let totalChances = 0;
let points = 0;
let attemptsUsed = 0;
let gameActive = false;

function getSelectedMaxNumber() {
  return Number(document.querySelector('input[name="maxNumber"]:checked').value);
}

function getSelectedMaxChances() {
  return Number(document.querySelector('input[name="maxChances"]:checked').value);
}

function getRangeMultiplier(maxNumber) {
  if (maxNumber === 20) return 2;
  if (maxNumber === 30) return 3;
  return 1;
}

function calculateScore(attemptCount, maxNumber) {
  const base = Math.max(0, 110 - (attemptCount * 10));
  return base * getRangeMultiplier(maxNumber);
}

function startGame() {
  const max = getSelectedMaxNumber();
  totalChances = getSelectedMaxChances();
  remainingChances = totalChances;
  secret = Math.floor(Math.random() * (max + 1));
  points = 0;
  attemptsUsed = 0;
  gameActive = true;
  guess.value = 0;
  guess.min = 0;
  guess.max = max;

  chancesLabel.textContent = remainingChances;
  scoreLabel.textContent = points;
  result.textContent = `Jogo pronto! Adivinhe um número entre 0 e ${max}.`;
  secretInfo.textContent = '';
}

function endGame(won) {
  gameActive = false;
  if (won) {
    result.textContent = `Acertou! Número era ${secret}. Pontos: ${points}.`;
  } else {
    result.textContent = `Suas chances acabaram. Você perdeu.`;
  }
  secretInfo.textContent = `Número sorteado: ${secret}.`;
}

play.addEventListener('click', () => {
  if (!gameActive) {
    startGame();
    return;
  }

  const value = parseInt(guess.value, 10);
  const max = getSelectedMaxNumber();

  if (Number.isNaN(value) || value < 0 || value > max) {
    result.textContent = `Digite um número válido entre 0 e ${max}.`;
    return;
  }

  if (remainingChances <= 0) {
    endGame(false);
    return;
  }

  attemptsUsed += 1;
  remainingChances -= 1;
  chancesLabel.textContent = remainingChances;

  if (value === secret) {
    points = calculateScore(attemptsUsed, max);
    scoreLabel.textContent = points;
    endGame(true);
    return;
  }

  if (remainingChances === 0) {
    scoreLabel.textContent = 0;
    endGame(false);
    return;
  }

  result.textContent = `Errado! O número é ${value < secret ? 'maior' : 'menor'} que ${value}.`;
  scoreLabel.textContent = points;
});

reset.addEventListener('click', startGame);

startGame();
