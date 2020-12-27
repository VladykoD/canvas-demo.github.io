(() => {
   const canvas = document.querySelector(`canvas`);
   const ctx = canvas.getContext(`2d`);
   let w,h;
   let curve = 10;

   const generateButton = document.querySelector('.generate')

   function size() {
      w = canvas.width = innerWidth ;
      h = canvas.height = innerHeight ;
   }
   size();
   window.addEventListener(`resize`, () => {
      size();
      generateRandomTree();
   });

   function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
      ctx.beginPath();
      ctx.save();
      ctx.strokeStyle = color1;
      ctx.fillStyle = color2;
      //ctx.shadowBlur = 2;
      //ctx.shadowColor = 'white'
      ctx.lineWidth = branchWidth;
      ctx.translate(startX, startY);
      ctx.rotate(angle * Math.PI/180);
      ctx.moveTo(0,0)

      if(angle > 0) {
         ctx.bezierCurveTo(curve, -len/2, curve, -len/2, 0, -len)
      } else {
         ctx.bezierCurveTo(curve, -len/2, -curve, -len/2, 0, -len)
      }
      ctx.stroke();

      if (len < 20) {
         //leafs
         ctx.beginPath()
         ctx.arc(0, -len, curve, 0, Math.PI/2);
         ctx.fill();
         ctx.restore();
         return;
      }

      drawTree(0, -len, len * 0.79, angle + curve, branchWidth * 0.5);
      drawTree(0, -len, len * 0.79, angle - curve, branchWidth * 0.5);

      ctx.restore();
   }

   drawTree(w/2, h - 80, 120, 0, 15, '#ffcc5c', '#ff6f69');

   function generateRandomTree() {
      ctx.clearRect(0,0,w,h);

      //drawTree(w/2, h - 80, 120, 0, 15, '#ffcc5c', '#ff6f69');
      let len = Math.floor((Math.random() * 20) + 100);
      let angle = 0;
      let branchWidth = (Math.random() * 140) + 1;
      let color1 = `hsl(${Math.random() * 360 | 0}, 70%, 70%)`
      let color2 = `hsl(${Math.random() * 360 | 0}, 70%, 70%)`

      generateButton.style.background = color2
      curve = (Math.random() * 20) + 10;

      drawTree(w/2, h-80, len, angle, branchWidth, color1, color2)

   }

   generateButton.addEventListener('click', ()=> {
      generateRandomTree();
   })


})();
