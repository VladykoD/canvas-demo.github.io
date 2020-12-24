(() => {
   const canvas = document.querySelector(`canvas`);
   const ctx = canvas.getContext(`2d`);

   const particleArray = [];
   const numberOfParticles = 100;

   const mouse = {
      x: null,
      y: null
   }

   window.addEventListener('mousemove', function(e) {
      mouse.x = e.x;
      mouse.y = e.y;

      //console.log(mouse.x, mouse.y)
   })

   setInterval(() => {
      mouse.x = undefined;
      mouse.y = undefined;
   },200)

   class Particles {
      constructor(x,y,size, color, weight) {
         this.x = x;
         this.y = y;
         this.size = size;
         this.color = color;
         this.weight = weight;
      }
      draw() {
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
         ctx.fillStyle = this.color;
         ctx.fill();
      }
      update() {
         this.size -= 0.05;

         if (this.size < 0) {
            this.x = (mouse.x *2 + ((Math.random() * 20) - 10))
            this.y = (mouse.y *2 + ((Math.random() * 20) - 10))
            this.size = (Math.random() * 5) + 5;
            this.weight = (Math.random() * 2) - 0.05;
         }
         this.y += this.weight;
         this.weight += 0.2;

         if(this.y > canvas.height - this.size) {
            this.weight *= (-0.9);
         }
      }
   }


   function init() {
      w = canvas.width = innerWidth * 2;
      h = canvas.height = innerHeight * 2;



      firstColor = `hsla(${Math.random() * 300}, 100%, 50%, 1)`
      secondColor = `hsla(${Math.random() * 300}, 100%, 50%, 0)`

      gradient = ctx.createLinearGradient(0,0, w, h);
      gradient.addColorStop(0, firstColor);
      gradient.addColorStop(1, secondColor);


      for (let i = 0; i < numberOfParticles; i++) {
         let x = Math.random() * canvas.width
         let y = Math.random() * canvas.height
         let size = (Math.random() * 5) + 2
         let color = 'white'
         let weight = 0;
         particleArray.push(new Particles(x,y,size,color, weight))
      }
   }
   init();

   function loop() {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0,0,canvas.width, canvas.height)
      for(let i = 0; i < particleArray.length; i++) {
         particleArray[i].update();
      }
      connect();
      requestAnimationFrame(loop);
   }
   loop();

   window.addEventListener(`resize`, () => {
      particleArray.length = 0;
      init();
   });



   function connect() {

      for (let a = 0; a < particleArray.length; a++) {
         for (let b = a; b < particleArray.length; b++) {
            let distance = Math.sqrt(Math.pow((particleArray[a].x - particleArray[b].x), 2) + Math.pow((particleArray[a].y - particleArray[b].y), 2))

            if (distance < 600) {
               ctx.strokeStyle = gradient;
               ctx.beginPath();
               ctx.lineWidth = 2;
               ctx.moveTo(particleArray[a].x, particleArray[a].y)
               ctx.lineTo(particleArray[b].x, particleArray[b].y)

               ctx.stroke();
            }
         }
      }
   }

})();
