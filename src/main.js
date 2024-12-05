// entry point
import { initializeDOM } from "./domHandlers.js";
import { setupAyatHandlers } from "./ayatHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
    initializeDOM(); // Initialize UI elements
    setupAyatHandlers(); // Setup logic for ayat-related operations
})