// Orders Page JavaScript

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeSearch();
});

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.status-buttons .btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('btn-primary', 'active');
                btn.classList.add('btn-outline-secondary');
            });
            
            // Add active class to clicked button
            this.classList.remove('btn-outline-secondary');
            this.classList.add('btn-primary', 'active');
            
            // Filter orders
            const status = this.dataset.status;
            filterOrdersByStatus(status);
        });
    });
}

function filterOrdersByStatus(status) {
    const orders = document.querySelectorAll('.order-item');
    
    orders.forEach(order => {
        if (status === 'all') {
            order.style.display = 'grid';
        } else {
            if (order.classList.contains(status)) {
                order.style.display = 'grid';
            } else {
                order.style.display = 'none';
            }
        }
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('orderSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const orders = document.querySelectorAll('.order-item');
            
            orders.forEach(order => {
                const orderId = order.querySelector('.order-id-text').textContent.toLowerCase();
                const date = order.querySelector('.col-date span').textContent.toLowerCase();
                
                if (orderId.includes(searchTerm) || date.includes(searchTerm)) {
                    order.style.display = 'grid';
                } else {
                    order.style.display = 'none';
                }
            });
        });
    }
}

// View order details
function viewOrderDetails(orderId) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'order-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h4>Order Details - ${orderId}</h4>
                <button class="close-btn" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="order-info-section">
                    <h5>Order Information</h5>
                    <div class="info-row">
                        <span class="info-label">Order ID:</span>
                        <span class="info-value">${orderId}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Date:</span>
                        <span class="info-value">15 Dec 2024</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Status:</span>
                        <span class="info-value">
                            <span class="badge badge-completed">Completed</span>
                        </span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Payment Method:</span>
                        <span class="info-value">VNPay</span>
                    </div>
                </div>
                
                <div class="items-section">
                    <h5>Order Items</h5>
                    <div class="order-item-detail">
                        <div class="item-image">
                            <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Product">
                        </div>
                        <div class="item-info">
                            <h6>Paracetamol 500mg</h6>
                            <p>Box of 20 tablets</p>
                            <span class="item-qty">Quantity: 2</span>
                        </div>
                        <div class="item-price">$12.00</div>
                    </div>
                    <div class="order-item-detail">
                        <div class="item-image">
                            <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Product">
                        </div>
                        <div class="item-info">
                            <h6>Vitamin C 1000mg</h6>
                            <p>Bottle of 60 tablets</p>
                            <span class="item-qty">Quantity: 1</span>
                        </div>
                        <div class="item-price">$18.50</div>
                    </div>
                    <div class="order-item-detail">
                        <div class="item-image">
                            <img src="https://images.unsplash.com/photo-1550572017-edd951aa0b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Product">
                        </div>
                        <div class="item-info">
                            <h6>Cough Syrup</h6>
                            <p>120ml bottle</p>
                            <span class="item-qty">Quantity: 1</span>
                        </div>
                        <div class="item-price">$8.25</div>
                    </div>
                </div>
                
                <div class="total-section">
                    <div class="total-row">
                        <span>Subtotal:</span>
                        <span>$38.75</span>
                    </div>
                    <div class="total-row">
                        <span>Shipping:</span>
                        <span>$3.00</span>
                    </div>
                    <div class="total-row total">
                        <span><strong>Total:</strong></span>
                        <span><strong>$41.75</strong></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal()">Close</button>
                <button class="btn btn-primary">Download Invoice</button>
            </div>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .order-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .modal-content {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 700px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                animation: slideIn 0.3s ease;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #e9ecef;
            }
            .modal-header h4 {
                margin: 0;
                color: #2c3e50;
            }
            .close-btn {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #6c757d;
                cursor: pointer;
            }
            .modal-body {
                padding: 1.5rem;
            }
            .order-info-section, .items-section {
                margin-bottom: 2rem;
            }
            .order-info-section h5, .items-section h5 {
                color: #2c3e50;
                margin-bottom: 1rem;
            }
            .info-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
            }
            .info-label {
                font-weight: 600;
                color: #6c757d;
            }
            .info-value {
                color: #2c3e50;
            }
            .order-item-detail {
                display: flex;
                gap: 1rem;
                padding: 1rem 0;
                border-bottom: 1px solid #e9ecef;
            }
            .order-item-detail:last-child {
                border-bottom: none;
            }
            .item-image {
                width: 80px;
                height: 80px;
                border-radius: 8px;
                overflow: hidden;
            }
            .item-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .item-info {
                flex: 1;
            }
            .item-info h6 {
                margin: 0 0 0.25rem 0;
                color: #2c3e50;
            }
            .item-info p {
                color: #6c757d;
                margin: 0 0 0.25rem 0;
                font-size: 0.9rem;
            }
            .item-qty {
                font-size: 0.85rem;
                color: #6c757d;
            }
            .item-price {
                font-weight: 600;
                color: #0066cc;
                font-size: 1.1rem;
            }
            .total-section {
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
            }
            .total-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
            }
            .total-row.total {
                border-top: 2px solid #dee2e6;
                padding-top: 0.5rem;
                margin-top: 0.5rem;
                font-size: 1.2rem;
            }
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid #e9ecef;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.order-modal');
    if (modal) {
        modal.remove();
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('order-modal')) {
        closeModal();
    }
});

// Initialize page
console.log('Orders page loaded');

