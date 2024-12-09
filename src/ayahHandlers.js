// for Quran ayah-related logic
// import { getElements, updateContent, updateAudio } from "./domHandlers.js";
import * as domHandlers from "./domHandlers.js";
import { TextScramble } from "./TextScramble.js";
import { ayatList } from "../data/ayahList.js";

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

// Global degiskenler
let currentIndex = 0; // Index of Ayat
let isAnimating = false; // Kontrol degiskeni. Animasyon devam ederken diger ayete gecisi onlemek icin
let counter = 0; // Ayet atlama adedi.

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
  counter = counter + 1;

  if (isAnimating) {
    console.warn("Animasyon devam ediyor, lütfen bekleyin.");
    return;
  }

  try {
    isAnimating = true; // Animasyon basliyor. Animasyon bitene kadar bu kismi tekrar calistirma.

    if (!skipAnimation) {
      // Wait for the current ayah's animation to complete before moving to the next
      await displayAyah(currentIndex);
    }

    // Move to the next Ayah
    if (counter > 0) {
      currentIndex = (currentIndex + counter) % ayatList.length;
      counter = 0;
    } else {
      currentIndex = (currentIndex + 1) % ayatList.length;
    }
    // Display the next Ayah
    displayAyah(currentIndex);
  } catch (error) {
    console.error("Bir hata olustu. Hata: ", error);
  } finally {
    isAnimating = false; // Islem tammamlandi, kilidi kaldir.
  }
}

// Function to handle 'Previous Ayah' logic
async function handlePrevAyah() {
  counter = counter -1;

  if (isAnimating) {
    console.warn("Animasyon devam ediyor, lütfen bekleyin.");
    return;
  }

  // Wait for the current ayah's animation to complete
  await displayAyah(currentIndex);

  // Move to the previous ayah
  currentIndex = (currentIndex - 1 + ayatList.length) % ayatList.length;
  displayAyah(currentIndex);
}
