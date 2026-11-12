// Sends the order to the JURYAM server too, so it lands in the ledger with a number (JUR-1001).
// Never blocks the order: if the server is off or slow, Formspree still gets it.
async function sendToOrdersApi(formData, rate) {
    if (!JURYAM_CONFIG.ORDERS_API_URL) return null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    try {
        const response = await fetch(JURYAM_CONFIG.ORDERS_API_URL.replace(/\/+$/, '') + '/orders', {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'), phone: formData.get('phone'),
                wilaya_code: rate.code, wilaya: rate.name, commune: formData.get('commune'),
                address: formData.get('address'), notes: formData.get('notes'),
                method: delivery.method, courier: DELIVERY_RATES[delivery.service].label,
                items: cart.map(item => ({ product_id: item.id, name: item.name, variant: item.variant, tier: item.tier,
                    size: item.size, price: item.price, quantity: item.quantity })),
                subtotal: getCartSubtotal(), discount: getCartDiscount(), delivery: getDeliveryFee(), total: getOrderTotal()
            })
        });
        return response.ok ? (await response.json()).number || null : null;
    } catch {
        return null;
    } finally {
        clearTimeout(timer);
    }
}

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
    formData.append('subtotal', `${getCartSubtotal()} DA`);
    if (getCartDiscount()) formData.append('promo', `−${getCartDiscount()} DA`);
    const rate = getDeliveryRate(delivery.wilaya, delivery.service);
    formData.set('wilaya', `${rate.code} - ${rate.name}`);
    formData.set('delivery_method', delivery.method === 'home' ? 'Home delivery' : 'Stop-desk');
    formData.set('delivery_service', DELIVERY_RATES[delivery.service].label);
    formData.append('delivery', `${getDeliveryFee()} DA`);
    formData.append('total', `${getOrderTotal()} DA`);
    const orderNumber = await sendToOrdersApi(formData, rate);
    if (orderNumber) formData.append('order_number', orderNumber);
    formData.append('_subject', `New JURYAM Order ${orderNumber || ''} — ${formData.get('name')}`.replace('  ', ' '));

    try {
        const response = await fetch(JURYAM_CONFIG.FORMSPREE_URL, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
        });

        if (response.ok) {
            clearCart();
            showOrderConfirmation(orderNumber);
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
