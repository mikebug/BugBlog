// src/lib/theme.js
export const THEME_STORAGE_KEY = "theme";
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

export function getInitialTheme() {
  if (typeof window === "undefined") return THEMES.LIGHT;
  return localStorage.getItem(THEME_STORAGE_KEY) || getSystemTheme();
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  applyTheme(newTheme);
  return newTheme;
}

// Add system theme change listener
export function initializeThemeListener() {
  if (typeof window === "undefined") return;

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  mediaQuery.addEventListener("change", (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
    }
  });
}
