/**
 * blog.js
 * Maneja la visualización dinámica de las entradas del blog de Lemora.
 */

const posts = [
    {
        slug: 'que-es-un-dominio',
        title: '¿Qué es un dominio y por qué no está incluido en mi plan?',
        excerpt: 'Entendé de forma simple qué es un dominio, cuánto cuesta realmente y por qué se adquiere por separado de tu tienda online.',
        date: '16 de Abril, 2026',
        image: 'img/blog/dominios.png',
        content: `
            <p>¿Vas a crear tu tienda online y viste que el dominio no está incluido? Quizás pensaste: "¿Por qué no viene incluido?", "¿Me están cobrando de más?" o "¿No debería estar dentro del plan?".</p>
            <p>Tranquilo, porque en este artículo te voy a explicar de forma simple qué es un dominio, cuánto cuesta realmente y por qué se adquiere por separado. Así vas a entender exactamente qué estás pagando y por qué.</p>

            <h3>¿Qué es un dominio? Vamos a lo básico.</h3>
            <p>Un dominio es simplemente el nombre de tu página web. Por ejemplo: <em>mitienda.com</em>, <em>zapatillasjuan.com.ar</em> o <em>dulcessabores.com</em>. Es lo que las personas escriben en Google o en el navegador para encontrarte.</p>
            <div class="id-intro-text">
                <p>💡 <strong>Pensalo así:</strong><br>
                Tu tienda online = el local<br>
                El dominio = la dirección del local</p>
            </div>
            <p>Sin dominio, la gente no sabe cómo llegar a tu tienda. Por eso es algo fundamental.</p>

            <h3>¿Cuánto cuesta un dominio?</h3>
            <p>Acá viene algo importante que mucha gente no sabe: <strong>No todos los dominios cuestan lo mismo.</strong> El precio puede variar bastante dependiendo de la extensión (.com, .com.ar, .net, etc.), qué tan corto o popular es el nombre y la disponibilidad en el mercado.</p>

            <h3>¿Por qué el dominio se paga aparte?</h3>
            <p>En Lemora el dominio se paga aparte por una razón muy simple y transparente: <strong>Porque el costo del dominio es variable.</strong> No hay un precio fijo universal. Si lo incluyéramos en el plan, tendríamos que subir el precio de todos los planes para cubrir gastos o limitar qué dominios podés elegir.</p>
            <p>Por eso elegimos el modelo más justo: vos pagás exactamente lo que cuesta tu dominio, sin sobreprecios escondidos y con total libertad.</p>

            <h3>¿Qué pasa si no compro un dominio propio?</h3>
            <p>Fácil, nosotros subiremos tu web con nuestra extensión: <strong>nombrenegocio.lemora.lat</strong>. Este nombre está incluido en el costo de tu plan, no necesitás pagarlo aparte ni gestionarlo anualmente.</p>

            <h3>¿Entonces no puedo tener un dominio personalizado?</h3>
            <p>Por supuesto que sí, y nosotros podemos ayudarte a elegir el correcto, configurarlo para tu web y recordarte su fecha de renovación para que tu tienda no pierda ni un minuto de ventas.</p>
        `
    }
];

function renderBlog() {
    const container = document.getElementById('blog-container');
    const params = new URLSearchParams(window.location.search);
    const postSlug = params.get('post');

    if (postSlug) {
        const post = posts.find(p => p.slug === postSlug);
        if (post) {
            document.title = `${post.title} | Lemora Blog`;
            container.innerHTML = `
                <section class="page-hero">
                    <div class="container-hero">
                        <span class="badge">Artículo</span>
                        <h1>${post.title}</h1>
                        <p>${post.excerpt}</p>
                    </div>
                </section>
                <section class="id-intro-section">
                    <div class="container">
                        <div class="id-intro-grid">
                            <div class="id-intro-text">
                                ${post.content}
                                <div style="margin-top: 50px;">
                                    <a href="blog.html" class="btn-primary" style="background: var(--primary-dark); color: white; border: none;">← Volver al blog</a>
                                </div>
                            </div>
                            <div class="id-intro-image">
                                <img src="${post.image}" alt="${post.title}">
                            </div>
                        </div>
                    </div>
                </section>
            `;
            window.scrollTo(0, 0);
            return;
        }
    }

    // Default: Listado de posts
    container.innerHTML = `
        <section class="page-hero">
            <h1>Blog de <em>Lemora</em></h1>
            <p>Lemora responde. Aquí encontrarás respuesta a dudas comúnes y novedades sobre actualizaciones y soporte.</p>
        </section>
        <section class="id-process-section" style="background: #fff;">
            <div class="container">
                <div class="id-process-grid">
                    ${posts.map(post => `
                        <article class="id-process-step" onclick="window.location.href='?post=${post.slug}'" style="cursor:pointer">
                            <span class="id-step-number">${post.date.split(' ')[0]}</span>
                            <h3>${post.title}</h3>
                            <p>${post.excerpt}</p>
                            <a href="?post=${post.slug}" style="color: var(--primary-color); text-decoration: none; font-weight: 500; margin-top: auto;">Leer más →</a>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

document.addEventListener('DOMContentLoaded', renderBlog);
