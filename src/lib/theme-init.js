// src/lib/theme-init.js
import { getInitialTheme, applyTheme, initializeThemeListener } from "./theme";

// Initialize theme as early as possible
function initializeTheme() {
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);
  initializeThemeListener();
}

// Execute immediately if document is ready
if (document.readyState !== "loading") {
  initializeTheme();
} else {
  document.addEventListener("DOMContentLoaded", initializeTheme);
}

// Re-apply theme after view transitions
document.addEventListener("astro:after-swap", () => {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    applyTheme(currentTheme);
  }
});
