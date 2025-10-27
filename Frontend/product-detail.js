// Product Detail Page JavaScript

// Global variables
let currentQuantity = 1;
let currentProduct = {
    id: 1,
    name: "Paracetamol 500mg Tablets",
    price: 12.99,
    originalPrice: 15.99,
    discount: 18,
    stock: true,
    rating: 4.5,
    reviews: 127,
    images: [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ]
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    loadProductData();
    animateElements();
});

// Initialize page elements
function initializePage() {
    // Set initial quantity
    updateQuantityDisplay();
    
    // Initialize image gallery
    initializeImageGallery();
    
    // Initialize tabs
    initializeTabs();
    
    // Load related products
    loadRelatedProducts();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Cart functionality
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', showCart);
    }
    
    // Wishlist functionality
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', toggleWishlist);
    }
    
    // Image zoom functionality
    const mainImage = document.querySelector('#mainProductImage');
    if (mainImage) {
        mainImage.addEventListener('click', openImageZoom);
    }
    
    // Quantity controls
    const quantityInput = document.querySelector('#quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            const value = parseInt(this.value);
            if (value >= 1 && value <= 10) {
                currentQuantity = value;
                updateQuantityDisplay();
            } else {
                this.value = currentQuantity;
            }
        });
    }
}

// Image gallery functions
function initializeImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            changeMainImage(this);
        });
    });
}

function changeMainImage(thumbnail) {
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
    
    // Get the image source from thumbnail
    const img = thumbnail.querySelector('img');
    const mainImage = document.querySelector('#mainProductImage');
    
    if (img && mainImage) {
        // Add fade effect
        mainImage.style.opacity = '0.5';
        
        setTimeout(() => {
            mainImage.src = img.src.replace('w=150', 'w=600');
            mainImage.alt = img.alt;
            mainImage.style.opacity = '1';
        }, 150);
    }
}

function openImageZoom() {
    const mainImage = document.querySelector('#mainProductImage');
    if (mainImage) {
        // Create modal for image zoom
        const modal = document.createElement('div');
        modal.className = 'image-zoom-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeImageZoom()">
                <div class="modal-content">
                    <button class="close-btn" onclick="closeImageZoom()">&times;</button>
                    <img src="${mainImage.src}" alt="${mainImage.alt}" class="zoomed-image">
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .image-zoom-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .close-btn {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                z-index: 10000;
            }
            .zoomed-image {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                border-radius: 8px;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
    }
}

function closeImageZoom() {
    const modal = document.querySelector('.image-zoom-modal');
    if (modal) {
        modal.remove();
    }
}

// Quantity control functions
function increaseQuantity() {
    if (currentQuantity < 10) {
        currentQuantity++;
        updateQuantityDisplay();
    }
}

function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        updateQuantityDisplay();
    }
}

function updateQuantityDisplay() {
    const quantityInput = document.querySelector('#quantity');
    if (quantityInput) {
        quantityInput.value = currentQuantity;
    }
}

// Cart functions
function addToCart() {
    const product = {
        ...currentProduct,
        quantity: currentQuantity,
        totalPrice: currentProduct.price * currentQuantity
    };
    
    // Show loading state
    const addBtn = document.querySelector('.add-to-cart-btn');
    const originalText = addBtn.innerHTML;
    addBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Adding...';
    addBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Get existing cart from localStorage
        let cart = JSON.parse(localStorage.getItem('medicare_cart') || '[]');
        
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += product.quantity;
            existingItem.totalPrice = existingItem.price * existingItem.quantity;
        } else {
            cart.push(product);
        }
        
        // Save to localStorage
        localStorage.setItem('medicare_cart', JSON.stringify(cart));
        
        // Update cart badge
        updateCartBadge();
        
        // Show success message
        showNotification('Product added to cart!', 'success');
        
        // Reset button
        addBtn.innerHTML = originalText;
        addBtn.disabled = false;
        
        // Add success animation
        addBtn.classList.add('btn-success');
        setTimeout(() => {
            addBtn.classList.remove('btn-success');
        }, 2000);
        
    }, 1000);
}

function buyNow() {
    // Add to cart first
    addToCart();
    
    // Then redirect to checkout
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 1000);
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('medicare_cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function showCart() {
    // Redirect to cart page
    window.location.href = 'cart.html';
}

