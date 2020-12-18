(() => {
   const cnv = document.querySelector(`canvas`);
   const ctx = cnv.getContext(`2d`);

   let centerX;
   let centerY;

   function init() {
      cnv.width = innerWidth * 2;
      cnv.height = innerHeight * 2;
      centerX = cnv.width/2;
      centerY = cnv.height/2;
   }
   init();


   const numberOfRings = 9;
   const ringRadiusOffset = 12;
   const ringRadius = 200;
   const waveOffset = 100;
   const colors = [`#ffba08`, `#faa307`, `#f48c06`, `#e85d04`, `#dc2f02`, `#d00000`, `#9d0208`, `#6a040f`, `#370617`]
   let startAngle = 0;

   function updateRings() {
      for(let i=0; i<numberOfRings; i++) {
         let radius = i * ringRadiusOffset + ringRadius;
         let offsetAngle = i * waveOffset * Math.PI / 180;
         drawRing(radius, colors[i], offsetAngle);
      }

      startAngle >= 360 ? startAngle = 0 : startAngle++;
   }

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
