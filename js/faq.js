(function () {
    "use strict";

    const questions = document.querySelectorAll('.faq-question');
    if (!questions.length) return;

    questions.forEach((btn, index) => {
        const answer = btn.nextElementSibling;
        if (!answer) return;

        const id = 'faq-answer-' + index;
        answer.id = id;
        btn.setAttribute('aria-controls', id);
        btn.setAttribute('aria-expanded', 'false');

        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            if (!item) return;

            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('open');
                const q = i.querySelector('.faq-question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
})();
