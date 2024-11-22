// script.js

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeToggleText = document.getElementById('theme-toggle-text');

// Check for saved user preference, if any, on load of the website
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggleText.textContent = '🌞';
} else {
  themeToggleText.textContent = '🌚';
}

themeToggle.addEventListener('click', function () {
  let theme = 'light';
  if (document.documentElement.getAttribute('data-theme') === 'light') {
    theme = 'dark';
    themeToggleText.textContent = '🌞';
  } else {
    themeToggleText.textContent = '🌚';
  }
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});