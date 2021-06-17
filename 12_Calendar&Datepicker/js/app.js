const $calendar = document.querySelector('.calendar');
const $calendarGrid = document.querySelector('.calendar-grid');
const $calendarNav = document.querySelector('.calendar-nav');
const $prevBtn = document.querySelector('.prev');
const $nextBtn = document.querySelector('.next')
const $calendarMonth = document.querySelector('.month');
const $datePicker = document.querySelector('.date-picker');

const now = new Date();
let [year, month, date] = [now.getFullYear(), now.getMonth(), now.getDate()];
const monthMap = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const getFirstDay = (year, month) =>
  new Date(`${year}/${month + 1}/1`).getDay();
const getLastDate = (year, month) => new Date(year, month + 1, 0).getDate();
const getLastDay = (year, month) => new Date(year, month + 1, 0).getDay();

const getWeekOfMonth = (year, month, date) => {
  const dateObj = new Date(year, month, date);
  return Math.ceil((dateObj.getDate() - 1 - dateObj.getDay()) / 7);
};

const getPrevCalendar = () => {
  month = month === 0 ? 11 : month - 1;
  year = month === 0 ? year - 1 : year;
  render();
}

const getNextCalendar = () => {
  year = month === 11 ? year + 1 : year;
  month = month === 11 ? 0 : month + 1;
  render();
}

const renderNav = () => {
  $calendarMonth.innerHTML = `
    <div>${monthMap[month]}</div>
    <div>${year}</div>
  `
}

const render = () => {
  renderNav();
  const weekOfLastDate = getWeekOfMonth(year, month, getLastDate(year, month));
  let thisMonthDates = Array.from(
    { length: getLastDate(year, month) },
    (_, i) => {
      const d = new Date(year, month, i + 1);
      return { day: d.getDay(), date: d.getDate() };
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
    mapped = [`<div class="date">${lastDate}</div>`, ...mapped];
    lastDate--;
  }
  for (let i = 1; i < 7 - getLastDay(year, month); i++) {
    mapped = [...mapped, `<div class="date">${i}</div>`];
  }

  $calendarGrid.innerHTML = [...(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => `<div>${day}</div>`)), ...mapped].join('');
};

render();

$prevBtn.addEventListener('click', getPrevCalendar);
$nextBtn.addEventListener('click', getNextCalendar);
$datePicker.addEventListener('click', () => {
  $calendar.style.opacity = 1;
})
$calendarGrid.addEventListener('click', e => {
  if (!e.target.matches('.date')) return;
  if (!(e.target.matches('.black') || e.target.matches('.red'))) return;
  const format = s => s < 10 ? '0' + s : s;
  date = +e.target.textContent;
  document.querySelector('input.date-picker').setAttribute('value', `${year}-${format(month+1)}-${format(e.target.textContent)}`);
  $calendar.style.opacity = 0;
  render();
})