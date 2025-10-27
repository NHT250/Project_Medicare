// Categories Page JavaScript

// Sample products data
const productsData = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        description: "Pain relief tablets for headaches and fever",
        price: 7.00,
        oldPrice: 8.00,
        category: "pain-relief",
        purpose: "pain",
        rating: 4.8,
        reviewCount: 124,
        inStock: true,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 2,
        name: "Vitamin D3 1000IU",
        description: "Bone health supplement for strong bones",
        price: 12.49,
        oldPrice: null,
        category: "vitamins",
        purpose: "vitamin",
        rating: 4.6,
        reviewCount: 89,
        inStock: true,
        image: "https://images.unsplash.com/photo-1550572017-edd951aa0b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 3,
        name: "Ibuprofen 400mg",
        description: "Anti-inflammatory pain relief medication",
        price: 8.00,
        oldPrice: null,
        category: "pain-relief",
        purpose: "pain",
        rating: 4.5,
        reviewCount: 67,
        inStock: false,
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 4,
        name: "Omega-3 Fish Oil",
        description: "Heart health capsules with essential fatty acids",
        price: 18.99,
        oldPrice: 22.99,
        category: "heart-health",
        purpose: "heart",
        rating: 4.9,
        reviewCount: 156,
        inStock: true,
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 5,
        name: "Cetirizine 10mg",
        description: "Antihistamine for allergy relief",
        price: 6.49,
        oldPrice: null,
        category: "respiratory",
        purpose: "allergy",
        rating: 4.3,
        reviewCount: 78,
        inStock: true,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 6,
        name: "Daily Multivitamin",
        description: "Complete daily nutrition supplement",
        price: 15.99,
        oldPrice: null,
        category: "vitamins",
        purpose: "vitamin",
        rating: 4.7,
        reviewCount: 203,
        inStock: true,
        image: "https://images.unsplash.com/photo-1550572017-edd951aa0b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 7,
        name: "Aspirin 325mg",
        description: "Blood thinner and pain relief medication",
        price: 4.99,
        oldPrice: null,
        category: "heart-health",
        purpose: "heart",
        rating: 4.4,
        reviewCount: 92,
        inStock: true,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 8,
        name: "Calcium + Vitamin D",
        description: "Bone strengthening supplement combination",
        price: 11.99,
        oldPrice: 14.99,
        category: "vitamins",
        purpose: "vitamin",
        rating: 4.6,
        reviewCount: 145,
        inStock: true,
        image: "https://images.unsplash.com/photo-1550572017-edd951aa0b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 9,
        name: "Melatonin 3mg",
        description: "Natural sleep aid supplement",
        price: 9.99,
        oldPrice: null,
        category: "mental-health",
        purpose: "sleep",
        rating: 4.2,
        reviewCount: 56,
        inStock: true,
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 10,
        name: "Eye Drops",
        description: "Lubricating eye drops for dry eyes",
        price: 7.50,
        oldPrice: null,
        category: "eye-care",
        purpose: "eye",
        rating: 4.1,
        reviewCount: 43,
        inStock: true,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 11,
        name: "Antiseptic Cream",
        description: "Wound care treatment and infection prevention",
        price: 8.99,
        oldPrice: null,
        category: "skin-care",
        purpose: "skin",
        rating: 4.7,
        reviewCount: 87,
        inStock: true,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 12,
        name: "Inhaler",
        description: "Respiratory relief for breathing difficulties",
        price: 25.99,
        oldPrice: null,
        category: "respiratory",
        purpose: "breathing",
        rating: 4.5,
        reviewCount: 34,
        inStock: true,
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
];

// Global variables
let currentPage = 1;
let itemsPerPage = 8;
let filteredProducts = [...productsData];
let currentFilters = {
    category: 'all',
    priceRange: [],
    sortBy: 'popularity'
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    handleURLParameters();
    renderProducts();
    updateResultsCount();
});

