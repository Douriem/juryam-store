/* Shared modal & checkout styles */
const sharedStyles = document.createElement('style');
sharedStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.75);
        z-index: 3000;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        animation: fadeIn 0.3s ease;
    }
    .modal-overlay.active { display: flex; }

    .modal-box {
        background: #111;
        border: 1px solid rgba(212, 163, 115, 0.25);
        border-radius: 4px;
        width: 100%;
        max-width: 440px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }
    .modal-box.checkout-box { max-width: 520px; }

    .modal-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid rgba(212, 163, 115, 0.15);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .modal-header h3 {
        color: #d4a373;
        font-weight: 300;
        letter-spacing: 2px;
        font-size: 1.1rem;
    }
    .modal-close {
        background: none;
        border: none;
        color: #d4a373;
        font-size: 1.5rem;
        cursor: pointer;
        line-height: 1;
        transition: transform 0.3s;
    }
    .modal-close:hover { transform: rotate(90deg); }

    .modal-body { padding: 1.5rem 2rem 2rem; }

    .modal-product {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    .modal-product img {
        width: 90px;
        height: 90px;
        object-fit: cover;
        border: 1px solid rgba(212, 163, 115, 0.2);
    }
    .modal-product-info h4 {
        color: #d4a373;
        font-size: 1rem;
        margin-bottom: 0.4rem;
        letter-spacing: 1px;
    }
    .modal-product-info p { color: #c9a578; font-size: 1.1rem; }

    .modal-field { margin-bottom: 1.25rem; }
    .modal-field label {
        display: block;
        color: #c9c9c4;
        font-size: 0.85rem;
        letter-spacing: 1px;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    .qty-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .qty-btn {
        width: 36px;
        height: 36px;
        background: transparent;
        border: 1px solid #d4a373;
        color: #d4a373;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Georgia', serif;
    }
    .qty-btn:hover { background: rgba(212, 163, 115, 0.15); }
    .qty-value {
        color: #f5f5f0;
        font-size: 1.2rem;
        min-width: 2rem;
        text-align: center;
    }

    .modal-offer {
        margin-top: 0.35rem;
        color: #d4a373;
        font-size: 0.8rem;
        line-height: 1.4;
    }
    .price-was { color: #8a8a85; font-weight: 400; margin-right: 0.25rem; }
    .cart-promo,
    .checkout-promo { color: #d4a373; }
    .cart-promo {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        font-size: 0.9rem;
    }

    .variant-row { margin-bottom: 0.75rem; }
    .variant-row .qty-controls { margin-top: 0.5rem; }
    .variant-totals {
        display: flex;
        justify-content: space-between;
        padding-top: 1rem;
        border-top: 1px solid rgba(212, 163, 115, 0.2);
        color: #d4a373;
        font-weight: 600;
    }
    .size-options {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .size-btn {
        padding: 0.5rem 0.85rem;
        background: transparent;
        border: 1px solid rgba(212, 163, 115, 0.3);
        color: #c9c9c4;
        cursor: pointer;
        font-family: 'Georgia', serif;
        font-size: 0.9rem;
        transition: all 0.3s;
    }
    .size-btn .swatch {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 0.45rem;
        vertical-align: -1px;
        border: 1px solid rgba(245, 245, 240, 0.35);
    }
    .size-btn:hover, .size-btn.selected {
        border-color: #d4a373;
        color: #d4a373;
        background: rgba(212, 163, 115, 0.1);
    }

    .modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    .modal-btn {
        flex: 1;
        padding: 0.9rem 1rem;
        font-family: 'Georgia', serif;
        font-size: 0.85rem;
        letter-spacing: 1.5px;
        cursor: pointer;
        border: none;
        transition: all 0.3s;
    }
    .modal-btn-primary {
        background: #d4a373;
        color: #0a0a0a;
    }
    .modal-btn-primary:hover { background: #c9a578; }
    .modal-btn-secondary {
        background: transparent;
        color: #d4a373;
        border: 1px solid #d4a373;
    }
    .modal-btn-secondary:hover { background: rgba(212, 163, 115, 0.1); }

    .checkout-form input,
    .checkout-form select,
    .checkout-form textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        background: rgba(212, 163, 115, 0.05);
        border: 1px solid rgba(212, 163, 115, 0.2);
        color: #f5f5f0;
        font-family: 'Georgia', serif;
        font-size: 0.95rem;
    }
    .checkout-form select {
        appearance: none;
        background-image: linear-gradient(45deg, transparent 50%, #d4a373 50%), linear-gradient(135deg, #d4a373 50%, transparent 50%);
        background-position: calc(100% - 18px) 50%, calc(100% - 13px) 50%;
        background-size: 5px 5px;
        background-repeat: no-repeat;
        cursor: pointer;
    }
    .checkout-form select option { background: #111; color: #f5f5f0; }
    .checkout-form input:focus,
    .checkout-form select:focus,
    .checkout-form textarea:focus {
        outline: none;
        border-color: #d4a373;
    }
    .checkout-form textarea { resize: vertical; min-height: 70px; }

    .delivery-options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.6rem;
    }
    .modal-field .delivery-option {
        margin-bottom: 0;
        text-transform: none;
        letter-spacing: normal;
        font-size: inherit;
        color: inherit;
    }
    .delivery-option {
        position: relative;
        display: flex !important;
        flex-direction: column;
        gap: 0.2rem;
        padding: 0.75rem 0.9rem;
        border: 1px solid rgba(212, 163, 115, 0.2);
        background: rgba(212, 163, 115, 0.03);
        cursor: pointer;
        transition: border-color 0.3s, background 0.3s;
    }
    .delivery-option input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }
    .delivery-option:has(input:checked) {
        border-color: #d4a373;
        background: rgba(212, 163, 115, 0.1);
    }
    .delivery-option:has(input:focus-visible) { outline: 1px solid #d4a373; outline-offset: 2px; }
    .delivery-option-title { color: #f5f5f0; font-size: 0.9rem; }
    .delivery-option-meta { color: #c9c9c4; font-size: 0.78rem; }
    .delivery-option-price { color: #d4a373; font-size: 0.95rem; margin-top: 0.15rem; }
    .delivery-hint { color: #8a8a85; font-size: 0.8rem; margin-top: 0.4rem; font-style: italic; }

    .checkout-pay {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 1rem;
        padding: 0.9rem 0 0.4rem;
        border-top: 1px solid rgba(212, 163, 115, 0.15);
        color: #c9c9c4;
        font-size: 0.85rem;
    }
    .checkout-pay strong { color: #d4a373; font-size: 1.15rem; font-weight: 400; white-space: nowrap; }
    .checkout-pending { color: #8a8a85; font-style: italic; }

    @media (max-width: 420px) {
        .delivery-options { grid-template-columns: 1fr; }
    }

    .checkout-summary {
        background: rgba(212, 163, 115, 0.05);
        border: 1px solid rgba(212, 163, 115, 0.15);
        padding: 1rem;
        margin-bottom: 1.25rem;
    }
    .checkout-summary h4 {
        color: #d4a373;
        font-size: 0.85rem;
        letter-spacing: 1.5px;
        margin-bottom: 0.75rem;
        text-transform: uppercase;
    }
    .checkout-item {
        display: flex;
        justify-content: space-between;
        color: #c9c9c4;
        font-size: 0.9rem;
        margin-bottom: 0.4rem;
    }
    .checkout-totals {
        border-top: 1px solid rgba(212, 163, 115, 0.15);
        margin-top: 0.75rem;
        padding-top: 0.75rem;
    }
    .checkout-row {
        display: flex;
        justify-content: space-between;
        color: #c9c9c4;
        font-size: 0.9rem;
        margin-bottom: 0.35rem;
    }
    .checkout-row.total {
        color: #d4a373;
        font-size: 1.1rem;
        margin-top: 0.5rem;
        padding-top: 0.5rem;
        border-top: 1px solid rgba(212, 163, 115, 0.15);
    }

    .btn-checkout {
        width: 100%;
        padding: 1rem;
        background: #d4a373;
        color: #0a0a0a;
        border: none;
        font-family: 'Georgia', serif;
        font-size: 0.9rem;
        letter-spacing: 1.5px;
        cursor: pointer;
        transition: all 0.3s;
        margin-top: 0.5rem;
    }
    .btn-checkout:hover { background: #c9a578; }
    .btn-checkout:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .order-confirmation {
        text-align: center;
        padding: 2rem;
    }
    .order-confirmation .confirm-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .order-confirmation h3 {
        color: #d4a373;
        font-weight: 300;
        letter-spacing: 1px;
        margin-bottom: 0.75rem;
        line-height: 1.5;
    }
    .order-confirmation p { color: #c9c9c4; font-size: 0.95rem; }

    .cart-item-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.4rem;
    }
    .cart-item-controls button {
        width: 26px;
        height: 26px;
        background: transparent;
        border: 1px solid rgba(212, 163, 115, 0.3);
        color: #d4a373;
        cursor: pointer;
        font-size: 0.9rem;
    }
    .cart-item-size {
        color: #c9c9c4;
        font-size: 0.8rem;
        margin-top: 0.2rem;
    }

    .cart-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: #d4a373;
        color: #0a0a0a;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    }

    .modal-product img { cursor: zoom-in; transition: border-color 0.3s; }
    .modal-product img:hover { border-color: #d4a373; }

    /* Photo viewer: the product photos on a dimmed page, swipe between styles */
    .photo-viewer {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.72);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        z-index: 4000;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 1rem 0;
        animation: fadeIn 0.25s ease;
    }
    .photo-viewer.active { display: flex; }
    .photo-viewer-frame {
        position: relative;
        width: min(60vw, calc(76vh * 0.8));
    }
    .photo-viewer-track {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        border: 1px solid rgba(212, 163, 115, 0.25);
        background: #0a0a0a;
    }
    .photo-viewer-track::-webkit-scrollbar { display: none; }
    .photo-viewer-track img {
        flex: 0 0 100%;
        width: 100%;
        aspect-ratio: 4 / 5;
        object-fit: cover;
        scroll-snap-align: center;
        display: block;
    }
    .photo-viewer-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: 1px solid rgba(212, 163, 115, 0.4);
        background: rgba(10, 10, 10, 0.6);
        color: #d4a373;
        font-size: 1.3rem;
        cursor: pointer;
    }
    .photo-viewer-arrow.prev { left: -58px; }
    .photo-viewer-arrow.next { right: -58px; }
    .photo-viewer-arrow:disabled { opacity: 0.25; cursor: default; }
    .photo-viewer-close {
        position: absolute;
        top: 1rem;
        right: 1.25rem;
        background: none;
        border: none;
        color: #d4a373;
        font-size: 2rem;
        line-height: 1;
        cursor: pointer;
    }
    .photo-viewer-names {
        width: min(60vw, 640px);
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.4rem;
    }
    .photo-viewer-names:empty { display: none; }
    .photo-viewer-names .size-btn { font-size: 0.8rem; padding: 0.35rem 0.7rem; }
    .photo-viewer-names .size-btn.active {
        border-color: #d4a373;
        color: #0a0a0a;
        background: #d4a373;
    }
    @media (max-width: 700px) {
        .photo-viewer-frame, .photo-viewer-names { width: 86vw; }
        .photo-viewer-arrow { display: none; }
    }
`;
document.head.appendChild(sharedStyles);

let modalQuantity = 1;
let modalSelectedSize = null;
let modalProductId = null;
let modalVariantQty = {};

function injectModals() {
    if (document.getElementById('addToCartModal')) return;

    document.body.insertAdjacentHTML('beforeend', `
        <div class="modal-overlay" id="addToCartModal">
            <div class="modal-box">
                <div class="modal-header">
                    <h3 data-i18n="addToCart">${t('addToCart')}</h3>
                    <button class="modal-close" onclick="closeAddToCartModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-product" id="modalProductPreview"></div>
                    <div class="modal-field" id="variantField" style="display:none;">
                        <label data-i18n="colorType">${t('colorType')}</label>
                        <div class="size-options" id="variantOptions"></div>
                        <div id="variantQtyList"></div>
                        <div class="variant-totals">
                            <span><span data-i18n="totalQty">${t('totalQty')}</span> <span id="variantTotalQty">0</span></span>
                            <span><span data-i18n="totalPrice">${t('totalPrice')}</span> <span id="variantTotalPrice">0</span> DA</span>
                        </div>
                    </div>
                    <div class="modal-field" id="qtyField">
                        <label data-i18n="quantity">${t('quantity')}</label>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="changeModalQty(-1)">−</button>
                            <span class="qty-value" id="modalQtyValue">1</span>
                            <button class="qty-btn" onclick="changeModalQty(1)">+</button>
                        </div>
                    </div>
                    <div class="modal-field" id="sizeField" style="display:none;">
                        <label data-i18n="ringSize">${t('ringSize')}</label>
                        <div class="size-options" id="sizeOptions"></div>
                    </div>
                    <div class="modal-actions">
                        <button class="modal-btn modal-btn-secondary" onclick="closeAddToCartModal()" data-i18n="cancel">${t('cancel')}</button>
                        <button class="modal-btn modal-btn-primary" onclick="confirmAddToCart()" data-i18n="addToCart">${t('addToCart')}</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-overlay" id="checkoutModal">
            <div class="modal-box checkout-box">
                <div class="modal-header">
                    <h3 data-i18n="checkoutTitle">${t('checkoutTitle')}</h3>
                    <button class="modal-close" onclick="closeCheckout()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="checkout-summary" id="checkoutSummary"></div>
                    <form class="checkout-form" id="checkoutForm" onsubmit="submitOrder(event)">
                        <div class="modal-field">
                            <label for="orderName" data-i18n="fullName">${t('fullName')}</label>
                            <input type="text" id="orderName" name="name" required>
                        </div>
                        <div class="modal-field">
                            <label for="orderPhone" data-i18n="phone">${t('phone')}</label>
                            <input type="tel" id="orderPhone" name="phone" required>
                        </div>
                        <div class="modal-field">
                            <label for="orderWilaya" data-i18n="wilaya">${t('wilaya')}</label>
                            <select id="orderWilaya" name="wilaya" required>
                                <option value="" data-i18n="selectWilaya">${t('selectWilaya')}</option>
                                ${wilayaOptions()}
                            </select>
                        </div>
                        <div class="modal-field">
                            <label for="orderCommune" data-i18n="commune">${t('commune')}</label>
                            <input type="text" id="orderCommune" name="commune" required>
                        </div>
                        <div class="modal-field">
                            <label data-i18n="deliveryField">${t('deliveryField')}</label>
                            <div class="delivery-options" id="deliveryMethods"></div>
                        </div>
                        <div class="modal-field" id="deliveryServiceField">
                            <label data-i18n="shippingSpeed">${t('shippingSpeed')}</label>
                            <div class="delivery-options" id="deliveryServices"></div>
                        </div>
                        <div class="modal-field" id="addressField">
                            <label for="orderAddress">${t('address')}</label>
                            <input type="text" id="orderAddress" name="address" required>
                        </div>
                        <div class="modal-field">
                            <label for="orderNotes" data-i18n="notes">${t('notes')}</label>
                            <textarea id="orderNotes" name="notes" data-i18n-placeholder="notesPlaceholder" placeholder="${t('notesPlaceholder')}"></textarea>
                        </div>
                        <div class="checkout-pay" id="checkoutPay"></div>
                        <button type="submit" class="btn-checkout" id="sendOrderBtn" data-i18n="sendOrder">${t('sendOrder')}</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal-overlay" id="confirmationModal">
            <div class="modal-box">
                <div class="modal-body order-confirmation">
                    <div class="confirm-icon">✅</div>
                    <h3 data-i18n-html="orderReceived">${t('orderReceived')}</h3>
                    <button class="modal-btn modal-btn-primary" style="margin-top:1.5rem; width:100%;" onclick="closeConfirmation()" data-i18n="continueShopping">${t('continueShopping')}</button>
                </div>
            </div>
        </div>

        <div class="photo-viewer" id="photoViewer">
            <button class="photo-viewer-close" onclick="closePhotoViewer()" aria-label="Close">&times;</button>
            <div class="photo-viewer-frame">
                <div class="photo-viewer-track" id="photoViewerTrack"></div>
                <button class="photo-viewer-arrow prev" onclick="stepPhotoViewer(-1)" aria-label="Previous photo">&#8249;</button>
                <button class="photo-viewer-arrow next" onclick="stepPhotoViewer(1)" aria-label="Next photo">&#8250;</button>
            </div>
            <div class="photo-viewer-names" id="photoViewerNames"></div>
        </div>
    `);

    document.getElementById('addToCartModal').addEventListener('click', function(e) {
        if (e.target === this) closeAddToCartModal();
    });
    document.getElementById('variantField').addEventListener('click', handleVariantClick);
    document.getElementById('checkoutModal').addEventListener('click', function(e) {
        if (e.target === this) closeCheckout();
    });
    document.getElementById('checkoutForm').addEventListener('change', handleDeliveryChange);
    document.getElementById('confirmationModal').addEventListener('click', function(e) {
        if (e.target === this) closeConfirmation();
    });
    document.getElementById('modalProductPreview').addEventListener('click', e => {
        const img = e.target.closest('img');
        if (img) openPhotoViewer(img.getAttribute('src'));
    });
    const viewer = document.getElementById('photoViewer');
    viewer.addEventListener('click', e => {
        if (e.target === viewer) closePhotoViewer();
    });
    document.getElementById('photoViewerTrack').addEventListener('scroll', syncPhotoViewer, { passive: true });
    document.getElementById('photoViewerNames').addEventListener('click', e => {
        const btn = e.target.closest('[data-slide]');
        if (btn) showPhotoViewerSlide(parseInt(btn.dataset.slide, 10));
    });
    document.addEventListener('keydown', e => {
        if (!viewer.classList.contains('active')) return;
        if (e.key === 'Escape') closePhotoViewer();
        if (e.key === 'ArrowRight') stepPhotoViewer(1);
        if (e.key === 'ArrowLeft') stepPhotoViewer(-1);
    });
}

/* Photo viewer: the main photo first, then each variant's own photo */
let viewerSlides = [];
let viewerIndex = 0;

function photoViewerSlides(product) {
    const slides = [];
    const add = (image, variant) => {
        let slide = slides.find(s => s.image === image);
        if (!slide) slides.push(slide = { image, variants: [] });
        if (variant) slide.variants.push(variant);
    };
    const variants = product.variants || [];
    if (!variants.some(v => v.image === product.image)) add(product.image, null);
    variants.forEach(v => add(v.image || product.image, v));
    return slides;
}

function openPhotoViewer(src) {
    const product = getProductById(modalProductId);
    if (!product) return;
    viewerSlides = photoViewerSlides(product);
    const start = Math.max(0, viewerSlides.findIndex(s => s.image === src));

    document.getElementById('photoViewerTrack').innerHTML = viewerSlides.map(s =>
        `<img src="${s.image}" alt="${escapeAttr(s.variants.length ? `${product.name} - ${s.variants.map(v => v.label).join(' / ')}` : product.name)}">`
    ).join('');
    document.getElementById('photoViewerNames').innerHTML = viewerSlides.length > 1 || (product.variants || []).length
        ? viewerSlides.flatMap((s, i) => s.variants.length
            ? s.variants.map(v => `<button type="button" class="size-btn" data-slide="${i}">${v.swatch ? `<span class="swatch" style="background:${v.swatch}"></span>` : ''}${v.label}${v.price ? ` · ${v.price} DA` : ''}</button>`)
            : [`<button type="button" class="size-btn" data-slide="${i}">${t('viewerAll')}</button>`]).join('')
        : '';
    document.querySelectorAll('.photo-viewer-arrow').forEach(b => b.style.display = viewerSlides.length > 1 ? '' : 'none');

    document.getElementById('photoViewer').classList.add('active');
    showPhotoViewerSlide(start, 'instant');
}

function showPhotoViewerSlide(i, behavior = 'smooth') {
    const track = document.getElementById('photoViewerTrack');
    viewerIndex = Math.min(Math.max(i, 0), viewerSlides.length - 1);
    track.scrollTo({ left: viewerIndex * track.clientWidth, behavior });
    markPhotoViewer();
}

function stepPhotoViewer(delta) {
    showPhotoViewerSlide(viewerIndex + delta);
}

function syncPhotoViewer() {
    const track = document.getElementById('photoViewerTrack');
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== viewerIndex) {
        viewerIndex = i;
        markPhotoViewer();
    }
}

function markPhotoViewer() {
    document.querySelectorAll('#photoViewerNames [data-slide]').forEach(btn => {
        const on = parseInt(btn.dataset.slide, 10) === viewerIndex;
        btn.classList.toggle('active', on);
    });
    document.querySelector('.photo-viewer-arrow.prev').disabled = viewerIndex === 0;
    document.querySelector('.photo-viewer-arrow.next').disabled = viewerIndex === viewerSlides.length - 1;
    const thumb = document.querySelector('#modalProductPreview img');
    if (thumb && viewerSlides[viewerIndex]) thumb.src = viewerSlides[viewerIndex].image;
}

function closePhotoViewer() {
    document.getElementById('photoViewer').classList.remove('active');
}

function openAddToCartModal(productId) {
    const product = getProductById(productId);
    if (!product) return;

    modalProductId = productId;
    modalQuantity = 1;
    modalSelectedSize = null;
    modalVariantQty = {};

    document.getElementById('modalProductPreview').innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="modal-product-info">
            <h4>${product.name}</h4>
            <p>${priceLabel(product)}</p>
            ${product.bundles ? `<p class="modal-offer">${bundleOffers(product)}</p>` : ''}
        </div>
    `;
    document.getElementById('modalQtyValue').textContent = '1';

    const sizeField = document.getElementById('sizeField');
    const sizeOptions = document.getElementById('sizeOptions');

    if (product.category === 'rings') {
        sizeField.style.display = 'block';
        sizeOptions.innerHTML = [6, 7, 8, 9, 10, 11, 12].map(size =>
            `<button type="button" class="size-btn" onclick="selectSize(${size})">${size}</button>`
        ).join('');
    } else {
        sizeField.style.display = 'none';
        sizeOptions.innerHTML = '';
    }

    const hasVariants = !!(product.variants && product.variants.length);
    document.getElementById('variantField').style.display = hasVariants ? 'block' : 'none';
    document.getElementById('qtyField').style.display = hasVariants ? 'none' : 'block';
    if (hasVariants) {
        document.getElementById('variantOptions').innerHTML = product.variants.map(v =>
            `<button type="button" class="size-btn" data-variant="${v.id}">${v.swatch ? `<span class="swatch" style="background:${v.swatch}"></span>` : ''}${v.label}${v.price ? ` · ${v.price} DA` : ''}</button>`
        ).join('');
        renderVariantSelection();
    }

    document.getElementById('addToCartModal').classList.add('active');
}

function handleVariantClick(e) {
    const product = getProductById(modalProductId);
    if (!product || !product.variants) return;

    const optionBtn = e.target.closest('[data-variant]');
    if (optionBtn) {
        const id = optionBtn.dataset.variant;
        if (id in modalVariantQty) delete modalVariantQty[id];
        else modalVariantQty[id] = 1;
        const chosen = product.variants.find(v => v.id === id);
        if (chosen && chosen.image) {
            document.querySelector('#modalProductPreview img').src = chosen.image;
        }
        renderVariantSelection();
        return;
    }

    const qtyBtn = e.target.closest('[data-variant-delta]');
    if (qtyBtn) {
        const id = qtyBtn.dataset.variantId;
        if (!(id in modalVariantQty)) return;
        modalVariantQty[id] = Math.max(1, modalVariantQty[id] + parseInt(qtyBtn.dataset.variantDelta, 10));
        renderVariantSelection();
    }
}

function renderVariantSelection() {
    const product = getProductById(modalProductId);
    if (!product || !product.variants) return;

    document.querySelectorAll('#variantOptions [data-variant]').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.variant in modalVariantQty);
    });

    document.getElementById('variantQtyList').innerHTML = product.variants
        .filter(v => v.id in modalVariantQty)
        .map(v => `
            <div class="variant-row">
                <div>${v.label}</div>
                <div class="qty-controls">
                    <button type="button" class="qty-btn" data-variant-id="${v.id}" data-variant-delta="-1">−</button>
                    <span class="qty-value">${modalVariantQty[v.id]}</span>
                    <button type="button" class="qty-btn" data-variant-id="${v.id}" data-variant-delta="1">+</button>
                </div>
            </div>
        `).join('');

    const picked = product.variants.filter(v => v.id in modalVariantQty).map(v => ({
        id: product.id, tier: v.tier, price: v.price || product.price, quantity: modalVariantQty[v.id], bundles: product.bundles
    }));
    const totalQty = picked.reduce((total, item) => total + item.quantity, 0);
    const fullPrice = picked.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = getCartPromos(picked).reduce((total, promo) => total + promo.amount, 0);
    document.getElementById('variantTotalQty').textContent = totalQty;
    document.getElementById('variantTotalPrice').innerHTML = discount
        ? `<s class="price-was">${fullPrice}</s> ${fullPrice - discount}`
        : fullPrice;
}

function closeAddToCartModal() {
    document.getElementById('addToCartModal').classList.remove('active');
    modalProductId = null;
}

function changeModalQty(delta) {
    modalQuantity = Math.max(1, modalQuantity + delta);
    document.getElementById('modalQtyValue').textContent = modalQuantity;
}

function selectSize(size) {
    modalSelectedSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.toggle('selected', parseInt(btn.textContent) === size);
    });
}

function confirmAddToCart() {
    if (!modalProductId) return;

    const product = getProductById(modalProductId);
    if (product.category === 'rings' && !modalSelectedSize) {
        alert(t('pickRingSize'));
        return;
    }

    if (product.variants && product.variants.length) {
        const chosen = product.variants.filter(v => v.id in modalVariantQty);
        if (chosen.length === 0) {
            alert(t('pickVariant'));
            return;
        }
        chosen.forEach(v => addToCart(modalProductId, modalVariantQty[v.id], null, v, true));
        saveCart();
        updateCartUI();
        showCartNotification();
    } else {
        addToCart(modalProductId, modalQuantity, modalSelectedSize);
    }
    closeAddToCartModal();
    toggleCart(true);
}

function updateCartUI() {
    updateCartCount();
    updateCartSidebar();
}

function updateCartCount() {
    const count = getCartCount();
    document.querySelectorAll('.cart-count, #cartCount').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

function updateCartSidebar() {
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p id="emptyCartText">${t('emptyCart')}</p>
                <p style="margin-top: 1rem; font-size: 0.9rem;" id="emptyCartSub">${t('emptyCartSub')}</p>
            </div>
        `;
        if (cartSubtotal) cartSubtotal.textContent = '0 DA';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                ${item.size ? `<div class="cart-item-size">${t('size')} ${item.size}</div>` : ''}
                ${item.variant ? `<div class="cart-item-size">${item.variant}</div>` : ''}
                <div class="cart-item-price">${item.price} DA</div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity('${item.cartKey}', ${item.quantity - 1})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.cartKey}', ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.cartKey}')">${t('remove')}</button>
            </div>
        </div>
    `).join('') + promoRows('cart-promo');

    if (cartSubtotal) cartSubtotal.textContent = `${getCartTotal()} DA`;
}

function promoRows(className) {
    return getCartPromos().map(promo => `
        <div class="${className}"><span>${t('promo')} · ${promo.count} ${t('tier_' + promo.tier)}</span><span>−${promo.amount} DA</span></div>
    `).join('');
}

function showCartNotification() {
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = t('addedToCart');
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

function toggleCart(forceOpen) {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.querySelector('.cart-overlay');
    if (!sidebar || !overlay) return;

    const shouldOpen = forceOpen === true ? true : forceOpen === false ? false : !sidebar.classList.contains('active');
    sidebar.classList.toggle('active', shouldOpen);
    overlay.classList.toggle('active', shouldOpen);

    if (shouldOpen) updateCartSidebar();
}

function openCheckout() {
    if (cart.length === 0) return;
    toggleCart(false);
    updateCheckoutSummary();
    document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function updateCheckoutSummary() {
    const summary = document.getElementById('checkoutSummary');
    if (!summary) return;

    const subtotal = getCartSubtotal();
    const total = getCartTotal();
    const fee = getDeliveryFee();
    const rate = delivery.wilaya ? getDeliveryRate(delivery.wilaya, delivery.service) : null;
    const deliveryLabel = rate
        ? `${t('delivery')} · ${rate.name}, ${delivery.method === 'home' ? t('homeShort') : 'stop-desk'}`
        : t('delivery');
    const pending = `<span class="checkout-pending">${t('selectWilaya')}</span>`;

    summary.innerHTML = `
        <h4>${t('yourOrder')}</h4>
        ${cart.map(item => `
            <div class="checkout-item">
                <span>${item.name}${item.size ? ` (${t('size')} ${item.size})` : ''}${item.variant ? ` (${item.variant})` : ''} × ${item.quantity}</span>
                <span>${item.price * item.quantity} DA</span>
            </div>
        `).join('')}
        <div class="checkout-totals">
            <div class="checkout-row"><span>${t('subtotalRow')}</span><span>${subtotal} DA</span></div>
            ${promoRows('checkout-row checkout-promo')}
            <div class="checkout-row"><span>${deliveryLabel}</span><span>${fee === null ? pending : `${fee} DA`}</span></div>
            <div class="checkout-row total"><span>${t('total')}</span><span>${fee === null ? pending : `${total + fee} DA`}</span></div>
        </div>
    `;
    renderDeliveryChoices();
}

function wilayaOptions() {
    return DELIVERY_RATES[JURYAM_CONFIG.DELIVERY_SERVICES[0]].rows
        .slice()
        .sort((a, b) => a[1] - b[1])
        .map(r => `<option value="${r[1]}">${String(r[1]).padStart(2, '0')} - ${r[0]}</option>`)
        .join('');
}

function deliveryOption(name, value, checked, title, meta, price) {
    return `
        <label class="delivery-option">
            <input type="radio" name="${name}" value="${value}" ${checked ? 'checked' : ''}>
            <span class="delivery-option-title">${title}</span>
            <span class="delivery-option-meta">${meta}</span>
            <span class="delivery-option-price">${price}</span>
        </label>
    `;
}

function daysLabel(days) {
    return `${days} ${days === 1 ? t('day') : t('days')}`;
}

// Prices on each option follow the chosen wilaya, so the fee is visible before ordering.
function renderDeliveryChoices() {
    const methods = document.getElementById('deliveryMethods');
    if (!methods) return;

    const rate = delivery.wilaya ? getDeliveryRate(delivery.wilaya, delivery.service) : null;
    const price = key => rate ? `${rate[key]} DA` : '—';

    methods.innerHTML =
        deliveryOption('delivery_method', 'home', delivery.method === 'home', t('homeDelivery'), t('toAddress'), price('home')) +
        deliveryOption('delivery_method', 'desk', delivery.method === 'desk', t('stopDesk'), t('pickUp'), price('desk'));

    const services = JURYAM_CONFIG.DELIVERY_SERVICES;
    document.getElementById('deliveryServiceField').style.display = services.length > 1 ? '' : 'none';
    document.getElementById('deliveryServices').innerHTML = services.map(key => {
        const r = delivery.wilaya ? getDeliveryRate(delivery.wilaya, key) : null;
        return deliveryOption('delivery_service', key, delivery.service === key, DELIVERY_RATES[key].label,
            r ? `${t('about')} ${daysLabel(r.days)}` : t('selectWilaya'), r ? `${r[delivery.method]} DA` : '—');
    }).join('');

    // Stop-desk parcels are collected at the office, so a street address is optional.
    const address = document.getElementById('orderAddress');
    address.required = delivery.method === 'home';
    document.querySelector('#addressField label').textContent = delivery.method === 'home' ? t('address') : t('addressOptional');

    const fee = getDeliveryFee();
    document.getElementById('checkoutPay').innerHTML = fee === null
        ? `<span>${t('totalToPay')}</span><span class="checkout-pending">${t('seeDelivery')}</span>`
        : `<span>${t('totalToPayIncl', { fee })}</span><strong>${getCartTotal() + fee} DA</strong>`;
}

function handleDeliveryChange(e) {
    const field = e.target;
    if (field.id === 'orderWilaya') delivery.wilaya = field.value ? Number(field.value) : null;
    else if (field.name === 'delivery_method') delivery.method = field.value;
    else if (field.name === 'delivery_service') delivery.service = field.value;
    else return;
    updateCheckoutSummary();
}

function showOrderConfirmation() {
    closeCheckout();
    document.getElementById('checkoutForm').reset();
    delivery.wilaya = null;
    delivery.method = 'home';
    delivery.service = JURYAM_CONFIG.DELIVERY_SERVICES[0];
    document.getElementById('confirmationModal').classList.add('active');
}

function closeConfirmation() {
    document.getElementById('confirmationModal').classList.remove('active');
}

function addDeliveryNote() {
    const subtotal = document.querySelector('.cart-subtotal');
    if (!subtotal || document.querySelector('.cart-delivery-note')) return;
    subtotal.insertAdjacentHTML('afterend',
        `<p class="cart-info cart-delivery-note" style="margin: -0.5rem 0 0.75rem; text-align: left;" data-i18n="deliveryNote">${t('deliveryNote')}</p>`);
}

document.addEventListener('DOMContentLoaded', function() {
    injectModals();
    addDeliveryNote();
    updateCartUI();
});

// text built in code (cart lines, checkout totals, delivery options) is rebuilt in the new language
document.addEventListener('langchange', () => {
    updateCartSidebar();
    if (document.getElementById('checkoutSummary')) updateCheckoutSummary();
});
