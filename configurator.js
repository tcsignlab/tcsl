// Product configurator logic
let currentProduct = null;
let selectedOptions = {
    images: 1,
    size: { width: 0, height: 0 },
    material: null,
    printSides: 'single',
    welding: 'yes',
    rope: 'none',
    grommets: 'yes',
    polePockets: 'none',
    windSlits: 'no',
    quantity: 1
};

document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails();
    setupConfiguratorEvents();
});

// Load product details from URL parameter
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load products data
    const productsJson = localStorage.getItem('signs365_products');
    const products = productsJson ? JSON.parse(productsJson) : SAMPLE_PRODUCTS;
    
    currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) {
        window.location.href = 'index.html';
        return;
    }
    
    displayProductInfo();
    populateMaterials();
    updatePricing();
}

// Display product information
function displayProductInfo() {
    document.getElementById('productName').textContent = currentProduct.name;
    
    // Set default material if available
    if (currentProduct.materials && currentProduct.materials.length > 0) {
        selectedOptions.material = currentProduct.materials[0].name;
        updateProductSubtitle();
    }
}

// Update product subtitle
function updateProductSubtitle() {
    const subtitle = document.getElementById('productSubtitle');
    const material = selectedOptions.material || '';
    const width = selectedOptions.size.width || 0;
    const height = selectedOptions.size.height || 0;
    const printType = selectedOptions.printSides === 'single' ? 'Single-Sided' : 'Double-Sided';
    
    subtitle.textContent = `${currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1)} ${material} ${printType}, ${width}" x ${height}"`;
}

// Populate material options
function populateMaterials() {
    const materialDropdown = document.getElementById('materialDropdown');
    materialDropdown.innerHTML = '';
    
    if (!currentProduct.materials) return;
    
    currentProduct.materials.forEach(material => {
        const button = document.createElement('button');
        button.className = 'dropdown-option';
        button.dataset.value = material.name;
        button.textContent = material.name;
        
        if (material.name === selectedOptions.material) {
            button.classList.add('selected');
        }
        
        button.addEventListener('click', () => {
            selectedOptions.material = material.name;
            updateMaterialSelection();
            updateProductSubtitle();
            updatePricing();
        });
        
        materialDropdown.appendChild(button);
    });
}

// Update material selection UI
function updateMaterialSelection() {
    document.querySelectorAll('#materialDropdown .dropdown-option').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.value === selectedOptions.material) {
            btn.classList.add('selected');
        }
    });
    
    document.querySelector('#materialBtn .option-value').textContent = selectedOptions.material;
}

// Setup configurator events
function setupConfiguratorEvents() {
    // Toggle dropdowns
    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', () => {
            const dropdown = button.nextElementSibling;
            if (dropdown && dropdown.classList.contains('option-dropdown')) {
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Size inputs
    document.getElementById('widthInput').addEventListener('input', (e) => {
        selectedOptions.size.width = parseFloat(e.target.value) || 0;
        updateSizeDisplay();
        updateProductSubtitle();
        updatePricing();
    });
    
    document.getElementById('heightInput').addEventListener('input', (e) => {
        selectedOptions.size.height = parseFloat(e.target.value) || 0;
        updateSizeDisplay();
        updateProductSubtitle();
        updatePricing();
    });
    
    // Print sides
    document.querySelectorAll('#printSidesDropdown .dropdown-option').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedOptions.printSides = btn.dataset.value;
            updateOptionSelection('printSides', btn.dataset.value);
            updateProductSubtitle();
            updatePricing();
        });
    });
    
    // Welding
    document.querySelectorAll('#weldingDropdown .dropdown-option').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedOptions.welding = btn.dataset.value;
            updateOptionSelection('welding', btn.dataset.value);
        });
    });
    
    // Rope
    document.querySelectorAll('#ropeDropdown .dropdown-option').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedOptions.rope = btn.dataset.value;
            updateOptionSelection('rope', btn.dataset.value);
        });
    });
    
    // Grommets
    document.querySelectorAll('#grommetsDropdown .dropdown-option').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedOptions.grommets = btn.dataset.value;
            updateOptionSelection('grommets', btn.dataset.value);
        });
    });
    
    // Pole pockets
    document.querySelectorAll('#polePocketsDropdown .dropdown-option').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedOptions.polePockets = btn.dataset.value;
            updateOptionSelection('polePockets', btn.dataset.value);
        });
    });
    
    // Wind slits
    document.querySelectorAll('#windSlitsDropdown .dropdown-option').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedOptions.windSlits = btn.dataset.value;
            updateOptionSelection('windSlits', btn.dataset.value);
        });
    });
    
    // Quantity
    document.getElementById('quantityInput').addEventListener('input', (e) => {
        selectedOptions.quantity = parseInt(e.target.value) || 1;
        updatePricing();
    });
    
    // Image upload
    document.getElementById('imageUploadArea').addEventListener('click', () => {
        document.getElementById('imageUpload').click();
    });
    
    document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
    
    // Add to cart
    document.getElementById('addToCartBtn').addEventListener('click', handleAddToCart);
}

