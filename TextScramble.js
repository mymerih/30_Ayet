export class TextScramble {
    constructor(baslik_container, meal_container, ayet_container, arabic_okunus_contaniner, 
              // ayet_meal_resim_contaniner,
              audio_element) {
      this.baslik_container = baslik_container;
      this.ayet_container = ayet_container;
      this.arabic_okunus_contaniner = arabic_okunus_contaniner;
      // this.ayet_meal_resim_contaniner = ayet_meal_resim_contaniner;
      this.audio_element = audio_element;
      this.meal_container = meal_container;
      this.chars = "!<>-_\\/[]{}—=+*^?#________";
      this.update = this.update.bind(this);
    }
  
    setText(ayetMealResim, yeniMeal, arapcaAyet, ayetOkunusu, ayetMp3, counter) {
      this.ayetMealResim = ayetMealResim;
      this.arapcaAyet = arapcaAyet;
      this.ayetOkunusu = ayetOkunusu;
      this.ayetMp3 = ayetMp3;
      const oldText = this.meal_container.innerHTML;
      const length = Math.max(yeniMeal.length, oldText.length);
      const promise = new Promise(resolve => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = yeniMeal[i] || '';
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        this.queue.push({ from, to, start, end });
      }
      console.log(this.queue)
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update(counter);
      return promise;
    }
  
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n=this.queue.length; i<n; i++) {
        let {from, to,  start,end, char}=this.queue[i];
        if(this.frame>=end) {
          complete++;
          output +=to;
        }else if(this.frame>=start){
          if(!char || Math.random()<0.28){
            char=this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">&hearts;</span>`;
        }else{
          output += from;
        }
      }
      output=output.replace(/\./g, '.<br>');

      // Sayfada Gosterim

      this.baslik_container.innerHTML = output;
      this.baslik_container.innerHTML = this.ayetMp3.replace(/\.mp3$/, '').replace(/_/, '.Ayet: ');
      this.meal_container.innerHTML = output;
      this.ayet_container.innerHTML = this.arapcaAyet;
      this.arabic_okunus_contaniner.innerHTML = this.ayetOkunusu;
      // this.ayet_meal_resim_contaniner.src = `./Resim 30 Ayet/${this.ayetMealResim}`
      // this.ayet_meal_resim_contaniner.alt = this.ayetMealResim.replace(/\.png$/) + ' Resmi';
      
      this.audio_element.src = `./ses 30 Ayet/${this.ayetMp3}`;
      if(complete===this.queue.length) {
        this.resolve();
      }else{
        this.frameRequest=setTimeout(requestAnimationFrame(this.update), 900);
        this.frame++;
      }
  
    }
  
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }
  