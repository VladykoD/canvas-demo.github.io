(() => {
   const canvas = document.querySelector('canvas');
   const ctx = canvas.getContext('2d');
   let w = canvas.width = window.innerWidth;
   let h = canvas.height = window.innerHeight;

   const sprite = new Image();
   sprite.src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/030aacfd-741f-4462-8b2b-2b746f70cf15/dcepxhf-9c5fc66d-d924-4a3b-9cca-59378ac8c6ee.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMDMwYWFjZmQtNzQxZi00NDYyLThiMmItMmI3NDZmNzBjZjE1XC9kY2VweGhmLTljNWZjNjZkLWQ5MjQtNGEzYi05Y2NhLTU5Mzc4YWM4YzZlZS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.bHAPpla-EGEvodFK1VksmqmggSzBPPQ14LEh3Xgc4wQ';

   ctx.textBaseline = 'middle';
   let lettersArray = ['Т', 'Ы', 'П', 'И', 'Д', 'О', 'Р',];
   let hue = 0;
   const particles = [];
   let numberOfParticles = (w * h) / 100;
   let numberOfParticlesStop = numberOfParticles / 50;

   const mouse = {
      x: 0,
      y: 0,
      radius: 20,
      autopilotAngle: 0
   }
   window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
   })

   class Particle {
      constructor(x,y,radius) {
         this.x = x;
         this.y = y;
         this.radius = radius;
         this.color = `hsl(${hue}, 100%, 50%)`;
         this.text = lettersArray[Math.floor(Math.random() * lettersArray.length)];

         this.size = 99;
         this.frameX = Math.floor(Math.random() * 4)
         this.frameY = Math.floor(Math.random() * 4)
      }
      draw() {
         ctx.drawImage(sprite, this.size * this.frameX, this.size * this.frameY, this.size, this.size, this.x, this.y, this.radius * 3, this.radius * 3)
      }

      update() {
         if(mouse.x === undefined && mouse.y === undefined) {
            let newX = mouse.radius * w / 50 * Math.sin(mouse.autopilotAngle * (Math.PI / 50))
            let newY = mouse.radius * h / 50 * Math.cos(mouse.autopilotAngle * (Math.PI / 60))

            mouse.x = newX + w/2;
            mouse.y = newY + h/2;
         }
         mouse.autopilotAngle += 0.01;
      }
   }

   function handleOverlap() {
      let overlapping = false;
      let protection = 300;
      let counter = 0;

      while (particles.length < numberOfParticles &&
      counter < protection) {
         let randomAngle = Math.random() * 2 * Math.PI;
         let randomRadius = mouse.radius * Math.sqrt(Math.random()) * 4;
         let particle = {
            x: mouse.x + randomRadius * Math.cos(randomAngle),
            y: mouse.y + randomRadius * Math.sin(randomAngle),
            radius: Math.floor(Math.random() * mouse.radius) + 10
         }
         let overlapping = false;

         for(let i = 0; i < particles.length; i++) {
            let previousParticle = particles[i];
            let distance = Math.hypot(particle.x - previousParticle.x, particle.y - previousParticle.y)
            if (distance < (particle.radius + previousParticle.radius)) {
               overlapping = true;
               break;
            }
         }

         if(!overlapping) {
            particles.unshift(new Particle(particle.x, particle.y, particle.radius))
         }
         counter++;
      }

   }
   handleOverlap();

   function animate() {
      ctx.clearRect(0,0,w,h);

      for(let i = 0; i < particles.length; i++) {
         particles[i].draw();
         particles[i].update();
      }

      if(particles.length >= numberOfParticlesStop) {
         for (let i=0; i < numberOfParticlesStop / 20; i++) {
            particles.pop();
         }
      }

      handleOverlap();
      hue++;
      requestAnimationFrame(animate)
   }
   animate();

   let autopilot = setInterval(() => {
      mouse.x = undefined
      mouse.y = undefined
   }, 40)

   canvas.addEventListener('mouseleave', () => {
      autopilot = setInterval(() => {
         mouse.x = undefined
         mouse.y = undefined
      }, 40)
   })

   canvas.addEventListener('mouseenter', () => {
      clearInterval(autopilot)
      autopilot = undefined;
   })

})()
