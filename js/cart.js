let cart = [];

function loadCart() {
    const stored = localStorage.getItem(JURYAM_CONFIG.CART_STORAGE_KEY);
    if (stored) {
        cart = JSON.parse(stored);
        return;
    }
    const legacy = localStorage.getItem('juryamCart');
    if (legacy) {
        cart = JSON.parse(legacy);
        localStorage.removeItem('juryamCart');
    }

    cart = cart.map(item => {
        if (!item.cartKey) {
            item.cartKey = getCartItemKey(item.id, item.size);
        }
        return item;
    });

    if (cart.length > 0) saveCart();
}

function getCartItemKey(productId, size, variant) {
    let key = size ? `${productId}_size${size}` : productId;
    return variant ? `${key}_v${variant.id}` : key;
}

function addToCart(productId, quantity, size, variant, silent) {
    const product = getProductById(productId);
    if (!product) return;

    const qty = Math.max(1, quantity || 1);
    const cartKey = getCartItemKey(productId, size, variant);
    const existingItem = cart.find(item => item.cartKey === cartKey);

    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            ...product,
            cartKey,
            quantity: qty,
            size: size || null,
            variant: variant ? variant.label : null,
            image: variant && variant.image ? variant.image : product.image
        });
    }

    if (!silent) {
        saveCart();
        updateCartUI();
        showCartNotification();
    }
}

function removeFromCart(cartKey) {
    cart = cart.filter(item => item.cartKey !== cartKey);
    saveCart();
    updateCartUI();
    updateCheckoutSummary();
}

function updateQuantity(cartKey, quantity) {
    const item = cart.find(i => i.cartKey === cartKey);
    if (!item) return;

    if (quantity <= 0) {
        removeFromCart(cartKey);
        return;
    }

    item.quantity = quantity;
    saveCart();
    updateCartUI();
    updateCheckoutSummary();
}

function getCartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Delivery choice made in the checkout form; fee is null until a wilaya is picked.
const delivery = {
    wilaya: null,
    method: 'home',
    service: JURYAM_CONFIG.DELIVERY_SERVICES[0]
};

function getDeliveryRate(wilayaCode, service) {
    const row = DELIVERY_RATES[service].rows.find(r => r[1] === Number(wilayaCode));
    if (!row) return null;
    const [name, code, zone, home, desk, days] = row;
    return { name, code, zone, home, desk, days };
}

function getDeliveryFee() {
    if (!delivery.wilaya) return null;
    const rate = getDeliveryRate(delivery.wilaya, delivery.service);
    return rate ? rate[delivery.method] : null;
}

function getOrderTotal() {
    return getCartTotal() + (getDeliveryFee() || 0);
}

function saveCart() {
    localStorage.setItem(JURYAM_CONFIG.CART_STORAGE_KEY, JSON.stringify(cart));
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

function formatCartSummary() {
    return cart.map(item => {
        const sizeText = (item.size ? ` (Size ${item.size})` : '') + (item.variant ? ` (${item.variant})` : '');
        return `${item.name}${sizeText} × ${item.quantity} — ${item.price * item.quantity} DA`;
    }).join('\n');
}

loadCart();
