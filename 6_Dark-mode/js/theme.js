const isDark = (() =>
  localStorage.getItem('theme') === 'dark' ||
  window.matchMedia('(prefers-color-scheme: dark)').matches)();

document.querySelector('body').classList.toggle('dark', isDark);
