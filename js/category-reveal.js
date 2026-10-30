// Homepage category cards: staggered GSAP reveal with a gold border trace.
// Without GSAP (CDN blocked) or with reduced motion, the CSS .visible reveal in index.html is used instead.
function initCategoryReveal() {
    const grid = document.querySelector('.categories-grid');
    if (!grid || !window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ nullTargetWarn: false });
    grid.classList.add('gsap-ready');

    const cards = gsap.utils.toArray('.categories-card', grid);
    cards.forEach(card => {
        card.insertAdjacentHTML('beforeend', `
            <span class="card-trace" aria-hidden="true">
                <span class="trace-top"></span><span class="trace-right"></span>
                <span class="trace-bottom"></span><span class="trace-left"></span>
            </span>
        `);
        card.style.transitionDelay = '0s';
    });

    gsap.set(cards, { opacity: 0, y: 60, clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(grid.querySelectorAll('.categories-image'), { scale: 1.25 });
    // Settle to each breakpoint's own letter-spacing; the count only animates where CSS shows it (touch layout).
    grid.querySelectorAll('.categories-name').forEach(el => { el.dataset.spacing = getComputedStyle(el).letterSpacing; });
    grid.querySelectorAll('.categories-count').forEach(el => { el.dataset.shown = getComputedStyle(el).opacity !== '0'; });
    gsap.set(grid.querySelectorAll('.categories-name'), { opacity: 0, letterSpacing: '10px' });
    gsap.set(grid.querySelectorAll('.categories-count[data-shown="true"]'), { opacity: 0, y: 8 });
    gsap.set(grid.querySelectorAll('.trace-top, .trace-bottom'), { scaleX: 0 });
    gsap.set(grid.querySelectorAll('.trace-left, .trace-right'), { scaleY: 0 });

    // One batch per visible row, so each row reveals left to right as it scrolls in.
    ScrollTrigger.batch(cards, {
        start: 'top 88%',
        once: true,
        onEnter: batch => batch.forEach((card, i) => revealCategoryCard(card, i * 0.15))
    });
}

function revealCategoryCard(card, delay) {
    const q = gsap.utils.selector(card);
    const tl = gsap.timeline({
        delay,
        defaults: { ease: 'power3.out' },
        onComplete: () => {
            card.classList.add('visible', 'is-revealed');
            gsap.set(card, { clearProps: 'transform,opacity,clipPath' });
            gsap.set(q('.categories-image, .categories-name, .categories-count, .card-trace'), { clearProps: 'all' });
        }
    });

    tl.to(card, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1 })
      .to(q('.categories-image'), { scale: 1, duration: 1.4 }, 0)
      // gold line runs around the frame: top → right → bottom → left
      .to(q('.trace-top'), { scaleX: 1, duration: 0.35, ease: 'power1.inOut' }, 0.45)
      .to(q('.trace-right'), { scaleY: 1, duration: 0.35, ease: 'power1.inOut' }, '>')
      .to(q('.trace-bottom'), { scaleX: 1, duration: 0.35, ease: 'power1.inOut' }, '>')
      .to(q('.trace-left'), { scaleY: 1, duration: 0.35, ease: 'power1.inOut' }, '>')
      .to(q('.card-trace'), { opacity: 0.35, duration: 0.8, ease: 'power2.out' }, '>')
      .to(q('.categories-name'), { opacity: 1, letterSpacing: q('.categories-name')[0].dataset.spacing, duration: 1 }, 0.6)
      .to(q('.categories-count[data-shown="true"]'), { opacity: 1, y: 0, duration: 0.6 }, 1);
}

initCategoryReveal();
