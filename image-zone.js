// Image Zone management
let currentFolder = 'home';
let images = [];
let selectedImages = [];

document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    setupImageZoneEvents();
});

// Setup event listeners
function setupImageZoneEvents() {
    // Upload image
    document.getElementById('uploadImageBtn').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });
    
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    
    // Create folder
    document.getElementById('createFolderBtn').addEventListener('click', createFolder);
    
    // Rename folder
    document.getElementById('renameFolderBtn').addEventListener('click', renameFolder);
    
    // Delete folder
    document.getElementById('deleteFolderBtn').addEventListener('click', deleteFolder);
    
    // Select all
    document.getElementById('selectAllBtn').addEventListener('click', selectAll);
    
    // Search
    document.getElementById('searchImages').addEventListener('input', (e) => {
        filterImages(e.target.value);
    });
    
    // Sort
    document.getElementById('sortImages').addEventListener('change', (e) => {
        sortImages(e.target.value);
    });
    
    // Folder select
    document.getElementById('folderSelect').addEventListener('change', (e) => {
        currentFolder = e.target.value;
        displayImages();
    });
    
    // Modal close
    const modal = document.getElementById('imageModal');
    const closeModal = modal.querySelector('.close-modal');
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Delete image from modal
    document.getElementById('deleteImageBtn').addEventListener('click', deleteSelectedImage);
}

// Load images from localStorage
function loadImages() {
    const imagesJson = localStorage.getItem(CONFIG.storageKeys.images);
    images = imagesJson ? JSON.parse(imagesJson) : [];
    displayImages();
}

// Save images to localStorage
function saveImages() {
    localStorage.setItem(CONFIG.storageKeys.images, JSON.stringify(images));
}

// Handle file upload
function handleFileUpload(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            showNotification('Please upload only image files', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const imageData = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    folder: currentFolder,
                    data: event.target.result,
                    width: img.width,
                    height: img.height,
                    size: file.size,
                    date: new Date().toISOString(),
                    dpi: 300
                };
                
                images.push(imageData);
                saveImages();
                displayImages();
                showNotification(`Uploaded ${file.name}`);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
    
    // Clear input
    e.target.value = '';
}

// Display images
function displayImages() {
    const grid = document.getElementById('imageGrid');
    grid.innerHTML = '';
    
    const folderImages = images.filter(img => img.folder === currentFolder);
    
    if (folderImages.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: #666;">No images in this folder. Click "Upload Image" to add some.</p>';
        return;
    }
    
    folderImages.forEach(image => {
        const item = createImageItem(image);
        grid.appendChild(item);
    });
    
    updateSelectedCount();
}

// Create image item element
function createImageItem(image) {
    const item = document.createElement('div');
    item.className = 'image-item';
    item.dataset.imageId = image.id;
    
    const img = document.createElement('img');
    img.src = image.data;
    img.alt = image.name;
    
    const info = document.createElement('div');
    info.className = 'image-info';
    
    const name = document.createElement('div');
    name.className = 'image-name';
    name.textContent = image.name;
    
    const details = document.createElement('div');
    details.className = 'image-details';
    details.innerHTML = `
        ${image.width} x ${image.height}<br>
        ${formatFileSize(image.size)}<br>
        ${image.dpi} DPI<br>
        ${formatDate(image.date)}
    `;
    
    info.appendChild(name);
    info.appendChild(details);
    
    item.appendChild(img);
    item.appendChild(info);
    
    // Click to select
    item.addEventListener('click', (e) => {
        if (e.target === img) {
            openImageModal(image);
        } else {
            toggleImageSelection(image.id);
        }
    });
    
    return item;
}

// Toggle image selection
function toggleImageSelection(imageId) {
    const item = document.querySelector(`[data-image-id="${imageId}"]`);
    
    if (selectedImages.includes(imageId)) {
        selectedImages = selectedImages.filter(id => id !== imageId);
        item.classList.remove('selected');
    } else {
        selectedImages.push(imageId);
        item.classList.add('selected');
    }
    
    updateSelectedCount();
}

