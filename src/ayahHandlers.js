// Handles Quran ayah-related logic
import * as domHandlers from "./domHandlers.js";
import { TextScramble } from "./TextScramble.js";
import { ayatList } from "../data/ayahList.js";

// Cache DOM Elements
const {
  titleContainer,
  arabicTextConainer,
  arabicPronunciationContainer,
  mealContainer,
  audioPlayer,
  nextBtn,
  prevBtn,
  ayahNumInput,
  ayahPlaybackRateInput,
  ayahPlaybackRateSpan,
  ayahRepeatCheckbox,
  autoPlayCheckbox,
  mealRemainingTime,
  mealWaitingFactorInput,
} = domHandlers.getElements();

// Global degiskenler
let currentIndex = 22; // Index of Ayat
let jumpCounter = 0; // Ayet atlama adedi.
let allowDisplayAfterAnimation = false; // next'e basilmis ise animasyondan sonra devam eder
// TextScramble nesne ornegi olusturma
const fx = new TextScramble(mealContainer);

// Setup handlers
export const setupAyahHandlers = () => {
  domHandlers.addEvent(nextBtn, "click", handleNextAyah);
  domHandlers.addEvent(prevBtn, "click", handlePrevAyah);
  domHandlers.addEvent(ayahNumInput, "change", (event) => {
    changeAyahNummer(event);
  });
  domHandlers.addEvent(ayahPlaybackRateInput, "input", updateAyahPlaybackRate);

  // Display the initial ayah
  displayAyah(currentIndex);
};

// Async function to display ayah and audio
async function displayAyah(index) {
  const ayah = ayatList[index];
  if (!ayah) {
    console.error("Ayah couldnt be find!");
  }
  // Update header, arabic text, arabic pronounciation
  updatePage(ayah);
  playAyah();
  animateMeal(ayah);
}
// Animate meal text
async function animateMeal(ayah) {
  await fx
    .setText(ayah.translations.turkish) // Metin icin animasyon baslatilir
    .then(() => {
      // Amimasyon tamamlandiktan sonra burasi calisir
      console.log("Animasyon tamamlandi.");

      //Animasyon tamamlanmadan next/prev'e basilirsa animasyon bitince burasi calisir
      if (allowDisplayAfterAnimation) {
        allowDisplayAfterAnimation = false; // Mevcut ayetin islenmesine baslanir ve yenisi engellenir.
        fx.isAnimating = true; // Animasyonun basladigini gosteren bayrak aktif edilir
        if(jumpCounter !== 0) {
        currentIndex =
          (currentIndex + jumpCounter + ayatList.length) % ayatList.length; // jumpCounter kadar atlanir
        jumpCounter = 0; // Sayaci sifirla
        }
        displayAyah(currentIndex);
      }
    })
}

// Navigation handlers
async function handleNextAyah() {
  // Animasyon devam etmiyorsa sonraki ayeti goster
  if (!fx.isAnimating) {
    fx.isAnimating = true;

    // Bir sonraki ayete gec
    currentIndex = (currentIndex + 1) % ayatList.length;

    // Yeni ayeti goster ve animasyonu baslat
    await displayAyah(currentIndex);
  } else {
    jumpCounter++; // Next tusuna basma adedi. Atlanacak ayet sayisi
    ayahNumInput.value =
      ((currentIndex + jumpCounter) % ayatList.length) + 1; //Atlanacak ayet sayisini goster
    // Animasyon devam ediyorsa setText() donusunde otomatik jumpCounter kadar sonraki ayeti goster.
    allowDisplayAfterAnimation = true; // Next tusuna basildi, ama ayet gosterilemedi. Otomatik sonraki ayetleri goster.
  }
}

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
    ayahNumInput.value =
      ((currentIndex + jumpCounter + ayatList.length) % ayatList.length) + 1;

    // Animasyon devam ediyorsa setText() donusunde otomatik jumpCounter kadar sonraki ayeti goster.
    allowDisplayAfterAnimation = true; // Next tusuna basildi, ama ayet gosterilemedi. Otomatik sonraki ayetleri goster.
  }
}

// Belirtilen ayete atla
async function changeAyahNummer() {
  // Animasyon devam etmiyorsa sonraki ayeti goster
  if (!fx.isAnimating) {
    fx.isAnimating = true;

    // Move to the given ayah
    currentIndex = (parseInt(ayahNumInput.value, 10) - 1) % ayatList.length; //input'a girilen degeri string'den sayiya cevirir.
    ayahNumInput.blur(); // Odaktan cikar.

    // Display and wait for the current ayah's animation to complete
    await displayAyah(currentIndex);
  } else {
    // Animasyon devam ediyorsa setText() donusunde otomatik jumpCounter kadar sonraki ayeti goster.
    allowDisplayAfterAnimation = true; // Next tusuna basildi, ama ayet gosterilemedi. Otomatik sonraki ayetleri goster.
  }
}

// Page Updates: Update header, arabic text, arabic pronounciation
function updatePage(ayah) {
  domHandlers.updateContent(
    titleContainer,
    `${ayah.id}.Ayet: ${ayah.surah}_${ayah.id}`
  );
  domHandlers.setInputValue(ayahNumInput, ayah.id); // Ayet No'yu gunceller
  domHandlers.updateContent(arabicTextConainer, ayah.arabicText); // Arapca ayeti gunceller
  domHandlers.updateContent(arabicPronunciationContainer, ayah.transliteration); // Arapca okunusu gunceller
  domHandlers.setAttribute(audioPlayer, "src", `../assets/audio/${ayah.audio}`); // ayet mp3 src'sini gunceller.
}

// range input'u degeri degisince EventListener bunu calistirir. 
function updateAyahPlaybackRate() {
  const rate = ayahPlaybackRateInput.value; // Oynatma hizi degisince, degeri degiskene atar.
  audioPlayer.ayahPlaybackRate = rate; // Src'u degisen player'in resetlenen oynatma hizini ayarlanan degere gunceller
  domHandlers.updateContent(ayahPlaybackRateSpan, rate);
  return rate;
  // domHandlers.setInputValue(playbackRateValue, ayahPlaybackRateInput.value)
}

function playAyah() {
  audioPlayer.playbackRate = updateAyahPlaybackRate();
  audioPlayer.play();
}
