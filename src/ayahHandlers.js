// Handles Quran ayah-related logic
import * as domHandlers from "./domHandlers.js";
import { TextScramble } from "./TextScramble.js";
import { ayatList } from "../data/ayahList.js";

// Cache DOM Elements
const {
  baslikContainer,
  arabicTextConainer,
  arabicPronunciationContainer,
  mealContainer,
  audioPlayer,
  nextBtn,
  prevBtn,
  ayahNummerInput,
  ayahPlaybackRateInput,
  ayahPlaybackRateSpan,
  ayahRepeatCheckbox,
  autoPlay,
  mealRemainingTime,
  mealWaitingFactorInput,
} = domHandlers.getElements();

// Global degiskenler
let currentIndex = 0; // Index of Ayat
let jumpCounter = 0; // Ayet atlama adedi.
let displayAllowed = false; // next'e basilmis ise animasyondan sonra devam eder
// TextScramble nesne ornegi olusturma
const fx = new TextScramble(mealContainer);

export const setupAyahHandlers = () => {
  nextBtn.addEventListener("click", () => handleNextAyah());
  prevBtn.addEventListener("click", handlePrevAyah);
  ayahNummerInput.addEventListener("change", (event) =>
    changeAyahNummer(event)
  );
  // ayahPlaybackRateInput.addEventListener("input", changeAyahPlaybackRate);
  domHandlers.addEvent(ayahPlaybackRateInput, "input", updateAyahPlaybackRate);

  // Display the initial ayah
  displayAyah(currentIndex);
};

// Async function to display ayah with animation and audio
async function displayAyah(index) {
  const ayah = ayatList[index];

  if (!ayah) {
    console.error("Ayah couldnt be find!");
  }

  // Update header, arabic text, arabic pronounciation
  updatePage(ayah);
  playAyah(ayah);

  await fx
  .setText(ayah.translations.turkish) // Metin icin animasyon baslatilir
  .then(() => {
    // Amimasyon tamamlandiktan sonra burasi calisir
    console.log("Animasyon tamamlandi.");
    if (displayAllowed) {
      //Animasyon tamamlanmadan next/prev'e basilirsa burasi calisir
      displayAllowed = false; // Mevcut ayetin islenmesine baslanir ve yenisi engellenir.
      fx.isAnimating = true; // Animasyonun basladigini gosteren bayrak aktif edilir
      currentIndex = (currentIndex + jumpCounter + ayatList.length) % ayatList.length; // jumpCounter kadar atlanir
      jumpCounter = 0; // Sayaci sifirla

      displayAyah(currentIndex);
    }
  })
  .finally(() => {
    // fx.isAnimating = false;
    //Animasyon tamamlandiginda bayragi sifirla
  });
}

// Function to handle 'Next Ayah' logic
async function handleNextAyah() {
  // Animasyon devam etmiyorsa sonraki ayeti goster
  if (!fx.isAnimating) {
    fx.isAnimating = true;

    // Bir sonraki ayete gec
    currentIndex = (currentIndex + 1) % ayatList.length;

    // Yeni ayeti goster ve animasyonu baslat
    await displayAyah(currentIndex);
  } else {
    jumpCounter = jumpCounter + 1; // Next tusuna basma adedi. Atlanacak ayet sayisi
    ayahNummerInput.value =( (currentIndex + jumpCounter) % ayatList.length) + 1; //Atlanacak ayet sayisini goster
    // Animasyon devam ediyorsa setText() donusunde otomatik jumpCounter kadar sonraki ayeti goster.
    displayAllowed = true; // Next tusuna basildi, ama ayet gosterilemedi. Otomatik sonraki ayetleri goster.
  }
}

// Function to handle 'Previous Ayah' logic
async function handlePrevAyah() {
  // Animasyon devam etmiyorsa sonraki ayeti goster
  if (!fx.isAnimating) {
    fx.isAnimating = true;

    // Move to the previous ayah
    currentIndex = (currentIndex - 1 + ayatList.length) % ayatList.length;

    // Display and wait for the current ayah's animation to complete
    await displayAyah(currentIndex);
  } else {
    jumpCounter = jumpCounter - 1; // Next tusuna basma adedi. Atlanacak ayet sayisi
    ayahNummerInput.value =
     ( (currentIndex + jumpCounter + ayatList.length) % ayatList.length) +1;

    // Animasyon devam ediyorsa setText() donusunde otomatik jumpCounter kadar sonraki ayeti goster.
    displayAllowed = true; // Next tusuna basildi, ama ayet gosterilemedi. Otomatik sonraki ayetleri goster.
  }
}

async function changeAyahNummer(event) {
  // Animasyon devam etmiyorsa sonraki ayeti goster
  if (!fx.isAnimating) {
    fx.isAnimating = true;

    // Move to the given ayah
    currentIndex = (parseInt(ayahNummerInput.value) - 1) % ayatList.length; //input'a girilen degeri string'den sayiya cevirir.
    ayahNummerInput.blur(); // Odaktan cikar.

    // Display and wait for the current ayah's animation to complete
    await displayAyah(currentIndex);
  } else {
    // Animasyon devam ediyorsa setText() donusunde otomatik jumpCounter kadar sonraki ayeti goster.
    displayAllowed = true; // Next tusuna basildi, ama ayet gosterilemedi. Otomatik sonraki ayetleri goster.
  }
}

// Update header, arabic text, arabic pronounciation
function updatePage(ayah) {
  domHandlers.updateContent(
    baslikContainer,
    `${ayah.id}.Ayet: ${ayah.surah}_${ayah.id}`
  );
  domHandlers.setInputValue(ayahNummerInput, ayah.id); // Ayet No'yu gunceller
  domHandlers.updateContent(arabicTextConainer, ayah.arabicText); // Arapca ayeti gunceller
  domHandlers.updateContent(arabicPronunciationContainer, ayah.transliteration); // Arapca okunusu gunceller
  domHandlers.setAttribute(audioPlayer, "src", `../assets/audio/${ayah.audio}`); // ayet mp3 src'sini gunceller.
  // domHandlers.updateAudio(audioPlayer, `../assets/audio/${ayah.audio}`);
}

function updateAyahPlaybackRate() {
  let ayahPlaybackRate = ayahPlaybackRateInput.value; // Oynatma hizi degisince, degiskene atar.
  audioPlayer.value = ayahPlaybackRate; // Src'u degisen player'in resetlenen oynatma hizini ayarlanan degere gunceller
  return ayahPlaybackRate;
  // domHandlers.setInputValue(playbackRateValue, ayahPlaybackRateInput.value)
}

function playAyah(ayah) {
  audioPlayer.playbackRate = updateAyahPlaybackRate();
  audioPlayer.play();
}
