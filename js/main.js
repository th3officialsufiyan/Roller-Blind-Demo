/* Demo product data */
const products = [
    { id: 1, title: 'Classic Blockout', price: 1999, img: 'assets/images/product1.jpg', desc: 'Full blockout fabric for bedrooms — available in neutral and dark tones.' },
    { id: 2, title: 'Solar Screen', price: 2999, img: 'assets/images/product2.jpg', desc: 'Keeps glare down while preserving the outside view.' },
    { id: 3, title: 'Linen Weave', price: 3299, img: 'assets/images/product3.jpg', desc: 'Textured linen-look fabric for a warm, modern feel.' },
    { id: 4, title: 'Motorised Premium', price: 9999, img: 'assets/images/product4.jpg', desc: 'Remote and app-controlled roller blinds — perfect for high windows.' }
];

const galleryData = [
    { id: 1, title: 'Bedroom', img: 'assets/images/gallery1.jpg', desc: 'Soft linen textures for restful sleep.' },
    { id: 2, title: 'Office', img: 'assets/images/gallery2.jpg', desc: 'Solar screen for glare-free work.' },
    { id: 3, title: 'Kitchen', img: 'assets/images/gallery3.jpg', desc: 'Durable, easy-clean fabrics.' },
    { id: 4, title: 'Bathroom', img: 'assets/images/gallery4.jpg', desc: 'Moisture resistant choices for wet areas.' }
];

const grid = document.getElementById('productGrid');
const galleryGrid = document.getElementById('galleryGrid');
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const closeModal = document.getElementById('closeModal');
const header = document.querySelector('header');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(function createLoader() {

    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.innerHTML = `
      <div class="loader-card" role="status" aria-live="polite" aria-label="Loading">
        <div style="display:flex;gap:6px;align-items:center">
          <span class="loader-dot"></span>
          <span class="loader-dot"></span>
          <span class="loader-dot"></span>
        </div>
        <div class="loader-text">SunShade</div>
      </div>
    `;
    document.documentElement.appendChild(loader);

    if (reduceMotion) {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 80);
    } else {

        window.addEventListener('load', () => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 420);
        });

        setTimeout(() => {
            if (document.getElementById('pageLoader')) {
                document.getElementById('pageLoader').classList.add('hidden');
                setTimeout(() => {
                    const el = document.getElementById('pageLoader');
                    if (el) el.remove();
                }, 420);
            }
        }, 3500);
    }
})();


function renderProducts() {
    if (!grid) return;
    grid.innerHTML = '';
    products.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = 'product';
        card.tabIndex = 0;

        card.innerHTML = `
      <img data-src="${p.img}" alt="${p.title}" loading="lazy">
      <h3>${p.title}</h3>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="price">₹${p.price.toLocaleString()}</div>
        <div style="font-size:13px;color:var(--muted)">Free measure</div>
      </div>`;

        card.addEventListener('click', () => openProductModal(p));
        card.addEventListener('keydown', (e) => { if (e.key === 'Enter') openProductModal(p) });
        grid.appendChild(card);
    });


    const imgs = grid.querySelectorAll('img[data-src]');
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(ent => {
            if (ent.isIntersecting) {
                const img = ent.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                obs.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });
    imgs.forEach(img => io.observe(img));
}

