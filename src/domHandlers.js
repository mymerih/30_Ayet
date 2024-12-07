// for DOM-related functions
export const initializeDOM = () => {
  const baslik_container = document.querySelector(".ayet_adi");
  const ayet_container = document.querySelector(".ayet_container");
  const meal_container = document.querySelector("#meal");
  const arabic_okunus_contaniner = document.querySelector(
    ".ayet_okunusu_container"
  );
  const audio_element = document.querySelector(".audio");
  const next_Button = document.querySelector("#next-btn");
  const prev_Button = document.querySelector("#prev-btn");
  const ayet_counter_Button = document.querySelector("#ayet-no");
  const ayetTekrar_checkbox = document.querySelector("#ayetTekrar");
  const auto_play = document.querySelector("#auto-play");
  const meal_bekleme_suresi_input = document.querySelector(
    "#mealBeklemeKatsayisi"
  );
  const meal_kalan_sure = document.querySelector("#kalan_sure");
};

// selec and return DOM elements
export const getElements = () => ({
  nextButton: document.getElementById("#next-btn"),
  prevButton: document.getElementById("#prev-btn"),
  ayahText: document.querySelector(".ayet_container"),
  mealText: document.getElementById("meal"),
  audioPlayer: document.querySelector(".audio"),
});

// Update content of a DOM element
export const updateContent = (element, content) => {
  if (element) element.innerHTML = content;
};

// Update audio player
export const updateAudio = (audioPlayer, src) => {
  if (audioPlayer) {
    audioPlayer.src = src;
    audioPlayer.play();
  }
};

// 1. Event Handling Utilities
// Functions to simplify attaching, removing, or managing events.
export const addEvent = (element, eventType, callback) => {
  if (element) {
    element.addEventListener(eventType, callback);
  }
};

export const removeElement = (element, eventType, callback) => {
  if (element) {
    element.removeEventListener(eventType, callback);
  }
};

// Example Usage:
addEvent(document.getElementById("ayet_container"), "input", () => {
  console.log("mehmet");
});

// 2. DOM Elemnt Creation
// Functions to create new DOM elements dynamically
export const creatElement = (tagName, attributes = {}, textContent = "") => {
  if (element) {
    const element = document.createElementNS(tagName);
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes(key));
    });
    if (textContent) element.innerHTML = textContent;
    return element;
  }
};

// Example Usage:
const newButton = creatElement(
  "button",
  { id: "next-btn", onclick: console.log("onclick fonk on button calisti") },
  "Click me"
);
document.body.appendChild(newButton);

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
  if (element) {
    inputElement.value = value;
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

export const hideElement = () => {
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
setAttribute(document.querySelector('#image'), 'src', 'image.png');


// 7. Batch Element Selection
// Functions to retrieve multiple elements with a specific query
export const getElementsBySelector = (selector) => {
    return document.querySelectorAll('selector');
};

//Example Usage:
const buttons = getElementsBySelector('.btn');
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
animateElement(document.getElementById('card'), 'fade-in', 1000);


// 9. Error Handling or Notifications
// Functions to display error messages or notifications in the UI
export const displayError = (message, container) => {
    const errorElement = creatElement('div', {class: 'errorMessage'}, message);
    if (container) {
        container.appendChild(errorElement);
        settimeout(container.removeChild(errorElement), 3000);
    }
};

// Example Usage:
displayError('Invalid input!', document.getElementById('notificationContainer'));


// 10. Utility Wrappers
// Additional utilities that streamline repetitive DOM operations
// Change Contents
export const clearContent = (element) => {
    if (element) element.innerHTML = '';
};

export const replaceContent = (element, content) => {
    if (element) element.innerHTML = content;
};

// Example Usage:
clearContent(document.querySelector('#ayah-container'));
replaceContent(document.querySelector('#ayah-container'), 'New Title');