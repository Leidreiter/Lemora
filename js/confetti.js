(function () {
    "use strict";

    const container = document.getElementById('confettiDots');
    if (!container) return;

    const colors = ['#02c39a', '#ffffff', '#f0f3bd', '#00a896', '#a8f5e0'];

    for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = Math.random() * 100 + 'vw';
        dot.style.width = dot.style.height = (Math.random() * 6 + 4) + 'px';
        dot.style.background = colors[Math.floor(Math.random() * colors.length)];
        dot.style.animationDuration = (Math.random() * 12 + 10) + 's';
        dot.style.animationDelay = (Math.random() * 8) + 's';
        container.appendChild(dot);
    }
})();
