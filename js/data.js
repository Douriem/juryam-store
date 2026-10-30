const PRODUCTS_CACHE_KEY = 'juryam_products';
let PRODUCTS = readCachedProducts() || {};
let productsError = false;

// products.json is the source of truth; the admin dashboard edits it through the GitHub API.
// A copy is kept in sessionStorage so navigating between pages renders instantly
// (no skeleton flash); the network copy refreshes it for the next page.
function fetchProducts() {
    return fetch('products.json', { cache: 'no-cache' })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            PRODUCTS = data;
            productsError = false;
            try { sessionStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(data)); } catch {}
            return true;
        })
        .catch(err => {
            console.error('Could not load products.json', err);
            productsError = true;
            return false;
        });
}

function readCachedProducts() {
    try {
        return JSON.parse(sessionStorage.getItem(PRODUCTS_CACHE_KEY));
    } catch {
        return null;
    }
}

let productsReady = hasProducts()
    ? (fetchProducts(), Promise.resolve(true))
    : fetchProducts();

function retryProducts() {
    productsReady = fetchProducts();
    return productsReady;
}

function hasProducts() {
    return Object.keys(PRODUCTS).length > 0;
}

function getProductsByCategory(category) {
    return PRODUCTS[category] || [];
}

function getProductById(productId) {
    for (let category in PRODUCTS) {
        const product = PRODUCTS[category].find(p => p.id === productId);
        if (product) return product;
    }
    return null;
}

function getAllProducts() {
    let allProducts = [];
    for (let category in PRODUCTS) {
        allProducts = allProducts.concat(PRODUCTS[category]);
    }
    return allProducts;
}

// Upload time: explicit createdAt (set by admin), else the timestamp the admin
// embeds in uploaded image names (e.g. assets/luna-necklace-1793207290058.jpeg).
function getProductTimestamp(product) {
    if (product.createdAt) {
        const t = Date.parse(product.createdAt);
        if (!isNaN(t)) return t;
    }
    const match = /-(\d{13})\.\w+$/.exec(product.image || '');
    return match ? Number(match[1]) : null;
}

// Category pages: dated products newest first, undated ones after in their listed order.
function sortNewestFirst(products) {
    return products
        .map((p, i) => ({ p, i, t: getProductTimestamp(p) }))
        .sort((a, b) => (a.t === null) - (b.t === null) || (b.t || 0) - (a.t || 0) || a.i - b.i)
        .map(x => x.p);
}

// Newest first; products without a date follow in a shuffled order that stays
// fixed for the whole browsing session.
function getStoreOrder() {
    const all = getAllProducts().filter((p, i, arr) => arr.findIndex(q => q.id === p.id) === i);
    const dated = all.filter(p => getProductTimestamp(p) !== null)
        .sort((a, b) => getProductTimestamp(b) - getProductTimestamp(a));
    const undated = all.filter(p => getProductTimestamp(p) === null)
        .sort((a, b) => a.id.localeCompare(b.id));

    const random = seededRandom(getSessionSeed());
    for (let i = undated.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [undated[i], undated[j]] = [undated[j], undated[i]];
    }
    return dated.concat(undated);
}

function getSessionSeed() {
    try {
        let seed = sessionStorage.getItem('juryam_order_seed');
        if (!seed) {
            seed = String(Math.floor(Math.random() * 2 ** 31));
            sessionStorage.setItem('juryam_order_seed', seed);
        }
        return Number(seed);
    } catch {
        return 1;
    }
}

function seededRandom(seed) {
    return function() {
        seed |= 0;
        seed = (seed + 0x6D2B79F5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
