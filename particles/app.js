(() => {
   const canvas = document.querySelector(`canvas`);
   const ctx = canvas.getContext(`2d`);
   const particles = [];
   const properties = {
      particleColor: '#f2e9e4',
      particleRadius: 6,
      particleCount: 80,
      particleMaxVel: 0.5,
      lineLength: 100,
      particleLife: 100
   }
   let w, h;

   class Particle {
      constructor() {
         this.x = Math.random() * canvas.width;
         this.y = Math.random() * canvas.height;
         this.velocityX = Math.random() * (properties.particleMaxVel * 2) - properties.particleMaxVel;
         this.velocityY = Math.random() * (properties.particleMaxVel * 2) - properties.particleMaxVel;
         this.life = Math.random() * properties.particleLife * 60;
      }
      position() {
         if (this.x + this.velocityX > w
             && this.velocityX > 0
             || this.x + this.velocityX < 0 ) {
            this.velocityX *= -1
         } else {
            this.x += this.velocityX;
         }
         if (this.y + this.velocityY > h
             && this.velocityY > 0
             || this.y + this.velocityY < 0 ) {
            this.velocityY *= -1
         } else {
            this.y += this.velocityY;
         }
      }
      reDraw(){
         ctx.beginPath();
         ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2)
         ctx.closePath();
         ctx.fillStyle = properties.particleColor;
         ctx.fill();
      }
      reCalculateLife() {
         if(this.life < 1) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.velocityX = Math.random() * (properties.particleMaxVel * 2) - properties.particleMaxVel;
            this.velocityY = Math.random() * (properties.particleMaxVel * 2) - properties.particleMaxVel;
            this.life = Math.random() * properties.particleLife * 60;
         }

         this.life--;
      }
   }

   function reDrawParticles () {
      particles.forEach(el => {
         el.reCalculateLife();
         el.position();
         el.reDraw()
      })
   }

   function drawLines() {
      let x1, x2, y1, y2, length, opacity;

      for(let i in particles) {
         for(let j in particles) {
            x1 = particles[i].x;
            y1 = particles[i].y;
            x2 = particles[j].x;
            y2 = particles[j].y;

            length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

            if (length < properties.lineLength) {
               opacity = 1 - length / properties.lineLength;
               ctx.lineWidth = 2;
               ctx.strokeStyle = `rgba(242, 233, 228, ${opacity})`;
               ctx.beginPath();
               ctx.moveTo(x1, y1);
               ctx.lineTo(x2, y2);
               ctx.closePath();
               ctx.stroke();
            }
         }
      }
   }

   function loop() {
      canvas.width |= 0; // ctx.clearRect(0,0,cnv.width, cnv.height)
      reDrawParticles();
      drawLines();
      requestAnimationFrame(loop);
   }

   function init() {
      w = canvas.width = innerWidth * 2;
      h = canvas.height = innerHeight * 2;

      for (let i = 0; i < properties.particleCount; i++) {
         particles.push(new Particle);
      }
      loop();
   }
   init();



   window.addEventListener(`resize`, init);

})();
