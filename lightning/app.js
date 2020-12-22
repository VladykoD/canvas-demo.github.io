(() => {
   const canvas = document.querySelector(`canvas`);
   const ctx = canvas.getContext(`2d`);

   const circles = [];
   const circlesCount = 3;

   let mx = 0, my = 0;
   let toggle = 0;

   const maxLength = 800;
   const stepLength = 2;
   const maxOffset = 6;

   class Circle {
      constructor(x, y) {
         this.x = x || Math.random() * w / 2;
         this.y = y || Math.random() * h / 2;
      }

      draw(x, y) {
         this.x = x || this.x;
         this.y = y || this.y;

         ctx.lineWidth = 2;
         ctx.fillStyle = 'white';
         ctx.strokeStyle = 'red';

         ctx.beginPath();
         ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
         ctx.closePath();
         ctx.fill();

         ctx.beginPath();
         ctx.arc(this.x, this.y, 32, 0, Math.PI * 2);
         ctx.closePath();
         ctx.stroke();
      }
   }

   function createLightning() {
      for (let i = 0; i < circles.length; i++) {
         for (let j = i + 1; j < circles.length; j++) {
            let dist = getDistance(circles[i], circles[j]);
            let chance = dist / maxLength;
            if(chance > Math.random()) continue;
            let otherColor = chance * 255;

            let stepsCount = dist / stepLength;
            let sx = circles[i].x;
            let sy = circles[i].y;

            ctx.lineWidth = 3;
            ctx.strokeStyle = `rgb(255, ${otherColor}, ${otherColor})`;

            ctx.beginPath();
            ctx.moveTo(circles[i].x, circles[i].y)
            for (let a = stepsCount; a > 1; a--) {
               let pathLength = getDistance(circles[i], {x: sx, y: sy});
               let offset = Math.sin(pathLength / dist * Math.PI) * maxOffset;

               sx += (circles[j].x - sx) / a + Math.random() * offset * 2 - offset;
               sy += (circles[j].y - sy) / a + Math.random() * offset * 2 - offset;

               ctx.lineTo(sx, sy)
            }
            ctx.stroke();
         }
      }
   }

   function getDistance(a, b) {
      return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
   }

   canvas.onmousemove = e => {
      mx = e.x - canvas.getBoundingClientRect().x;
      my = e.y - canvas.getBoundingClientRect().y;
   }

   window.onmousedown = () => {
      toggle == circles.length - 1 ?
          toggle = 0 : toggle++;
   }

   function init() {
      w = canvas.width = innerWidth * 2;
      h = canvas.height = innerHeight * 2;

      for (let i = 0; i < circlesCount; i++) {
         circles.push(new Circle());
      }
   }
   init();

   function loop() {
      ctx.clearRect(0,0,canvas.width, canvas.height)
      createLightning();
      circles.map( i => {
         i == circles[toggle] ?
             i.draw(mx, my) : i.draw()
      })

      requestAnimationFrame(loop);
   }
   loop();

   window.addEventListener(`resize`, () => {
      circles.length = 0;

      init();
   });

})();
