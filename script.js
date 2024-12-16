import { TextScramble } from "./TextScramble.js";



// NESNE olusturma
const fx = new TextScramble(
  titleContainer,
  mealContainer,
  arabicTextConainer,
  arabicPronunciationContainer,
  audioPlayer
);

// Degiskenler
let currentIndex = 0;
let mealler = turkce_mealler;
let endedListener;
let mealBeklemeKatsayisi = 45;
let beklemeSuresi;

// ANA Fonksiyon, Metin Animasyon ve Ayet Seslendirme
const next = () => {
  // Ayet sayici ve oynatma hizi belirleme
  ayet_currentIndex_Button.value = currentIndex + 1;
  determinePlaybackRate();

  // Meal Animasyon
  fx.setText(
    ayetMealResimler[currentIndex],
    mealler[currentIndex],
    arapcaAyetler[currentIndex],
    ayet_okunuslari[currentIndex],
    ayetler_mp3[currentIndex],
    currentIndex
  ).then(() => {
    if(audioPlayer.ended) audioPlayer.play();

    // Daha once tanimlanmis dinleyiciyi kaldiriyoruz
    if(endedListener) {
      audioPlayer.removeEventListener('ended', endedListener);
    }

    // Yeni dinleyici olustur ve referansi sakla

    endedListener = () => {
      if (ayahRepeatCheckbox.checked) {
        console.log("next if checkbox: " + ayahRepeatCheckbox.checked);
        playAyet();
      } else if (!autoPlayCheckbox.checked) {
        
      }else {
        currentIndex = (currentIndex + 1) % mealler.length;
        determineMealBeklemeSuresi();
        setTimeout(() => {
            next();
          }, beklemeSuresi);
        }
      };

      // Yeni dinleyiciyi tanimla
      audioPlayer.addEventListener("ended", endedListener, { once: true });
  });
};

function determineMealBeklemeSuresi() {
  beklemeSuresi = mealBeklemeKatsayisi * mealler[currentIndex].length;
  mealWaitingTimeSpan.textContent = `${(beklemeSuresi / 1000).toFixed(1)} sn`;

  console.log('beklemeSuresi: '+ beklemeSuresi/1000);
  console.log('ayet no: '+ (currentIndex+1) + '  ' + 'meal uzunlugu: ' + mealler[currentIndex].length);
  console.log(mealler[currentIndex]);
}

function determinePlaybackRate() {
  audioPlayer.src = `./ses 30 Ayet/${ayetler_mp3[currentIndex]}`;
  audioPlayer.playbackRate = document.getElementById("playbackRate").value; // Set playback rate
}

function playAyet() {
  
  if (ayahRepeatCheckbox.checked) {
    console.log("playAyet if checkbox: " + ayahRepeatCheckbox.checked);
    
    audioPlayer.play(); // play the audio
    audioPlayer.addEventListener("ended", playAyet, { once: true });
  } else {
    console.log("playAyet if checkbox: " + ayahRepeatCheckbox.checked);
        currentIndex = (currentIndex + 1) % mealler.length;
        next();
  }
}

nextAyahBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % mealler.length;
  next();
  determineMealBeklemeSuresi();
});

prevAyahBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1) % mealler.length;
  next();
  determineMealBeklemeSuresi();
});

ayet_currentIndex_Button.addEventListener("change", (e) => {
  currentIndex = (parseInt(e.target.value) - 1) % mealler.length;
  ayet_currentIndex_Button.blur();
  next();
});

// Auto Play checkbox'i dinleyerek programi baslatma
autoPlayCheckbox.addEventListener('input', () => {
  console.log('auto-play: ', autoPlayCheckbox.checked);
  if (autoPlayCheckbox.checked) {
    if (audioPlayer.ended) audioPlayer.play();
    audioPlayer.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % mealler.length;
    next();
  determineMealBeklemeSuresi();
  }, {once : true});
}
});

// Bekleme Suresi Girme Fonksiyonu
  //   mealWaitingFactorInput.addEventListener('input', () => {
  //   mealBeklemeKatsayisi = mealWaitingFactorInput.value;
  //   document.querySelector('#beklemeKatsayisiOutput').value=mealBeklemeKatsayisi

  //   console.log('bekleme suresi: ', mealBeklemeKatsayisi);
  // });

  window.beklemeSuresiGir = function (selectElement) {
    let beklemeKatsayisi = selectElement.value
    if(!beklemeKatsayisi) return;
    mealBeklemeKatsayisi = beklemeKatsayisi;
    document.querySelector('#beklemeKatsayisiOutput').textContent=beklemeKatsayisi;
    // selectElement.value = '';
  }

determineMealBeklemeSuresi();
next();

// Dinamik responsive düzenleme
window.addEventListener("resize", () => {
    const width = window.innerWidth;

    if (width < 768) {
        document.querySelector(".container").style.flexDirection = "column";
    } else {
        document.querySelector(".container").style.flexDirection = "row";
    }
});
