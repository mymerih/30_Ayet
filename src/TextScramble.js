
export class TextScramble {
  constructor(
    mealContainer
  ) {
    this.mealContainer = mealContainer;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  static bilgi = 'TextScramble.js sinifina erisildi';
  static yazdirBilgi () {
    console.log(TextScramble.bilgi);
  }
  static {this.yazdirBilgi();
    console.log('static alan calisti: ', TextScramble.bilgi);}

  setText(yeniMeal, ayetMp3) {
    this.ayetMp3 = ayetMp3;
    const oldText = this.mealContainer?.innerHTML || "";
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
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    output = output.replace(/\.{1,}/g, ".<br>");

    // Sayfada Gosterim
    this.mealContainer.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      // this.frameRequest = setTimeout(requestAnimationFrame(this.update), 900);
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }


  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}
