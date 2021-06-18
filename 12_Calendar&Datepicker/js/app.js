const $calendar = document.querySelector('.calendar');
const $calendarGrid = document.querySelector('.calendar-grid');
const $prevBtn = document.querySelector('.prev');
const $nextBtn = document.querySelector('.next');
const $monthAndYear = document.querySelector('.month-and-year');
const $datePicker = document.querySelector('.date-picker-selector');

const MONTH_NAMES = [
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

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const now = new Date();

let year = now.getFullYear();
let month = now.getMonth();
let date = now.getDate();

// functions
const getFirstDay = (year, month) => new Date(year, month, 1).getDay();
const getLastDay = (year, month) => new Date(year, month + 1, 0).getDay();
const getLastDate = (year, month) => new Date(year, month + 1, 0).getDate();

const format = s => (s < 10 ? '0' + s : s);

const getPrevCalendar = () => {
  const prevMonthLastDate = getLastDate(year, month);
  
  month = month === 0 ? 11 : month - 1;
  year = month === 0 ? year - 1 : year;
  date = prevMonthLastDate < date ? prevMonthLastDate : date;

  $datePicker.setAttribute(
    'value',
    `${year}-${format(month + 1)}-${format(date)}`
  );

  render();
};

const getNextCalendar = () => {
  const prevMonthLastDate = getLastDate(year, month);
  
  year = month === 11 ? year + 1 : year;
  month = month === 11 ? 0 : month + 1;
  date = prevMonthLastDate < date ? prevMonthLastDate : date;

  $datePicker.setAttribute(
    'value',
    `${year}-${format(month + 1)}-${format(date)}`
  );

  render();
};

const render = () => {
  $monthAndYear.innerHTML = `
    <div>${MONTH_NAMES[month]}</div>
    <div>${year}</div>
  `;

  const prevMonthDates = Array.from(
    { length: getFirstDay(year, month) },
    (_, i) => new Date(year, month, -getFirstDay(year, month) + i + 1)
  );

  const thisMonthDates = Array.from(
    { length: getLastDate(year, month) },
    (_, i) => new Date(year, month, i + 1)
  );

  const nextMonthDates = Array.from(
    { length: 7 - getLastDay(year, month) - 1 },
    (_, i) => new Date(year, month + 1, i + 1)
  );

  const datesToBeDisplayed = [
    ...prevMonthDates,
    ...thisMonthDates,
    ...nextMonthDates
  ].map(
    dates => `<div
        data-year=${dates.getFullYear()}
        data-month=${dates.getMonth()}
        data-date=${dates.getDate()}
        class="
          ${
            dates.getMonth() !== month
              ? 'gray'
              : dates.getDay() === 0
              ? 'red'
              : 'black'
          }
          ${
            dates.getMonth() === month && dates.getDate() === date
              ? 'focus'
              : ''
          }">${dates.getDate()}</div>`
  );

  $calendarGrid.innerHTML = [
    ...DAY_NAMES.map(
      dayName => `<div class="dayName-of-the-week">${dayName}</div>`
    ),
    ...datesToBeDisplayed
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
  if (
    !(
      e.target.matches('.red') ||
      e.target.matches('.black') ||
      e.target.matches('.gray')
    )
  )
    return;

  const { dataset } = e.target;
  
  year = +dataset.year;
  month = +dataset.month;
  date = +dataset.date;

  $datePicker.setAttribute(
    'value',
    `${year}-${format(month + 1)}-${format(date)}`
  );

  $calendar.style.display = 'none';

  render();
});