// Select all images
function selectAll() {
    const folderImages = images.filter(img => img.folder === currentFolder);
    selectedImages = folderImages.map(img => img.id);
    
    document.querySelectorAll('.image-item').forEach(item => {
        item.classList.add('selected');
    });
    
    updateSelectedCount();
}

// Update selected count
function updateSelectedCount() {
    document.getElementById('selectedCount').textContent = 
        `${selectedImages.length} items selected`;
}

// Open image modal
function openImageModal(image) {
    const modal = document.getElementById('imageModal');
    document.getElementById('modalImage').src = image.data;
    document.getElementById('modalImageName').textContent = `Name: ${image.name}`;
    document.getElementById('modalImageSize').textContent = `File Size: ${formatFileSize(image.size)}`;
    document.getElementById('modalImageDimensions').textContent = `Dimensions: ${image.width} x ${image.height} (${image.dpi} DPI)`;
    document.getElementById('modalImageDate').textContent = `Uploaded: ${formatDate(image.date)}`;
    
    modal.dataset.imageId = image.id;
    modal.classList.add('active');
}

// Delete selected image from modal
function deleteSelectedImage() {
    const modal = document.getElementById('imageModal');
    const imageId = parseFloat(modal.dataset.imageId);
    
    if (confirm('Are you sure you want to delete this image?')) {
        images = images.filter(img => img.id !== imageId);
        saveImages();
        displayImages();
        modal.classList.remove('active');
        showNotification('Image deleted');
    }
}

// Filter images
function filterImages(searchTerm) {
    const grid = document.getElementById('imageGrid');
    const items = grid.querySelectorAll('.image-item');
    
    items.forEach(item => {
        const name = item.querySelector('.image-name').textContent.toLowerCase();
        if (name.includes(searchTerm.toLowerCase())) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Sort images
function sortImages(sortBy) {
    const folderImages = images.filter(img => img.folder === currentFolder);
    
    switch(sortBy) {
        case 'name':
            folderImages.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'date':
            folderImages.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'size':
            folderImages.sort((a, b) => b.size - a.size);
            break;
    }
    
    // Update images array order
    const otherImages = images.filter(img => img.folder !== currentFolder);
    images = [...otherImages, ...folderImages];
    
    displayImages();
}

// Create folder
function createFolder() {
    const folderName = prompt('Enter folder name:');
    if (!folderName) return;
    
    const folderSelect = document.getElementById('folderSelect');
    const option = document.createElement('option');
    option.value = folderName.toLowerCase().replace(/\s+/g, '-');
    option.textContent = folderName;
    folderSelect.appendChild(option);
    
    showNotification(`Folder "${folderName}" created`);
}

// Rename folder
function renameFolder() {
    if (currentFolder === 'home') {
        showNotification('Cannot rename home folder', 'error');
        return;
    }
    
    const newName = prompt('Enter new folder name:', currentFolder);
    if (!newName) return;
    
    const newValue = newName.toLowerCase().replace(/\s+/g, '-');
    
    // Update images
    images.forEach(img => {
        if (img.folder === currentFolder) {
            img.folder = newValue;
        }
    });
    
    // Update select option
    const folderSelect = document.getElementById('folderSelect');
    const option = folderSelect.querySelector(`option[value="${currentFolder}"]`);
    if (option) {
        option.value = newValue;
        option.textContent = newName;
    }
    
    currentFolder = newValue;
    saveImages();
    showNotification('Folder renamed');
}

// Delete folder
function deleteFolder() {
    if (currentFolder === 'home') {
        showNotification('Cannot delete home folder', 'error');
        return;
    }
    
    if (!confirm('Delete this folder and all its images?')) return;
    
    // Remove images
    images = images.filter(img => img.folder !== currentFolder);
    
    // Remove from select
    const folderSelect = document.getElementById('folderSelect');
    const option = folderSelect.querySelector(`option[value="${currentFolder}"]`);
    if (option) {
        option.remove();
    }
    
    currentFolder = 'home';
    folderSelect.value = 'home';
    
    saveImages();
    displayImages();
    showNotification('Folder deleted');
}

// Helper functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

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
