export class TextScramble {
  constructor(mealContainer) {
    this.mealContainer = mealContainer;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
    this.frame = 0;
    this.isAnimating = true;
    this.frameRequest = null;
  }

  setText(newText) {
    this.animationReset(); // Always reset before starting a new animation
    // this.isAnimating = true; // Animasyon teyit edilir ve islemleri devam ettirilir
    this.newText = newText;
    const oldText = this.mealContainer?.innerHTML || "";
    this.queue = [];
    const maxLength = Math.max(newText.length, oldText.length);

    for (let i = 0; i < maxLength; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 100);
      const end = start + Math.floor(Math.random() * 100);
      this.queue.push({ from, to, start, end });
    }
    // cancelAnimationFrame(this.frameRequest)
    return new Promise((resolve) => {
      // console.log('resolve :>> ', resolve);
      this.resolve = resolve;
      // this.frame = 0;
      this.isAnimating = true; // Ensure animation starts
      this.update(); // Yeni animasyon baslatilir
    });
  }

  update() {
    let output = "";
    let complete = 0;
    let i, n;
    for (i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        // console.log('complete :>> ', complete);
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

    if (complete >= this.queue.length) {
      // Animasyon burada sonlanir
      this.isAnimating = false;
      this.resolve();
    } else if (!this.isAnimating) {
      // Kullanici animasyonu next,prev vb. ile burada durdurabilir
      this.animationReset();
      this.resolve();
      return;
    } else {
      this.isAnimating = true; // Animasyon teyit edilir ve islemleri devam ettirilir
      // this.frameRequest = setTimeout(requestAnimationFrame(this.update), 900);
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  animationReset() {
    this.isAnimating = false;
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.queue = [];
    this.mealContainer.innerHTML = this.newText;
  }

  // A method to toggle animation dynamically
  setAnimationEnabled(isEnabled) {
    this.isAnimationEnabled = isEnabled;
  }
}
