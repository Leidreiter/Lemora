const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

// Toggle menú
hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que se propague al document
    nav.classList.toggle("active");
});

// Cerrar al hacer clic fuera del menú
document.addEventListener("click", (e) => {
    if (nav.classList.contains("active") &&
        !nav.contains(e.target) &&
        !hamburger.contains(e.target)) {
        nav.classList.remove("active");
    }
});

// Cerrar con botón X
const closeBtn = document.getElementById("close-menu");
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        nav.classList.remove("active");
    });
}

const slides = document.querySelectorAll(".hero-slide");
const mediaSlides = document.querySelectorAll(".hero-media-slide");
const nextBtn = document.querySelector(".arrow.next");
const prevBtn = document.querySelector(".arrow.prev");

let currentSlide = 0;
let heroInterval;

function updateSlides(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    mediaSlides.forEach(slide => slide.classList.remove("active"));

    slides[index].classList.add("active");
    mediaSlides[index].classList.add("active");
}

function heroNext() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides(currentSlide);
}

function heroPrev() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides(currentSlide);
}

function startHeroAutoplay() {
    heroInterval = setInterval(heroNext, 5000);
}

function resetHeroAutoplay() {
    clearInterval(heroInterval);
    startHeroAutoplay();
}

nextBtn.addEventListener("click", () => {
    heroNext();
    resetHeroAutoplay();
});

prevBtn.addEventListener("click", () => {
    heroPrev();
    resetHeroAutoplay();
});

// Swipe táctil
(() => {
    const heroContainer = document.querySelector(".hero-media-slide")?.closest("section")
        || document.querySelector(".hero-slide")?.closest("section")
        || document.body;

    let touchStartX = 0;
    let touchStartY = 0;

    heroContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    heroContainer.addEventListener("touchend", (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;

        // Solo swipe horizontal (más de 50px y más horizontal que vertical)
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) {
                heroNext();
            } else {
                heroPrev();
            }
            resetHeroAutoplay();
        }
    }, { passive: true });
})();

startHeroAutoplay();


const stackItems = document.querySelectorAll('.store-stack .stack-item');

let positions = ['stack-front', 'stack-middle', 'stack-back'];

setInterval(() => {
    positions.unshift(positions.pop());

    stackItems.forEach((item, index) => {
        item.classList.remove('stack-front', 'stack-middle', 'stack-back');
        item.classList.add(positions[index]);
    });
}, 4500);



const track = document.querySelector('.gallery-track');
const controls = document.querySelectorAll('.control-item');
const total = controls.length;

let current = 0;
let interval;

function goToSlide(index) {
    current = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    controls.forEach(btn => btn.classList.remove('active'));
    controls[index].classList.add('active');
}

function startAutoplay() {
    interval = setInterval(() => {
        current = (current + 1) % total;
        goToSlide(current);
    }, 9000);
}

controls.forEach(btn => {
    btn.addEventListener('click', () => {
        clearInterval(interval);
        goToSlide(Number(btn.dataset.index));
        startAutoplay();
    });
});

startAutoplay();



(() => {
    const testimonialTrack = document.querySelector('[data-testimonial-track]');
    const testimonialViews = document.querySelectorAll('.testimonial-view');
    const testimonialNextBtn = document.querySelector('[data-testimonial-next]');
    const testimonialPrevBtn = document.querySelector('[data-testimonial-prev]');

    let testimonialCurrentView = 0;
    let testimonialActiveIndex = 0;

    function updateTestimonialView() {
        // mover carrusel
        testimonialTrack.style.transform =
            `translateX(-${testimonialCurrentView * 100}%)`;

        // actualizar SOLO la vista activa
        testimonialViews.forEach((view, viewIndex) => {
            const cards = view.querySelectorAll('.testimonial-card');

            cards.forEach((card, cardIndex) => {
                if (viewIndex === testimonialCurrentView) {
                    card.classList.toggle('active', cardIndex === testimonialActiveIndex);
                    card.classList.toggle('inactive', cardIndex !== testimonialActiveIndex);
                }
            });
        });
    }

    // Flecha siguiente
    testimonialNextBtn.addEventListener('click', () => {
        if (testimonialActiveIndex === 0) {
            testimonialActiveIndex = 1;
        } else {
            testimonialActiveIndex = 0;
            testimonialCurrentView =
                (testimonialCurrentView + 1) % testimonialViews.length;
        }
        updateTestimonialView();
    });

    // Flecha anterior
    testimonialPrevBtn.addEventListener('click', () => {
        if (testimonialActiveIndex === 1) {
            testimonialActiveIndex = 0;
        } else {
            testimonialActiveIndex = 1;
            testimonialCurrentView =
                (testimonialCurrentView - 1 + testimonialViews.length) % testimonialViews.length;
        }
        updateTestimonialView();
    });

    // Click manual en cards
    testimonialViews.forEach((view, viewIndex) => {
        const cards = view.querySelectorAll('.testimonial-card');

        cards.forEach((card, cardIndex) => {
            card.addEventListener('click', () => {
                // solo permitir click en la vista visible
                if (viewIndex !== testimonialCurrentView) return;
                if (cardIndex === testimonialActiveIndex) return;

                testimonialActiveIndex = cardIndex;
                updateTestimonialView();
            });
        });
    });
})();


