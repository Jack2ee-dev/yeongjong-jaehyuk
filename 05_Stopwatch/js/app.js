const BASE_TIME = {
  mm: 0,
  ss: 0,
  ms: 0
};

const [$button1, $button2] = document.getElementsByClassName('control');
const $display = document.querySelector('.display');
const $laps = document.querySelector('.laps');

// hooks
const useState = (defaultValue, customRenderFunction) => {
  let value = defaultValue;

  const get = () => value;
  const set = updated => {
    value = updated;
    customRenderFunction();
  };

  return [get, set];
};

// states
const [currentTime, setCurrentTime] = useState({ ...BASE_TIME }, render);
const [laps, setLaps] = useState([], renderLaps);

// render functions
function render() {
  $display.textContent = formatTime();
}

function renderLaps() {
  const _laps = laps();

  $laps.innerHTML =
    `
            <div class="lap-title">Laps</div>
            <div class="lap-title">Time</div>
        ` +
    _laps
      .map(
        lap => `
    <div>${lap.lapId}</div>
    <div>${lap.time}</div>
    `
      )
      .join('');
}

// utils
function formatTime() {
  const format = n => (n < 10 ? '0' + n : n);
  const { mm, ss, ms } = currentTime();

  return `${format(mm)}:${format(ss)}:${format(ms)}`;
}

const timer = (() => {
  let timerId;

  const progress = () => {
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

  return {
    start() {
      timerId = setInterval(progress, 10);
    },
    stop() {
      clearInterval(timerId);
      timerId = null;
    }
  };
})();

// function related to user interface
const start = () => {
  $button1.textContent = 'Stop';
  $button2.textContent = 'Lap';
  $button2.removeAttribute('disabled');
  timer.start();
};

const stop = () => {
  $button1.textContent = 'Start';
  $button2.textContent = 'Reset';
  timer.stop();
};

const reset = () => {
  $button2.setAttribute('disabled', true);
  setCurrentTime({ ...BASE_TIME });
  setLaps([]);
  $laps.innerHTML = '';
};

const lap = () => {
  setLaps([...laps(), { lapId: laps().length + 1, time: formatTime() }]);
};

// event handlers
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
