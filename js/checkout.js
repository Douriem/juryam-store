async function submitOrder(event) {
    event.preventDefault();

    if (cart.length === 0) return;

    const btn = document.getElementById('sendOrderBtn');
    btn.disabled = true;
    btn.textContent = 'SENDING...';

    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);

    formData.append('order_items', formatCartSummary());
    formData.append('subtotal', `${getCartTotal()} DA`);
    formData.append('delivery', `${JURYAM_CONFIG.DELIVERY_COST} DA`);
    formData.append('total', `${getOrderTotal()} DA`);
    formData.append('_subject', `New JURYAM Order — ${formData.get('name')}`);

    try {
        const response = await fetch(JURYAM_CONFIG.FORMSPREE_URL, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
        });

        if (response.ok) {
            clearCart();
            showOrderConfirmation();
        } else {
            alert('Something went wrong. Please try again or contact us on Instagram.');
        }
    } catch {
        alert('Could not send order. Please check your connection and try again.');
    } finally {
        btn.disabled = false;
        btn.textContent = 'SEND ORDER';
    }
}
