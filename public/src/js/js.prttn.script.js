//1 of 2 js_prtt_scrpt
//JavaScript Protection Script
const protectContent = (home) => {
  const target = document.getElementById(home) || window;

  // 1. Disable Right-Click (Context Menu)
  target.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // 2. Disable Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    // Check for:
    // F12
    // Ctrl+Shift+I (Inspect)
    // Ctrl+Shift+J (Console)
    // Ctrl+U (View Source)
    if (
      e.key === "F12" ||
      (e.ctrlKey &&
        e.shiftKey &&
        (e.key === "I" || e.key === "J" || e.key === "C")) ||
      (e.ctrlKey && e.key === "u")
    ) {
      e.preventDefault();
      return false;
    }
  });
};

protectContent("home");
