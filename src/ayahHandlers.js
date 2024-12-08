// for Quran ayah-related logic
// import { getElements, updateContent, updateAudio } from "./domHandlers.js";
import * as domHandlers from "./domHandlers.js";
import { TextScramble } from "./TextScramble.js";
import { ayatList } from "../data/ayahList.js";

let currentIndex = 0;

// Initialize TextScramble with DOM elements
const {
  baslikContainer,
  arabicTextConainer,
  arabicPronunciationContainer,
  mealContainer,
  audioPlayer,
  nextBtn,
  prevBtn,
} = domHandlers.getElements();

const fx = new TextScramble(mealContainer);

export const setupAyahHandlers = () => {
  nextBtn.addEventListener("click", () => handleNextAyah());
  prevBtn.addEventListener("click", handlePrevAyah);

  // Display the initial ayah
  displayAyah(currentIndex);
};

// Async function to display ayah with animation and audio
async function displayAyah(index) {
  if (!ayatList[index]) {
    console.error("Ayah couldnt be find!");
  }
  const ayah = ayatList[index];

  // Update header, arabic text, arabic pronounciation
  domHandlers.updateContent(
    baslikContainer,
    `${ayah.id}.Ayet: ${ayah.surah}_${ayah.id}`
  );
  domHandlers.updateContent(arabicTextConainer, ayah.arabicText);
  domHandlers.updateContent(arabicPronunciationContainer, ayah.transliteration);
  domHandlers.updateAudio(audioPlayer, `../assets/audio/${ayah.audio}`);

  // Animate and show the ayah with TextScramble
  await fx.setText(ayah.translations.turkish);
}

// Function to handle 'Next Ayah' logic
async function handleNextAyah(skipAnimation = false) {
    if (!skipAnimation) {
        // Wait for the current ayah's animation to complete before moving to the next
        await displayAyah(currentIndex);
    }
    
    // Move to the next Ayah
    currentIndex = (currentIndex + 1) % ayatList.length;

  // Display the next Ayah
  displayAyah(currentIndex);
}

// Function to handle 'Previous Ayah' logic
async function handlePrevAyah() {
  // Wait for the current ayah's animation to complete
  await displayAyah(currentIndex);

  // Move to the previous ayah
  currentIndex = (currentIndex - 1 + ayatList.length) % ayatList.length;
  displayAyah(currentIndex);
}
