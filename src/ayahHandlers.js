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
  // scale-control-panel
  scaleRange,
  scaleValue,
  scaleDecreaseBtn,
  scaleIncreaseBtn,
  // audio-control-panel
  audioPlayer,
  ayahRepeatCheckbox,
  ayahPlaybackRateSpan,
  ayahPlaybackRateInput,
  // control navigation-control-panel
  ayahNumInput,
  ayahNumSelect,
  prevAyahBtn,
  nextAyahBtn,
  autoPlayCheckbox,
  // time-control-panel
  mealWaitingFactorInput,
  mealRemainingTimeSpan,
  // language-control-panel
  langRadioBtns,
  // animation-control-panel
  animationCheckbox,
} = domHandlers.getElements();

// Global degiskenler
let ayah;
let currentIndex = 0; // Index of Ayat
let jumpCounter = 0; // Ayet atlama adedi.
let allowAnimationAfterNavigation = false; // next'e basilmis ise sonraki animasyonu aktive eder
// let isPlaying = false;
let repeatPlayingCurrentAyah = false;
let autoPlaying = true;
let mealWaitingTimeFactor = 45;
let mealWaitingTime = 4000;
let ayahNumJumper = false; // Auto play modda, ayet numarasi girilmis ise currentIndex'i girilen ayete ayarlar.
let mealLanguage = "turkish"; // Meal dilini kontrol eden bayrak
let isAnimationEnabled = true;
let audioPlayerEvent;
let displayAyahWaitingTimeout;

// TextScramble nesne ornegi olusturma
const fx = new TextScramble(mealContainer);

// Setup handlers
export const setupAyahHandlers = () => {
  // Meal Dili Secimi
  domHandlers.addEventRadio(langRadioBtns, "change", changeMealLanguage);
  // scale-control-panel
  domHandlers.addEvent(scaleRange, "input", (e) => updateScale(e));
  domHandlers.addEvent(scaleDecreaseBtn, "click", (e) => {
    updateScale(e, false);
  });
  domHandlers.addEvent(scaleIncreaseBtn, "click", (e) => {
    updateScale(e, true);
  });
  // audio-control-panel
  domHandlers.addEvent(ayahRepeatCheckbox, "change", (e) => {
    repeatPlayingCurrentAyah = e.target.checked ? true : false; // Mevcut ayeti surekli tekrar etme
  });
  domHandlers.addEvent(ayahPlaybackRateInput, "input", updateAyahPlaybackRate);
  // control navigation-control-panel
  domHandlers.addEvent(ayahNumInput, "input", (e) => {
    if (!/^\d*$/.test(e.target.value))
      // input'a sadece sayi kabul eder
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
  });

  domHandlers.addEvent(ayahNumInput, "change", (event) => {
    let ayahNummer = event.target.value;
    changeAyahNummer(ayahNummer);
  });
  domHandlers.addEvent(ayahNumSelect, "change", (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const ayahNummer = selectedOption.value;
    changeAyahNummer(ayahNummer);
  });
  domHandlers.addEvent(prevAyahBtn, "click", () =>
    handleNextPrevAyahNav(false)
  );
  domHandlers.addEvent(nextAyahBtn, "click", () => handleNextPrevAyahNav(true));
  domHandlers.addEvent(autoPlayCheckbox, "input", playAyahAuto);
  // time-control-panel
  domHandlers.addEvent(mealWaitingFactorInput, "change", (e) => {
    changeMealWaitingFactor(e);
  });

  // animation-control-panel
  domHandlers.addEvent(animationCheckbox, "change", (e) =>
    toggleAnimation(e.target.checked)
  );

  // Display the initial ayah
  displayAyah(currentIndex);
};

// Async function to display ayah and audio
async function displayAyah(index) {
  if (displayAyahWaitingTimeout) {
    clearTimeout(displayAyahWaitingTimeout);
  }
  ayah = ayatList[index];
  if (!ayah) {
    console.error("Ayah couldnt be find!");
    return; //gracefully exit
  }
  // Update header, arabic text, arabic pronounciation
  determineMealWaitingTime();
  updatePage(ayah);
  playAyah();

  // Trigger the animation
  fx.animationReset(); // Reset any ongoing animation
  await animateMeal(ayah);
}
// Animate meal text in TextScramble Class
async function animateMeal(ayah) {
  const mealText = ayah.translations[mealLanguage];
  if (isAnimationEnabled) {
    await fx
      .setText(mealText) // Metin icin animasyon baslatilir
      .then(() => handleAnimationEnd());
  } else {
    mealContainer.textContent = mealText;
    handleAnimationEnd();
  }
}

