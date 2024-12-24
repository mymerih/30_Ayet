export class TextScramble {
  constructor(mealContainer) {
    this.mealContainer = mealContainer;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
    this.frame = 0;
    this.isAnimating = true;
    this.frameRequest = null;
    this.isAnimationEnabled = true;
  }

  setText(newText) {
    if (!this.isAnimationEnabled) {
      this.mealContainer.innerHTML = newText;
      return Promise.resolve();
    }
    const oldText = this.mealContainer?.innerHTML || "";
    this.queue = [];
    const maxLength = Math.max(newText.length, oldText.length);
    
    for (let i = 0; i < maxLength; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 150);
      const end = start + Math.floor(Math.random() * 150);
      this.queue.push({ from, to, start, end });
    }
    this.animationReset(); // Yenisi baslatilmadan once, onceki animasyon resetlenir
    // console.log('this.queue :>> ', this.queue);
    return new Promise((resolve) => {
      // console.log('resolve :>> ', resolve);
      this.resolve = resolve;
      this.frame = 0;
      this.update(newText); // Yeni animasyon baslatilir
    });
  }
  
  update(newText) {
    // console.log('newText :>> ', newText);
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
      setTimeout(() => {
      this.mealContainer.innerHTML = newText;
        
      }, 50);
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
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
  }

  // A method to toggle animation dynamically
  setAnimationEnabled(isEnabled) {
    this.isAnimationEnabled = isEnabled;
  }
}