(() => {
   const canvas = document.querySelector(`canvas`);
   const ctx = canvas.getContext(`2d`);

   const w = canvas.width = window.innerWidth;
   const h = canvas.height = window.innerHeight;

   ctx.globalCompositeOperation = 'destination-over'

   let number = 0;
   let scale = 10;
   let hue = Math.random() * 360 | 0;

   function drawFlower() {
      let angle = number * .7;
      let radius = scale * Math.sqrt(number);
      let positionX = radius * Math.sin(angle) + w/2;
      let positionY = radius * Math.cos(angle) + h/2;

      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
      ctx.beginPath();
      ctx.arc(positionX, positionY, number, 0, 2 * Math.PI)
      ctx.closePath();
      ctx.fill();

      number++;
      hue+= 2;
   }


   function animate() {
      //ctx.clearRect(0,0,canvas.width, canvas.height);

      drawFlower();
      if(number > 150) return

      requestAnimationFrame(animate);
   }
   animate();

})();
