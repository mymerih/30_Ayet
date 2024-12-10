export class TextScramble {
  constructor(mealContainer) {
    this.mealContainer = mealContainer;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
    this.frameRequest = null;
    this.isAnimating = true;
  }

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
    this.animationReset(); // Yenisi baslatilmadan once, onceki animasyon resetlenir

    this.update(yeniMeal);  // Yeni animasyon baslatilir

    return promise;
  }

  update(yeniMeal) {
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

    if (complete >= this.queue.length) {  // Animasyon burada sonlanir
      this.isAnimating = false;
      this.resolve();
    } else if (!this.isAnimating) { // Kullanici animasyonu next,prev vb. ile burada durdurabilir
      this.mealContainer.innerHTML = yeniMeal;
      this.resolve();
      return;
    }else {
      this.isAnimating = true;  // Animasyon teyit edilir ve islemleri devam ettirilir
      // this.frameRequest = setTimeout(requestAnimationFrame(this.update), 900);
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  animationReset() {
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    
    // this.queue = [];
  }
}
