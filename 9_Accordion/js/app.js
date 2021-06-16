const $accordion = document.querySelector('.accordion');

// event handlers
$accordion.addEventListener('click', e => {
  if (!e.target.matches('.accordion > .menu-container > .menu')) return;
  [...document.getElementsByClassName('menu-container')].forEach(
    $menuContainer => {
      $menuContainer.classList.toggle(
        'active',
        $menuContainer === e.target.parentNode
      );
      $menuContainer.querySelector('.submenu').style.height =
        $menuContainer === e.target.parentNode
          ? e.target.nextElementSibling.scrollHeight + 'px'
          : 0;
    }
  );
});
