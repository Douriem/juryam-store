function escapeAttr(value) {
    return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

// Shared product card markup (category pages, homepage carousel, Explore page).
// Images below the first row load lazily.
function renderProductCard(product, { eager = false, delay = 0 } = {}) {
    const soldOut = isSoldOut(product);
    const open = soldOut ? '' : ` onclick="openAddToCartModal('${product.id}')"`;
    const badge = soldOut
        ? `<div class="product-badge" data-i18n="outOfStock">${t('outOfStock')}</div>`
        : product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
    return `
        <div class="product-card${soldOut ? ' sold-out' : ''}" style="transition-delay: ${delay}s;"${open}>
            <div class="product-image-container">
                ${badge}
                ${morePhotosHint(product)}
                <img src="${escapeAttr(product.image)}" alt="${escapeAttr(product.name)}" class="product-image" loading="${eager ? 'eager' : 'lazy'}" decoding="async">
                ${soldOut ? '' : `<button class="quick-add" onclick="event.stopPropagation(); openAddToCartModal('${product.id}')" data-i18n="addToCart">
                    ${t('addToCart')}
                </button>`}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${priceLabel(product)}${renderSwatches(product)}</p>
            </div>
        </div>
    `;
}

// A small light icon on the photo when there are more photos to swipe through
function morePhotosHint(product) {
    const n = typeof photoViewerSlides === 'function' ? photoViewerSlides(product).length : 1;
    if (n < 2) return '';
    return `<span class="more-photos" aria-label="${n} photos"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="13" height="13" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/></svg>${n}</span>`;
}

// Products whose styles are priced differently show their lowest price
function priceLabel(product) {
    const prices = (product.variants || []).map(v => v.price).filter(Boolean);
    const lowest = prices.length ? Math.min(...prices) : product.price;
    return prices.length && Math.max(...prices) !== lowest
        ? `<span data-i18n="fromPrice">${t('fromPrice')}</span> ${lowest} DA`
        : `${product.price} DA`;
}

// "Offer: 2 skinny bracelets = 700 DA · 3 python bangles = 1800 DA"
function bundleOffers(product) {
    if (!product.bundles) return '';
    const offers = [];
    for (const tier in product.bundles) {
        for (const size in product.bundles[tier]) {
            offers.push(`${size} ${t('tier_' + tier)} = ${product.bundles[tier][size]} DA`);
        }
    }
    return `${t('offer')} ${offers.join(' · ')}`;
}

function renderSwatches(product) {
    const colours = (product.variants || []).filter(v => v.swatch);
    if (!colours.length) return '';
    return `<span class="product-swatches" title="${colours.length} colours">${colours.map(v =>
        `<span class="swatch${v.soldOut ? ' sold' : ''}" style="background:${v.swatch}" aria-label="${escapeAttr(v.label)}${v.soldOut ? ' (sold out)' : ''}"></span>`).join('')}</span>`;
}

function renderSkeletonCard() {
    return `
        <div class="product-card product-skeleton" aria-hidden="true">
            <div class="product-image-container skeleton-block"></div>
            <div class="product-info">
                <div class="product-name"><span class="skeleton-line"></span><span class="skeleton-line short"></span></div>
                <p class="product-price"><span class="skeleton-line price"></span></p>
            </div>
        </div>
    `;
}

function renderGridMessage(title, text, actionLabel, action) {
    return `
        <div class="grid-message" role="status">
            <p class="grid-message-title">${title}</p>
            ${text ? `<p class="grid-message-text">${text}</p>` : ''}
            ${actionLabel ? `<button type="button" class="btn-retry" onclick="${action}">${actionLabel}</button>` : ''}
        </div>
    `;
}

function revealCards(container) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
        container.querySelectorAll('.product-card:not(.visible):not(.product-skeleton)')
            .forEach(card => card.classList.add('visible'));
    }));
}

