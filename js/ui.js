// UI Update Functions
function updateCartUI() {
    updateCartCount();
    updateCartModal();
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = getCartCount();
    
    cartCountElements.forEach(element => {
        element.textContent = count;
        element.style.display = count > 0 ? 'flex' : 'none';
    });
}

function updateCartModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartContent) cartContent.style.display = 'none';
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartContent) cartContent.style.display = 'block';
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">${item.price} DA</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.id}')">×</button>
        </div>
    `).join('');
    
    if (cartTotal) {
        cartTotal.textContent = `${getCartTotal()} DA`;
    }
}

function showCartNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Produit ajouté au panier!';
    notification.style.cssText = `
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
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Modal Functions
function openCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = 'flex';
        updateCartModal();
    }
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    
    // Close modal when clicking outside
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCart();
            }
        });
    }
});

console.log('✅ UI loaded!');