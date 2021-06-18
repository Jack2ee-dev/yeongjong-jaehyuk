const $body = document.querySelector('body');
const $toggleBtn = document.querySelector('.toggle-button');

const toggleTheme = () => {
  if ($body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme');
  }
};

$toggleBtn.addEventListener('click', () => {
  $body.classList.toggle('dark');
  toggleTheme();
});
