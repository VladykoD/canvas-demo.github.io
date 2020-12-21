class GradientAnimation {
   constructor() {
      this.cnv = document.querySelector('canvas');
      this.ctx = this.cnv.getContext('2d');
      this.circlesNum = 20;
      this.speed = .01;
      this.minRad = 400;
      this.maxRad = 800;

      this.setCanvasSize();
      this.createCircles();
      this.drawAnimation();

      window.onresize = () => {
         this.setCanvasSize();
         this.createCircles();
      }
   }

   setCanvasSize() {
      this.w = this.cnv.width = innerWidth * 2;
      this.h = this.cnv.height = innerHeight * 2;
   }

   createCircles() {
      this.circles = [];
      for(let i = 0; i < this.circlesNum; ++i) {
         this.circles.push(new Circle(this.w, this.h, this.minRad, this.maxRad))
      }
   }

   drawCircles() {
      this.circles.forEach(circle => circle.draw(this.ctx, this.speed))
   }

   clearCanvas() {
      this.ctx.clearRect(0,0,this.w, this.h)
   }

   drawAnimation() {
      this.clearCanvas();
      this.drawCircles();
      window.requestAnimationFrame( () => this.drawAnimation())
   }
}

class Circle {
   constructor(w, h, minR, maxR) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.angle = Math.random() * 2 * Math.PI;
      this.radius = Math.random() * (maxR - minR) + minR;
      this.firstColor = `hsla(${Math.random() * 300}, 100%, 50%, 1)`
      this.secondColor = `hsla(${Math.random() * 300}, 100%, 50%, 0)`
   }

   draw(ctx, speed) {
      this.angle += speed;
      const x = this.x + Math.cos(this.angle) * 200;
      const y = this.y + Math.sin(this.angle) * 200;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius)
      gradient.addColorStop(0, this.firstColor);
      gradient.addColorStop(1, this.secondColor);

      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
      ctx.fill()
   }
}

window.onload = () => new GradientAnimation();
