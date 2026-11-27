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
    const existingItem = cart.find(item => item.cartKey === cartKey && !item.free);

    if (existingItem && !existingItem.free) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            ...product,
            cartKey,
            quantity: qty,
            size: size || null,
            variant: variant ? variant.label : null,
            price: variant && variant.price ? variant.price : product.price,
            // "all" bundles cover every colour of the piece; named tiers only their own colours
            tier: variant && variant.tier ? variant.tier : (product.bundles && product.bundles.all ? 'all' : null),
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
// "bundles": { "python": { "2": 1300, "3": 1800 } }, or { "all": { "2": 1300 } } for any colour. Colours can be mixed inside a tier,
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

// Free rings: 1000 DA or more of rings gets 1 free ring of the customer's choice,
// 1500 DA or more of rings gets 2. Free rings sit in the cart with price 0 and free: true.
const FREE_RING_TIERS = [[1500, 2], [1000, 1]];

// Only rings the customer pays for count toward free rings
function getRingsTotal() {
    return cart.filter(item => item.category === 'rings' && !item.free)
        .reduce((total, item) => total + item.price * item.quantity, 0);
}

function getFreeRingsAllowed() {
    const paid = getRingsTotal();
    const tier = FREE_RING_TIERS.find(([min]) => paid >= min);
    return tier ? tier[1] : 0;
}

function getFreeRings() {
    return cart.filter(item => item.free);
}

// Amount still needed for the next free ring, or null when both are unlocked.
function getNextFreeRingGap() {
    const paid = getRingsTotal();
    const next = FREE_RING_TIERS.slice().reverse().find(([min]) => paid < min);
    return next ? next[0] - paid : null;
}

function addFreeRing(productId) {
    const product = getProductById(productId);
    if (!product || getFreeRings().length >= getFreeRingsAllowed()) return;
    cart.push({
        ...product,
        cartKey: `${productId}_free${Date.now()}`,
        quantity: 1,
        size: null,
        variant: null,
        tier: null,
        free: true,
        price: 0
    });
    saveCart();
    updateCartUI();
    updateCheckoutSummary();
}

// Drop free rings the order no longer earns (e.g. after removing a piece).
function trimFreeRings() {
    let extra = getFreeRings().length - getFreeRingsAllowed();
    if (extra <= 0) return;
    for (let i = cart.length - 1; i >= 0 && extra > 0; i--) {
        if (cart[i].free) { cart.splice(i, 1); extra--; }
    }
    saveCart();
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

// The piece's name with the chosen colour/style, e.g. "Scarlet Mandala Necklace – Yellow"
function cartItemLabel(item) {
    return item.variant ? `${item.name} – ${item.variant}` : item.name;
}

// Name sent with the order: free rings are marked so they are easy to spot.
function cartItemName(item) {
    return item.free ? `${cartItemLabel(item)} – FREE RING` : cartItemLabel(item);
}

function formatCartSummary() {
    return cart.map(item => {
        const sizeText = item.size ? ` (Size ${item.size} mm)` : '';
        return `${cartItemName(item)}${sizeText} × ${item.quantity} — ${item.price * item.quantity} DA`;
    }).concat(getCartPromos().map(promo =>
        `Promo ${promo.count} ${I18N.en['tier_' + promo.tier] || promo.tier} — −${promo.amount} DA`
    )).join('\n');
}

loadCart();
