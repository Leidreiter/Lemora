(function () {
    "use strict";

    /* ===== HAMBURGER MENU ===== */
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("nav");

    if (hamburger && nav) {
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            nav.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (nav.classList.contains("active") &&
                !nav.contains(e.target) &&
                !hamburger.contains(e.target)) {
                nav.classList.remove("active");
            }
        });

        const closeBtn = document.getElementById("close-menu");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                nav.classList.remove("active");
            });
        }
    }

    /* ===== HERO SLIDER ===== */
    const slides = document.querySelectorAll(".hero-slide");
    const mediaSlides = document.querySelectorAll(".hero-media-slide");
    const nextBtn = document.querySelector(".arrow.next");
    const prevBtn = document.querySelector(".arrow.prev");

    let currentSlide = 0;
    let heroInterval;

    function updateSlides(index) {
        if (index < 0 || index >= slides.length) return;
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

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            heroNext();
            resetHeroAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            heroPrev();
            resetHeroAutoplay();
        });
    }

    if (slides.length > 0 && nextBtn && prevBtn) {
        (() => {
            const heroContainer = document.querySelector(".hero-media-slide")?.closest("section")
                || document.querySelector(".hero-slide")?.closest("section");

            if (!heroContainer) return;

            let touchStartX = 0;
            let touchStartY = 0;

            heroContainer.addEventListener("touchstart", (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            heroContainer.addEventListener("touchend", (e) => {
                const dx = e.changedTouches[0].clientX - touchStartX;
                const dy = e.changedTouches[0].clientY - touchStartY;

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
    }

    /* ===== STORE STACK ===== */
    const stackItems = document.querySelectorAll('.store-stack .stack-item');
    let stackInterval;

    if (stackItems.length > 0) {
        let positions = ['stack-front', 'stack-middle', 'stack-back'];

        stackInterval = setInterval(() => {
            positions.unshift(positions.pop());

            stackItems.forEach((item, index) => {
                item.classList.remove('stack-front', 'stack-middle', 'stack-back');
                item.classList.add(positions[index]);
            });
        }, 4500);
    }

    /* ===== GALLERY ===== */
    const track = document.querySelector('.gallery-track');
    const controls = document.querySelectorAll('.control-item');
    const total = controls.length;

    let current = 0;
    let galleryInterval;

    if (track && total > 0) {
        function goToSlide(index) {
            current = index;
            track.style.transform = `translateX(-${index * 100}%)`;

            controls.forEach(btn => btn.classList.remove('active'));
            controls[index].classList.add('active');
        }

        function startAutoplay() {
            galleryInterval = setInterval(() => {
                current = (current + 1) % total;
                goToSlide(current);
            }, 9000);
        }

        controls.forEach(btn => {
            btn.addEventListener('click', () => {
                clearInterval(galleryInterval);
                goToSlide(Number(btn.dataset.index));
                startAutoplay();
            });
        });

        startAutoplay();
    }

    /* ===== TESTIMONIALS ===== */
    (() => {
        const testimonialTrack = document.querySelector('[data-testimonial-track]');
        const testimonialViews = document.querySelectorAll('.testimonial-view');
        const testimonialNextBtn = document.querySelector('[data-testimonial-next]');
        const testimonialPrevBtn = document.querySelector('[data-testimonial-prev]');

        if (!testimonialTrack || testimonialViews.length === 0 || !testimonialNextBtn || !testimonialPrevBtn) return;

        let testimonialCurrentView = 0;
        let testimonialActiveIndex = 0;

        function updateTestimonialView() {
            testimonialTrack.style.transform = `translateX(-${testimonialCurrentView * 100}%)`;

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

        testimonialNextBtn.addEventListener('click', () => {
            if (testimonialActiveIndex === 0) {
                testimonialActiveIndex = 1;
            } else {
                testimonialActiveIndex = 0;
                testimonialCurrentView = (testimonialCurrentView + 1) % testimonialViews.length;
            }
            updateTestimonialView();
        });

        testimonialPrevBtn.addEventListener('click', () => {
            if (testimonialActiveIndex === 1) {
                testimonialActiveIndex = 0;
            } else {
                testimonialActiveIndex = 1;
                testimonialCurrentView = (testimonialCurrentView - 1 + testimonialViews.length) % testimonialViews.length;
            }
            updateTestimonialView();
        });

        testimonialViews.forEach((view, viewIndex) => {
            const cards = view.querySelectorAll('.testimonial-card');
            cards.forEach((card, cardIndex) => {
                card.addEventListener('click', () => {
                    if (viewIndex !== testimonialCurrentView) return;
                    if (cardIndex === testimonialActiveIndex) return;
                    testimonialActiveIndex = cardIndex;
                    updateTestimonialView();
                });
            });
        });
    })();

    /* ===== FADE-IN ON SCROLL ===== */
    const fadeCards = document.querySelectorAll('.ecosistema-card, .planes-card');
    if ('IntersectionObserver' in window && fadeCards.length) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        fadeCards.forEach((card) => fadeObserver.observe(card));
    } else {
        fadeCards.forEach((card) => card.classList.add('visible'));
    }

    /* ===== CLEANUP ===== */
    window.addEventListener('beforeunload', function () {
        if (heroInterval) clearInterval(heroInterval);
        if (stackInterval) clearInterval(stackInterval);
        if (galleryInterval) clearInterval(galleryInterval);
    });

})();


