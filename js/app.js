/* =========================
   CONFIGURACIÓN
========================= */

const weddingDate = new Date("2026-11-28T18:00:00").getTime();


/* =========================
   INTRO Y MÚSICA
========================= */

const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterButton");
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

let playing = false;

enterButton.addEventListener("click", async () => {
    document.body.classList.remove("locked");
    intro.classList.add("hide");

    try {
        await music.play();
        playing = true;
        musicButton.innerHTML = "Ⅱ";
    } catch (error) {
        playing = false;
        musicButton.innerHTML = "♪";
    }
});


musicButton.addEventListener("click", async () => {

    if (!playing) {

        try {
            await music.play();
            playing = true;
            musicButton.innerHTML = "Ⅱ";
        } catch (error) {}

    } else {

        music.pause();
        playing = false;
        musicButton.innerHTML = "♪";

    }

});


/* =========================
   CUENTA REGRESIVA
========================= */

function updateCountdown() {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {

        document.querySelector(".countdown").innerHTML =
            "<p>Hoy celebramos el amor.</p>";

        return;
    }

    document.getElementById("days").textContent =
        String(
            Math.floor(
                distance / (1000 * 60 * 60 * 24)
            )
        ).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(
            Math.floor(
                (distance / (1000 * 60 * 60)) % 24
            )
        ).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(
            Math.floor(
                (distance / (1000 * 60)) % 60
            )
        ).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(
            Math.floor(
                (distance / 1000) % 60
            )
        ).padStart(2, "0");
}


setInterval(updateCountdown, 1000);
updateCountdown();


/* =========================
   ANIMACIONES AL SCROLL
========================= */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    revealElements.forEach(element => {

        const position =
            element.getBoundingClientRect().top;

        const screenHeight =
            window.innerHeight;

        if (position < screenHeight - 110) {

            element.classList.add("active");

        }

    });

}


window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

revealOnScroll();
