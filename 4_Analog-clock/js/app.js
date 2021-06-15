const $secondHand = document.querySelector('.clock > .hand.second');
const $minuteHand = document.querySelector('.clock > .hand.minute');
const $hourHand = document.querySelector('.clock > .hand.hour');

const render = () => {
  const now = new Date();

  const second = now.getSeconds();
  const minute = now.getMinutes();
  const hour = now.getHours();

  $secondHand.style.setProperty('--deg', second * 6);
  $minuteHand.style.setProperty('--deg', minute * 6 + second * 0.1);
  $hourHand.style.setProperty(
    '--deg',
    hour * 30 + minute * 0.5 + second * (1 / 120)
  );
};

window.addEventListener('DOMContentLoaded', () => setInterval(render, 1000));
