function goBack() {
    if (window.history.length > 1) {
        history.back();
    } else {
        window.location.href = 'index.html';
    }
}

function isHomePage() {
    const path = window.location.pathname;
    return path.endsWith('/') ||
        path.endsWith('/index.html') ||
        path.endsWith('index.html') ||
        (!path.includes('.html') && path.split('/').filter(Boolean).length <= 1);
}

function initBackNav() {
    if (isHomePage()) return;

    const nav = document.querySelector('nav');
    const logo = nav && nav.querySelector('.logo');
    if (!nav || !logo) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-nav';
    btn.setAttribute('aria-label', 'Go back');
    btn.innerHTML = '<svg class="back-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg>';
    btn.addEventListener('click', goBack);

    let navLeft = nav.querySelector('.nav-left');
    if (!navLeft) {
        navLeft = document.createElement('div');
        navLeft.className = 'nav-left';
        nav.insertBefore(navLeft, logo);
        navLeft.appendChild(logo);
    }

    navLeft.insertBefore(btn, navLeft.firstChild);
}

// Swipe right on a touch screen to go back, like iOS: a back arrow follows the finger
// from the left edge and the page goes back once it is pulled far enough.
const SWIPE_BACK_DISTANCE = 90;

function isInHorizontalScroller(el) {
    for (; el && el !== document.body; el = el.parentElement) {
        const overflowX = getComputedStyle(el).overflowX;
        if ((overflowX === 'auto' || overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 2) return true;
    }
    return false;
}

function initSwipeBack() {
    if (isHomePage() || !('ontouchstart' in window)) return;

    const hint = document.createElement('div');
    hint.className = 'swipe-back-hint';
    hint.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg>';
    document.body.appendChild(hint);

    let start = null;
    let tracking = false;
    let dx = 0;

    const reset = () => {
        start = null;
        tracking = false;
        dx = 0;
        hint.classList.remove('visible', 'ready');
        hint.style.transform = '';
    };

    document.addEventListener('touchstart', e => {
        reset();
        if (e.touches.length !== 1) return;
        // popups, the cart and the photo viewer keep their own swipes
        if (document.querySelector('.modal-overlay.active, .photo-viewer.active, .cart-sidebar.active')) return;
        const target = e.target;
        if (target.closest('input, textarea, select') || isInHorizontalScroller(target)) return;
        start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    document.addEventListener('touchmove', e => {
        if (!start) return;
        dx = e.touches[0].clientX - start.x;
        const dy = e.touches[0].clientY - start.y;
        if (!tracking) {
            if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return;
            // only a clearly sideways pull to the right counts; anything else is a scroll
            if (dx <= 0 || Math.abs(dx) < Math.abs(dy) * 1.6) { start = null; return; }
            tracking = true;
            hint.classList.add('visible');
        }
        const pull = Math.min(dx, SWIPE_BACK_DISTANCE * 1.4);
        hint.style.transform = `translate(${pull * 0.6}px, -50%) scale(${0.7 + 0.3 * Math.min(pull / SWIPE_BACK_DISTANCE, 1)})`;
        hint.classList.toggle('ready', dx >= SWIPE_BACK_DISTANCE);
    }, { passive: true });

    document.addEventListener('touchend', () => {
        const go = tracking && dx >= SWIPE_BACK_DISTANCE;
        reset();
        if (go) goBack();
    });
    document.addEventListener('touchcancel', reset);
}

document.addEventListener('DOMContentLoaded', initBackNav);
document.addEventListener('DOMContentLoaded', initSwipeBack);
