const HEIGHT_TOAST = 100;

const $body = document.querySelector('body');
const $successBtn = document.querySelector('.show-success');
const $errorBtn = document.querySelector('.show-error');
const $warningBtn = document.querySelector('.show-warning');

let toasts = [];

// functions
const generateToaster = ({ title, message, type }) => {
  const $toastDiv = document.createElement('div');
  $toastDiv.className = `toast toast-${type}`;
  $toastDiv.innerHTML = `
    <h4 class="toast-heading">${title}</h4>
    <div class="toast-message">
      <svg width="24" height="24">
        <use xlink:href="#${type}" />
      </svg>
      <p>${message}</p>
    </div>
    <a class="close">&times;</a>`;

  return $toastDiv;
};
const setPositions = () => {
  toasts.forEach(($toast, i) => {
    $toast.style.bottom = HEIGHT_TOAST * i + 'px';
  });
};

const addToast = $toast => {
  toasts = [$toast, ...toasts];
  setPositions();
  $body.appendChild($toast);
};

const removeToast = () => {
  $body.removeChild(toasts.pop());
};

// event listeners
$successBtn.addEventListener('click', () => {
  addToast(
    generateToaster({
      type: 'success',
      title: 'Well done',
      message: 'Good'
    })
  );

  setTimeout(removeToast, 3000);
});

$errorBtn.addEventListener('click', () => {
  addToast(
    generateToaster({
      type: 'error',
      title: 'Done Well',
      message: 'Not good'
    })
  );

  setTimeout(removeToast, 3000);
});

$warningBtn.addEventListener('click', () => {
  addToast(
    generateToaster({
      type: 'warning',
      title: 'Enough',
      message: 'Check it out'
    })
  );

  setTimeout(removeToast, 3000);
});

$body.addEventListener('click', e => {
  if (!e.target.matches('.toast > .close')) return;
  removeToast();
});
