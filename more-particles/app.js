(() => {
   const canvas = document.querySelector(`canvas`);
   const ctx = canvas.getContext(`2d`);
   let particlesArray = [];
   let w, h, title, titleMeasures;
   const numberOfParticles = 300;

   const titleElement = document.querySelector('h1');

   function sizes() {
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;

      titleMeasures = titleElement.getBoundingClientRect();
      title = {
         x: titleMeasures.left,
         y: titleMeasures.top,
         width: titleMeasures.width,
         height: titleMeasures.height
      }
   }
   sizes();

   window.addEventListener(`resize`, () => {
      sizes();
      init();
   });


   class Particle {
      constructor(x, y ) {
         this.x = x;
         this.y = y;
         this.size = Math.random() * 20 + 1;
         this.weight = Math.random() * 10 + 1;
         this.directionX = (Math.random() * 1) - 1;
      }

      update() {
         if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = (Math.random() * 1) + 1;
            this.x = Math.random() * canvas.width * 1.3
         }
         this.weight += 0.01;
         this.y += this.weight;
         this.x += this.directionX;

         if (this.x + this.size > title.x &&
             this.x < title.x + this.size + title.width &&
             this.y + this.size > title.y &&
             this.y < title.y + this.size + title.height) {
            this.y -= 3;
            this.weight *= -0.5;
         }
      }

      draw() {
         ctx.fillStyle = '#fb8500';
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
         ctx.closePath();
         ctx.fill();
      }
   }

   function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
         const x = Math.random() * w;
         const y = 0;
         particlesArray.push(new Particle(x, y))
      }
   }
   init();

   function animate() {
      ctx.fillStyle = 'rgba(2, 48,71,0.1)'
      ctx.fillRect(0,0,canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
         particlesArray[i].update()
         particlesArray[i].draw()
      }

      requestAnimationFrame(animate);
   }
   animate();

})();
