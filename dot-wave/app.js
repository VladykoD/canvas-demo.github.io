(() => {
   const properties = {
      spaceDiameter: 40,
      dotDiameter: 30,
      waveLength: 100,
      velocity: .05,
      direction: 1,
      displacement: 0
   }

   const canvas = document.querySelector(`canvas`);
   const ctx = canvas.getContext(`2d`);

   let dotsList;

   w = canvas.width = innerWidth * 2;
   h = canvas.height = innerHeight * 2;

   window.addEventListener(`resize`, () => {
      w = canvas.width = innerWidth * 2;
      h = canvas.height = innerHeight * 2;
      init();
   });


   class Dot {
      constructor(x, y, num) {
         this.x = x;
         this.y = y;
         this.radius = properties.dotDiameter / 2;
         this.scale = getDistance(x, y) / properties.waveLength;
         this.text = num;
      }

      update() {
         this.resize();
         this.draw();
      }

      resize() {
         this.scale = this.scale - properties.velocity * properties.direction;
      }

      draw() {
         let scale = (1 - Math.abs(Math.sin(this.scale)))
         let otherColor = 1//(1 - scale) * 255;
         let r = this.radius * scale;
         ctx.beginPath();
         ctx.arc(this.x, this.y, r, 0, 2 * Math.PI, false)
         ctx.closePath();
         ctx.fillStyle = `rgba(29, 53, 87, ${otherColor})`;
         ctx.fill();
      }
   }

   init();
   function init() {
      dotsList = [];
      const dotsCountX = w / properties.spaceDiameter | 0; // Math.floor(...)
      const dotsCountY = h / properties.spaceDiameter | 0; // Math.floor(...)

      const startX = ((properties.spaceDiameter) + (w - dotsCountX * properties.spaceDiameter) )/ 2;
      const startY = ((properties.spaceDiameter) + (h - dotsCountY * properties.spaceDiameter) )/ 2;

      let displacement = properties.spaceDiameter / 4 * properties.displacement;

      for (let i = 0; i < dotsCountX; i++) {
         displacement = -displacement;
         let x = startX + i * properties.spaceDiameter + displacement;

         for (let j = 0; j < dotsCountY; j++) {
            let y = startY + j * properties.spaceDiameter;

            dotsList.push(new Dot(x, y));
         }

      }

   }

   function loop() {
      canvas.width |= 0; // ctx.clearRect(0,0,cnv.width, cnv.height)

      for (let i in dotsList) {
         dotsList[i].update();
      }

      requestAnimationFrame(loop);
   }
   loop();

   function getDistance(x,y) {
      let dx = w / 2 - x;
      let dy = w / 2 - y;

      return Math.sqrt((dx * dx) + (dy * dy));
   }

})();
