const body = document.body;
const num = 32;
const array = new Uint8Array(num * 2);


let context, logo, myElements, analyser, src, height;

window.onclick = function () {
   if (context) return;

   body.querySelector('h1').remove();

   for(let i = 0; i < num; i++) {
      logo = document.createElement('div');
      logo.className = 'logo';
      body.appendChild(logo)
   }

   myElements = document.querySelectorAll('.logo');
   context = new AudioContext();
   analyser = context.createAnalyser();

   navigator.mediaDevices.getUserMedia({
      audio: true
   }).then(stream => {
      src = context.createMediaStreamSource(stream);
      src.connect(analyser);
      loop();
   }).catch(error => {
      alert(error + '\t\n\ decline. Page will be reloaded.');
      location.reload();
   })
}

function loop() {
   window.requestAnimationFrame(loop);

   analyser.getByteFrequencyData(array);

   for(let i = 0; i < num; i++) {
      height = array[i + num];
      myElements[i].style.minHeight = height + 'px';
      myElements[i].style.opacity = height * 0.008;
   }
}
