// Main application logic
let currentCategory = 'whats-new';
let productsData = [];

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    setupEventListeners();
    await loadProducts();
    // Show What's New by default
    showWhatsNew();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const category = item.dataset.category;
            if (category) {
                if (category === 'whats-new') {
                    showWhatsNew();
                } else {
                    switchCategory(category);
                }
            }
        });
    });
    
    // Card links in What's New section
    document.querySelectorAll('.card-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            if (category) {
                switchCategory(category);
            }
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.querySelector('.close-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            sideMenu.classList.add('active');
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            sideMenu.classList.remove('active');
        });
    }
    
    // Show admin link if authenticated
    if (CONFIG_HELPERS.isAdminAuthenticated()) {
        const adminLink = document.getElementById('adminLink');
        if (adminLink) {
            adminLink.style.display = 'block';
        }
    }
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            CONFIG_HELPERS.setAdminAuth(false);
            window.location.href = 'index.html';
        });
    }
}

// Show What's New section
function showWhatsNew() {
    currentCategory = 'whats-new';
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.category === 'whats-new') {
            item.classList.add('active');
        }
    });
    
    // Show What's New section, hide products
    const whatsNewSection = document.getElementById('whatsNewSection');
    const productsSection = document.getElementById('productsSection');
    
    if (whatsNewSection) {
        whatsNewSection.style.display = 'block';
    }
    if (productsSection) {
        productsSection.style.display = 'none';
    }
}

// Load products from Google Sheets or local storage
async function loadProducts() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'block';
    
    try {
        // Try to load from Google Sheets
        const sheetUrl = CONFIG_HELPERS.getSheetUrl(CONFIG.sheets.products);
        
        if (sheetUrl) {
            const response = await fetch(sheetUrl);
            if (response.ok) {
                const data = await response.json();
                productsData = parseSheetData(data.values);
                saveProductsToLocal(productsData);
            } else {
                throw new Error('Failed to fetch from Google Sheets');
            }
        } else {
            throw new Error('Google Sheets not configured');
        }
    } catch (error) {
        console.log('Loading from sample data:', error.message);
        // Fallback to sample data
        productsData = SAMPLE_PRODUCTS;
        saveProductsToLocal(productsData);
    }
    
    if (loading) loading.style.display = 'none';
}

// Parse Google Sheets data
function parseSheetData(rows) {
    if (!rows || rows.length < 2) return [];
    
    const headers = rows[0].map(h => h.toLowerCase().trim());
    const products = [];
    
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0) continue;
        
        const product = {};
        
        headers.forEach((header, index) => {
            const value = row[index] || '';
            
            // Parse JSON fields
            if (header === 'materials' || header === 'materials_json') {
                try {
                    const parsed = JSON.parse(value);
                    product.materials = parsed.materials || parsed;
                } catch (e) {
                    console.warn('Failed to parse materials:', value);
                    product.materials = [];
                }
            } else if (header === 'options' || header === 'options_json') {
                try {
                    product.options = JSON.parse(value);
                } catch (e) {
                    console.warn('Failed to parse options:', value);
                    product.options = {};
                }
            } else if (header === 'pricing' || header === 'pricing_json') {
                try {
                    product.pricing = JSON.parse(value);
                } catch (e) {
                    console.warn('Failed to parse pricing:', value);
                    product.pricing = {};
                }
            } else if (header === 'image' || header === 'image_url') {
                product.image = value;
            } else {
                product[header] = value;
            }
        });
        
        if (product.id && product.name) {
            // Ensure required fields exist
            if (!product.status) product.status = 'active';
            if (!product.materials) product.materials = [];
            if (!product.options) product.options = {};
            if (!product.pricing) product.pricing = {};
            if (!product.category) product.category = 'misc';
            
            products.push(product);
        }
    }
    
    return products;
}

// Save products to localStorage
function saveProductsToLocal(products) {
    localStorage.setItem('signs365_products', JSON.stringify(products));
}

// Load products from localStorage
function loadProductsFromLocal() {
    const products = localStorage.getItem('signs365_products');
    return products ? JSON.parse(products) : SAMPLE_PRODUCTS;
}

// Switch category
function switchCategory(category) {
    currentCategory = category;
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.category === category) {
            item.classList.add('active');
        }
    });
    
    // Hide What's New, show products
    const whatsNewSection = document.getElementById('whatsNewSection');
    const productsSection = document.getElementById('productsSection');
    
    if (whatsNewSection) {
        whatsNewSection.style.display = 'none';
    }
    if (productsSection) {
        productsSection.style.display = 'block';
    }
    
    updateCategoryDisplay();
}

// Update category display
function updateCategoryDisplay() {
    const categoryTitle = document.getElementById('categoryTitle');
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    // Update title
    const categoryNames = {
        banner: 'Banner Products',
        rigid: 'Rigid Products',
        adhesive: 'Adhesive Products',
        'real-estate': 'Real Estate Products',
        magnet: 'Magnet Products',
        apparel: 'Apparel Products',
        misc: 'Miscellaneous Products'
    };
    
    if (categoryTitle) {
        categoryTitle.textContent = categoryNames[currentCategory] || 'Products';
    }
    
    // Filter and display products
    const filteredProducts = productsData.filter(p => 
        p.category === currentCategory && p.status === 'active'
    );
    
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align:center; padding: 40px; color: #666;">No products available in this category.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('a');
    card.href = `product.html?id=${product.id}`;
    card.className = 'product-card';
    
    const img = document.createElement('img');
    img.className = 'product-image';
    img.src = product.image || 'https://via.placeholder.com/400x300?text=Product';
    img.alt = product.name;
    
    const info = document.createElement('div');
    info.className = 'product-info';
    
    const title = document.createElement('div');
    title.className = 'product-title';
    title.textContent = product.name;
    
    const description = document.createElement('div');
    description.className = 'product-description';
    description.textContent = product.description;
    
    info.appendChild(title);
    info.appendChild(description);
    
    card.appendChild(img);
    card.appendChild(info);
    
    return card;
}

// Get product by ID
function getProductById(id) {
    return productsData.find(p => p.id === id);
}

// Add to cart
function addToCart(item) {
    const cart = CONFIG_HELPERS.getCart();
    
    // Check if item already exists
    const existingIndex = cart.findIndex(i => 
        i.productId === item.productId && 
        JSON.stringify(i.options) === JSON.stringify(item.options)
    );
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }
    
    CONFIG_HELPERS.saveCart(cart);
    updateCartCount();
    showNotification('Added to cart!');
}

// Update cart count in UI
function updateCartCount() {
    const cart = CONFIG_HELPERS.getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartBadge = document.getElementById('cart-mobile-nav-menu-quantity');
    if (cartBadge) {
        cartBadge.textContent = totalItems > 0 ? ` (${totalItems})` : '';
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update cart count on page load
updateCartCount();

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        company: document.getElementById('contactCompany').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value,
        timestamp: new Date().toISOString()
    };
    
    // In production, send to backend
    console.log('Contact form submitted:', formData);
    
    // Show success message
    showNotification('Thank you! We\'ll respond within 2 business hours.', 'success');
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Store in localStorage for admin reference
    const contacts = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    contacts.push(formData);
    localStorage.setItem('contact_submissions', JSON.stringify(contacts));
}
