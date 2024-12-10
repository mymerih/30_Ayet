// entry point
import { initializeDOM } from "./domHandlers.js";
import { setupAyahHandlers } from "./ayahHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
    initializeDOM(); // Initialize UI elements/ Setup DOM Elements
    setupAyahHandlers(); // Setup logic for ayah-related operations/ Configure ayah logic
})