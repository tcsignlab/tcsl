// Configuration for Google Sheets integration
const CONFIG = {
    // Google Sheets Configuration  
    sheetsId: '', // Add your Google Sheets ID here
    apiKey: '', // Add your Google API key here
    
    // Sheet names
    sheets: {
        products: 'Products',
        categories: 'Categories'
    },
    
    // Admin password (change this!)
    adminPassword: 'admin123',
    
    // Default settings
    defaultCategory: 'banner',
    defaultCurrency: 'USD',
    productionTime: '24 Hours',
    
    // Image storage
    imageFolder: 'product-images',
    
    // Local storage keys
    storageKeys: {
        auth: 'signs365_auth',
        settings: 'signs365_settings',
        cart: 'signs365_cart',
        images: 'signs365_images'
    }
};

// Sample product data (27 realistic products based on Signs365)
const SAMPLE_PRODUCTS = [
    {
        id: 'hd-banner-vinyl-13oz',
        name: 'HD BANNER - 13oz Vinyl',
        category: 'banner',
        description: 'Premium Vinyl Scrim Banner - Most Popular Choice',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        status: 'active',
        materials: [
            { name: '13oz', price: 1.25, description: 'Standard weight vinyl scrim' }
        ],
        options: {
            printSides: ['single', 'double'],
            welding: ['yes', 'no'],
            rope: ['none', 'included'],
            grommets: ['yes', 'no'],
            polePockets: ['none', 'top', 'bottom', 'both'],
            windSlits: ['no', 'yes']
        },
        pricing: {
            singleSided: { '13oz': 1.25 },
            doubleSided: 4.25
        }
    },
    {
        id: 'hd-banner-vinyl-15oz',
        name: 'HD BANNER - 15oz Vinyl',
        category: 'banner',
        description: 'Medium Weight Vinyl Banner - Enhanced Durability',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        status: 'active',
        materials: [
            { name: '15oz', price: 1.75, description: 'Medium weight vinyl scrim' }
        ],
        options: {
            printSides: ['single', 'double'],
            welding: ['yes', 'no'],
            rope: ['none', 'included'],
            grommets: ['yes', 'no'],
            polePockets: ['none', 'top', 'bottom', 'both'],
            windSlits: ['no', 'yes']
        },
        pricing: {
            singleSided: { '15oz': 1.75 },
            doubleSided: 4.50
        }
    },
    {
        id: 'hd-banner-vinyl-18oz',
        name: 'HD BANNER - 18oz Vinyl',
        category: 'banner',
        description: 'Heavy Duty Vinyl Banner - Maximum Durability',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        status: 'active',
        materials: [
            { name: '18oz', price: 2.25, description: 'Heavy duty vinyl scrim' }
        ],
        options: {
            printSides: ['single', 'double'],
            welding: ['yes', 'no'],
            rope: ['none', 'included'],
            grommets: ['yes', 'no'],
            polePockets: ['none', 'top', 'bottom', 'both'],
            windSlits: ['no', 'yes']
        },
        pricing: {
            singleSided: { '18oz': 2.25 },
            doubleSided: 4.75
        }
    },
    {
        id: 'mesh-banner',
        name: 'MESH BANNER',
        category: 'banner',
        description: 'Wind Resistant Mesh - 37% Air Flow Reduction',
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800',
        status: 'active',
        materials: [
            { name: '9oz Mesh', price: 2.75, description: 'Perforated vinyl for wind resistance' }
        ],
        options: {
            printSides: ['single'],
            grommets: ['yes', 'no'],
            polePockets: ['none', 'top', 'bottom', 'both']
        },
        pricing: {
            singleSided: { '9oz Mesh': 2.75 }
        }
    },
    {
        id: 'coroplast-4mm',
        name: 'COROPLAST - 4mm',
        category: 'rigid',
        description: 'High Definition Yard Signs - Most Popular',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
        status: 'active',
        materials: [
            { name: '4mm', price: 3.00, description: 'Standard corrugated plastic' }
        ],
        options: {
            printSides: ['single', 'double'],
            stakes: ['none', 'h-stakes', 'wire-stakes']
        },
        pricing: {
            singleSided: { '4mm': 3.00 },
            doubleSided: { '4mm': 5.00 }
        }
    },
    {
        id: 'coroplast-10mm',
        name: 'COROPLAST - 10mm',
        category: 'rigid',
        description: 'Extra Thick Yard Signs - Heavy Duty',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
        status: 'active',
        materials: [
            { name: '10mm', price: 4.50, description: 'Extra thick corrugated plastic' }
        ],
        options: {
            printSides: ['single', 'double'],
            stakes: ['none', 'h-stakes', 'wire-stakes']
        },
        pricing: {
            singleSided: { '10mm': 4.50 },
            doubleSided: { '10mm': 7.00 }
        }
    },
    {
        id: 'acrylic-clear',
        name: 'ACRYLIC - Clear',
        category: 'rigid',
        description: 'Rigid Plastic - Photos & Indoor Signage',
        image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800',
        status: 'active',
        materials: [
            { name: '3/16" Clear', price: 8.50, description: 'Premium transparent acrylic' }
        ],
        options: {
            printSides: ['single'],
            mounting: ['none', 'standoffs', 'wall-mount', 'easel']
        },
        pricing: {
            singleSided: { '3/16" Clear': 8.50 }
        }
    },
    {
        id: 'adhesive-vinyl-removable',
        name: 'ADHESIVE VINYL - Removable',
        category: 'adhesive',
        description: 'Premium Vinyl Stickers - Easy Removal',
        image: 'https://images.unsplash.com/photo-1611329532992-fd977e522f7f?w=800',
        status: 'active',
        materials: [
            { name: 'Removable', price: 2.75, description: 'Easy removal, no residue' }
        ],
        options: {
            printSides: ['single'],
            laminate: ['none', 'gloss', 'matte'],
            contourCut: ['no', 'yes']
        },
        pricing: {
            singleSided: { 'Removable': 2.75 }
        }
    },
    {
        id: 'vehicle-magnet',
        name: 'VEHICLE MAGNET',
        category: 'magnet',
        description: 'Car Door Magnets - 30 mil Material',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
        status: 'active',
        materials: [
            { name: '30 mil', price: 6.50, description: 'Heavy duty vehicle magnet' }
        ],
        options: {
            printSides: ['single'],
            corners: ['square', 'rounded']
        },
        pricing: {
            singleSided: { '30 mil': 6.50 }
        }
    }
];

