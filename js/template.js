/**
 * template.js
 * Header y Footer reutilizables para todas las páginas de Lemora.
 * 
 * Uso:
 *   <div id="site-header"></div>
 *   <div id="site-header" data-cta-text="Texto" data-cta-link="https://..."></div>
 *   <div id="site-footer"></div>
 * 
 * Incluir este script ANTES de script.js:
 *   <script src="js/template.js"></script>
 *   <script src="js/script.js"></script>
 */

(function () {

    // ===== DEFAULT VALUES =====
    const DEFAULT_CTA_TEXT = "Iniciar prueba gratuita";
    const DEFAULT_CTA_LINK = "https://wa.me/543515957014?text=Hola,%20me%20interesa%20iniciar%20una%20prueba%20gratuita%20para%20mi%20negocio...";

    // ===== HEADER =====
    function renderHeader() {
        const el = document.getElementById("site-header");
        if (!el) return;

        const ctaText = el.getAttribute("data-cta-text") || DEFAULT_CTA_TEXT;
        const ctaLink = el.getAttribute("data-cta-link") || DEFAULT_CTA_LINK;

        el.outerHTML = `
        <header class="header">
            <div class="redes">
                <div class="container-redes">
                    <a href="https://instagram.com/soymarcusdev" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://tiktok.com/@soymarcusdev" target="_blank" aria-label="TikTok" rel="noopener noreferrer">
                        <i class="fa-brands fa-tiktok"></i>
                    </a>
                    <a href="https://youtube.com/@soymarcusdev" target="_blank" aria-label="YouTube" rel="noopener noreferrer">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                </div>
            </div>

            <div class="header-inner container-header">
                <a href="/">
                    <img src="img/logo.svg" alt="logo Lemora" class="logo">
                </a>

                <nav class="nav" id="nav">
                    <button class="close-menu" id="close-menu">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <ul class="nav-list">
                        <li><a href="index.html#problemas">Problemas</a></li>
                        <li><a href="index.html#solucion">Solución</a></li>
                        <li><a href="index.html#ecosistema">¿Qué ofrecemos?</a></li>
                        <li><a href="index.html#precios">Precios</a></li>
                        <li><a href="index.html#testimonios">Testimonios</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="index.html#contactar">Contactar</a></li>
                    </ul>
                </nav>

                <div class="nav-actions">
                    <a href="${ctaLink}" target="_blank" class="btn-primary" rel="noopener noreferrer">
                        ${ctaText}
                    </a>
                    <button class="hamburger" id="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>`;
    }

    // ===== FOOTER =====
    function renderFooter() {
        const el = document.getElementById("site-footer");
        if (!el) return;

        el.outerHTML = `
        <footer class="site-footer">
            <div class="footer-container">
                <div class="footer-left">
                    <p class="copyright">
                        © 2026, Todos los derechos reservados. Lemora es una marca hecha con ♥️ por
                        <a href="https://soymarcus.dev" target="_blank">
                            <img src="img/devBy.svg" alt="logo soymarcusdev" class="footer-logo">
                        </a>
                    </p>
                </div>
                <div class="footer-right">
                    <a href="https://instagram.com/soymarcusdev" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://tiktok.com/@soymarcusdev" target="_blank" aria-label="TikTok" rel="noopener noreferrer">
                        <i class="fa-brands fa-tiktok"></i>
                    </a>
                    <a href="https://youtube.com/@soymarcusdev" target="_blank" aria-label="YouTube" rel="noopener noreferrer">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                </div>
            </div>
        </footer>`;
    }

    // ===== INIT =====
    renderHeader();
    renderFooter();

})();
