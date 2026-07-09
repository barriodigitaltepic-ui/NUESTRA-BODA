/* =========================
   CONFIGURACIÓN
========================= */

const weddingDate = new Date("2026-11-28T18:00:00").getTime();

const galleryImages = [
    "images/foto1.jpg",
    "images/foto2.jpg",
    "images/foto3.jpg",
    "images/foto4.jpg",
    "images/foto5.jpg",
    "images/foto6.jpg"
];


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

    try{
        await music.play();
        playing = true;
        musicButton.innerHTML = "Ⅱ";
    }catch(error){
        playing = false;
        musicButton.innerHTML = "♪";
    }
});

musicButton.addEventListener("click", async () => {
    if(!playing){
        try{
            await music.play();
            playing = true;
            musicButton.innerHTML = "Ⅱ";
        }catch(error){}
    }else{
        music.pause();
        playing = false;
        musicButton.innerHTML = "♪";
    }
});


/* =========================
   CUENTA REGRESIVA
========================= */

function updateCountdown(){
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if(distance <= 0){
        document.querySelector(".countdown").innerHTML = "<p>Hoy celebramos el amor.</p>";
        return;
    }

    document.getElementById("days").textContent =
        String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2,"0");

    document.getElementById("hours").textContent =
        String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2,"0");

    document.getElementById("minutes").textContent =
        String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2,"0");

    document.getElementById("seconds").textContent =
        String(Math.floor((distance / 1000) % 60)).padStart(2,"0");
}

setInterval(updateCountdown,1000);
updateCountdown();


/* =========================
   ANIMACIONES AL SCROLL
========================= */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll(){
    revealElements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if(position < screenHeight - 110){
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
revealOnScroll();


/* =========================
   MODAL GALERÍA CON FLECHAS
========================= */

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");

let currentPhoto = 0;

function openModal(index){
    currentPhoto = index;
    modalImg.src = galleryImages[currentPhoto];
    modal.classList.add("show");
}

function closeGallery(){
    modal.classList.remove("show");
}

function showNextPhoto(){
    currentPhoto++;

    if(currentPhoto >= galleryImages.length){
        currentPhoto = 0;
    }

    modalImg.src = galleryImages[currentPhoto];
}

function showPrevPhoto(){
    currentPhoto--;

    if(currentPhoto < 0){
        currentPhoto = galleryImages.length - 1;
    }

    modalImg.src = galleryImages[currentPhoto];
}

document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
        const index = Number(item.dataset.index);
        openModal(index);
    });
});

closeModal.addEventListener("click", closeGallery);
nextPhoto.addEventListener("click", showNextPhoto);
prevPhoto.addEventListener("click", showPrevPhoto);

modal.addEventListener("click", event => {
    if(event.target === modal){
        closeGallery();
    }
});


/* =========================
   TECLADO
========================= */

document.addEventListener("keydown", event => {
    if(!modal.classList.contains("show")){
        return;
    }

    if(event.key === "ArrowRight"){
        showNextPhoto();
    }

    if(event.key === "ArrowLeft"){
        showPrevPhoto();
    }

    if(event.key === "Escape"){
        closeGallery();
    }
});
