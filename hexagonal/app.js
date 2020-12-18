(() => {
    const cnv = document.querySelector(`canvas`);
    const ctx = cnv.getContext(`2d`);
    let cw, ch, cx, cy;

    function init() {
        cw = cnv.width = innerWidth * 2;
        ch = cnv.height = innerHeight * 2;
        cx = cw / 2;
        cy = ch / 2;
    }

    init();

    window.addEventListener(`resize`, init);

    const cfg = {
        bgFillColor: 'rgba(50,50,50,.01)',
        dirsCount: 40,
        stepsToTurn: 1,
        dotSize: 2,
        dotCount: 300,
        dotVelocity: 1,
        distance: 200,
        hue: 2,
       gradientLength: 9,
       gridAngle: 45,
    }


    function drawRect(color, x, y, w, h, shadowColor, shadowBlur, gco) {
       ctx.globalCompositeOperation = gco;
       ctx.shadowColor = shadowColor || 'black';
        ctx.shadowBlur = shadowBlur;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }


    class Dot {
        constructor() {
            this.pos = {x: cx, y: cy};
            this.dir = cfg.dirsCount === 6
                ? (Math.random() * 3 | 0) * 2
                : Math.random() * cfg.dirsCount | 0;
            this.step = 0;

        }

        redrawDot() {
            let xy = Math.abs(this.pos.x - cx) + Math.abs(this.pos.y - cy)
            let makeHue = (cfg.hue + xy / cfg.gradientLength) % 360;
            let color = `hsl(${makeHue}, 100%, 50%)`;
            let size = cfg.dotSize - Math.sin(xy / 9) * 2 - Math.sin(xy / 2);
            let blur = cfg.dotSize - Math.sin(xy / 5) * 2;
            let x = this.pos.x - size / 2;
            let y = this.pos.y - size / 2;

            drawRect(color, x, y, size, size, color, blur, `lighter`);
        }

        moveDot() {
            this.step++;
            this.pos.x += dirstList[this.dir].x * cfg.dotVelocity;
            this.pos.y += dirstList[this.dir].y * cfg.dotVelocity;
        }

        changeDir() {
            if (this.step % cfg.stepsToTurn === 0) {
                this.dir = Math.random() > .5
                    ? (this.dir + 1) % cfg.dirsCount
                    : (this.dir + cfg.dirsCount - 1) % cfg.dirsCount
            }
        }

        killDot(id) {
           let percent = Math.exp(this.step / cfg.distance) * Math.random();

           if (percent > 100) {
               dotList.splice(id, 1);
           }
        }
    }

    const dirstList = [];

    function createDirs() {
        for (let i = 0; i < 360; i += 360 / cfg.dirsCount) {
           let angle = cfg.gridAngle + i;
            let x = Math.cos(angle * Math.PI / 180);
            let y = Math.sin(angle * Math.PI / 180);
            dirstList.push({x: x, y: y})
        }
    }

    createDirs();

    let dotList = [];
    function addDot() {
       if(dotList.length < cfg.dotCount && Math.random() > .8) {
          dotList.push(new Dot());
          cfg.hue = (cfg.hue + 1) % 360;
       }
    }

    function refreshDots() {
       dotList.forEach((i, id) => {
          i.moveDot();
          i.redrawDot();
          i.changeDir();
          i.killDot(id);
       })
    }

    let dot = new Dot();

    function loop() {
        drawRect(cfg.bgFillColor, 0, 0, cw, ch, 0,0, `normal`);
        addDot();
        refreshDots();

        requestAnimationFrame(loop)
    }

    loop();

})();
