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
    btn.innerHTML = '<span class="back-nav-arrow" aria-hidden="true">←</span><span class="back-nav-label">Back</span>';
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

document.addEventListener('DOMContentLoaded', initBackNav);
