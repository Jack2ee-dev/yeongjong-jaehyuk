const $nav = document.querySelector('.container > nav');
const $toggleBtn = document.querySelector('.toggle');

$toggleBtn.addEventListener('click', () => {
  $nav.classList.toggle('active');
});
