export class TextScramble {
  constructor(
    baslik_container,
    meal_container,
    ayet_container,
    arabic_okunus_contaniner,
    audio_element
  ) {
    this.baslik_container = baslik_container;
    this.ayet_container = ayet_container;
    this.arabic_okunus_contaniner = arabic_okunus_contaniner;
    this.audio_element = audio_element;
    this.meal_container = meal_container;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  setText(ayetMealResim, yeniMeal, arapcaAyet, ayetOkunusu, ayetMp3) {
    this.ayetMealResim = ayetMealResim;
    this.arapcaAyet = arapcaAyet;
    this.ayetOkunusu = ayetOkunusu;
    this.ayetMp3 = ayetMp3;
    const oldText = this.meal_container?.innerHTML || "";
    const length = Math.max(yeniMeal.length, oldText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = yeniMeal[i] || "";
      const start = Math.floor(Math.random() * 100);
      const end = start + Math.floor(Math.random() * 100);
      this.queue.push({ from, to, start, end });
    }
    // console.log(this.queue)
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;

    this.playAyet();
    this.update();

    return promise;
  }

  update() {
    let output = "";
    let complete = 0;
    let i, n;
    for (i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.58) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">&hearts;</span>`;
      } else {
        output += from;
      }
    }
    output = output.replace(/\.{1,}/g, ".<br>");

    // Sayfada Gosterim

    this.baslik_container.innerHTML = this.ayetMp3
      .replace(/\.mp3$/, "")
      .replace(/_/, ".Ayet: ");
    this.ayet_container.innerHTML = this.arapcaAyet;
    this.arabic_okunus_contaniner.innerHTML = this.ayetOkunusu;
    this.meal_container.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = setTimeout(requestAnimationFrame(this.update), 900);
      this.frame++;
    }
  }

  playAyet() {
    this.audio_element.play();
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}
