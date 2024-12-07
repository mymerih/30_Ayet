// entry point
import { initializeDOM } from "./domHandlers.js";
import { setupAyahHandlers } from "./ayahHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
    initializeDOM(); // Initialize UI elements
    setupAyahHandlers(); // Setup logic for ayah-related operations
})