// Update option selection UI
function updateOptionSelection(optionId, value) {
    const button = document.getElementById(`${optionId}Btn`);
    if (button) {
        const valueSpan = button.querySelector('.option-value');
        if (valueSpan) {
            valueSpan.textContent = value.toUpperCase();
        }
    }
    
    // Update dropdown selections
    const dropdown = document.getElementById(`${optionId}Dropdown`);
    if (dropdown) {
        dropdown.querySelectorAll('.dropdown-option').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.value === value) {
                btn.classList.add('selected');
            }
        });
    }
}

// Update size display
function updateSizeDisplay() {
    const sizeBtn = document.getElementById('sizeBtn');
    const valueSpan = sizeBtn.querySelector('.option-value');
    valueSpan.textContent = `${selectedOptions.size.width}" x ${selectedOptions.size.height}"`;
}

// Update pricing
function updatePricing() {
    if (!currentProduct || !currentProduct.pricing) return;
    
    const { width, height } = selectedOptions.size;
    const sqft = CONFIG_HELPERS.calculateSqft(width, height);
    
    // Update pricing table
    if (currentProduct.pricing.singleSided) {
        Object.keys(currentProduct.pricing.singleSided).forEach(material => {
            const pricePerSqft = currentProduct.pricing.singleSided[material];
            const elementId = `price${material.replace(/[^a-zA-Z0-9]/g, '')}`;
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = pricePerSqft.toFixed(2);
            }
        });
    }
    
    if (currentProduct.pricing.doubleSided) {
        const priceDouble = document.getElementById('priceDouble');
        if (priceDouble) {
            if (typeof currentProduct.pricing.doubleSided === 'number') {
                priceDouble.textContent = currentProduct.pricing.doubleSided.toFixed(2);
            } else {
                const material = selectedOptions.material;
                const price = currentProduct.pricing.doubleSided[material] || 0;
                priceDouble.textContent = price.toFixed(2);
            }
        }
    }
    
    // Calculate total
    let pricePerSqft = 0;
    
    if (selectedOptions.printSides === 'single' && currentProduct.pricing.singleSided) {
        pricePerSqft = currentProduct.pricing.singleSided[selectedOptions.material] || 0;
    } else if (selectedOptions.printSides === 'double') {
        if (typeof currentProduct.pricing.doubleSided === 'number') {
            pricePerSqft = currentProduct.pricing.doubleSided;
        } else if (currentProduct.pricing.doubleSided[selectedOptions.material]) {
            pricePerSqft = currentProduct.pricing.doubleSided[selectedOptions.material];
        }
    }
    
    const total = sqft * pricePerSqft * selectedOptions.quantity;
    
    document.getElementById('totalPrice').textContent = total.toFixed(2);
    document.querySelector('.production-time').textContent = `${sqft.toFixed(2)} sqft / ${CONFIG.productionTime} Production`;
}

// Handle image upload
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const uploadArea = document.getElementById('imageUploadArea');
        uploadArea.style.backgroundImage = `url(${event.target.result})`;
        uploadArea.style.backgroundSize = 'contain';
        uploadArea.style.backgroundPosition = 'center';
        uploadArea.style.backgroundRepeat = 'no-repeat';
        uploadArea.innerHTML = '';
    };
    reader.readAsDataURL(file);
}

// Handle add to cart
function handleAddToCart() {
    // Validate
    if (selectedOptions.size.width === 0 || selectedOptions.size.height === 0) {
        showNotification('Please specify dimensions', 'error');
        return;
    }
    
    if (!selectedOptions.material) {
        showNotification('Please select a material', 'error');
        return;
    }
    
    // Calculate final price
    const sqft = CONFIG_HELPERS.calculateSqft(selectedOptions.size.width, selectedOptions.size.height);
    let pricePerSqft = 0;
    
    if (selectedOptions.printSides === 'single' && currentProduct.pricing.singleSided) {
        pricePerSqft = currentProduct.pricing.singleSided[selectedOptions.material] || 0;
    } else if (selectedOptions.printSides === 'double') {
        if (typeof currentProduct.pricing.doubleSided === 'number') {
            pricePerSqft = currentProduct.pricing.doubleSided;
        } else if (currentProduct.pricing.doubleSided[selectedOptions.material]) {
            pricePerSqft = currentProduct.pricing.doubleSided[selectedOptions.material];
        }
    }
    
    const totalPrice = sqft * pricePerSqft * selectedOptions.quantity;
    
    // Create cart item
    const cartItem = {
        productId: currentProduct.id,
        productName: currentProduct.name,
        options: { ...selectedOptions },
        pricePerSqft: pricePerSqft,
        sqft: sqft,
        totalPrice: totalPrice,
        quantity: selectedOptions.quantity,
        timestamp: Date.now()
    };
    
    // Add to cart (using function from app.js)
    if (typeof addToCart === 'function') {
        addToCart(cartItem);
    } else {
        // Fallback: save directly
        const cart = CONFIG_HELPERS.getCart();
        cart.push(cartItem);
        CONFIG_HELPERS.saveCart(cart);
        showNotification('Added to cart!');
    }
    
    // Redirect to cart or catalog
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Show notification (same as in app.js)
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
