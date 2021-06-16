const $accordion = document.querySelector('.accordion');
const $submenu = document.querySelector('.submenu');
const $activeMenu = document.querySelector(
  '.accordion > .menu-container.active'
);
const $menuContainers = document.getElementsByClassName('menu-container');

// event handlers
$accordion.addEventListener('click', e => {
  if (!e.target.matches('.accordion > .menu-container > .menu')) return;
  [...$menuContainers].forEach($menuContainer => {
    $menuContainer.classList.toggle(
      'active',
      $menuContainer === e.target.parentNode
    );
    $menuContainer.querySelector('.submenu').style.height =
      $menuContainer === e.target.parentNode
        ? e.target.nextElementSibling.scrollHeight + 'px'
        : 0;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  $activeMenu.querySelector('.submenu').style.height =
    $submenu.scrollHeight + 'px';
});

$submenu.addEventListener('transitionend', () => {
  $accordion.style.opacity = 1;
});
