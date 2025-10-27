// Cart Page JavaScript

// Increase quantity
function increaseQuantity(button) {
    const quantityInput = button.previousElementSibling;
    let quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
    
    updateItemTotal(button);
    updateOrderSummary();
}

// Decrease quantity
function decreaseQuantity(button) {
    const quantityInput = button.nextElementSibling;
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateItemTotal(button);
        updateOrderSummary();
    }
}

// Update item total
function updateItemTotal(button) {
    const cartItem = button.closest('.cart-item');
    const quantityInput = button.closest('.item-quantity').querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value);
    
    const priceText = cartItem.querySelector('.item-price').textContent;
    const price = parseFloat(priceText.match(/\$(\d+\.\d+)/)[1]);
    
    const total = quantity * price;
    cartItem.querySelector('.item-total').innerHTML = `<strong>$${total.toFixed(2)}</strong>`;
}

// Update order summary
function updateOrderSummary() {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    
    cartItems.forEach(item => {
        const totalText = item.querySelector('.item-total strong').textContent;
        const total = parseFloat(totalText.replace('$', ''));
        subtotal += total;
    });
    
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    // Update display
    document.querySelector('.detail-row:first-child .detail-value').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.detail-row:nth-child(3) .detail-value').textContent = `$${tax.toFixed(2)}`;
    document.querySelector('.total-row .detail-value').innerHTML = `<strong>$${total.toFixed(2)}</strong>`;
}

// Remove item from cart
function removeItem(button) {
    const cartItem = button.closest('.cart-item');
    cartItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    cartItem.style.opacity = '0';
    cartItem.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        cartItem.remove();
        updateCartCount();
        updateOrderSummary();
    }, 300);
}

// Update cart count
function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-item');
    const count = cartItems.length;
    document.querySelector('.cart-badge').textContent = count;
    
    if (count === 0) {
        const cartItemsCard = document.querySelector('.cart-items-card');
        cartItemsCard.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">Your cart is empty</h4>
                <p class="text-muted">Add some items to your cart</p>
                <a href="homepage.html" class="btn btn-primary mt-3">Continue Shopping</a>
            </div>
        `;
    }
}

// Proceed to checkout
function proceedToCheckout() {
    window.location.href = 'checkout.html';
}

// Continue shopping
function continueShopping() {
    window.location.href = 'homepage.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart page loaded');
});