// Helper functions
const CONFIG_HELPERS = {
    // Get sheet URL for API calls
    getSheetUrl: (sheetName, range = '') => {
        if (!CONFIG.sheetsId || !CONFIG.apiKey) {
            console.warn('Google Sheets not configured');
            return null;
        }
        const baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.sheetsId}/values/${sheetName}`;
        const rangeParam = range ? `!${range}` : '';
        return `${baseUrl}${rangeParam}?key=${CONFIG.apiKey}`;
    },
    
    // Check if admin is authenticated
    isAdminAuthenticated: () => {
        const auth = localStorage.getItem(CONFIG.storageKeys.auth);
        return auth === 'true';
    },
    
    // Save admin authentication
    setAdminAuth: (value) => {
        localStorage.setItem(CONFIG.storageKeys.auth, value.toString());
    },
    
    // Get cart from localStorage
    getCart: () => {
        const cart = localStorage.getItem(CONFIG.storageKeys.cart);
        return cart ? JSON.parse(cart) : [];
    },
    
    // Save cart to localStorage
    saveCart: (cart) => {
        localStorage.setItem(CONFIG.storageKeys.cart, JSON.stringify(cart));
    },
    
    // Get settings from localStorage
    getSettings: () => {
        const settings = localStorage.getItem(CONFIG.storageKeys.settings);
        return settings ? JSON.parse(settings) : {};
    },
    
    // Save settings to localStorage
    saveSettings: (settings) => {
        localStorage.setItem(CONFIG.storageKeys.settings, JSON.stringify(settings));
    },
    
    // Format price
    formatPrice: (price) => {
        return `$${parseFloat(price).toFixed(2)}`;
    },
    
    // Calculate square footage
    calculateSqft: (width, height) => {
        return (width * height) / 144; // Convert square inches to square feet
    }
};
