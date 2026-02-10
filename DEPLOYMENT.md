# GitHub Pages Deployment Guide

## Quick Start (5 Minutes)

### Step 1: Create Repository
1. Go to https://github.com
2. Click "New repository"
3. Name it: `signs365-clone` (or any name)
4. Make it Public
5. Click "Create repository"

### Step 2: Upload Files
1. Click "uploading an existing file"
2. Drag and drop all these files:
   - index.html
   - product.html
   - image-zone.html
   - admin.html
   - styles.css
   - app.js
   - configurator.js
   - image-zone.js
   - admin.js
   - config.js
   - README.md
3. Click "Commit changes"

### Step 3: Enable GitHub Pages
1. Go to Settings → Pages
2. Under "Source":
   - Select: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"
3. Click "Save"

### Step 4: Access Your Site
- Your site will be live at: `https://[your-username].github.io/signs365-clone/`
- Wait 1-2 minutes for deployment
- Visit the URL to see your catalog!

## Default Access

### Public Catalog
- URL: `https://[your-username].github.io/signs365-clone/`
- Anyone can view and configure products

### Image Zone
- URL: `https://[your-username].github.io/signs365-clone/image-zone.html`
- Upload and manage images (stored in browser)

### Admin Panel
- URL: `https://[your-username].github.io/signs365-clone/admin.html`
- Password: `admin123` (CHANGE THIS!)

## Security: Change Admin Password

### Before Deploying:
1. Open `config.js`
2. Find: `adminPassword: 'admin123'`
3. Change to: `adminPassword: 'your-secure-password'`
4. Save and upload

### After Deploying:
1. Go to your repository
2. Click on `config.js`
3. Click edit (pencil icon)
4. Change password line
5. Commit changes

## Custom Domain (Optional)

### Add Custom Domain:
1. Buy domain from Namecheap, GoDaddy, etc.
2. In GitHub Settings → Pages → Custom domain
3. Enter: `www.yourdomain.com`
4. In your domain registrar's DNS settings, add:
   - Type: CNAME
   - Name: www
   - Value: [your-username].github.io
5. Wait for DNS propagation (up to 24 hours)

## Google Sheets Integration

### Why Use Google Sheets?
- Edit products without code
- Team collaboration
- Easy backups
- Scalable database

### Setup Process:

#### 1. Create Google Sheet
```
File → New → Google Sheets
```

Create these columns in "Products" sheet:
- id
- name
- category
- description
- image
- status
- materials (JSON)
- options (JSON)
- pricing (JSON)

#### 2. Example Product Row:
```
id: hd-banner-vinyl
name: HD BANNER (VINYL)
category: banner
description: Premium Vinyl Scrim Banner
image: https://your-image-url.com/banner.jpg
status: active
materials: [{"name":"13oz","price":1.25},{"name":"15oz","price":1.75}]
options: {"printSides":["single","double"],"welding":["yes","no"]}
pricing: {"singleSided":{"13oz":1.25,"15oz":1.75},"doubleSided":4.25}
```

#### 3. Make Sheet Public:
- Click "Share" (top right)
- Change to: "Anyone with the link can view"
- Click "Copy link"
- Extract Sheet ID from URL

Example URL:
```
https://docs.google.com/spreadsheets/d/1abc123XYZ789/edit
```
Sheet ID is: `1abc123XYZ789`

#### 4. Get API Key:
1. Go to: https://console.cloud.google.com/
2. Create project (or select existing)
3. Enable "Google Sheets API"
4. Credentials → Create Credentials → API Key
5. Copy the key

#### 5. Add to Your Site:
1. Go to: `https://[your-site]/admin.html`
2. Login with password
3. Click "Settings" tab
4. Paste Sheet ID and API Key
5. Click "Save Settings"
6. Go to "Products" tab
7. Click "Sync with Google Sheets"

## Image Hosting

### Option 1: GitHub Repository (Simple)
1. Create `images` folder in repository
2. Upload images there
3. Use URL: `https://[your-username].github.io/signs365-clone/images/product.jpg`

### Option 2: Image Hosting Services (Recommended)
- **Imgur**: Free, easy upload
- **Cloudinary**: Free tier, image optimization
- **ImgBB**: Free, no signup needed

### Option 3: Image Zone (Built-in)
- Upload images via Image Zone
- Stored in browser localStorage
- Limited to ~5MB total
- Per-user storage (not shared)

## Updating Your Site

### Method 1: GitHub Web Interface
1. Go to your repository
2. Click file you want to edit
3. Click pencil icon (edit)
4. Make changes
5. Scroll down, click "Commit changes"
6. Wait 1-2 minutes for deployment

### Method 2: Git Commands
```bash
git clone https://github.com/[your-username]/signs365-clone.git
cd signs365-clone
# Edit files
git add .
git commit -m "Update products"
git push
```

## Troubleshooting

### Site Not Loading
- Wait 2-3 minutes after enabling Pages
- Check Settings → Pages shows green checkmark
- Try incognito/private browsing
- Clear browser cache

### Images Not Showing
- Verify image URLs are accessible
- Check image URLs use HTTPS (not HTTP)
- Try uploading to Image Zone instead

### Admin Panel Password Not Working
- Check `config.js` for correct password
- Clear browser localStorage: 
  - F12 → Application → Local Storage → Clear
- Try different browser

### Google Sheets Not Syncing
- Verify Sheet ID is correct (from URL)
- Verify API Key is correct
- Check Sheet is set to "Anyone with link can view"
- Check console for error messages (F12)
- Verify Sheets API is enabled in Google Cloud

### Products Not Displaying
- Check browser console (F12) for errors
- Verify category names match exactly
- Check product status is "active"
- Try syncing from Google Sheets again

## Performance Tips

1. **Optimize Images**
   - Compress before uploading
   - Use 800x600px for product images
   - Use WebP format when possible

2. **Limit localStorage**
   - Use external image hosting
   - Don't store videos
   - Clear old data periodically

3. **Google Sheets**
   - Keep under 1000 products
   - Use caching (built-in)
   - Sync only when needed

## Backup Your Data

### Backup Products:
1. Go to admin panel
2. Open browser console (F12)
3. Run: `console.log(localStorage.getItem('signs365_products'))`
4. Copy output
5. Save to text file

### Restore Products:
1. Open browser console
2. Run: `localStorage.setItem('signs365_products', '[paste-data-here]')`
3. Refresh page

## Advanced Configuration

### Change Site Colors:
Edit `styles.css` - search for:
- `#4CAF50` (green)
- `#667eea` (purple)
- `#ffd700` (gold)

### Add New Category:
1. Edit `index.html` - add nav item
2. Edit `app.js` - add to categoryNames
3. Edit `admin.html` - add to category select

### Modify Pricing Logic:
Edit `configurator.js` - function `updatePricing()`

## Need Help?

1. Check README.md for detailed docs
2. Check browser console for errors (F12)
3. Search GitHub Issues
4. Create new issue with:
   - What you're trying to do
   - What's happening instead
   - Browser and OS
   - Console errors (if any)

## Production Checklist

Before going live:
- [ ] Change admin password in config.js
- [ ] Add your logo/branding
- [ ] Upload product images
- [ ] Test all product configurations
- [ ] Test on mobile devices
- [ ] Add your contact information
- [ ] Set up Google Sheets (optional)
- [ ] Test admin panel functions
- [ ] Configure custom domain (optional)
- [ ] Add analytics (Google Analytics)
- [ ] Create backup of localStorage data

Your Signs365 clone is ready to go! 🚀
