// Admin panel logic
let currentTab = 'products';
let editingProduct = null;
let editingCategory = null;
let categories = [];

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
});

// Check admin authentication
function checkAdminAuth() {
    if (CONFIG_HELPERS.isAdminAuthenticated()) {
        showAdminPanel();
    } else {
        showLoginScreen();
    }
}

// Show login screen
function showLoginScreen() {
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('adminPassword').value;
        
        if (password === CONFIG.adminPassword) {
            CONFIG_HELPERS.setAdminAuth(true);
            showAdminPanel();
        } else {
            alert('Incorrect password');
        }
    });
}

// Show admin panel
function showAdminPanel() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    
    setupAdminEvents();
    
    // Load categories first (needed for product dropdown)
    categories = loadCategoriesFromLocal();
    
    // Update product category dropdown
    updateProductCategoryDropdown();
    
    // Then load products
    loadProductsTab();
}

// Setup admin event listeners
function setupAdminEvents() {
    // Tab switching
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });
    
    // Logout
    document.getElementById('adminLogoutBtn').addEventListener('click', () => {
        CONFIG_HELPERS.setAdminAuth(false);
        window.location.reload();
    });
    
    // Products tab
    document.getElementById('addProductBtn').addEventListener('click', () => {
        editingProduct = null;
        openProductModal();
    });
    
    document.getElementById('syncSheetsBtn').addEventListener('click', syncWithGoogleSheets);
    
    // Categories tab
    document.getElementById('addCategoryBtn').addEventListener('click', () => {
        editingCategory = null;
        openCategoryModal();
    });
    
    document.getElementById('importCategoriesBtn').addEventListener('click', importCategories);
    document.getElementById('exportCategoriesBtn').addEventListener('click', exportCategories);
    
    // Category modal
    document.getElementById('cancelCategoryBtn').addEventListener('click', closeCategoryModal);
    document.getElementById('closeCategoryModal').addEventListener('click', closeCategoryModal);
    document.getElementById('categoryForm').addEventListener('submit', saveCategory);
    
    // Icon preview
    document.getElementById('categoryIconInput').addEventListener('input', updateIconPreview);
    
    // Icon suggestions
    document.querySelectorAll('.icon-suggestion').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const icon = e.currentTarget.dataset.icon;
            document.getElementById('categoryIconInput').value = icon;
            updateIconPreview();
        });
    });
    
    // Category modal close
    const categoryModal = document.getElementById('categoryModal');
    categoryModal.addEventListener('click', (e) => {
        if (e.target === categoryModal) {
            closeCategoryModal();
        }
    });
    
    // Settings tab
    document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);
    loadSettings();
    
    // Product modal
    document.getElementById('cancelProductBtn').addEventListener('click', closeProductModal);
    document.getElementById('productForm').addEventListener('submit', saveProduct);
    
    // Close modal
    const modal = document.getElementById('productModal');
    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', closeProductModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProductModal();
        }
    });
}

// Switch tab
function switchTab(tabName) {
    currentTab = tabName;
    
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Hide all content
    document.querySelectorAll('.admin-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show selected content
    const contentMap = {
        'products': 'productsTab',
        'categories': 'categoriesTab',
        'images': 'imagesTab',
        'settings': 'settingsTab'
    };
    
    const contentId = contentMap[tabName];
    if (contentId) {
        document.getElementById(contentId).style.display = 'block';
    }
    
    // Load content
    switch(tabName) {
        case 'products':
            loadProductsTab();
            break;
        case 'categories':
            loadCategoriesTab();
            break;
        case 'images':
            loadImagesTab();
            break;
    }
}

// Load products tab
function loadProductsTab() {
    const productsJson = localStorage.getItem('signs365_products');
    const products = productsJson ? JSON.parse(productsJson) : SAMPLE_PRODUCTS;
    
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const row = createProductRow(product);
        tbody.appendChild(row);
    });
}

