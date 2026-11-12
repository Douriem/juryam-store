const JURYAM_CONFIG = {
    CART_STORAGE_KEY: 'juryam_cart',
    // Courier price lists offered at checkout (keys of DELIVERY_RATES in js/delivery-rates.js).
    // The first one is preselected; list only one to hide the choice.
    DELIVERY_SERVICES: ['ecommerce', 'economique', 'anderson'],
    // Repo the admin dashboard commits products.json and images to
    GITHUB_REPO: 'Douriem/juryam-store',
    GITHUB_BRANCH: 'main',
    // Replace with your Formspree form URL (connect to Google Sheets in Formspree dashboard)
    FORMSPREE_URL: 'https://formspree.io/f/mbdeqbql',
    // JURYAM server that puts website orders in the ledger's "New orders" box (e.g. 'https://api.juryam.com').
    // Empty = off; orders still go to Formspree either way.
    ORDERS_API_URL: ''
};
