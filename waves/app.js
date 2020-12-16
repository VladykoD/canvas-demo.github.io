(() => {
   const cnv = document.querySelector(`canvas`);
   const ctx = cnv.getContext(`2d`);

   function init() {
      cnv.width = innerWidth;
      cnv.height = innerHeight;
   }
   init();


   const numberOfRings = 4;
   const ringRadiusOffset = 14;
   const ringRadius = 150;
   const waveOffset = 100;
   const colors = [`#d62828`, `#f77f00`, `#fcbf49`, `#eae2b7`]
   let startAngle = 0;

   function updateRings() {
      for(let i=0; i<numberOfRings; i++) {
         let radius = i * ringRadiusOffset + ringRadius;
         let offsetAngle = i * waveOffset * Math.PI / 180;
         drawRing(radius, colors[i], offsetAngle);
      }

      startAngle >= 360 ? startAngle = 0 : startAngle++;
   }

   let centerX = cnv.width/2;
   let centerY = cnv.height/2;
   const maxWavesAmplitude = 15;
   const numberOfWaves = 10;

   function drawRing(radius, color, offsetAngle) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 7;

      ctx.beginPath();

      for(let j = -180; j < 180; j++) {
         let currentAngle = (j + startAngle) * Math.PI / 180;
         let displacement = 0;
         let now = Math.abs(j)

         if( now > 70) {
            displacement = (now - 70) / 70;
         }
         if(displacement >= 1) {
            displacement = 1;
         }

         let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
         let x = Math.cos(currentAngle) * ( waveAmplitude) + centerX;
         let y = Math.sin(currentAngle) * ( waveAmplitude) + centerY;

         j > -180 ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
      }

      ctx.closePath();
      ctx.stroke();
   }

   function loop() {
      cnv.width |= 0; // ctx.clearRect(0,0,cnv.width, cnv.height)
      updateRings();
      requestAnimationFrame(loop);
   }
   loop();

   window.addEventListener(`resize`, init);

})();