// Create product row
function createProductRow(product) {
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td>${product.id}</td>
        <td><img src="${product.image || 'https://via.placeholder.com/60'}" alt="${product.name}"></td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.description || ''}</td>
        <td><span class="status-badge ${product.status}">${product.status}</span></td>
        <td class="table-actions">
            <i class="fas fa-edit action-icon" data-action="edit"></i>
            <i class="fas fa-trash action-icon delete" data-action="delete"></i>
        </td>
    `;
    
    // Edit button
    tr.querySelector('[data-action="edit"]').addEventListener('click', () => {
        editingProduct = product;
        openProductModal(product);
    });
    
    // Delete button
    tr.querySelector('[data-action="delete"]').addEventListener('click', () => {
        deleteProduct(product.id);
    });
    
    return tr;
}

// Open product modal
function openProductModal(product = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    
    // Make sure categories are loaded and dropdown is updated
    if (categories.length === 0) {
        categories = loadCategoriesFromLocal();
    }
    updateProductCategoryDropdown();
    
    if (product) {
        title.textContent = 'Edit Product';
        populateProductForm(product);
    } else {
        title.textContent = 'Add New Product';
        document.getElementById('productForm').reset();
    }
    
    modal.classList.add('active');
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    editingProduct = null;
}

// Populate product form
function populateProductForm(product) {
    document.getElementById('productNameInput').value = product.name;
    document.getElementById('productCategoryInput').value = product.category;
    document.getElementById('productDescriptionInput').value = product.description || '';
    document.getElementById('productImageInput').value = product.image || '';
    document.getElementById('productStatusInput').value = product.status;
    
    if (product.materials) {
        document.getElementById('productMaterialsInput').value = JSON.stringify(product.materials, null, 2);
    }
    
    if (product.options) {
        document.getElementById('productOptionsInput').value = JSON.stringify(product.options, null, 2);
    }
}

// Save product
function saveProduct(e) {
    e.preventDefault();
    
    const productsJson = localStorage.getItem('signs365_products');
    let products = productsJson ? JSON.parse(productsJson) : SAMPLE_PRODUCTS;
    
    // Get form data
    const name = document.getElementById('productNameInput').value;
    const category = document.getElementById('productCategoryInput').value;
    const description = document.getElementById('productDescriptionInput').value;
    const image = document.getElementById('productImageInput').value;
    const status = document.getElementById('productStatusInput').value;
    
    let materials = [];
    let options = {};
    
    try {
        const materialsInput = document.getElementById('productMaterialsInput').value;
        if (materialsInput) {
            materials = JSON.parse(materialsInput);
        }
    } catch (e) {
        alert('Invalid materials JSON');
        return;
    }
    
    try {
        const optionsInput = document.getElementById('productOptionsInput').value;
        if (optionsInput) {
            options = JSON.parse(optionsInput);
        }
    } catch (e) {
        alert('Invalid options JSON');
        return;
    }
    
    // Generate pricing from materials
    const pricing = {
        singleSided: {},
        doubleSided: {}
    };
    
    materials.forEach(mat => {
        pricing.singleSided[mat.name] = mat.price;
        pricing.doubleSided[mat.name] = mat.price * 1.8; // 1.8x for double-sided
    });
    
    if (editingProduct) {
        // Update existing product
        const index = products.findIndex(p => p.id === editingProduct.id);
        if (index !== -1) {
            products[index] = {
                ...products[index],
                name,
                category,
                description,
                image,
                status,
                materials,
                options,
                pricing
            };
        }
    } else {
        // Add new product
        const newProduct = {
            id: name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
            name,
            category,
            description,
            image,
            status,
            materials,
            options,
            pricing
        };
        products.push(newProduct);
    }
    
    // Save to localStorage
    localStorage.setItem('signs365_products', JSON.stringify(products));
    
    // Refresh table
    loadProductsTab();
    closeProductModal();
    
    showNotification('Product saved successfully');
}

// Delete product
function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const productsJson = localStorage.getItem('signs365_products');
    let products = productsJson ? JSON.parse(productsJson) : [];
    
    products = products.filter(p => p.id !== productId);
    localStorage.setItem('signs365_products', JSON.stringify(products));
    
    loadProductsTab();
    showNotification('Product deleted');
}

// Sync with Google Sheets
async function syncWithGoogleSheets() {
    const btn = document.getElementById('syncSheetsBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Syncing...';
    
    try {
        const sheetsId = CONFIG.sheetsId || CONFIG_HELPERS.getSettings().sheetsId;
        const apiKey = CONFIG.apiKey || CONFIG_HELPERS.getSettings().apiKey;
        
        if (!sheetsId || !apiKey) {
            throw new Error('Google Sheets not configured. Please add your Sheets ID and API Key in Settings tab.');
        }
        
        const sheetName = CONFIG.sheets.products || 'Products';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/${sheetName}?key=${apiKey}`;
        
        console.log('Fetching from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Sheets API Error:', errorData);
            throw new Error(`Failed to fetch from Google Sheets: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        if (!data.values || data.values.length < 2) {
            throw new Error('No data found in sheet. Make sure your sheet has headers in row 1 and data in row 2+');
        }
        
        // Parse sheet data
        const products = parseSheetData(data.values);
        
        if (products.length === 0) {
            throw new Error('No valid products found. Check that your sheet has id and name columns.');
        }
        
        // Save to localStorage
        localStorage.setItem('signs365_products', JSON.stringify(products));
        
        // Refresh table
        loadProductsTab();
        
        showNotification(`✓ Synced ${products.length} products from Google Sheets`);
    } catch (error) {
        console.error('Sync error:', error);
        showNotification(error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-sync"></i> Sync with Google Sheets';
    }
}

// Load categories tab
function loadCategoriesTab() {
    categories = loadCategoriesFromLocal();
    
    const tbody = document.getElementById('categoriesTableBody');
    tbody.innerHTML = '';
    
    // Sort by sort_order
    categories.sort((a, b) => (a.sort_order || 999) - (b.sort_order || 999));
    
    categories.forEach(category => {
        const row = createCategoryRow(category);
        tbody.appendChild(row);
    });
    
    // Update product category dropdown
    updateProductCategoryDropdown();
}

// Create category table row
function createCategoryRow(category) {
    const tr = document.createElement('tr');
    
    // Count products in this category
    const productsJson = localStorage.getItem('signs365_products');
    const products = productsJson ? JSON.parse(productsJson) : [];
    const productCount = products.filter(p => p.category === category.id).length;
    
    tr.innerHTML = `
        <td>
            <i class="fas fa-grip-vertical drag-handle"></i>
            ${category.sort_order || '-'}
        </td>
        <td><i class="fas ${category.icon || 'fa-tag'}"></i></td>
        <td><code>${category.id}</code></td>
        <td><strong>${category.name}</strong></td>
        <td>${category.description || ''}</td>
        <td>${productCount}</td>
        <td><span class="status-badge ${category.status || 'active'}">${category.status || 'active'}</span></td>
        <td class="table-actions">
            <i class="fas fa-edit action-icon" data-action="edit"></i>
            <i class="fas fa-trash action-icon delete" data-action="delete"></i>
        </td>
    `;
    
    // Edit button
    tr.querySelector('[data-action="edit"]').addEventListener('click', () => {
        editingCategory = category;
        openCategoryModal(category);
    });
    
    // Delete button
    tr.querySelector('[data-action="delete"]').addEventListener('click', () => {
        deleteCategory(category.id, productCount);
    });
    
    return tr;
}

// Load categories from localStorage
function loadCategoriesFromLocal() {
    const saved = localStorage.getItem('signs365_categories');
    if (saved) {
        return JSON.parse(saved);
    }
    
    // Default categories
    const defaultCategories = [
        { id: 'banner', name: 'Banner', description: 'Vinyl banners and flexible print materials', icon: 'fa-flag', sort_order: 1, status: 'active' },
        { id: 'rigid', name: 'Rigid', description: 'Hard substrates including coroplast and acrylic', icon: 'fa-square', sort_order: 2, status: 'active' },
        { id: 'adhesive', name: 'Adhesive', description: 'Stickers, decals and adhesive vinyl', icon: 'fa-sticky-note', sort_order: 3, status: 'active' },
        { id: 'real-estate', name: 'Real Estate', description: 'Real estate signs and yard signs', icon: 'fa-home', sort_order: 4, status: 'active' },
        { id: 'magnet', name: 'Magnet', description: 'Magnetic materials for vehicles and displays', icon: 'fa-magnet', sort_order: 5, status: 'active' },
        { id: 'apparel', name: 'Apparel', description: 'Custom printed clothing and wearables', icon: 'fa-tshirt', sort_order: 6, status: 'active' },
        { id: 'misc', name: 'Miscellaneous', description: 'Other specialty products', icon: 'fa-th', sort_order: 7, status: 'active' }
    ];
    
    // Save to localStorage for future use
    localStorage.setItem('signs365_categories', JSON.stringify(defaultCategories));
    
    return defaultCategories;
}

// Save categories to localStorage
function saveCategories(cats) {
    localStorage.setItem('signs365_categories', JSON.stringify(cats));
    categories = cats;
}

// Open category modal
function openCategoryModal(category = null) {
    const modal = document.getElementById('categoryModal');
    const title = document.getElementById('categoryModalTitle');
    
    if (category) {
        title.textContent = 'Edit Category';
        populateCategoryForm(category);
    } else {
        title.textContent = 'Add New Category';
        document.getElementById('categoryForm').reset();
        // Set default icon
        document.getElementById('categoryIconInput').value = 'fa-tag';
        updateIconPreview();
    }
    
    modal.classList.add('active');
}

// Close category modal
function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
    editingCategory = null;
}

// Populate category form
function populateCategoryForm(category) {
    document.getElementById('categoryIdInput').value = category.id;
    document.getElementById('categoryNameInput').value = category.name;
    document.getElementById('categoryDescriptionInput').value = category.description || '';
    document.getElementById('categoryIconInput').value = category.icon || 'fa-tag';
    document.getElementById('categorySortInput').value = category.sort_order || 1;
    document.getElementById('categoryStatusInput').value = category.status || 'active';
    
    // Disable ID editing for existing categories
    if (editingCategory) {
        document.getElementById('categoryIdInput').disabled = true;
    } else {
        document.getElementById('categoryIdInput').disabled = false;
    }
    
    updateIconPreview();
}

// Update icon preview
function updateIconPreview() {
    const iconValue = document.getElementById('categoryIconInput').value;
    const preview = document.getElementById('iconPreview');
    
    // Remove old classes
    preview.className = '';
    
    // Add new classes
    preview.className = 'fas ' + iconValue;
}

// Save category
function saveCategory(e) {
    e.preventDefault();
    
    const id = document.getElementById('categoryIdInput').value.toLowerCase().trim();
    const name = document.getElementById('categoryNameInput').value.trim();
    const description = document.getElementById('categoryDescriptionInput').value.trim();
    const icon = document.getElementById('categoryIconInput').value.trim();
    const sort_order = parseInt(document.getElementById('categorySortInput').value);
    const status = document.getElementById('categoryStatusInput').value;
    
    // Validate ID format
    if (!/^[a-z-]+$/.test(id)) {
        alert('Category ID must contain only lowercase letters and hyphens');
        return;
    }
    
    if (editingCategory) {
        // Update existing category
        const index = categories.findIndex(c => c.id === editingCategory.id);
        if (index !== -1) {
            categories[index] = {
                ...categories[index],
                name,
                description,
                icon,
                sort_order,
                status
            };
        }
    } else {
        // Check if ID already exists
        if (categories.some(c => c.id === id)) {
            alert('Category ID already exists. Please use a different ID.');
            return;
        }
        
        // Add new category
        categories.push({
            id,
            name,
            description,
            icon,
            sort_order,
            status
        });
    }
    
    // Save to localStorage
    saveCategories(categories);
    
    // Refresh table
    loadCategoriesTab();
    closeCategoryModal();
    
    showNotification('Category saved successfully');
}

// Delete category
function deleteCategory(categoryId, productCount) {
    if (productCount > 0) {
        if (!confirm(`This category has ${productCount} product(s). Deleting it will not delete the products, but they will need to be reassigned to another category. Continue?`)) {
            return;
        }
    } else {
        if (!confirm('Are you sure you want to delete this category?')) {
            return;
        }
    }
    
    // Remove from categories
    categories = categories.filter(c => c.id !== categoryId);
    saveCategories(categories);
    
    // Refresh table
    loadCategoriesTab();
    
    showNotification('Category deleted');
}

// Update product category dropdown
function updateProductCategoryDropdown() {
    const select = document.getElementById('productCategoryInput');
    if (!select) return;
    
    // Save current value
    const currentValue = select.value;
    
    // Clear existing options except first
    select.innerHTML = '<option value="">Select Category</option>';
    
    // Add active categories
    categories
        .filter(c => c.status === 'active')
        .sort((a, b) => (a.sort_order || 999) - (b.sort_order || 999))
        .forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    
    // Restore selected value if it still exists
    if (currentValue) {
        select.value = currentValue;
    }
}

// Import categories from Google Sheets
async function importCategories() {
    const btn = document.getElementById('importCategoriesBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Importing...';
    
    try {
        const sheetUrl = CONFIG_HELPERS.getSheetUrl(CONFIG.sheets.categories || 'Categories');
        
        if (!sheetUrl) {
            throw new Error('Google Sheets not configured. Please add your Sheets ID and API Key in Settings.');
        }
        
        const response = await fetch(sheetUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch from Google Sheets');
        }
        
        const data = await response.json();
        
        if (!data.values || data.values.length < 2) {
            throw new Error('No data found in sheet');
        }
        
        // Parse sheet data
        const headers = data.values[0];
        const cats = [];
        
        for (let i = 1; i < data.values.length; i++) {
            const row = data.values[i];
            const cat = {};
            
            headers.forEach((header, index) => {
                cat[header] = row[index] || '';
            });
            
            if (cat.id && cat.name) {
                // Convert sort_order to number
                if (cat.sort_order) {
                    cat.sort_order = parseInt(cat.sort_order);
                }
                cats.push(cat);
            }
        }
        
        // Save to localStorage
        saveCategories(cats);
        
        // Refresh table
        loadCategoriesTab();
        
        showNotification(`Imported ${cats.length} categories from Google Sheets`);
    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-download"></i> Import from Google Sheets';
    }
}

// Export categories
function exportCategories() {
    // Create CSV
    const headers = ['id', 'name', 'description', 'icon', 'sort_order', 'status'];
    const rows = [headers];
    
    categories.forEach(cat => {
        rows.push([
            cat.id,
            cat.name,
            cat.description || '',
            cat.icon || '',
            cat.sort_order || '',
            cat.status || 'active'
        ]);
    });
    
    const csv = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'categories-export.csv';
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Categories exported successfully');
}

// Add category (legacy function - redirects to modal)
function addCategory() {
    openCategoryModal();
}

// Load images tab
function loadImagesTab() {
    const imagesJson = localStorage.getItem(CONFIG.storageKeys.images);
    const images = imagesJson ? JSON.parse(imagesJson) : [];
    
    const grid = document.getElementById('adminImagesGrid');
    grid.innerHTML = '';
    
    if (images.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: #666;">No images uploaded yet. Go to Image Zone to upload images.</p>';
        return;
    }
    
    images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'image-item';
        item.innerHTML = `
            <img src="${image.data}" alt="${image.name}">
            <div class="image-info">
                <div class="image-name">${image.name}</div>
            </div>
        `;
        grid.appendChild(item);
    });
}

// Load settings
function loadSettings() {
    const settings = CONFIG_HELPERS.getSettings();
    
    if (settings.sheetsId) {
        document.getElementById('sheetsId').value = settings.sheetsId;
        CONFIG.sheetsId = settings.sheetsId;
    }
    
    if (settings.apiKey) {
        document.getElementById('apiKey').value = settings.apiKey;
        CONFIG.apiKey = settings.apiKey;
    }
}

// Save settings
function saveSettings() {
    const sheetsId = document.getElementById('sheetsId').value.trim();
    const apiKey = document.getElementById('apiKey').value.trim();
    
    const settings = {
        sheetsId,
        apiKey
    };
    
    CONFIG_HELPERS.saveSettings(settings);
    
    // Update CONFIG for immediate use
    CONFIG.sheetsId = sheetsId;
    CONFIG.apiKey = apiKey;
    
    // Show confirmation with helpful message
    showNotification('Settings saved! You can now sync products from Google Sheets.');
    
    console.log('Settings saved:', { sheetsId: sheetsId.substring(0, 10) + '...', apiKey: apiKey.substring(0, 10) + '...' });
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
