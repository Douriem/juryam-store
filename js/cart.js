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
            price: variant && variant.price ? variant.price : product.price,
            tier: variant && variant.tier ? variant.tier : null,
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

function getCartSubtotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Bundle promos: a product can price several pieces of one tier together, e.g.
// "bundles": { "python": { "2": 1300, "3": 1800 } }. Colours can be mixed inside a tier,
// and the pieces are split into whichever bundles come out cheapest.
function bundlePrice(unit, count, bundles) {
    const best = [0];
    for (let n = 1; n <= count; n++) {
        best[n] = best[n - 1] + unit;
        for (const size in bundles) {
            if (Number(size) <= n) best[n] = Math.min(best[n], best[n - Number(size)] + bundles[size]);
        }
    }
    return best[count];
}

function getCartPromos(items = cart) {
    const groups = {};
    items.forEach(item => {
        const bundles = item.tier && item.bundles && item.bundles[item.tier];
        if (!bundles) return;
        const key = `${item.id}:${item.tier}`;
        groups[key] = groups[key] || { tier: item.tier, unit: item.price, count: 0, bundles };
        groups[key].count += item.quantity;
    });
    return Object.values(groups)
        .map(g => ({ tier: g.tier, count: g.count, amount: g.unit * g.count - bundlePrice(g.unit, g.count, g.bundles) }))
        .filter(promo => promo.amount > 0);
}

function getCartDiscount() {
    return getCartPromos().reduce((total, promo) => total + promo.amount, 0);
}

function getCartTotal() {
    return getCartSubtotal() - getCartDiscount();
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
    }).concat(getCartPromos().map(promo =>
        `Promo ${promo.count} ${I18N.en['tier_' + promo.tier] || promo.tier} — −${promo.amount} DA`
    )).join('\n');
}

loadCart();
