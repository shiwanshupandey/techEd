// darkmode.js

const DARK_MODE_KEY = 'darkMode';

export function enableDarkMode() {
  document.body.classList.add('dark');
  localStorage.setItem(DARK_MODE_KEY, 'enabled');
}

export function disableDarkMode() {
  document.body.classList.remove('dark');
  localStorage.setItem(DARK_MODE_KEY, 'disabled');
}

export function toggleDarkMode() {
  if (document.body.classList.contains('dark')) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}

export function initializeDarkMode() {
  const darkModeSetting = localStorage.getItem(DARK_MODE_KEY);

  if (darkModeSetting === 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}
