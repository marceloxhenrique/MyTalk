const windowMessage = document.querySelector("body");

const darkModeButton = document.querySelector("#darkmode-toggle");

const localStorageDarkmode = localStorage.getItem("mode");
if (localStorageDarkmode) {
  windowMessage.classList.toggle("dark-mode");
}

const darkIcon = document.querySelector("#dark-mode-icon");
const lightIcon = document.querySelector(".light-mode-icon");

darkModeButton.addEventListener("click", () => {
  const dark = localStorage.getItem("mode");
  if (dark) {
    windowMessage.classList.toggle("dark-mode");
    localStorage.removeItem("mode");
  } else {
    windowMessage.classList.toggle("dark-mode");
    localStorage.setItem("mode", "darkmode");
  }
  darkIcon.classList.toggle("dont-display-icon");
  darkIcon.classList.add("animation-dark-mode");
  lightIcon.classList.toggle("light-mode-icon");
});
