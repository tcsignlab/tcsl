// Shopping cart functionality
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    setupCartEvents();
    loadCart();
    displayCart();
});

// Setup event listeners
function setupCartEvents() {
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
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);
    
    // Clear cart button
    document.getElementById('clearCartBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            clearCart();
        }
    });
}

// Load cart from localStorage
function loadCart() {
    cart = CONFIG_HELPERS.getCart();
}

// Save cart to localStorage
function saveCart() {
    CONFIG_HELPERS.saveCart(cart);
}

// Display cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemElement = createCartItem(item, index);
        cartItemsContainer.appendChild(itemElement);
    });
    
    updateSummary();
}

// Create cart item element
function createCartItem(item, index) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    // Format options for display
    const optionsText = formatOptions(item.options);
    
    div.innerHTML = `
        <div class="cart-item-details">
            <h3>${item.productName}</h3>
            <p class="item-specs">${optionsText}</p>
            <p class="item-price">
                ${item.sqft.toFixed(2)} sq ft × ${CONFIG_HELPERS.formatPrice(item.pricePerSqft)}/sq ft = 
                <strong>${CONFIG_HELPERS.formatPrice(item.totalPrice)}</strong>
            </p>
        </div>
        
        <div class="cart-item-actions">
            <div class="quantity-controls">
                <button class="qty-btn" onclick="decreaseQuantity(${index})">-</button>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" class="qty-input">
                <button class="qty-btn" onclick="increaseQuantity(${index})">+</button>
            </div>
            
            <div class="item-total">
                ${CONFIG_HELPERS.formatPrice(item.totalPrice * item.quantity)}
            </div>
            
            <button class="remove-btn" onclick="removeItem(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return div;
}

// Format options for display
function formatOptions(options) {
    const parts = [];
    
    if (options.size) {
        parts.push(`${options.size.width}" × ${options.size.height}"`);
    }
    
    if (options.material) {
        parts.push(options.material);
    }
    
    if (options.printSides) {
        parts.push(options.printSides === 'single' ? 'Single-Sided' : 'Double-Sided');
    }
    
    const finishing = [];
    if (options.welding === 'yes') finishing.push('Welding');
    if (options.grommets === 'yes') finishing.push('Grommets');
    if (options.rope === 'included') finishing.push('Rope');
    if (options.polePockets && options.polePockets !== 'none') {
        finishing.push(`Pole Pockets: ${options.polePockets}`);
    }
    if (options.windSlits === 'yes') finishing.push('Wind Slits');
    
    if (finishing.length > 0) {
        parts.push(finishing.join(', '));
    }
    
    return parts.join(' | ');
}

// Update quantity
function updateQuantity(index, value) {
    const quantity = parseInt(value);
    if (quantity < 1) return;
    
    cart[index].quantity = quantity;
    saveCart();
    displayCart();
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
    displayCart();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart();
        displayCart();
    }
}

// Remove item
function removeItem(index) {
    if (confirm('Remove this item from cart?')) {
        cart.splice(index, 1);
        saveCart();
        displayCart();
        showNotification('Item removed from cart');
    }
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    displayCart();
    showNotification('Cart cleared');
}

// Update cart summary
function updateSummary() {
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.totalPrice * item.quantity;
    });
    
    document.getElementById('subtotal').textContent = CONFIG_HELPERS.formatPrice(subtotal);
    document.getElementById('total').textContent = CONFIG_HELPERS.formatPrice(subtotal);
}

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // In a real implementation, this would redirect to checkout
    showNotification('Checkout functionality coming soon!', 'error');
    
    // Example: Create order summary
    console.log('Order Summary:', {
        items: cart,
        subtotal: calculateSubtotal(),
        timestamp: new Date().toISOString()
    });
}

// Calculate subtotal
function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
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
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