// Animasyon veya doğrudan gösterim sonrası yapılacak işlemler
function handleAnimationEnd() {
  // Amimasyon tamamlandiktan sonra burasi calisir
  console.log("Animasyon tamamlandi.");
  if (audioPlayer.ended) audioPlayer.play();
  if (audioPlayerEvent) clearInterval(audioPlayerEvent);
  audioPlayerEvent = audioPlayer.addEventListener(
    "ended",
    () => {
      // Belirtilen ayeti surekli tekrar et
      if (repeatPlayingCurrentAyah) {
        currentIndex =
          (currentIndex + jumpCounter + ayatList.length) % ayatList.length; // jumpCounter kadar atlanir
        jumpCounter = 0; // Sayaci sifirla
        displayAyah(currentIndex);
        // Navigasyon tuslarina basilmis ise atlatma sayisina gore Current Index'i ayarlar
      } else {
        handleNextAutoPlay();
      }
    },
    { once: true }
  );
}

// Otomatik oynatma sonrası yapılacak işlemler
function handleNextAutoPlay() {
  if (displayAyahWaitingTimeout) {
    clearTimeout(displayAyahWaitingTimeout);
  }
  // Auto play checkbox checked
  if (autoPlaying) {
    fx.isAnimating = true; // Animasyon  baslatilacagi icin bayratk set edilir.
    animateRemainingTime();
    displayAyahWaitingTimeout = setTimeout(() => {
      currentIndex = (currentIndex + 1) % ayatList.length;
      displayAyah(currentIndex);
    }, mealWaitingTime);
  }
}

// Page Updates: Update header, arabic text, arabic pronounciation
function updatePage(ayah) {
  domHandlers.updateContent(
    titleContainer,
    `${ayah.id}.Ayet: ${ayah.surah}_${ayah.ayahNumber}`
  );
  domHandlers.setInputValue(ayahNumInput, ayah.id); // Ayet No'yu gunceller
  setSelectValue(ayahNumSelect, ayah.id); // Ayet No'yu gunceller
  domHandlers.updateContent(arabicTextConainer, ayah.arabicText); // Arapca ayeti gunceller
  domHandlers.updateContent(arabicPronunciationContainer, ayah.transliteration); // Arapca okunusu gunceller
  audioPlayer.src = `./assets/audio/${ayah.audio}`; // ayet mp3 src'sini gunceller.
  domHandlers.updateContent(
    mealRemainingTimeSpan,
    `${(mealWaitingTime / 1000).toFixed(1)}s`
  );
}

function playAyah() {
  audioPlayer.pause(); // Pause the player before setting the playback rate
  audioPlayer.playbackRate = updateAyahPlaybackRate();
  audioPlayer
    .play() // Play the player after setting the playback rate
    .catch(() => console.error("Başlamak için lütfen play tuşuna basınız!"));
}

// range input'u degeri degisince EventListener bunu calistirir.
function updateAyahPlaybackRate() {
  const rate = parseFloat(ayahPlaybackRateInput.value); // Oynatma hizi degisince, degeri degiskene atar.
  audioPlayer.playbackRate = rate; // Src'u degisen player'in resetlenen oynatma hizini ayarlanan degere gunceller
  domHandlers.updateContent(ayahPlaybackRateSpan, rate);
  return rate;
}

// Navigation handlers
function playAyahAuto() {
  if (autoPlayCheckbox.checked) {
    if (audioPlayer.ended) {
      displayAyah(currentIndex);
    }
    autoPlaying = true;
  } else {
    autoPlaying = false;
  }
}

// Ileri ve Geri Manuel Ayet Atlama
async function handleNextPrevAyahNav(next) {
  fx.animationReset();
  if (displayAyahWaitingTimeout) {
    clearTimeout(displayAyahWaitingTimeout);
  }
  // Bir sonraki ayete gec
  currentIndex =
    ((next ? ++currentIndex : --currentIndex) + ayatList.length) %
    ayatList.length;
  // Yeni ayeti goster ve animasyonu baslat
  await displayAyah(currentIndex);
}

