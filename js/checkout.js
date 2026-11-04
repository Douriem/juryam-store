async function submitOrder(event) {
    event.preventDefault();

    if (cart.length === 0) return;
    if (getDeliveryFee() === null) {
        document.getElementById('orderWilaya').focus();
        return;
    }

    const btn = document.getElementById('sendOrderBtn');
    btn.disabled = true;
    btn.textContent = t('sending');

    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);

    formData.append('order_items', formatCartSummary());
    formData.append('subtotal', `${getCartTotal()} DA`);
    const rate = getDeliveryRate(delivery.wilaya, delivery.service);
    formData.set('wilaya', `${rate.code} - ${rate.name}`);
    formData.set('delivery_method', delivery.method === 'home' ? 'Home delivery' : 'Stop-desk');
    formData.set('delivery_service', DELIVERY_RATES[delivery.service].label);
    formData.append('delivery', `${getDeliveryFee()} DA`);
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
            alert(t('orderFailed'));
        }
    } catch {
        alert(t('orderOffline'));
    } finally {
        btn.disabled = false;
        btn.textContent = t('sendOrder');
    }
}
