function loadProducts(category) {
    const products = getProductsByCategory(category);
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #c9c9c4;">No products available yet. Check back soon!</p>';
        return;
    }

    grid.innerHTML = products.map((product, index) => `
        <div class="product-card" style="transition-delay: ${index * 0.1}s;">
            <div class="product-image-container">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <button class="quick-add" onclick="event.stopPropagation(); openAddToCartModal('${product.id}')">
                    ADD TO CART
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price} DA</p>
            </div>
        </div>
    `).join('');

    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => card.classList.add('visible'));
    }, 100);
}