// Renders skeletons only while nothing is available yet, then calls render().
// Shows an error with a retry button when the fetch fails.
async function withProducts(container, skeletonCount, render, retryAction) {
    if (!hasProducts()) {
        container.setAttribute('aria-busy', 'true');
        container.innerHTML = Array.from({ length: skeletonCount }, renderSkeletonCard).join('');
    }

    await productsReady;
    container.removeAttribute('aria-busy');

    if (!hasProducts() && productsError) {
        container.innerHTML = renderGridMessage(
            t('loadError'),
            t('loadErrorSub'),
            t('tryAgain'),
            retryAction
        );
        return;
    }
    render();
}

// Style pages (Bohemian, Alt/Goth) first show which kinds of pieces they have;
// picking one (#necklaces, #rings…) lists those pieces.
const STYLE_PAGES = ['boho', 'goth'];
const CATEGORY_ORDER = ['necklaces', 'earrings', 'rings', 'bracelets', 'sets', 'piercings', 'hair', 'tattoos'];
const CATEGORY_LABEL_KEYS = {
    necklaces: 'catNecklaces', rings: 'catRings', earrings: 'catEarrings', bracelets: 'catBracelets',
    sets: 'catSets', piercings: 'catPiercings', hair: 'catHair', tattoos: 'catTattoos'
};

function sortForCategory(category, products) {
    // Necklaces: random, bohemian pieces first
    if (category === 'necklaces') return sortRandom(products, p => (p.alsoIn || []).includes('boho'), 3);
    return sortNewestFirst(products);
}

function renderProductList(grid, products) {
    if (products.length === 0) {
        grid.innerHTML = renderGridMessage(t('noProducts'), t('checkBack'));
        return;
    }
    grid.innerHTML = products.map((product, index) =>
        renderProductCard(product, { eager: index < 4, delay: Math.min(index, 8) * 0.1 })
    ).join('');
    revealCards(grid);
}

function renderStyleChooser(grid, style) {
    const pieces = getProductsByCategory(style);
    const groups = CATEGORY_ORDER
        .map(cat => ({ cat, items: pieces.filter(p => p.category === cat) }))
        .filter(g => g.items.length);
    if (!groups.length) {
        grid.innerHTML = renderGridMessage(t('noProducts'), t('checkBack'));
        return;
    }
    grid.innerHTML = groups.map((g, index) => {
        const cover = sortRandom(g.items, null, 11)[0];
        const count = g.items.length;
        return `
            <a class="style-cat-card" href="#${g.cat}" style="--delay:${Math.min(index, 8) * 0.08}s">
                <img src="${cover.image}" alt="" loading="${index < 4 ? 'eager' : 'lazy'}">
                <span class="style-cat-overlay">
                    <span class="style-cat-name">${t(CATEGORY_LABEL_KEYS[g.cat])}</span>
                    <span class="style-cat-count">${count} ${t(count === 1 ? 'piece' : 'pieces')}</span>
                </span>
            </a>`;
    }).join('');
}

function renderStylePage(grid, style) {
    const cat = decodeURIComponent(location.hash.slice(1));
    const back = document.getElementById('styleBack');
    if (cat && CATEGORY_LABEL_KEYS[cat]) {
        grid.classList.remove('style-chooser');
        const items = getProductsByCategory(style).filter(p => p.category === cat);
        if (back) { back.hidden = false; back.querySelector('span').textContent = t(CATEGORY_LABEL_KEYS[cat]); }
        renderProductList(grid, sortForCategory(cat, items));
    } else {
        grid.classList.add('style-chooser');
        if (back) back.hidden = true;
        renderStyleChooser(grid, style);
    }
}

async function loadProducts(category) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    await withProducts(grid, 6, () => {
        if (STYLE_PAGES.includes(category)) {
            if (!grid.dataset.styleBound) {
                grid.dataset.styleBound = '1';
                window.addEventListener('hashchange', () => { renderStylePage(grid, category); window.scrollTo({ top: 0, behavior: 'smooth' }); });
            }
            renderStylePage(grid, category);
            return;
        }
        renderProductList(grid, sortForCategory(category, getProductsByCategory(category)));
    }, `retryProducts(); loadProducts('${category}')`);
}
