// Medicare Homepage JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check login status and update UI
    checkLoginStatus();
    
    // Initialize all functionality
    initSearchFunctionality();
    initCartFunctionality();
    initProductInteractions();
    initAnimations();
    initFloatingChat();
});

// Check if user is logged in and update UI accordingly
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('medicare_logged_in') === 'true';
    const userData = isLoggedIn ? JSON.parse(localStorage.getItem('medicare_user')) : null;
    
    if (isLoggedIn && userData) {
        updateNavbarForLoggedInUser(userData);
    }
}

function updateNavbarForLoggedInUser(userData) {
    const rightSideButtons = document.querySelector('.d-flex.align-items-center.gap-3');
    
    if (rightSideButtons) {
        rightSideButtons.innerHTML = `
            <div class="user-info d-flex align-items-center gap-3">
                <span class="text-muted">Welcome, ${userData.email}</span>
                <button class="btn btn-outline-danger btn-sm" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
            <div class="cart-icon position-relative">
                <i class="fas fa-shopping-cart fs-4 text-muted"></i>
                <span class="cart-badge">3</span>
            </div>
        `;
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('medicare_user');
        localStorage.removeItem('medicare_logged_in');
        showNotification('Logged out successfully!', 'success');
        
        // Reload page to show login buttons
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        // Search on button click
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        // Search on Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
        
        // Real-time search suggestions (optional)
        searchInput.addEventListener('input', function() {
            const query = this.value;
            if (query.length > 2) {
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        });
    }
}

function performSearch(query) {
    if (query.trim()) {
        console.log('Searching for:', query);
        // Here you would typically make an API call
        showNotification(`Searching for "${query}"...`, 'info');
        
        // Simulate search delay
        setTimeout(() => {
            showNotification(`Found results for "${query}"`, 'success');
        }, 1000);
    } else {
        showNotification('Please enter a search term', 'warning');
    }
}

function showSearchSuggestions(query) {
    // This would typically fetch suggestions from an API
    const suggestions = [
        'Paracetamol',
        'Vitamin D3',
        'Omega-3',
        'Antiseptic Cream',
        'Pain Relief',
        'Vitamins',
        'Skin Care'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    // You could implement a dropdown with suggestions here
    console.log('Suggestions:', suggestions);
}

function hideSearchSuggestions() {
    // Hide suggestions dropdown
}

// Cart Functionality
function initCartFunctionality() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartBadge = document.querySelector('.cart-badge');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            showCartModal();
        });
    }
    
    // Update cart badge when items are added
    window.addToCart = function(productName) {
        const currentCount = parseInt(cartBadge.textContent) || 0;
        cartBadge.textContent = currentCount + 1;
        cartBadge.style.animation = 'pulse 0.5s ease-in-out';
        
        showNotification(`${productName} added to cart!`, 'success');
        
        // Reset animation
        setTimeout(() => {
            cartBadge.style.animation = '';
        }, 500);
    };
}

function showCartModal() {
    // Redirect to cart page
    window.location.href = 'cart.html';
}

// Product Interactions
function initProductInteractions() {
    const addToCartBtns = document.querySelectorAll('.product-card .btn-success');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            // Add loading state
            const originalText = this.textContent;
            this.innerHTML = '<span class="loading"></span> Adding...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                addToCart(productName);
                this.textContent = originalText;
                this.disabled = false;
            }, 1000);
        });
    });
    
    // Category card interactions
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-title').textContent;
            showNotification(`Browsing ${categoryName} category...`, 'info');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.category-card, .product-card, .hero-title, .hero-subtitle');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Staggered animation for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Floating Chat
function initFloatingChat() {
    const chatBtn = document.querySelector('.chat-btn');
    
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            showChatModal();
        });
    }
}

function showChatModal() {
    // Create chat modal
    const modal = document.createElement('div');
    modal.className = 'chat-modal';
    modal.innerHTML = `
        <div class="chat-modal-content">
            <div class="chat-header">
                <h5>AI Assistant</h5>
                <button class="chat-close">&times;</button>
            </div>
            <div class="chat-body">
                <div class="chat-message bot-message">
                    <p>Hello! I'm your AI assistant. How can I help you with your healthcare needs today?</p>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message..." class="form-control">
                <button class="btn btn-primary">Send</button>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
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
    `;
    
    const content = modal.querySelector('.chat-modal-content');
    content.style.cssText = `
        background: white;
        border-radius: 15px;
        width: 90%;
        max-width: 500px;
        height: 600px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.chat-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#198754' : type === 'warning' ? '#ffc107' : type === 'error' ? '#dc3545' : '#0d6efd'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states to buttons
function addLoadingState(button, text = 'Loading...') {
    const originalText = button.textContent;
    button.innerHTML = `<span class="loading"></span> ${text}`;
    button.disabled = true;
    
    return function removeLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Initialize tooltips if Bootstrap is available
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Add pulse animation for cart badge
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
