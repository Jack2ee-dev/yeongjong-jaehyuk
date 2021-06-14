// hooks
const useState = defaultValue => {
  let value = defaultValue;

  const get = () => value;
  const set = updated => {
    value = updated;
    render();
  };

  return [get, set];
};

const [$button1, $button2] = document.getElementsByClassName('control');
const [currentTime, setCurrentTime] = useState({
  mm: 0,
  ss: 0,
  ms: 0
});
const [laps, setLaps] = useState([]);
let recordId = 1;
let timerId;
const $display = document.querySelector('.display');

const format = s => (s < 10 ? '0' + s : s);

const render = () => {
  const ct = currentTime();
  $display.textContent = `${format(ct.mm)}:${format(ct.ss)}:${format(ct.ms)}`;
};

const start = () => {
  $button1.textContent = 'Stop';
  $button2.textContent = 'Lap';
  $button2.removeAttribute('disabled');

  const parseTime = () => {
    const ct = { ...currentTime() };
    if (ct.ms === 99) {
      ct.ss += 1;
      ct.ms = 0;
    }
    if (ct.ss === 59) {
      ct.mm += 1;
      ct.ss = 0;
    }
    ct.ms += 1;
    setCurrentTime(ct);
  };

  timerId = setInterval(parseTime, 10);
};

const stop = () => {
  $button1.textContent = 'Start';
  $button2.textContent = 'Reset';
  clearInterval(timerId);
  timerId = null;
};

const reset = () => {
  $button2.setAttribute('disabled', true);
  setCurrentTime({
    mm: 0,
    ss: 0,
    ms: 0
  });
};

const lap = () => {
  setLaps();

  const newLap = document.createDocumentFragment();
  const record = document.createElement('div');
  record.textContent = recordId++;
  newLap.appendChild(record);
  const time = document.createElement('div');
  const ct = currentTime();
  time.textContent = `${format(ct.mm)}:${format(ct.ss)}:${format(ct.ms)}`;
  newLap.appendChild(time);
  document.querySelector('.laps').appendChild(newLap);
};

$button1.addEventListener('click', () => {
  if ($button1.textContent === 'Start') {
    start();
    return;
  }
  stop();
});

$button2.addEventListener('click', () => {
  if ($button2.textContent === 'Reset') {
    reset();
    return;
  }
  lap();
});
