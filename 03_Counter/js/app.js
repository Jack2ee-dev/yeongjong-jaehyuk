// constants
const COUNTER_DEFAULT_VALUE = 0;

// elements
const $counter = document.querySelector('.counter');
const $increaseBtn = document.querySelector('.increase');
const $decreaseBtn = document.querySelector('.decrease');

// hooks
const useState = defaultValue => {
  let value = defaultValue;

  const get = () => value;
  const set = updatedValue => {
    value = updatedValue;
    render();
  };

  return [get, set];
};

// states
const [counterValue, setCounterValue] = useState(COUNTER_DEFAULT_VALUE);

// functions
const increase = () => {
  setCounterValue(counterValue() + 1);
};

const decrease = () => {
  if (+$counter.textContent <= 0) return;
  setCounterValue(counterValue() - 1);
};

// utils
function render() {
  $counter.textContent = counterValue();
}

// handlers
document.addEventListener('DOMContentLoaded', render);

$increaseBtn.addEventListener('click', increase);

$decreaseBtn.addEventListener('click', decrease);