function initializePage() {
    // Check login status
    checkLoginStatus();
    
    // Load products
    loadProducts();
}

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
            <button class="btn btn-outline-secondary position-relative">
                <i class="fas fa-heart"></i>
            </button>
            <div class="cart-icon position-relative">
                <i class="fas fa-shopping-cart fs-4 text-muted"></i>
                <span class="cart-badge">3</span>
            </div>
            <div class="user-info d-flex align-items-center gap-3">
                <span class="text-muted">Welcome, ${userData.email}</span>
                <button class="btn btn-outline-danger btn-sm" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        `;
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('medicare_user');
        localStorage.removeItem('medicare_logged_in');
        location.reload();
    }
}

function setupEventListeners() {
    // Category filter
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
    
    // Price range filter
    document.querySelectorAll('.price-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filterByPriceRange();
        });
    });
    
    // Dropdown filters
    document.getElementById('categoryFilter').addEventListener('change', function() {
        currentFilters.category = this.value;
        applyFilters();
    });
    
    document.getElementById('purposeFilter').addEventListener('change', function() {
        currentFilters.purpose = this.value;
        applyFilters();
    });
    
    document.getElementById('sortFilter').addEventListener('change', function() {
        currentFilters.sortBy = this.value;
        applyFilters();
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    // Cart icon click handler
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
}

function filterByCategory(category) {
    // Update active category
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Update dropdown
    document.getElementById('categoryFilter').value = category;
    
    // Apply filter
    currentFilters.category = category;
    applyFilters();
}

function filterByPriceRange() {
    const checkedRanges = Array.from(document.querySelectorAll('.price-checkbox:checked'))
        .map(checkbox => checkbox.dataset.price);
    
    currentFilters.priceRange = checkedRanges;
    applyFilters();
}

function applyFilters() {
    filteredProducts = productsData.filter(product => {
        // Category filter
        if (currentFilters.category !== 'all' && product.category !== currentFilters.category) {
            return false;
        }
        
        // Price range filter
        if (currentFilters.priceRange.length > 0) {
            const price = product.price;
            const inRange = currentFilters.priceRange.some(range => {
                switch(range) {
                    case 'under-10': return price < 10;
                    case '10-25': return price >= 10 && price <= 25;
                    case '25-50': return price >= 25 && price <= 50;
                    case 'over-50': return price > 50;
                    default: return true;
                }
            });
            if (!inRange) return false;
        }
        
        return true;
    });
    
    // Sort products
    sortProducts();
    
    // Reset to first page
    currentPage = 1;
    
    // Render products
    renderProducts();
    updateResultsCount();
    renderPagination();
}

function sortProducts() {
    filteredProducts.sort((a, b) => {
        switch(currentFilters.sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name':
                return a.name.localeCompare(b.name);
            case 'rating':
                return b.rating - a.rating;
            case 'popularity':
            default:
                return b.reviewCount - a.reviewCount;
        }
    });
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No products found</h4>
                <p class="text-muted">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card fade-in">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                    ${product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
            </div>
            <div class="product-info">
                <h6 class="product-name">${product.name}</h6>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-text">(${product.reviewCount})</span>
                </div>
                <div class="price-section">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn btn-add-cart" ${!product.inStock ? 'disabled' : ''} onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart me-1"></i>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button class="btn btn-view" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </a>
        </li>
    `;
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        paginationHTML += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(1)">1</a></li>`;
        if (startPage > 2) {
            paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
        paginationHTML += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${totalPages})">${totalPages}</a></li>`;
    }
    
    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </a>
        </li>
    `;
    
    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderProducts();
    renderPagination();
    
    // Scroll to top of products
    document.getElementById('productsGrid').scrollIntoView({ behavior: 'smooth' });
}

function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    resultsCount.textContent = `${filteredProducts.length} products found`;
}

function clearFilters() {
    // Reset category
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector('[data-category="all"]').classList.add('active');
    
    // Reset price range
    document.querySelectorAll('.price-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset dropdowns
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('purposeFilter').value = 'all';
    document.getElementById('sortFilter').value = 'popularity';
    
    // Reset filters
    currentFilters = {
        category: 'all',
        priceRange: [],
        sortBy: 'popularity'
    };
    
    // Apply filters
    applyFilters();
}

function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    
    // Get or create cart
    let cart = JSON.parse(localStorage.getItem('medicare_cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    localStorage.setItem('medicare_cart', JSON.stringify(cart));
    
    // Update cart badge
    const cartBadge = document.querySelector('.cart-badge');
    const currentCount = parseInt(cartBadge.textContent) || 0;
    cartBadge.textContent = currentCount + 1;
    cartBadge.style.animation = 'pulse 0.5s ease-in-out';
    
    // Show notification
    showNotification(`${product.name} added to cart!`, 'success');
    
    // Reset animation
    setTimeout(() => {
        cartBadge.style.animation = '';
    }, 500);
}

function viewProduct(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    // Navigate to product detail page
    window.location.href = `product-detail.html?id=${productId}`;
}

function performSearch(query) {
    if (!query.trim()) {
        applyFilters();
        return;
    }
    
    const searchResults = productsData.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    filteredProducts = searchResults;
    sortProducts();
    currentPage = 1;
    renderProducts();
    updateResultsCount();
    renderPagination();
}

function loadProducts() {
    // This would typically load products from an API
    console.log('Loading products...');
}

function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && category !== 'all') {
        // Set active category
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        const categoryItem = document.querySelector(`[data-category="${category}"]`);
        if (categoryItem) {
            categoryItem.classList.add('active');
        }
        
        // Update dropdown
        document.getElementById('categoryFilter').value = category;
        
        // Apply filter
        currentFilters.category = category;
        applyFilters();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
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
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
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
