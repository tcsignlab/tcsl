# Signs365 Clone - Complete Product Catalog System

A full-featured product catalog system inspired by Signs365.com, built with vanilla JavaScript, localStorage, and optional Google Sheets integration.

## 🚀 Live Demo

Deploy to GitHub Pages in 3 minutes - no database required!

## ✨ Features

### 🛍️ Customer-Facing
- **Product Catalog** - Browse products by category (Banner, Rigid, Adhesive, Real Estate, Magnet, Apparel, Misc)
- **Video Hero Banner** - Auto-playing background video on homepage
- **What's New Page** - Default landing page with announcements and contact form
- **Product Configurator** - Configure products with custom dimensions and finishing options
- **Real-time Pricing** - Calculate prices by square footage
- **Shopping Cart** - Add, update, remove items with quantity controls
- **Image Zone** - Upload and organize product images
- **Contact Form** - Full-featured contact form with validation

### 🔧 Admin Panel
- **Password Protected** - Secure admin access (default: admin123)
- **Product Management** - Full CRUD operations
- **Category Management** - Create, edit, delete, reorder categories
- **Icon Management** - Choose from Font Awesome icons with live preview
- **Google Sheets Sync** - Import products and categories from spreadsheets
- **Export Functions** - Download products and categories as CSV
- **Settings** - Configure Google Sheets integration

### 📱 Technical Features
- **No Database Required** - Uses localStorage + optional Google Sheets
- **No Backend Required** - Pure frontend, deploys to GitHub Pages
- **Mobile Responsive** - Works on all devices
- **Fast & Lightweight** - No frameworks, pure vanilla JS
- **Free Hosting** - Deploy to GitHub Pages at no cost

## 📦 What's Included

### HTML Pages (5)
- `index.html` - Product catalog with What's New page
- `product.html` - Product configurator
- `cart.html` - Shopping cart
- `image-zone.html` - File management
- `admin.html` - Admin panel

### JavaScript (6)
- `config.js` - Configuration and sample products
- `app.js` - Main catalog logic
- `configurator.js` - Product configuration
- `cart.js` - Shopping cart
- `image-zone.js` - Image management
- `admin.js` - Admin CRUD operations

### Styling (1)
- `styles.css` - Complete responsive design

### Data Files (2)
- `Products-Sheet.csv` - 25+ sample products
- `Categories-Sheet.csv` - 7 categories

### Documentation (5)
- `README.md` - This file
- `QUICKSTART.md` - 5-minute setup
- `DEPLOYMENT.md` - GitHub Pages guide
- `GOOGLE-SHEETS-SETUP.md` - Sheets integration
- `CATEGORY-MANAGEMENT.md` - Category system docs

### Media (1)
- `hero-video.mp4` - Homepage background video

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Create Repository**
   ```bash
   # Create new repo on GitHub
   # Upload all files
   ```

2. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from branch
   - Branch: main / root
   - Save

3. **Access Your Site**
   - `https://[username].github.io/[repo-name]/`

### Option 2: Local Testing

1. **Download Files**
   - Download all HTML, CSS, JS files
   - Put in a folder

2. **Open in Browser**
   - Open `index.html` in your browser
   - No server needed!

## 🔑 Admin Access

- URL: `/admin.html`
- Password: `admin123` (change in `config.js`)

## 📊 Google Sheets Integration (Optional)

### Setup:

1. **Create Google Sheet**
   - Copy `Products-Sheet.csv` and `Categories-Sheet.csv`
   - Import to Google Sheets

2. **Make Public**
   - Share → Anyone with link can view

3. **Get Credentials**
   - Sheet ID from URL
   - API Key from Google Cloud Console

4. **Configure**
   - Admin → Settings
   - Enter Sheet ID and API Key
   - Click Save

5. **Sync**
   - Products tab → Sync with Google Sheets
   - Categories tab → Import from Google Sheets

See `GOOGLE-SHEETS-SETUP.md` for detailed instructions.

## 🎨 Customization

### Change Admin Password
```javascript
// config.js
adminPassword: 'your-secure-password'
```

### Replace Hero Video
1. Add your video file
2. Update in `index.html`:
```html
<source src="your-video.mp4" type="video/mp4">
```

### Change Colors
```css
/* styles.css */
/* Primary: */ #4CAF50
/* Secondary: */ #667eea
/* Accent: */ #ffd700
```

### Add Products

