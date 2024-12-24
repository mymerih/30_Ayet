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
  ayetJumpSelect,
  prevAyahBtn,
  nextAyahBtn,
  autoPlayCheckbox,
  reminderElement,
  // time-control-panel
  mealWaitingFactorInput,
  mealWaitingTimeSpan,
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
let allowDisplayAfterAnimation = false; // next'e basilmis ise animasyondan sonra devam eder
let isPlaying = false;
let repeatPlayingCurrentAyah = false;
let autoPlaying = true;
let mealWaitingTimeFactor = 45;
let mealWaitingTime = 4000;
let ayahNumJumper = false; // Auto play modda, ayet numarasi girilmis ise currentIndex'i girilen ayete ayarlar.
let mealLanguage = "turkish"; // Meal dilini kontrol eden bayrak
let isAnimationEnabled = true;

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
  domHandlers.addEvent(ayetJumpSelect, "change", (event) => {
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
  domHandlers.addEvent(
    mealWaitingFactorInput,
    "change",
    (e) => (mealWaitingTimeFactor = e.target.value)
  );

  // animation-control-panel
  domHandlers.addEvent(animationCheckbox, "change", (e) =>
    toggleAnimation(e.target.checked)
  );

  // Display the initial ayah
  displayAyah(currentIndex);
};

// Buton ile UI Scale ayarlama

// Async function to display ayah and audio
async function displayAyah(index) {
  ayah = ayatList[index];
  if (!ayah) {
    console.error("Ayah couldnt be find!");
  }
  // Update header, arabic text, arabic pronounciation
  determineMealWaitingTime();
  updatePage(ayah);
  playAyah();
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
  audioPlayer.addEventListener(
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
  isPlaying = false; //next, prev, ayet no input ve select tuslari ile ayet seslendirmeyi hemen baslatir
  let nextPrevJumper; // Ayet atlatma no girilmis ise, Autoplaying'de bu index kullanilir
  if (jumpCounter !== 0) {
    nextPrevJumper = true;
    currentIndex =
      (currentIndex + jumpCounter + ayatList.length) % ayatList.length; // jumpCounter kadar atlanir
    jumpCounter = 0; // Sayaci sifirla
  }
  // Auto play checkbox checked
  if (autoPlaying) {
    fx.isAnimating = true; // Animasyon  baslatilacagi icin bayratk set edilir.
    allowDisplayAfterAnimation = false; // Mevcut ayetin islenmesine baslanir ve yenisi engellenir.
    // Ayet atlanmis ise currentIndex'i degistirmez, yoksa 1 artirir.
    if (!ayahNumJumper) {
      // Ayet numarasi girilip/secilip girilmedigi/secilmedigini kontrol eder
      // Ayet atlama numarasi girilmemis ise index'i 1 artirir ve sonraki ayeti calar.
      currentIndex =
        (nextPrevJumper ? currentIndex : currentIndex + 1) % ayatList.length;
    }
    ayahNumJumper = false; //Bayragi sifirlar
    animateRemainingTime();
    setTimeout(() => {
      displayAyah(currentIndex);
    }, mealWaitingTime);

    //Animasyon tamamlanmadan next/prev'e basilirsa animasyon bitince burasi calisir
  } else if (allowDisplayAfterAnimation) {
    allowDisplayAfterAnimation = false; // Mevcut ayetin islenmesine baslanir ve yenisi engellenir.
    fx.isAnimating = true; // Animasyonun basladigini gosteren bayrak aktif edilir

    displayAyah(currentIndex);
  }
}

// Page Updates: Update header, arabic text, arabic pronounciation
function updatePage(ayah) {
  domHandlers.updateContent(
    titleContainer,
    `${ayah.id}.Ayet: ${ayah.surah}_${ayah.ayahNumber}`
  );
  domHandlers.setInputValue(ayahNumInput, ayah.id); // Ayet No'yu gunceller
  setSelectValue(ayetJumpSelect, ayah.id); // Ayet No'yu gunceller
  domHandlers.updateContent(arabicTextConainer, ayah.arabicText); // Arapca ayeti gunceller
  domHandlers.updateContent(arabicPronunciationContainer, ayah.transliteration); // Arapca okunusu gunceller
  // domHandlers.setAttribute(audioPlayer, "src", `./assets/audio/${ayah.audio}`); // ayet mp3 src'sini gunceller.
  audioPlayer.src = `./assets/audio/${ayah.audio}`; // ayet mp3 src'sini gunceller.
  domHandlers.updateContent(
    mealWaitingTimeSpan,
    `${(mealWaitingTime / 1000).toFixed(1)}s`
  );
    domHandlers.updateContent(mealRemainingTimeSpan, `${(mealWaitingTime / 1000).toFixed(1)}s`);

}

function playAyah() {
  audioPlayer.pause(); // Pause the player before setting the playback rate
  audioPlayer.playbackRate = updateAyahPlaybackRate();
  audioPlayer
    .play() // Play the player after setting the playback rate
    .catch(() => console.error("Başlamak için lütfen play tuşuna basınız!"));
  reminderElement.hidden = true; // Ayet calmaya baslayinca hatirlatma kaldirilir.

  isPlaying = true;
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
  console.log("next :>> ", next);
  // Animasyon devam etmiyorsa sonraki ayeti goster
  if (!fx.isAnimating && !isPlaying) {
    fx.isAnimating = true;

    // Bir sonraki ayete gec
    currentIndex =
      ((next ? ++currentIndex : --currentIndex) + ayatList.length) %
      ayatList.length;
    // Yeni ayeti goster ve animasyonu baslat
    await displayAyah(currentIndex);
  } else {
    remindAyahEndWaiting();
    jumpCounter =
      ((next ? ++jumpCounter : --jumpCounter) + ayatList.length) %
      ayatList.length; // Next/prev tusuna basma adedi. Atlanacak ayet sayisi
    ayahNumInput.value = ((currentIndex + jumpCounter) % ayatList.length) + 1; //Atlanacak ayet sayisini goster
    setSelectValue(ayetJumpSelect, ayahNumInput.value);
    // Animasyon devam ediyorsa setText() donusunde otomatik jumpCounter kadar sonraki ayeti goster.
    allowDisplayAfterAnimation = true; // Next tusuna basildi, ama ayet gosterilemedi. Otomatik sonraki ayetleri goster.
  }
}
// async function handleNextPrevAyahNav(next) {
//   console.log("next :>> ", next);
//   // Animasyon devam etmiyorsa sonraki ayeti goster
//   if (!fx.isAnimating && !isPlaying) {
//     fx.isAnimating = true;

//     // Bir sonraki ayete gec
//     currentIndex =
//       ((next ? ++currentIndex : --currentIndex) + ayatList.length) %
//       ayatList.length;
//     // Yeni ayeti goster ve animasyonu baslat
//     await displayAyah(currentIndex);
//   } else {
//     remindAyahEndWaiting();
//     jumpCounter =
//       ((next ? ++jumpCounter : --jumpCounter) + ayatList.length) %
//       ayatList.length; // Next/prev tusuna basma adedi. Atlanacak ayet sayisi
//     ayahNumInput.value = ((currentIndex + jumpCounter) % ayatList.length) + 1; //Atlanacak ayet sayisini goster
//     setSelectValue(ayetJumpSelect, ayahNumInput.value);
//     // Animasyon devam ediyorsa setText() donusunde otomatik jumpCounter kadar sonraki ayeti goster.
//     allowDisplayAfterAnimation = true; // Next tusuna basildi, ama ayet gosterilemedi. Otomatik sonraki ayetleri goster.
//   }
// }

// Belirtilen ayete atla
async function changeAyahNummer(ayahNummer) {
  currentIndex = (parseInt(ayahNummer, 10) - 1) % ayatList.length; //input'a girilen degeri string'den sayiya cevirir.
  setSelectValue(ayetJumpSelect, currentIndex + 1);

  // Animasyon devam etmiyorsa sonraki ayeti goster
  if (!fx.isAnimating && !isPlaying) {
    fx.isAnimating = true;

    // Move to the given ayah
    ayahNumInput.blur(); // Odaktan cikar.

    // Display and wait for the current ayah's animation to complete
    await displayAyah(currentIndex);
  } else {
    remindAyahEndWaiting();
    // Animasyon devam ediyorsa setText() donusunde otomatik jumpCounter kadar sonraki ayeti goster.
    allowDisplayAfterAnimation = true; // Next tusuna basildi, ama ayet gosterilemedi. Otomatik sonraki ayetleri goster.
    ayahNumJumper = true; // Auto play modda girilen ayete atlamasi icin kontrol degiskeni
  }
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
    let optionId = id !== "selectedOption" ? id : "selectedOption";
    let option = domHandlers.createElement(
      "option",
      { selected: "selected", id: optionId, value: value },
      (text = value)
    );
    inputElement.appendChild(option);

    // const selectedIndex = inputElement.selectedIndex;
    // inputElement.options[inputElement.selectedIndex].value = value;
    // inputElement.value = value;
  }
}

// Silinecek
function remindAyahEndWaiting() {
  reminderElement.hidden = false;
  reminderElement.innerHTML = "Lütfen ayetin sonuna kadar bekleyin.";
}

function determineMealWaitingTime() {
  let factor = parseInt(mealWaitingTimeFactor);
  let mealText = ayah.translations.turkish;
  mealWaitingTime = factor * mealText.length;
  // mealWaitingTimeSpan.innerHTML = `${mealWaitingTime/1000} sn.`;
}

function animateRemainingTime() {
  const startTime = Date.now();
  console.log("startTime :>> ", startTime);

  const intervalId = setInterval(() => {
    domHandlers.updateContent(mealRemainingTimeSpan, mealWaitingTime);
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    console.log("elapsedTime :>> ", elapsedTime);
    let remainingTime = ((mealWaitingTime - elapsedTime) / 1000).toFixed(1);
    console.log("remainingTime :>> ", typeof remainingTime);
    remainingTime = parseFloat(remainingTime) < 0 ? 0 : `${remainingTime}s`;
    domHandlers.updateContent(mealRemainingTimeSpan, remainingTime);
    if (remainingTime < 1) {
      clearInterval(intervalId);
    }
  }, 1000);
}
// Arayuzun olcegini degistirme
function updateScale(event, isIncrease) {
  let scale = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--scale")
  );
  if (event.type === "input") {
    scale = parseFloat(event.target.value);
  } else if (event.type === "click") {
    scale = isIncrease ? scale + 0.07 : scale - 0.07;
  }
  scale = scale < 0.4 ? 0.4 : scale; // Min deger
  scale = scale > 1.6 ? 1.6 : scale; // Max deger
  scale = parseFloat(scale.toFixed(2));
  document.documentElement.style.setProperty("--scale", scale);
  scaleValue.textContent = scale;
}

// Meal dilini Turkce veya Almanca olarak degistir
function changeMealLanguage() {
  langRadioBtns.forEach((radio) => {
    if (radio.checked) mealLanguage = radio.value;
  });
  fx.isAnimating = false;
  setTimeout(() => {
    mealContainer.textContent = ayah.translations[mealLanguage];
  }, 50);
}

// Animasyonu acip kapatir
async function toggleAnimation(isChecked) {
  isAnimationEnabled = isChecked;
  fx.isAnimating = false;
  const mealText = ayah.translations[mealLanguage];

  console.log("isAnimationEnabled :>> ", isAnimationEnabled);
  // fx.setAnimationEnabled(isChecked);
}
