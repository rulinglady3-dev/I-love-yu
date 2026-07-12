// =====================================
// LOVE HEART
// Bölüm 1
// =====================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const yu = document.getElementById("yu");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const WORD = "I love you";
const TOTAL = 700;

const POINTS = [];

let visibleCount = 0;
let time = 0;
let startTime = performance.now();
let yuVisible = false;
// =====================================
// LOVE HEART
// Bölüm 2
// =====================================

function heartPoint(t) {

    return {

        x: 16 * Math.pow(Math.sin(t), 3),

        y:
            13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t)

    };

}

function createHeart() {

    POINTS.length = 0;

    const scale = Math.min(canvas.width, canvas.height) / 42;

    for (let i = 0; i < TOTAL; i++) {

        const t = Math.random() * Math.PI * 2;

        const p = heartPoint(t);

        const depth = Math.random();

        POINTS.push({

            x: canvas.width / 2 + p.x * scale * depth,

            y: canvas.height / 2 - p.y * scale * depth,

            alpha: 0,

            targetAlpha: 0.45 + Math.random() * 0.55,

            size: 11 + Math.random() * 4,

            visible: false,

           delay: Math.random() * 2.5,

            twinkle: Math.random() * Math.PI * 2

        });

    }

    // Rastgele görünme sırası
    POINTS.sort(() => Math.random() - 0.5);

}

createHeart();
// =====================================
// LOVE HEART
// Bölüm 3
// =====================================

function update() {

    const elapsed = (performance.now() - startTime) / 1000;

    // İlk başta yavaş, sonra hızlanır
    const speed = Math.min(15 + elapsed * elapsed * 18, 260);

    visibleCount += speed / 60;

    const count = Math.min(Math.floor(visibleCount), POINTS.length);

    for (let i = 0; i < count; i++) {

    const p = POINTS[i];

    if (elapsed >= p.delay) {

        p.visible = true;

    }

}
    
    // Kalbin %70'i oluşunca "yu" görünsün
    if (!yuVisible && count >= POINTS.length * 0.70) {

        yuVisible = true;

        yu.style.opacity = 1;

    }

} 
// =====================================
// LOVE HEART
// Bölüm 4
// =====================================

// =====================================
// LOVE HEART
// Bölüm 6
// =====================================

function draw() {

    requestAnimationFrame(draw);

    update();

    time += 0.025;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.textAlign="center";
    ctx.textBaseline="middle";

    const pulse = 1 + Math.sin(time) * 0.035;

    for(const p of POINTS){

        if(!p.visible) continue;

        const x =
            canvas.width/2 +
            (p.x-canvas.width/2)*pulse;

        const y =
            canvas.height/2 +
            (p.y-canvas.height/2)*pulse;

        const glow =
            0.75 +
            Math.sin(time*2+p.twinkle)*0.25;

        ctx.globalAlpha = p.alpha * glow;

        ctx.fillStyle="#ff4d6d";

        ctx.font=`${p.size}px Arial`;

        ctx.fillText(
            WORD,
            x,
            y
        );

    }

    ctx.globalAlpha=1;

}

draw();