**Option A: Admin Panel**
1. Login to admin panel
2. Products → Add New Product
3. Fill in details
4. Save

**Option B: Google Sheets**
1. Add row to Products sheet
2. Admin → Sync with Google Sheets

## 🏗️ Project Structure

```
├── index.html              # Main catalog
├── product.html            # Product configurator
├── cart.html              # Shopping cart
├── image-zone.html        # Image management
├── admin.html             # Admin panel
├── styles.css             # All styles
├── config.js              # Configuration
├── app.js                 # Catalog logic
├── configurator.js        # Product config
├── cart.js                # Cart logic
├── image-zone.js          # Image management
├── admin.js               # Admin logic
├── hero-video.mp4         # Homepage video
├── Products-Sheet.csv     # Sample products
├── Categories-Sheet.csv   # Sample categories
└── *.md                   # Documentation
```

## 📋 Sample Data

### 9 Products Included:
- HD Banner (13oz, 15oz, 18oz)
- Mesh Banner
- Coroplast (4mm, 10mm)
- Acrylic Clear
- Adhesive Vinyl Removable
- Vehicle Magnet

### 7 Categories:
- Banner
- Rigid
- Adhesive
- Real Estate
- Magnet
- Apparel
- Miscellaneous

## 🎯 Product Features

### Finishing Options:
- Print Sides (single/double)
- Welding (yes/no)
- Grommets (yes/no)
- Rope (none/included)
- Pole Pockets (none/top/bottom/both)
- Wind Slits (yes/no)
- Stakes (h-stakes/wire-stakes)
- Mounting options
- Laminate options

### Pricing:
- Per square foot calculation
- Material-based pricing
- Single vs double-sided
- Quantity support
- Real-time total calculation

## 🔧 Configuration

### Config.js Options:
```javascript
CONFIG = {
    sheetsId: '',           // Google Sheets ID
    apiKey: '',             // Google API Key
    adminPassword: 'admin123',
    defaultCategory: 'whats-new',
    productionTime: '24 Hours'
}
```

### LocalStorage Keys:
- `signs365_auth` - Admin authentication
- `signs365_products` - Product data
- `signs365_categories` - Category data
- `signs365_cart` - Shopping cart
- `signs365_images` - Uploaded images
- `signs365_settings` - App settings

## 🌐 Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Responsive design

## 📱 Mobile Features

- Responsive navigation
- Touch-friendly controls
- Optimized video playback
- Mobile-friendly forms
- Swipe gestures

## 🔒 Security Notes

1. **Change admin password** in config.js
2. Admin auth stored in localStorage (browser-level)
3. Google Sheets API key is read-only safe
4. No sensitive data in code
5. HTTPS recommended for production

## 🐛 Troubleshooting

### Products not showing?
- Check browser console (F12)
- Verify config.js has SAMPLE_PRODUCTS
- Clear localStorage and reload

### Google Sheets sync failing?
- Verify Sheet ID is correct
- Check API Key is valid
- Ensure sheet is public
- Check sheet name is "Products" or "Categories"
- Enable Google Sheets API in Cloud Console

### Images not displaying?
- Check image URLs are accessible
- Use HTTPS URLs
- Try uploading to Image Zone

### Admin panel locked?
- Clear localStorage (F12 → Application → Clear)
- Check password in config.js

## 🎓 Documentation

- **QUICKSTART.md** - 5-minute deployment guide
- **DEPLOYMENT.md** - GitHub Pages setup
- **GOOGLE-SHEETS-SETUP.md** - Sheets integration
- **CATEGORY-MANAGEMENT.md** - Category system
- **PRODUCTS.md** - Product catalog details

## 📈 Roadmap

- [ ] Payment integration
- [ ] Order management
- [ ] Customer accounts
- [ ] Email notifications
- [ ] Advanced image editor
- [ ] Bulk import/export
- [ ] Multi-language support

## 🤝 Contributing

This is a personal project clone. Feel free to fork and customize!

## 📄 License

Free to use and modify for your projects.

## 🆘 Support

For issues:
1. Check documentation files
2. Review browser console errors
3. Verify all files are uploaded
4. Check GitHub Pages is enabled

## 🎉 Credits

- Inspired by Signs365.com
- Icons by Font Awesome
- Stock images from Unsplash

---

**Built with ❤️ using vanilla JavaScript**

No frameworks • No backend • No database • Just deploy and go! 🚀
