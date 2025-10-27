// Checkout Page JavaScript

// Go to payment section (scroll to payment options)
function goToPayment() {
    const form = document.getElementById('checkoutForm');
    
    // Simple validation
    const requiredFields = ['fullName', 'phone', 'email', 'address', 'ward', 'district', 'city'];
    let valid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            valid = false;
            field.style.borderColor = '#dc3545';
            setTimeout(() => {
                field.style.borderColor = '';
            }, 2000);
        }
    });
    
    if (!valid) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Scroll to payment section smoothly
    const paymentCard = document.querySelector('.payment-card');
    if (paymentCard) {
        paymentCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Highlight payment section
        paymentCard.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.3)';
        setTimeout(() => {
            paymentCard.style.boxShadow = '';
        }, 2000);
    }
}

// Confirm payment
function confirmPayment() {
    const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
    
    if (!selectedPayment) {
        alert('Please select a payment method');
        return;
    }
    
    const paymentMethod = selectedPayment.value;
    const paymentMethods = {
        'cod': 'Cash on Delivery (COD)',
        'momo': 'MoMo',
        'zalopay': 'ZaloPay'
    };
    
    // Get shipping info
    const shippingInfo = {
        name: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        ward: document.getElementById('ward').value,
        district: document.getElementById('district').value,
        city: document.getElementById('city').value,
        instructions: document.getElementById('instructions').value
    };
    
    // Create order summary
    const orderData = {
        shipping: shippingInfo,
        payment: paymentMethod,
        items: [
            { name: 'Paracetamol 500mg', qty: 2, price: 12.00 },
            { name: 'Vitamin C 1000mg', qty: 1, price: 18.50 },
            { name: 'Cough Syrup', qty: 1, price: 8.25 }
        ],
        subtotal: 38.75,
        shipping: 3.00,
        total: 41.75
    };
    
    // Show confirmation
    if (confirm(`Confirm order with ${paymentMethods[paymentMethod]}?\n\nTotal: $${orderData.total.toFixed(2)}`)) {
        // Simulate payment process
        showPaymentProcessing(paymentMethod);
    }
}

// Show payment processing
function showPaymentProcessing(paymentMethod) {
    const btn = document.querySelector('.btn-confirm');
    const originalText = btn.innerHTML;
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    
    // Simulate API call
    setTimeout(() => {
        if (paymentMethod === 'cod') {
            // COD - direct success
            showSuccessMessage('Order confirmed! You will pay on delivery.');
        } else {
            // MoMo or ZaloPay - redirect to payment gateway
            showPaymentGateway(paymentMethod);
        }
    }, 1500);
}

// Show payment gateway for MoMo and ZaloPay
function showPaymentGateway(paymentMethod) {
    const gatewayNames = {
        'momo': 'MoMo',
        'zalopay': 'ZaloPay'
    };
    
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h4>${gatewayNames[paymentMethod]} Payment</h4>
                <button class="close-btn" onclick="this.closest('.payment-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="qr-code-container">
                    <div class="qr-code">
                        <i class="fas fa-qrcode fa-5x text-primary"></i>
                    </div>
                    <p>Scan this QR code with ${gatewayNames[paymentMethod]} app to complete payment</p>
                    <p class="text-muted">Amount: <strong>$41.75</strong></p>
                    <p class="text-muted">Order ID: <strong>ORD-${Date.now()}</strong></p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.closest('.payment-modal').remove(); showSuccessMessage('Payment cancelled')">Cancel</button>
                <button class="btn btn-success" onclick="this.closest('.payment-modal').remove(); showSuccessMessage('Payment successful! Order confirmed.')">Paid</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle fa-3x text-success mb-3"></i>
            <h3>Success!</h3>
            <p>${message}</p>
            <button class="btn btn-primary mt-3" onclick="window.location.href='homepage.html'">
                Continue Shopping
            </button>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    successDiv.style.display = 'flex';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Checkout page loaded');
    
    // Add smooth transitions for payment options
    const paymentOptions = document.querySelectorAll('.payment-label');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});

