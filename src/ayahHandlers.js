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
  nextAyahBtn,
  prevAyahBtn,
  ayahNumInput,
  ayetJumpSelect,
  ayahPlaybackRateInput,
  ayahPlaybackRateSpan,
  ayahRepeatCheckbox,
  autoPlayCheckbox,
  mealWaitingTimeSpan,
  mealWaitingFactorInput,
} = domHandlers.getElements();

// Global degiskenler
let ayah;
let currentIndex = 16; // Index of Ayat
let jumpCounter = 0; // Ayet atlama adedi.
let allowDisplayAfterAnimation = false; // next'e basilmis ise animasyondan sonra devam eder
let isPlaying = false;
let autoPlaying = true;
let mealWaitingTimeFactor = 45;
let mealWaitingTime = 4000;
let ayahNumJumper =false;  // Auto play modda, ayet numarasi girilmis ise currentIndex'i girilen ayete ayarlar.
function determineMealWaitingFactor() {}

function determineMealWaitingTime() {
  let factor = parseInt(mealWaitingTimeFactor);
  let mealText = ayah.translations.turkish;
  mealWaitingTime = factor * mealText.length;
  // mealWaitingTimeSpan.innerHTML = `${mealWaitingTime/1000} sn.`;
  console.log("mealWaitingTimeFactor :>> ", factor);
  console.log("mealWaitingTime :>> ", mealWaitingTime / 1000);
}

// TextScramble nesne ornegi olusturma
const fx = new TextScramble(mealContainer);

// Setup handlers
export const setupAyahHandlers = () => {
  domHandlers.addEvent(nextAyahBtn, "click", ()=>handleNextPrevAyahNav(true));
  domHandlers.addEvent(prevAyahBtn, "click", ()=>handleNextPrevAyahNav(false));
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
  domHandlers.addEvent(ayahPlaybackRateInput, "input", updateAyahPlaybackRate);
  domHandlers.addEvent(autoPlayCheckbox, "input", playAyahAuto);
  domHandlers.addEvent(ayahRepeatCheckbox, "change", repeatAyahOhneAnimation);
  domHandlers.addEvent(
    mealWaitingFactorInput,
    "change",
    (e) => (mealWaitingTimeFactor = e.target.value)
  );

  // Display the initial ayah
  displayAyah(currentIndex);
};

function repeatAyahOhneAnimation() {}

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
  animateMeal(ayah);
}

function setSelectValue(inputElement, value, text=value, id="selectedOption") {
  if (inputElement) {
    const selectedOption = document.getElementById("selectedOption");
    if (selectedOption) {
      console.log("deletedOptionDeleted :>> ", selectedOption);
      inputElement.removeChild(selectedOption);
    }
    let optionId = (id !== "selectedOption") ? id : "selectedOption";
    let option = domHandlers.createElement(
      "option",
      { selected: "selected", id: optionId, value: value },
      text=value
    );
    console.log("option :>> ", option);
    inputElement.appendChild(option);

    // const selectedIndex = inputElement.selectedIndex;
    // inputElement.options[inputElement.selectedIndex].value = value;
    // inputElement.value = value;
  }
}
// Page Updates: Update header, arabic text, arabic pronounciation
function updatePage(ayah) {
  domHandlers.updateContent(
    titleContainer,
    `${ayah.id}.Ayet: ${ayah.surah}_${ayah.id}`
  );
  domHandlers.setInputValue(ayahNumInput, ayah.id); // Ayet No'yu gunceller
  setSelectValue(ayetJumpSelect, ayah.id); // Ayet No'yu gunceller
  domHandlers.updateContent(arabicTextConainer, ayah.arabicText); // Arapca ayeti gunceller
  domHandlers.updateContent(arabicPronunciationContainer, ayah.transliteration); // Arapca okunusu gunceller
  domHandlers.setAttribute(audioPlayer, "src", `../assets/audio/${ayah.audio}`); // ayet mp3 src'sini gunceller.
  domHandlers.updateContent(
    mealWaitingTimeSpan,
    `${(mealWaitingTime / 1000).toFixed(1)} sn.`
  );
}

function playAyah() {
  audioPlayer.playbackRate = updateAyahPlaybackRate();
  audioPlayer.play();
  isPlaying = true;
}

