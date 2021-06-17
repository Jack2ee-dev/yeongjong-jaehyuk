const $calendar = document.querySelector('.calendar');
const $calendarGrid = document.querySelector('.calendar-grid');
const $prevBtn = document.querySelector('.prev');
const $nextBtn = document.querySelector('.next');
const $calendarMonth = document.querySelector('.month');
const $datePicker = document.querySelector('.date-picker');

const now = new Date();
let [year, month, date] = [now.getFullYear(), now.getMonth(), now.getDate()];
const monthNames = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

// functions
const getFirstDay = (year, month) => new Date(`${year}/${month + 1}/1`).getDay();
const getLastDate = (year, month) => new Date(year, month + 1, 0).getDate();
const getLastDay = (year, month) => new Date(year, month + 1, 0).getDay();

const getPrevCalendar = () => {
  month = month === 0 ? 11 : month - 1;
  year = month === 0 ? year - 1 : year;
  render();
};

const getNextCalendar = () => {
  year = month === 11 ? year + 1 : year;
  month = month === 11 ? 0 : month + 1;
  render();
};

const render = () => {
  $calendarMonth.innerHTML = `
    <div>${monthNames[month]}</div>
    <div>${year}</div>
  `;

  const thisMonthDates = Array.from(
    { length: getLastDate(year, month) },
    (_, i) => {
      const d = new Date(year, month, i + 1);
      return { year: d.getFullYear(), month: d.getMonth(), day: d.getDay(), date: d.getDate() };
    }
  );

  let mapped = thisMonthDates.map(
    obj =>
      `<div class="date ${obj.day === 0 ? 'red' : 'black'} ${
        obj.date === date ? 'focus' : ''
      }">${obj.date}</div>`
  );

  let lastDate = getLastDate(year, month - 1);

  for (let i = getFirstDay(year, month); i > 0; i--) {
    mapped = [`<div class="date">${lastDate--}</div>`, ...mapped];
  }

  for (let i = 1; i < 7 - getLastDay(year, month); i++) {
    mapped = [...mapped, `<div class="date">${i}</div>`];
  }

  $calendarGrid.innerHTML = [
    ...['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(
      day => `<div>${day}</div>`
    ),
    ...mapped
  ].join('');
};

// event handlers
window.addEventListener('DOMContentLoaded', render);
$prevBtn.addEventListener('click', getPrevCalendar);
$nextBtn.addEventListener('click', getNextCalendar);
$datePicker.addEventListener('click', () => {
  $calendar.style.display = 'block';
});

$calendarGrid.addEventListener('click', e => {
  if (!e.target.matches('.date')) return;
  if (!e.target.matches('.black') && !e.target.matches('.red')) return;

  const format = s => (s < 10 ? '0' + s : s);
  date = +e.target.textContent;

  document
    .querySelector('input.date-picker')
    .setAttribute(
      'value',
      `${year}-${format(month + 1)}-${format(e.target.textContent)}`
    );
  $calendar.style.display = 'none';
  render();
});
