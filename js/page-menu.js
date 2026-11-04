// Mobile hamburger menu for the shop pages (the homepage has its own in index.html):
// About, a Categories drill-down, Contact and the FR/EN switch, in the same dropdown style.
const PAGE_MENU_CATEGORIES = [
    ['necklaces.html', 'catNecklaces'],
    ['rings.html', 'catRings'],
    ['earrings.html', 'catEarrings'],
    ['bracelets.html', 'catBracelets'],
    ['sets.html', 'catSets'],
];

function setPageMenu(open) {
    const menu = document.getElementById('pageMenu');
    const btn = document.querySelector('.page-menu-btn');
    if (!menu || !btn) return;
    menu.classList.toggle('active', open);
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', open);
    if (!open) setPageMenuCategories(false);
}

function setPageMenuCategories(open) {
    const menu = document.getElementById('pageMenu');
    menu.classList.toggle('submenu-open', open);
    menu.querySelector('.page-menu-toggle').setAttribute('aria-expanded', open);
}

function initPageMenu() {
    if (isHomePage()) return;
    const nav = document.querySelector('nav');
    const navLeft = nav && nav.querySelector('.nav-left');
    if (!navLeft) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'page-menu-btn';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'pageMenu');
    btn.innerHTML = '<span class="hamburger"></span>';
    navLeft.insertBefore(btn, navLeft.firstChild);

    const here = location.pathname.split('/').pop();
    const menu = document.createElement('ul');
    menu.className = 'page-menu';
    menu.id = 'pageMenu';
    menu.innerHTML = `
        <li class="page-menu-item"><a href="index.html#about" data-i18n="navAbout">${t('navAbout')}</a></li>
        <li>
            <button type="button" class="page-menu-toggle" aria-expanded="false">
                <svg class="page-menu-back" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg>
                <span data-i18n="navCategories">${t('navCategories')}</span>
                <svg class="page-menu-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 5.5 16 12l-6.5 6.5"/></svg>
            </button>
            <div class="page-submenu">
                <div class="page-submenu-inner">
                    ${PAGE_MENU_CATEGORIES.map(([href, key]) =>
                        `<a href="${href}"${href === here ? ' class="current" aria-current="page"' : ''} data-i18n="${key}">${t(key)}</a>`).join('')}
                    <a href="explore.html" class="submenu-all${here === 'explore.html' ? ' current' : ''}" data-i18n="shopAll">${t('shopAll')}</a>
                </div>
            </div>
        </li>
        <li class="page-menu-item"><a href="index.html#contact" data-i18n="navContact">${t('navContact')}</a></li>
        <li class="page-menu-item"><button type="button" class="lang-toggle">${currentLang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}</button></li>
    `;
    nav.after(menu);

    btn.addEventListener('click', () => setPageMenu(!menu.classList.contains('active')));
    menu.querySelector('.page-menu-toggle').addEventListener('click', () =>
        setPageMenuCategories(!menu.classList.contains('submenu-open')));
    document.addEventListener('click', e => {
        if (menu.classList.contains('active') && !menu.contains(e.target) && !e.target.closest('.page-menu-btn')) {
            setPageMenu(false);
        }
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') setPageMenu(false);
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) setPageMenu(false);
    });
}

document.addEventListener('DOMContentLoaded', initPageMenu);
