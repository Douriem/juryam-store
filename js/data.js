const PRODUCTS = {
    necklaces: [
        {
            id: 'neck_1',
            name: 'Celestial Moon Necklace',
            price: 600,
            image: 'assets/necklace1.png',
            description: 'Delicate crescent moon pendant.',
            category: 'necklaces',
            badge: 'NEW'
        },
        {
            id: 'neck_2',
            name: 'mystical fairy',
            price: 850,
            image: 'assets/necklace2.png',
            description: 'Stunning labradorite stone.',
            category: 'necklaces',
            badge: null
        },{
            id: 'neck_3',
            name: 'love potion',
            price: 450,
            image: 'assets/necklace3.png',
            description: 'Stunning labradorite stone.',
            category: 'necklaces',
            badge: null
        },
    ],
    rings: [
        {
            id: 'ring_1',
            name: 'Golden Sun Ring',
            price: 500,
            image: 'assets/rings.png',
            description: 'Hand-forged brass ring.',
            category: 'rings',
            badge: 'OUT OF STOCK'
        }
    ],
    earrings: [
        {
            id: 'ear_1',
            name: 'Wildflower Earrings',
            price: 650,
            image: 'assets/earrings6.png',
            description: 'crystals hearts.',
            category: 'earrings',
            badge: 'NEW'
        },
        {
            id: 'ear_2',
            name: 'Crystal Hearts Earrings',
            price: 600,
            image: 'assets/earrings4.png',
            description: 'Elegant quartz crystals.',
            category: 'earrings',
            badge: 'NEW'
        },
        {
            id: 'ear_3',
            name: 'Glittery Loops Earrings',
            price: 600,
            image: 'assets/earrings3.png',
            description: 'Elegant quartz crystals.',
            category: 'earrings',
            badge: 'NEW'
        },
        {
            id: 'ear_4',
            name: 'Sea Siren Earrings',
            price: 400,
            image: 'assets/earrings2.png',
            description: 'Elegant quartz crystals.',
            category: 'earrings',
            badge: 'NEW'
        },
        {
            id: 'ear_5',
            name: 'Crystal Earrings',
            price: 650,
            image: 'assets/earrings5.png',
            description: 'Elegant quartz crystals.',
            category: 'earrings',
            badge: 'NEW'
        },
        {
            id: 'ear_6',
            name: 'Moonwashed Shell Earrings',
            price: 750,
            image: 'assets/earrings1.png',
            description: 'Elegant quartz crystals.',
            category: 'earrings',
            badge: 'NEW'
        },
    ],
    bracelets: [
        {
            id: 'brac_1',
            name: 'crystal bracelet',
            price: 600,
            image: 'assets/crystals.jpeg',
            description: 'Oxidized silver serpent.',
            category: 'bracelets',
            badge: null
        }
    ]
};

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