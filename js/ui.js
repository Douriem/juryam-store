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
    .checkout-form textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        background: rgba(212, 163, 115, 0.05);
        border: 1px solid rgba(212, 163, 115, 0.2);
        color: #f5f5f0;
        font-family: 'Georgia', serif;
        font-size: 0.95rem;
    }
    .checkout-form input:focus,
    .checkout-form textarea:focus {
        outline: none;
        border-color: #d4a373;
    }
    .checkout-form textarea { resize: vertical; min-height: 70px; }

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
`;
document.head.appendChild(sharedStyles);

let modalQuantity = 1;
let modalSelectedSize = null;
let modalProductId = null;

function injectModals() {
    if (document.getElementById('addToCartModal')) return;

    document.body.insertAdjacentHTML('beforeend', `
        <div class="modal-overlay" id="addToCartModal">
            <div class="modal-box">
                <div class="modal-header">
                    <h3>ADD TO CART</h3>
                    <button class="modal-close" onclick="closeAddToCartModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-product" id="modalProductPreview"></div>
                    <div class="modal-field">
                        <label>Quantity</label>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="changeModalQty(-1)">−</button>
                            <span class="qty-value" id="modalQtyValue">1</span>
                            <button class="qty-btn" onclick="changeModalQty(1)">+</button>
                        </div>
                    </div>
                    <div class="modal-field" id="sizeField" style="display:none;">
                        <label>Ring Size</label>
                        <div class="size-options" id="sizeOptions"></div>
                    </div>
                    <div class="modal-actions">
                        <button class="modal-btn modal-btn-secondary" onclick="closeAddToCartModal()">CANCEL</button>
                        <button class="modal-btn modal-btn-primary" onclick="confirmAddToCart()">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-overlay" id="checkoutModal">
            <div class="modal-box checkout-box">
                <div class="modal-header">
                    <h3>CHECKOUT</h3>
                    <button class="modal-close" onclick="closeCheckout()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="checkout-summary" id="checkoutSummary"></div>
                    <form class="checkout-form" id="checkoutForm" onsubmit="submitOrder(event)">
                        <div class="modal-field">
                            <label for="orderName">Full Name *</label>
                            <input type="text" id="orderName" name="name" required>
                        </div>
                        <div class="modal-field">
                            <label for="orderPhone">Phone *</label>
                            <input type="tel" id="orderPhone" name="phone" required>
                        </div>
                        <div class="modal-field">
                            <label for="orderCity">City *</label>
                            <input type="text" id="orderCity" name="city" required>
                        </div>
                        <div class="modal-field">
                            <label for="orderAddress">Address *</label>
                            <input type="text" id="orderAddress" name="address" required>
                        </div>
                        <div class="modal-field">
                            <label for="orderNotes">Notes</label>
                            <textarea id="orderNotes" name="notes" placeholder="Any special requests..."></textarea>
                        </div>
                        <button type="submit" class="btn-checkout" id="sendOrderBtn">SEND ORDER</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal-overlay" id="confirmationModal">
            <div class="modal-box">
                <div class="modal-body order-confirmation">
                    <div class="confirm-icon">✅</div>
                    <h3>ORDER RECEIVED!<br>Thank you for your order.<br>We'll contact you soon 😊</h3>
                    <button class="modal-btn modal-btn-primary" style="margin-top:1.5rem; width:100%;" onclick="closeConfirmation()">CONTINUE SHOPPING</button>
                </div>
            </div>
        </div>
    `);

    document.getElementById('addToCartModal').addEventListener('click', function(e) {
        if (e.target === this) closeAddToCartModal();
    });
    document.getElementById('checkoutModal').addEventListener('click', function(e) {
        if (e.target === this) closeCheckout();
    });
    document.getElementById('confirmationModal').addEventListener('click', function(e) {
        if (e.target === this) closeConfirmation();
    });
}

function openAddToCartModal(productId) {
    const product = getProductById(productId);
    if (!product) return;

    modalProductId = productId;
    modalQuantity = 1;
    modalSelectedSize = null;

    document.getElementById('modalProductPreview').innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="modal-product-info">
            <h4>${product.name}</h4>
            <p>${product.price} DA</p>
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

    document.getElementById('addToCartModal').classList.add('active');
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
        alert('Please select a ring size');
        return;
    }

    addToCart(modalProductId, modalQuantity, modalSelectedSize);
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
                <p id="emptyCartText">Your cart is empty</p>
                <p style="margin-top: 1rem; font-size: 0.9rem;" id="emptyCartSub">Start adding some magic ✨</p>
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
                ${item.size ? `<div class="cart-item-size">Size ${item.size}</div>` : ''}
                <div class="cart-item-price">${item.price} DA</div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity('${item.cartKey}', ${item.quantity - 1})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.cartKey}', ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.cartKey}')">Remove</button>
            </div>
        </div>
    `).join('');

    if (cartSubtotal) cartSubtotal.textContent = `${getCartTotal()} DA`;
}

function showCartNotification() {
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Added to cart!';
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

    const subtotal = getCartTotal();
    const delivery = JURYAM_CONFIG.DELIVERY_COST;
    const total = subtotal + delivery;

    summary.innerHTML = `
        <h4>Your Order</h4>
        ${cart.map(item => `
            <div class="checkout-item">
                <span>${item.name}${item.size ? ` (Size ${item.size})` : ''} × ${item.quantity}</span>
                <span>${item.price * item.quantity} DA</span>
            </div>
        `).join('')}
        <div class="checkout-totals">
            <div class="checkout-row"><span>Subtotal</span><span>${subtotal} DA</span></div>
            <div class="checkout-row"><span>Delivery</span><span>${delivery} DA</span></div>
            <div class="checkout-row total"><span>Total</span><span>${total} DA</span></div>
        </div>
    `;
}

function showOrderConfirmation() {
    closeCheckout();
    document.getElementById('checkoutForm').reset();
    document.getElementById('confirmationModal').classList.add('active');
}

function closeConfirmation() {
    document.getElementById('confirmationModal').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
    injectModals();
    updateCartUI();
});
