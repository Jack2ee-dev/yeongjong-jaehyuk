const $toggleBtn = document.querySelector('.toggle-button');
const $popupMessage = document.querySelector('.popup-message');
const $popupWrapper = document.querySelector('.popup-wrapper');
const $closeBtn = document.querySelector('.close');
const $popupInput = document.querySelector('.popup-input');
const $popupBackground = document.querySelector('.popup-background');
const $form = document.querySelector('form');

const togglePopup = () => {
  $popupWrapper.classList.toggle('active');
};

const renderMessage = message => {
  $popupMessage.textContent = `from popup: ${message}`;
};

$popupBackground.addEventListener('click', togglePopup);

$toggleBtn.addEventListener('click', togglePopup);

$closeBtn.addEventListener('click', togglePopup);

$form.addEventListener('submit', e => {
  e.preventDefault();

  if (
    e.submitter.matches('.popup-input') ||
    e.submitter.matches('.popup-submit')
  ) {
    const value = $popupInput.value.trim();
    if (!value) return;
    renderMessage(value);
    $popupInput.value = '';
  }

  togglePopup();
});
