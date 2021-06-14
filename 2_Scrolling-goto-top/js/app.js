const $body = document.querySelector('body');
const $scrollIcon = document.querySelector('.scroll-icon');

// functions
const throttle = (callback, delay) => {
  let timerId;

  return (event) => {
    if (timerId) return;
    timerId = setTimeout((event) => {
      callback(event);
      timerId = null;
    }, delay, event)
  }
}

const toggleScrollIcon = () => {
  $scrollIcon.style.display = window.pageYOffset > 100 ? 'inline-block' : 'none';
}

// event handlers
document.addEventListener('scroll', throttle(toggleScrollIcon, 200));

$scrollIcon.addEventListener('click', () => {
  window.scrollTo(0, 0);
})