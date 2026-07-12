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
const TOTAL = 1500;


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

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (const p of POINTS) {

        // Yavaş yavaş görünmesi
        p.alpha += (p.target - p.alpha) * 0.03;

        ctx.globalAlpha = p.alpha;

        ctx.fillStyle = "#ff4d6d";

        ctx.font = `${p.size}px Arial`;

        ctx.fillText(
            TEXT,
            p.x,
            p.y
        );

    }

    ctx.globalAlpha = 1;

    requestAnimationFrame(draw);

}

draw();
