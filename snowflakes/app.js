(() => {
   const canvas = document.querySelector('canvas');
   const ctx = canvas.getContext('2d');

   let w = canvas.width = window.innerWidth * 2
   let h = canvas.height = window.innerHeight * 2

   const maxLevel = 3;
   const branches = 2;
   const sides = Math.floor((Math.random() * 9) + 5 );
   const spread = (Math.random() * 48) + 0.51;


   ctx.translate(w/2, h/2);

   const angle = Math.PI * 2 * spread;

   function drawLine(level) {
      if(level > maxLevel) {
         return;
      }

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(400, 0);
      ctx.stroke();

      for(let i = 1; i < branches + 1; i++) {
         ctx.save();
         ctx.translate(400 * i / (branches + 1), 0)
         ctx.scale(0.5, 0.5)
         ctx.save();

         ctx.rotate(angle);
         drawLine(level + 1);
         ctx.restore();
         ctx.save();

         ctx.rotate(-angle);
         drawLine(level + 1);
         ctx.restore();

         ctx.restore();
      }
   }

   for (let i = 0; i < sides; i++) {
      drawLine(0);
      ctx.rotate(Math.PI * 2 / sides)
   }

})()
