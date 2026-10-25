let PRODUCTS = {};

// products.json is the source of truth; the admin dashboard edits it through the GitHub API.
const productsReady = fetch('products.json', { cache: 'no-cache' })
    .then(res => res.json())
    .then(data => { PRODUCTS = data; })
    .catch(err => console.error('Could not load products.json', err));

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

console.log('✅ Data loaded!');