// range input'u degeri degisince EventListener bunu calistirir.
function updateAyahPlaybackRate() {
  const rate = ayahPlaybackRateInput.value; // Oynatma hizi degisince, degeri degiskene atar.
  audioPlayer.ayahPlaybackRate = rate; // Src'u degisen player'in resetlenen oynatma hizini ayarlanan degere gunceller
  domHandlers.updateContent(ayahPlaybackRateSpan, rate);
  return rate;
  // domHandlers.setInputValue(playbackRateValue, ayahPlaybackRateInput.value)
}

// Animate meal text
async function animateMeal(ayah) {
  await fx
    .setText(ayah.translations.turkish) // Metin icin animasyon baslatilir
    .then(() => {
      // Amimasyon tamamlandiktan sonra burasi calisir
      console.log("Animasyon tamamlandi.");
      if (audioPlayer.ended) audioPlayer.play();
      audioPlayer.addEventListener(
        "ended",
        () => {
          isPlaying = false;
          // Navigasyon tuslarina basilmis ise Buna uygun Current Index'i ayarlar
          let nextPrevJumper;
          if (jumpCounter !== 0) {
            nextPrevJumper = true;
            currentIndex =
              (currentIndex + jumpCounter + ayatList.length) % ayatList.length; // jumpCounter kadar atlanir
            jumpCounter = 0; // Sayaci sifirla
          }
          // Auto play checkbox checked
          if (autoPlaying) {
            fx.isAnimating = true;
            allowDisplayAfterAnimation = false; // Mevcut ayetin islenmesine baslanir ve yenisi engellenir.
            // Ayet atlanmis ise currentIndex'i degistirmez, yoksa 1 artirir.
            if (!ayahNumJumper) { // Ayet atlama numarasi girilmis ise atlar.
              currentIndex =
                (nextPrevJumper ? currentIndex : currentIndex + 1) %
                ayatList.length;
            } 
            ayahNumJumper = false;  //Bayragi sifirlar
            setTimeout(() => {
              displayAyah(currentIndex);
            }, mealWaitingTime);

            //Animasyon tamamlanmadan next/prev'e basilirsa animasyon bitince burasi calisir
          } else if (allowDisplayAfterAnimation) {
            allowDisplayAfterAnimation = false; // Mevcut ayetin islenmesine baslanir ve yenisi engellenir.
            fx.isAnimating = true; // Animasyonun basladigini gosteren bayrak aktif edilir

            displayAyah(currentIndex);
          }
        },
        { once: true }
      );
    });
}

// Navigation handlers
function playAyahAuto() {
  if (autoPlayCheckbox.checked) {
    if (audioPlayer.ended) {
      displayAyah(currentIndex);
      // displayAyah(currentIndex);
    }
    autoPlaying = true;
  } else {
    autoPlaying = false;
  }
}


async function handleNextPrevAyahNav(next) {
  console.log('next :>> ', next);
  // Animasyon devam etmiyorsa sonraki ayeti goster
  if (!fx.isAnimating && !isPlaying) {
    fx.isAnimating = true;

    // Bir sonraki ayete gec
    currentIndex = ((next ? ++currentIndex : --currentIndex) + ayatList.length) % ayatList.length;
console.log('currentIndex :>> ', currentIndex);
    // Yeni ayeti goster ve animasyonu baslat
    await displayAyah(currentIndex);
  } else {
    jumpCounter = ((next ? ++jumpCounter : --jumpCounter) + ayatList.length) % ayatList.length; // Next/prev tusuna basma adedi. Atlanacak ayet sayisi
    console.log('jumpCounter :>> ', jumpCounter);
    ayahNumInput.value = ((currentIndex + jumpCounter) % ayatList.length) + 1; //Atlanacak ayet sayisini goster
    setSelectValue(ayetJumpSelect, ayahNumInput.value); 
    // Animasyon devam ediyorsa setText() donusunde otomatik jumpCounter kadar sonraki ayeti goster.
    allowDisplayAfterAnimation = true; // Next tusuna basildi, ama ayet gosterilemedi. Otomatik sonraki ayetleri goster.
    
  }
}

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
    // Animasyon devam ediyorsa setText() donusunde otomatik jumpCounter kadar sonraki ayeti goster.
    allowDisplayAfterAnimation = true; // Next tusuna basildi, ama ayet gosterilemedi. Otomatik sonraki ayetleri goster.
    ayahNumJumper = true; // Auto play modda girilen ayete atlamasi icin kontrol degiskeni
  }
}
