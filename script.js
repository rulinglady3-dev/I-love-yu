// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();


// Ayarlar
const TEXT = "I love you";
const POINTS = [];
const TOTAL = 500;


// Kalp denklemi
function heart(t) {

    const x = 16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return { x, y };
}


// Noktaları oluştur
function createHeart() {

    POINTS.length = 0;

    const scale = Math.min(canvas.width, canvas.height) / 42;

    for (let i = 0; i < TOTAL; i++) {

        const t = Math.random() * Math.PI * 2;

        const p = heart(t);

        const depth = Math.random();

        POINTS.push({

            x: canvas.width / 2 + p.x * scale * depth,

            y: canvas.height / 2 - p.y * scale * depth,

            alpha: 0,

            target: 0.4 + Math.random() * 0.6,

            size: 10 + Math.random() * 4,

            twinkle: Math.random() * Math.PI * 2

        });

    }

}

createHeart();
// Çizim

let time = 0;

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
ctx.fillRect(50, 50, 100, 100);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    function draw() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.textAlign="center";
    ctx.textBaseline="middle";

    time += 0.03;

    const pulse = 1 + Math.sin(time) * 0.04;

    time += 0.03;

const pulse = 1 + Math.sin(time) * 0.04;

for (const p of POINTS) {

    p.alpha += (p.target - p.alpha) * 0.03;

    const x = canvas.width / 2 + (p.x - canvas.width / 2) * pulse;
    const y = canvas.height / 2 + (p.y - canvas.height / 2) * pulse;

    const glow = 0.6 + Math.sin(time * 2 + p.twinkle) * 0.4;

    ctx.globalAlpha = p.alpha * glow;

    ctx.fillStyle = "#ff4d6d";

    ctx.font = `${p.size}px Arial`;

    ctx.fillText(TEXT, x, y);
}
        ...
    }

    ctx.globalAlpha = 1;

    requestAnimationFrame(draw);

}
    }

    ctx.globalAlpha = 1;

    requestAnimationFrame(draw);

}

draw();
