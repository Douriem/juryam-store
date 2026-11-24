// Site-wide French / English. The choice is remembered across pages; French is the default.
// Static text carries data-i18n="key" (data-i18n-html for markup, data-i18n-placeholder for
// fields); code that renders text calls t('key') and re-renders on the 'langchange' event.
const LANG_STORAGE_KEY = 'juryam_lang';

const I18N = {
    fr: {
        navAbout: 'À PROPOS',
        navCategories: 'CATÉGORIES',
        navContact: 'CONTACT',
        shopAll: 'Toute la boutique',
        heroTagline: 'Créé pour Votre Énergie',
        heroBtn1: 'EXPLORER LES BIJOUX',
        heroBtn2: 'VOIR CATÉGORIES',
        aboutTitle: 'Notre Histoire',
        aboutSub: "Des bijoux pour chaque facette de toi",
        aboutP1: "Juryam est né de nos propres mains, en créant des bijoux pièce par pièce, parce que les baddies d'Algérie méritent leur swag aussi. Ce qui a commencé fait main est devenu quelque chose de plus grand : des pièces rares, bohèmes, sombres et gothiques, ou un peu féeriques, difficiles à trouver ailleurs en Algérie. Pour celle qui reste authentique et refuse de ressembler à tout le monde. Et ce n'est que le début.",
        aboutSign: 'Profite bien de ton shopping',
        exploreTitle: 'Explorer la Boutique',
        exploreSub: 'Nos dernières créations, choisies pour vous',
        showAll: 'TOUT VOIR',
        showAllSub: 'Toute la collection',
        categoriesTitle: 'Catégories',
        categoriesSub: 'Explorez nos catégories soigneusement sélectionnées',
        contactTitle: 'Contactez-Nous',
        contactSub: 'Rejoignez Notre Tribu Créative',
        contactText: 'Suivez notre voyage créatif et découvrez nos nouvelles créations. Nous sommes toujours ravis de partager notre passion avec des âmes similaires.',
        footerTagline: 'JURYAM © 2025 • Créé pour Votre Énergie',
        footerCredit: 'Réalisé par DouriemDev',
        cartTitle: 'VOTRE PANIER',
        emptyCart: 'Votre panier est vide',
        emptyCartSub: 'Commencez à ajouter de la magie ✨',
        subtotal: 'SOUS-TOTAL',
        catNecklaces: 'COLLIERS',
        catRings: 'BAGUES',
        catEarrings: "BOUCLES D'OREILLES",
        catBracelets: 'BRACELETS',
        catSets: 'ENSEMBLES',
        catBoho: 'BOHÈME',
        catGoth: 'ALT/GOTH',
        catPiercings: 'PIERCINGS',
        catHair: 'ACCESSOIRES CHEVEUX',
        catTattoos: 'FAUX TATOUAGES',
        piece: 'pièce',
        pieces: 'pièces',

        // shop pages
        pageExplore: 'EXPLORER LA BOUTIQUE',
        subExplore: 'Toute la collection, les nouveautés en premier',
        subNecklaces: 'Pendentifs délicats et pièces fortes',
        subRings: 'Des bagues célestes pour chaque vibe',
        subEarrings: 'Pendants élégants et puces mystiques',
        subBracelets: 'Joncs symboliques et bracelets à breloques',
        subSets: 'Des pièces assorties, faites pour être portées ensemble',
        subBoho: 'Pierres, coquillages, bois et perles',
        subGoth: 'Velours, cuir et pierres sombres',
        subPiercings: 'Bijoux de nombril qui brillent',
        subHair: 'Pics et bagues à cheveux',
        subTattoos: 'Des tatouages éphémères, sans engagement',
        addToCart: 'AJOUTER AU PANIER',
        noProducts: 'Aucun produit pour le moment.',
        checkBack: 'Revenez bientôt !',
        loadError: 'Impossible de charger la collection.',
        loadErrorSub: 'Vérifiez votre connexion et réessayez.',
        tryAgain: 'RÉESSAYER',

        // add to cart popup and photo viewer
        colorType: 'Couleur / Modèle',
        totalQty: 'Quantité totale :',
        totalPrice: 'Prix total :',
        quantity: 'Quantité',
        ringSize: 'Taille de bague (mm)',
        cancel: 'ANNULER',
        viewerAll: 'Tous',
        pickRingSize: 'Veuillez choisir une taille de bague',
        pickVariant: 'Veuillez choisir au moins une couleur / un modèle',
        addedToCart: 'Ajouté au panier !',

        // cart and checkout
        checkout: 'COMMANDER',
        freeLabel: 'OFFERTE',
        freeRingUnlockedOne: '🎁 Ta commande dépasse 1000 DA : tu as droit à 1 bague offerte !',
        freeRingUnlockedTwo: '🎁 Ta commande dépasse 1500 DA : tu as droit à 2 bagues offertes !',
        freeRingChoose: 'CHOISIR MA BAGUE',
        freeRingDone: '🎁 Bague offerte choisie, elle est dans ton panier.',
        freeRingDoneTwo: '🎁 Tes 2 bagues offertes sont dans ton panier.',
        freeRingGapFirst: 'Plus que {n} DA pour une bague offerte 🎁',
        freeRingGapSecond: 'Plus que {n} DA pour une 2e bague offerte',
        freeRingTitle: 'CHOISIS TA BAGUE OFFERTE',
        freeRingLeftOne: 'Encore 1 bague à choisir',
        freeRingLeftTwo: 'Encore 2 bagues à choisir',
        remove: 'Retirer',
        size: 'Taille',
        deliveryNote: 'Les frais de livraison sont calculés à la commande selon votre wilaya.',
        checkoutTitle: 'COMMANDE',
        yourOrder: 'Votre commande',
        subtotalRow: 'Sous-total',
        total: 'Total',
        delivery: 'Livraison',
        homeShort: 'domicile',
        selectWilaya: 'Choisissez votre wilaya',
        fullName: 'Nom complet *',
        phone: 'Téléphone *',
        wilaya: 'Wilaya *',
        commune: 'Commune *',
        deliveryField: 'Livraison *',
        shippingSpeed: 'Société de livraison *',
        noStopDesk: 'Pas de stop-desk ici',
        yourOrderNumber: 'Votre numéro de commande : {number}',
        pickWilayaHint: '↑ Choisissez d’abord votre wilaya pour voir les prix de livraison.',
        pickWilayaShort: 'Choisir la wilaya',
        address: 'Adresse *',
        addressOptional: 'Adresse (facultatif)',
        notes: 'Notes',
        notesPlaceholder: 'Une demande particulière...',
        homeDelivery: 'Livraison à domicile',
        toAddress: 'À votre adresse',
        stopDesk: 'Stop-desk',
        pickUp: 'Retrait au bureau du transporteur',
        about: 'À propos',
        day: 'jour',
        days: 'jours',
        totalToPay: 'Total à payer',
        totalToPayIncl: 'Total à payer (dont {fee} DA de livraison)',
        seeDelivery: 'Choisissez votre wilaya pour voir la livraison',
        sendOrder: 'ENVOYER LA COMMANDE',
        sending: 'ENVOI...',
        orderReceived: 'COMMANDE REÇUE !<br>Merci pour votre commande.<br>Nous vous contacterons bientôt 😊',
        continueShopping: 'CONTINUER MES ACHATS',
        orderFailed: 'Une erreur est survenue. Réessayez ou contactez-nous sur Instagram.',
        orderOffline: "Impossible d'envoyer la commande. Vérifiez votre connexion et réessayez.",

        // bundle promos
        fromPrice: 'À partir de',
        outOfStock: 'RUPTURE DE STOCK',
        soldOutShort: 'épuisé',
        offer: 'Offre :',
        promo: 'Promo',
        tier_all: 'pièces',
        tier_skinny: 'bracelets fins',
        tier_bone: 'joncs en os',
        tier_python: 'joncs python'
    },
    en: {
        navAbout: 'ABOUT',
        navCategories: 'CATEGORIES',
        navContact: 'CONTACT',
        shopAll: 'Shop all',
        heroTagline: 'Curated for Your Energy',
        heroBtn1: 'EXPLORE JEWELRY',
        heroBtn2: 'VIEW CATEGORIES',
        aboutTitle: 'Our Story',
        aboutSub: 'Jewelry for every side of you',
        aboutP1: "Juryam started with our own hands, making jewelry piece by piece, because the baddies of Algeria deserve their swag too. What began as handmade grew into something bigger: rare pieces, boho, dark and gothic, or a little bit fairy, that are hard to find anywhere else in Algeria. For the girl who stays authentic and refuses to look like everyone else. And this is only the beginning.",
        aboutSign: 'Enjoy your shopping experience',
        exploreTitle: 'Explore the Store',
        exploreSub: 'Our latest creations, curated for you',
        showAll: 'SHOW ALL',
        showAllSub: 'The full collection',
        categoriesTitle: 'Categories',
        categoriesSub: 'Explore our curated categories',
        contactTitle: 'Contact Us',
        contactSub: 'Join Our Creative Tribe',
        contactText: 'Follow our creative journey and discover our new creations. We are always delighted to share our passion with like-minded souls.',
        footerTagline: 'JURYAM © 2025 • Curated for Your Energy',
        footerCredit: 'Made by DouriemDev',
        cartTitle: 'YOUR CART',
        emptyCart: 'Your cart is empty',
        emptyCartSub: 'Start adding some magic ✨',
        subtotal: 'SUBTOTAL',
        catNecklaces: 'NECKLACES',
        catRings: 'RINGS',
        catEarrings: 'EARRINGS',
        catBracelets: 'BRACELETS',
        catSets: 'SETS',
        catBoho: 'BOHEMIAN',
        catGoth: 'ALT/GOTH',
        catPiercings: 'PIERCINGS',
        catHair: 'HAIR ACCESSORIES',
        catTattoos: 'FAKE TATTOOS',
        piece: 'piece',
        pieces: 'pieces',

        pageExplore: 'EXPLORE THE STORE',
        subExplore: 'Every piece in the collection, newest first',
        subNecklaces: 'Delicate pendants and statement pieces',
        subRings: 'Celestial rings for every vibe',
        subEarrings: 'Elegant drops and mystical studs',
        subBracelets: 'Symbolic bangles and charm bracelets',
        subSets: 'Matching pieces, made to be worn together',
        subBoho: 'Stones, shells, wood and beads',
        subGoth: 'Velvet, leather and dark stones',
        subPiercings: 'Sparkly belly rings',
        subHair: 'Hair sticks and hair cuffs',
        subTattoos: 'Temporary tattoos, no commitment',
        addToCart: 'ADD TO CART',
        noProducts: 'No products available yet.',
        checkBack: 'Check back soon!',
        loadError: 'We couldn’t load the collection.',
        loadErrorSub: 'Please check your connection and try again.',
        tryAgain: 'TRY AGAIN',

        colorType: 'Color / Type',
        totalQty: 'Total quantity:',
        totalPrice: 'Total price:',
        quantity: 'Quantity',
        ringSize: 'Ring size (mm)',
        cancel: 'CANCEL',
        viewerAll: 'All',
        pickRingSize: 'Please select a ring size',
        pickVariant: 'Please select at least one Color / Type',
        addedToCart: 'Added to cart!',

        checkout: 'CHECKOUT',
        freeLabel: 'FREE',
        freeRingUnlockedOne: '🎁 Your order is over 1000 DA: you get 1 free ring!',
        freeRingUnlockedTwo: '🎁 Your order is over 1500 DA: you get 2 free rings!',
        freeRingChoose: 'CHOOSE MY RING',
        freeRingDone: '🎁 Free ring picked, it is in your cart.',
        freeRingDoneTwo: '🎁 Your 2 free rings are in your cart.',
        freeRingGapFirst: 'Only {n} DA more for a free ring 🎁',
        freeRingGapSecond: 'Only {n} DA more for a 2nd free ring',
        freeRingTitle: 'PICK YOUR FREE RING',
        freeRingLeftOne: '1 ring left to pick',
        freeRingLeftTwo: '2 rings left to pick',
        remove: 'Remove',
        size: 'Size',
        deliveryNote: 'Delivery fee is calculated at checkout from your wilaya.',
        checkoutTitle: 'CHECKOUT',
        yourOrder: 'Your Order',
        subtotalRow: 'Subtotal',
        total: 'Total',
        delivery: 'Delivery',
        homeShort: 'home',
        selectWilaya: 'Select your wilaya',
        fullName: 'Full Name *',
        phone: 'Phone *',
        wilaya: 'Wilaya *',
        commune: 'Commune *',
        deliveryField: 'Delivery *',
        shippingSpeed: 'Delivery company *',
        noStopDesk: 'No stop-desk here',
        yourOrderNumber: 'Your order number: {number}',
        pickWilayaHint: '↑ Pick your wilaya first to see delivery prices.',
        pickWilayaShort: 'Pick a wilaya',
        address: 'Address *',
        addressOptional: 'Address (optional)',
        notes: 'Notes',
        notesPlaceholder: 'Any special requests...',
        homeDelivery: 'Home delivery',
        toAddress: 'To your address',
        stopDesk: 'Stop-desk',
        pickUp: 'Pick up at the courier office',
        about: 'About',
        day: 'day',
        days: 'days',
        totalToPay: 'Total to pay',
        totalToPayIncl: 'Total to pay (incl. {fee} DA delivery)',
        seeDelivery: 'Select your wilaya to see delivery',
        sendOrder: 'SEND ORDER',
        sending: 'SENDING...',
        orderReceived: 'ORDER RECEIVED!<br>Thank you for your order.<br>We\'ll contact you soon 😊',
        continueShopping: 'CONTINUE SHOPPING',
        orderFailed: 'Something went wrong. Please try again or contact us on Instagram.',
        orderOffline: 'Could not send order. Please check your connection and try again.',

        fromPrice: 'From',
        outOfStock: 'OUT OF STOCK',
        soldOutShort: 'sold out',
        offer: 'Offer:',
        promo: 'Promo',
        tier_all: 'pieces',
        tier_skinny: 'skinny bracelets',
        tier_bone: 'bone bangles',
        tier_python: 'python bangles'
    }
};

let currentLang = (() => {
    try {
        const saved = localStorage.getItem(LANG_STORAGE_KEY);
        return saved === 'en' || saved === 'fr' ? saved : 'fr';
    } catch {
        return 'fr';
    }
})();

function t(key, vars) {
    let text = I18N[currentLang][key] ?? I18N.en[key] ?? key;
    if (vars) for (const name in vars) text = text.replace(`{${name}}`, vars[name]);
    return text;
}

function applyI18n(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.textContent = currentLang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN';
    });
    document.documentElement.lang = currentLang;
}

function setLang(lang) {
    currentLang = lang;
    try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch {}
    applyI18n();
    document.dispatchEvent(new CustomEvent('langchange'));
}

document.addEventListener('click', e => {
    if (e.target.closest('.lang-toggle')) setLang(currentLang === 'fr' ? 'en' : 'fr');
});
document.addEventListener('DOMContentLoaded', () => applyI18n());
// text rendered after DOMContentLoaded (popups, menus) is picked up once everything has run
window.addEventListener('load', () => applyI18n());