function renderGallery() {
    if (!galleryGrid || typeof galleryData === 'undefined') return;
    galleryGrid.innerHTML = '';
    galleryData.forEach(item => {
        const t = document.createElement('button');
        t.className = 'thumb';
        t.setAttribute('aria-label', item.title);
        t.innerHTML = `
            <img data-src="${item.img}" alt="${item.title}" loading="lazy">
            <div class="name">${item.title}</div>
        `;
        t.addEventListener('click', () => openGalleryModal(item));
        t.addEventListener('keydown', (e) => { if (e.key === 'Enter') openGalleryModal(item) });
        galleryGrid.appendChild(t);
    });

    const imgs = galleryGrid.querySelectorAll('img[data-src]');
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(ent => {
            if (ent.isIntersecting) {
                const img = ent.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                obs.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });
    imgs.forEach(img => io.observe(img));
}

function openProductModal(product) {
    if (!modal) return;
    modalImg.src = product.img;
    modalImg.alt = product.title;
    modalTitle.textContent = product.title;
    modalDesc.textContent = product.desc || '';
    modalPrice.textContent = '₹' + product.price.toLocaleString();
    modalPrice.style.display = 'block';

    document.getElementById('bookMeasure').style.display = '';
    document.getElementById('addQuote').style.display = '';

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (!reduceMotion) {
        animateNumber(modalPrice, product.price, 700);
    }

    setTimeout(() => {
        const closeBtn = document.getElementById('closeModal');
        if (closeBtn) closeBtn.focus();
    }, 250);
}

function openGalleryModal(item) {
    if (!modal) return;
    modalImg.src = item.img;
    modalImg.alt = item.title;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.desc || '';
    modalPrice.style.display = 'none';

    document.getElementById('bookMeasure').style.display = 'none';
    document.getElementById('addQuote').style.display = 'none';

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';


    setTimeout(() => {
        const closeBtn = document.getElementById('closeModal');
        if (closeBtn) closeBtn.focus();
    }, 250);
}

function close() {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}


function animateNumber(el, target, duration = 800) {
    const start = 0;
    const startTime = performance.now();
    const prefix = '₹';
    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easeOutCubic(progress);
        const value = Math.round(start + (target - start) * eased);
        el.textContent = prefix + value.toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }


if (closeModal) closeModal.addEventListener('click', close);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });


const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const msg = document.getElementById('formMsg');
        if (!name || !email || !phone) {
            msg.textContent = 'Please fill name, email and phone.';
            msg.style.color = '';
            return;
        }
        msg.style.color = 'green';
        msg.textContent = `Thanks ${name.split(' ')[0]}! We received your request. We will call you to confirm details.`;

        if (!reduceMotion) {
            msg.animate([{ transform: 'scale(.98)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1)' }], { duration: 700, easing: 'ease-out' });
        }
        contactForm.reset();
    });
}


function setupScrollReveal() {
    if (reduceMotion) {

        document.querySelectorAll('.hero-card, .section, .product, .thumb').forEach(el => { el.classList.add('revealed'); el.style.opacity = 1; el.style.transform = 'none'; });
        return;
    }
    const opts = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            if (el.classList.contains('product')) {

                const siblings = Array.from(el.parentNode.children);
                const index = siblings.indexOf(el);
                setTimeout(() => el.classList.add('revealed'), index * 80);
            } else {
                el.classList.add('revealed');
            }
            obs.unobserve(el);
        });
    }, opts);

    document.querySelectorAll('.hero-card, .section, .product, .thumb').forEach(el => observer.observe(el));
}

function setupHeroParallax() {
    if (reduceMotion) return;
    const heroImg = document.querySelector('.hero-side img');
    if (!heroImg) return;

    heroImg.addEventListener('mouseenter', () => heroImg.classList.add('floating'));
    heroImg.addEventListener('mouseleave', () => heroImg.classList.remove('floating'));

    const wrap = document.querySelector('.hero-side');
    if (!wrap) return;
    wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        heroImg.style.transform = `translate(${x * 8}px, ${y * 6}px) scale(1.01)`;
    });
    wrap.addEventListener('mouseleave', () => {
        heroImg.style.transform = '';
    });
}


function trapModalFocus() {
    if (!modal) return;
    modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first) return;
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });
}

function setupStickyHeader() {
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;
    let fixed = false;
    const enableAfter = 120;

    function onScroll() {
        const y = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (y > enableAfter && !fixed) {
                    header.classList.add('header-fixed');
                    document.body.classList.add('has-fixed-header');
                    fixed = true;
                } else if (y <= enableAfter && fixed) {
                    header.classList.remove('header-fixed', 'visible', 'header-hidden');
                    document.body.classList.remove('has-fixed-header');
                    fixed = false;
                }

                if (fixed) {

                    if (y < lastY) {

                        header.classList.add('visible');
                        header.classList.remove('header-hidden');
                    } else if (y > lastY + 4) {

                        header.classList.remove('visible');
                        header.classList.add('header-hidden');
                    }
                }
                lastY = y;
                ticking = false;
            });
            ticking = true;
        }
    }


    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });


    window.addEventListener('resize', () => {
        if (window.innerWidth <= 480) {

            header.classList.add('visible');
        }
    });
}

renderProducts();
renderGallery();
setupScrollReveal();
setupHeroParallax();
trapModalFocus();
setupStickyHeader();

