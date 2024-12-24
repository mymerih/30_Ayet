// for DOM-related functions
export const initializeDOM = () => {};

// selec and return DOM elements
export const getElements = () => ({
  // containers div
  titleContainer: document.querySelector(".ayet_adi"),
  arabicTextConainer: document.querySelector(".arabicTextConainer"),
  arabicPronunciationContainer: document.querySelector(
    ".ayet_okunusu_container"
  ),
  mealContainer: document.querySelector("#meal"),
  scaleRange: document.getElementById("scale-range"),
  scaleValue: document.getElementById("scale-value"),
  scaleDecreaseBtn: document.getElementById("decrease-scale"),
  scaleIncreaseBtn: document.getElementById("increase-scale"),
  // audio-control-panel
  audioPlayer: document.querySelector(".audio"),
  ayahRepeatCheckbox: document.querySelector("#ayah-repeat"),
  ayahPlaybackRateSpan: document.getElementById("playbackRateValue"),
  ayahPlaybackRateInput: document.getElementById("playbackRate"),
  // control navigation-control-panel
  ayahNumInput: document.querySelector("#ayet-no"),
  ayetJumpSelect: document.getElementById("ayetNum"),
  prevAyahBtn: document.getElementById("prevAyahBtn"),
  nextAyahBtn: document.getElementById("nextAyahBtn"),
  autoPlayCheckbox: document.querySelector("#auto-play"),
  reminderElement: document.getElementById("ayah-end-wait-reminder"),

  // time-control-panel
  mealWaitingFactorInput: document.querySelector("#mealBeklemeKatsayisi"),
  mealWaitingTimeSpan: document.querySelector("#waiting-time-span"),
  mealRemainingTimeSpan: document.querySelector("#remaining-time-span"),

  // language-control-panel
  langRadioBtns: document.querySelectorAll("input[name='language']"),

  // animation-control-panel
  animationCheckbox: document.getElementById("animation-control"),
});

// Update content of a DOM element
export const updateContent = (element, content) => {
  if (element) element.innerHTML = content;
};

// 1. Event Handling Utilities
// Functions to simplify attaching, removing, or managing events.
export const addEvent = (element, eventType, callback) => {
  if (element) {
    element.addEventListener(eventType, callback);
  }
};

export const addEventRadio = (elements, eventType, callback) => {
  if (elements) {
    elements.forEach((element) => {
      element.addEventListener(eventType, callback);
    });
  }
};

export const removeEvent = (element, eventType, callback) => {
  if (element) {
    element.removeEventListener(eventType, callback);
  }
};

// Example Usage:
addEvent(document.getElementById("arabicTextConainer"), "input", () => {
  // console.log("mehmet");
});

// 2. DOM Elemnt Creation
// Functions to create new DOM elements dynamically
export const createElement = (tagName, attributes = {}, textContent = "") => {
  const element = document.createElement(tagName);
  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });
  if (textContent) element.innerHTML = textContent;
  return element;
};

// Example Usage:
// const newButton = createElement(
//   "button",
//   { id: "nextAyahBtn",
//     // onclick: console.log("onclick fonk on button calisti")
//   },
//   "Click me"
// );
// document.body.appendChild(newButton);

// 3. Class Manipulation
// Utility functions for adding, removing, or toggling CSS classes.
export const addClass = (element, className) => {
  if (element) {
    element.classList.add(className);
  }
};

export const removeClass = (element, className) => {
  if (element) {
    element.classList.remove(className);
  }
};

export const toggleClass = (element, className) => {
  if (element) {
    element.classList.toggle(className);
  }
};

// Example Usage:
toggleClass(document.querySelector("#myElement"), "active");

// 4. Input Handling
// Functions to get and set input values easily
export const getInputValue = (inputElement) => {
  return inputElement ? inputElement : null;
};

export const setInputValue = (inputElement, value) => {
  if (inputElement) {
    inputElement.value = value;
  }
};

export const setSelectValue = (inputElement, value) => {
  if (inputElement) {
    const selectedIndex = inputElement.selectedIndex;
    inputElement.options[selectedIndex].value = value;
  }
};

// Example Usage:
setInputValue(document.getElementById("#searchInput"), "New value");

// 5. Visibility Toggles
// Functions to show, hide, or toggle the visibility of elements

export const showElement = (element) => {
  if (element) {
    element.style.display = "block";
  }
};

export const hideElement = (element) => {
  if (element) {
    element.style.display = "none";
  }
};

export const toggleVisibility = (element) => {
  if (element) {
    element.style.display = element.style.display === "none" ? "block" : "none";
  }
};

// Example Usage:
hideElement(document.getElementById("loader"));

// 6. Element Attribute Manipulation
// Functions to set or get attributes for elements
export const setAttribute = (element, attribute, value) => {
  if (element) {
    element.setAttribute(attribute, value);
  }
};

export const getAttribute = (element, attribute) => {
  return element ? element.getAttribute(attribute) : null;
};

// Example Usage:
setAttribute(document.querySelector("#image"), "src", "image.png");

// 7. Batch Element Selection
// Functions to retrieve multiple elements with a specific query
export const getElementsBySelector = (selector) => {
  return document.querySelectorAll("selector");
};

//Example Usage:
const buttons = getElementsBySelector(".btn");
buttons.forEach((btn) => console.log(btn.id));

// 8. Animations
// Simple functions for adding/removing animations (if not handled by CSS frameworks)
export const animateElement = (element, animateClass, duration) => {
  if (element) {
    element.classList.add(animateClass);
    settimeout(() => {
      element.classList.remove(animateClass);
    }, duration);
  }
};

// Example Usage:
animateElement(document.getElementById("card"), "fade-in", 1000);

// 9. Error Handling or Notifications
// Functions to display error messages or notifications in the UI
export const displayError = (message, container) => {
  const errorElement = createElement("div", { class: "errorMessage" }, message);
  if (container) {
    container.appendChild(errorElement);
    settimeout(container.removeChild(errorElement), 3000);
  }
};

// Example Usage:
displayError(
  "Invalid input!",
  document.getElementById("notificationContainer")
);

// 10. Utility Wrappers
// Additional utilities that streamline repetitive DOM operations
// Change Contents
export const clearContent = (element) => {
  if (element) element.innerHTML = "";
};

export const replaceContent = (element, content) => {
  if (element) element.innerHTML = content;
};

// Example Usage:
clearContent(document.querySelector("#ayah-container"));
replaceContent(document.querySelector("#ayah-container"), "New Title");
