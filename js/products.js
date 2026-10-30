function escapeAttr(value) {
    return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

// Shared product card markup (category pages, homepage carousel, Explore page).
// Images below the first row load lazily.
function renderProductCard(product, { eager = false, delay = 0 } = {}) {
    return `
        <div class="product-card" style="transition-delay: ${delay}s;" onclick="openAddToCartModal('${product.id}')">
            <div class="product-image-container">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <img src="${escapeAttr(product.image)}" alt="${escapeAttr(product.name)}" class="product-image" loading="${eager ? 'eager' : 'lazy'}" decoding="async">
                <button class="quick-add" onclick="event.stopPropagation(); openAddToCartModal('${product.id}')">
                    ADD TO CART
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price} DA${renderSwatches(product)}</p>
            </div>
        </div>
    `;
}

function renderSwatches(product) {
    const colours = (product.variants || []).filter(v => v.swatch);
    if (!colours.length) return '';
    return `<span class="product-swatches" title="${colours.length} colours">${colours.map(v =>
        `<span class="swatch" style="background:${v.swatch}" aria-label="${escapeAttr(v.label)}"></span>`).join('')}</span>`;
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
            'We couldn’t load the collection.',
            'Please check your connection and try again.',
            'TRY AGAIN',
            retryAction
        );
        return;
    }
    render();
}

async function loadProducts(category) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    await withProducts(grid, 4, () => {
        const products = sortNewestFirst(getProductsByCategory(category));
        if (products.length === 0) {
            grid.innerHTML = renderGridMessage('No products available yet.', 'Check back soon!');
            return;
        }
        grid.innerHTML = products.map((product, index) =>
            renderProductCard(product, { eager: index < 4, delay: Math.min(index, 8) * 0.1 })
        ).join('');
        revealCards(grid);
    }, `retryProducts(); loadProducts('${category}')`);
}
