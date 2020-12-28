(() => {
   const canvas = document.querySelector('canvas');
   const ctx = canvas.getContext('2d');

   let w = canvas.width = window.innerWidth * 2
   let h = canvas.height = window.innerHeight * 2

   let particleArray = [];

   let mouse = {
      x: null,
      y: null,
      radius: 150,
   }

   window.addEventListener('mousemove', function(event) {
      mouse.x = event.x;
      mouse.y = event.y;
   })

   ctx.fillStyle = '#ffc93c'
   ctx.font = '700  120px / 1 "Arial Black"';
   ctx.fillText('Hello, sunshine!', 200, 400);

   const data = ctx.getImageData(100, 200, 1200, 300)

   class Particle {
      constructor(x, y) {
         this.x = x;
         this.y = y;
         this.size = 5;
         this.baseX = this.x;
         this.baseY = this.y;
         this.density = (Math.random() * 30) + 1;
      }
      draw() {
         ctx.fillStyle = '#ffc93c';
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
         ctx.closePath();
         ctx.fill();
      }
      update() {
         let dx = mouse.x * 2 - this.x ;
         let dy = mouse.y * 2 - this.y ;

         let distance = Math.hypot(dx, dy);
         if(distance < 300) {
            this.size = 30
         } else {
            this.size = 5;
         }
      }
   }

   function init() {
      particleArray = [];

      for(let i = 0; i < 1000; i++) {
         let x = Math.random() * w
         let y = Math.random() * h
         particleArray.push(new Particle(x, y));
      }
   }
   init();


   function animate() {
      ctx.clearRect(0,0, w, h);
      for(let i = 0; i < particleArray.length; i++) {
         particleArray[i].draw();
         particleArray[i].update();
      }
      requestAnimationFrame(animate)
   }
   animate()

})()