// Wishlist functions
function toggleWishlist() {
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        const isWishlisted = wishlistBtn.classList.contains('wishlisted');
        
        if (isWishlisted) {
            wishlistBtn.classList.remove('wishlisted');
            wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
            showNotification('Removed from wishlist', 'info');
        } else {
            wishlistBtn.classList.add('wishlisted');
            wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
            showNotification('Added to wishlist', 'success');
        }
    }
}

// Search functions
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        // In a real app, this would perform actual search
        showNotification(`Searching for: ${query}`, 'info');
        // Redirect to search results page
        // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
}

// Tab functions
function initializeTabs() {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add animation to tab content
            const targetId = this.getAttribute('data-bs-target');
            const targetContent = document.querySelector(targetId);
            
            if (targetContent) {
                targetContent.classList.add('fade-in');
                setTimeout(() => {
                    targetContent.classList.remove('fade-in');
                }, 500);
            }
        });
    });
}

// Related products functions
function loadRelatedProducts() {
    const relatedProducts = [
        {
            id: 2,
            name: "Ibuprofen 200mg",
            price: 8.99,
            image: "https://images.unsplash.com/photo-1550572017-edd951aa0b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 3,
            name: "Aspirin 325mg",
            price: 6.99,
            image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 4,
            name: "Vitamin C 1000mg",
            price: 15.99,
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 5,
            name: "Daily Multivitamin",
            price: 22.99,
            image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        }
    ];
    
    // Add click handlers to related product buttons
    const relatedButtons = document.querySelectorAll('.related-product-card .btn');
    relatedButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const product = relatedProducts[index];
            if (product) {
                addRelatedProductToCart(product);
            }
        });
    });
}

function addRelatedProductToCart(product) {
    const cartProduct = {
        ...product,
        quantity: 1,
        totalPrice: product.price
    };
    
    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('medicare_cart') || '[]');
    
    // Check if product already exists
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
        cart.push(cartProduct);
    }
    
    // Save to localStorage
    localStorage.setItem('medicare_cart', JSON.stringify(cart));
    
    // Update cart badge
    updateCartBadge();
    
    // Show success message
    showNotification(`${product.name} added to cart!`, 'success');
    
    // Add button animation
    const button = event.target;
    button.classList.add('btn-success');
    button.innerHTML = '<i class="fas fa-check me-1"></i>Added!';
    
    setTimeout(() => {
        button.classList.remove('btn-success');
        button.innerHTML = 'Add';
    }, 2000);
}

// Utility functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        }
        .notification-success {
            background: #10b981;
        }
        .notification-info {
            background: #3b82f6;
        }
        .notification-warning {
            background: #f59e0b;
        }
        .notification-error {
            background: #ef4444;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle',
        error: 'times-circle'
    };
    return icons[type] || 'info-circle';
}

function loadProductData() {
    // In a real app, this would load product data from API
    // For now, we'll use the predefined data
    updateProductInfo();
}

function updateProductInfo() {
    // Update product title
    const title = document.querySelector('.product-title');
    if (title) {
        title.textContent = currentProduct.name;
    }
    
    // Update price
    const currentPrice = document.querySelector('.current-price');
    const oldPrice = document.querySelector('.old-price');
    const discountBadge = document.querySelector('.discount-badge');
    
    if (currentPrice) currentPrice.textContent = `$${currentProduct.price}`;
    if (oldPrice) oldPrice.textContent = `$${currentProduct.originalPrice}`;
    if (discountBadge) discountBadge.textContent = `${currentProduct.discount}% OFF`;
    
    // Update rating
    const ratingText = document.querySelector('.rating-text');
    if (ratingText) {
        ratingText.textContent = `${currentProduct.rating} (${currentProduct.reviews} reviews)`;
    }
}

function animateElements() {
    // Add animation classes to elements
    const elements = document.querySelectorAll('.product-info, .product-images, .product-details-section, .related-products-section');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Export functions for global access
window.changeMainImage = changeMainImage;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.addToCart = addToCart;
window.buyNow = buyNow;
window.toggleWishlist = toggleWishlist;
window.closeImageZoom = closeImageZoom;