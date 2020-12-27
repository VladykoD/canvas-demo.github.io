(() => {
   const canvas = document.querySelector(`canvas`);
   const ctx = canvas.getContext(`2d`);
   let w,h;

   const generateButton = document.querySelector('.generate')

   function size() {
      w = canvas.width = innerWidth ;
      h = canvas.height = innerHeight ;
   }
   size();
   window.addEventListener(`resize`, () => {
      size();
   });

   function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
      ctx.beginPath();
      ctx.save();
      ctx.strokeStyle = color1;
      ctx.fillStyle = color2;
      ctx.lineWidth = branchWidth;
      ctx.translate(startX, startY);
      ctx.rotate(angle * Math.PI/180);
      ctx.moveTo(0,0)
      ctx.lineTo(0, -len);
      ctx.stroke();

      if (len < 10) {
         ctx.restore();
         return;
      }

      drawTree(0, -len, len * 0.79, angle + 15, branchWidth);
      drawTree(0, -len, len * 0.79, angle - 15, branchWidth);

      ctx.restore();
   }

   drawTree(w/2, h - 80, 120, 0, 2, '#ffcc5c', '#ff6f69');



})();