// Belirtilen ayete atla
async function changeAyahNummer(ayahNummer) {
  fx.animationReset();
  // Clear any existing timeout to avoid overlap
  if (displayAyahWaitingTimeout) {
    clearTimeout(displayAyahWaitingTimeout);
  }
  currentIndex = (parseInt(ayahNummer, 10) + ayatList.length - 1) % ayatList.length; //input'a girilen degeri string'den sayiya cevirir.

  // Prevent redundant auto-play logic. Set the flag to prevent auto-play interference
  ayahNumJumper = true; // Auto play modda girilen ayete atlamasi icin kontrol degiskeni
  // Yeni ayeti goster ve animasyonu baslat
  // Update UI to reflect the new Ayah
  ayahNumInput.blur(); // Odaktan cikar.
  // setSelectValue(ayahNumSelect, currentIndex + 1);
  await displayAyah(currentIndex);
}

// Girilen ayet Numarasini Select Elemaninda da Gosterme
function setSelectValue(
  inputElement,
  value,
  text = value,
  id = "selectedOption"
) {
  if (inputElement) {
    const selectedOption = document.getElementById("selectedOption");
    if (selectedOption) {
      inputElement.removeChild(selectedOption);
    }
    let option = domHandlers.createElement(
      "option",
      { selected: "selected", id: id, value: value },
      text
    );
    inputElement.appendChild(option);
  }
}

// Meal Bekleme suresi katsayisini degiskene atama ve katsayiya gore kalan zamani hesaplayip gosterme
function changeMealWaitingFactor(e) {
  mealWaitingTimeFactor = e.target.value;
  updateRemaininTime();
}
// Hesaplanan bekleme suresini Kalan Sure olarak span'da gosterme
function updateRemaininTime() {
  determineMealWaitingTime();
  domHandlers.updateContent(
    mealRemainingTimeSpan,
    `${(mealWaitingTime / 1000).toFixed(1)}s`
  );
}
// metin uzunlugunu katsayi ile carpip, bekleme zamanini hesaplar
function determineMealWaitingTime() {
  let factor = parseInt(mealWaitingTimeFactor);
  const mealText = ayah.translations[mealLanguage];
  mealWaitingTime = factor * mealText.length;
}
// Ayet caldiktan sonra, kalan sureyi hesaplar ve 1sn araliklarla geri sayimla gosterir.
let intervalId;
function animateRemainingTime() {
  if (intervalId) clearInterval(intervalId);
  const startTime = Date.now();

  intervalId = setInterval(() => {
    domHandlers.updateContent(mealRemainingTimeSpan, mealWaitingTime);
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    let remainingTime = (mealWaitingTime - elapsedTime) / 1000;
    remainingTime = parseFloat(remainingTime.toFixed(1));
    const displayTime = remainingTime < 0 ? "0s" : `${remainingTime}s`;
    domHandlers.updateContent(mealRemainingTimeSpan, displayTime);
    if (remainingTime < 1) {
      clearInterval(intervalId);
    }
  }, 1000);
}

// Buton ve range ile UI Scale ayarlama
// Degisen rayuzun olcegini hesaplar ve --scale degiskenini gunceller
// Sonra hedaplanan scale degerini range ve span'da gosterir
function updateScale(event, isIncrease) {
  let scale = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--scale")
  );
  if (event.type === "input") {
    scale = parseFloat(event.target.value);
  } else if (event.type === "click") {
    scale = isIncrease ? scale + 0.1 : scale - 0.1;
  }
  scale = scale < 0.4 ? 0.4 : scale; // Min deger
  scale = scale > 1.6 ? 1.6 : scale; // Max deger
  scale = parseFloat(scale.toFixed(1));
  document.documentElement.style.setProperty("--scale", scale);
  scaleValue.textContent = scale;
  scaleRange.value = scale; // range bar'ini ayarlanan degere getirme
}

// Meal dilini Turkce veya Almanca olarak degistir
function changeMealLanguage() {
  langRadioBtns.forEach((radio) => {
    if (radio.checked) {
      mealLanguage = radio.value;
    }
  });
  updateRemaininTime();
  fx.isAnimating = false;
  setTimeout(() => {
    mealContainer.textContent = ayah.translations[mealLanguage];
  }, 50);
}

// Animasyonu acip kapatir
async function toggleAnimation(isChecked) {
  isAnimationEnabled = isChecked;
  fx.isAnimating = isAnimationEnabled;
  const mealText = ayah.translations[mealLanguage];

  console.log("isAnimationEnabled :>> ", isAnimationEnabled);
  return isAnimationEnabled;
}
