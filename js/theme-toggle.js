(function () {
  var STORAGE_KEY = 'dashlab-theme';

  function getStoredTheme() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) || 'light';
    } catch (e) {
      return 'light';
    }
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Ignore storage failures in restricted/private modes.
    }
  }

  function updateButton(theme) {
    var btn = document.getElementById('theme-toggle-btn');
    if (!btn) {
      return;
    }

    var isDark = theme === 'dark';
    btn.textContent = isDark ? '☀' : '☾';
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function applyTheme(theme) {
    var normalized = theme === 'dark' ? 'dark' : 'light';
    if (document.documentElement) {
      document.documentElement.classList.toggle('dark-mode', normalized === 'dark');
    }

    updateButton(normalized);
    return normalized;
  }

  function toggleTheme() {
    var current = document.documentElement && document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storeTheme(next);
  }

  function injectToggleButton() {
    if (!document.body || document.getElementById('theme-toggle-btn')) {
      return;
    }

    var button = document.createElement('button');
    button.id = 'theme-toggle-btn';
    button.type = 'button';
    button.className = 'theme-toggle-btn';
    button.setAttribute('aria-label', 'Toggle light and dark mode');
    button.addEventListener('click', toggleTheme);

    document.body.appendChild(button);
  }

  function init() {
    injectToggleButton();
    applyTheme(getStoredTheme());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
