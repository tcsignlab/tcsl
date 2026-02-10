# Google Sheets Setup Guide - Signs365 Clone

## Quick Setup (5 Minutes)

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "+ Blank" to create new spreadsheet
3. Name it: **Signs365 Products Database**

### Step 2: Create Sheets

Create 2 sheets (tabs) in your spreadsheet:

#### Sheet 1: **Products**
#### Sheet 2: **Categories**

### Step 3: Import CSV Data

I've created 2 CSV files for you:
- `Products-Sheet.csv` - All 27 products with full details
- `Categories-Sheet.csv` - 7 product categories

**To import:**

1. Click on "Products" sheet tab
2. File → Import → Upload → Browse
3. Select `Products-Sheet.csv`
4. Import location: "Replace current sheet"
5. Click "Import data"

6. Click on "Categories" sheet tab
7. Repeat steps 2-5 with `Categories-Sheet.csv`

### Step 4: Make Sheet Public

1. Click "Share" button (top right)
2. Change "Restricted" to "Anyone with the link"
3. Role: "Viewer"
4. Click "Done"

### Step 5: Get Sheet ID

1. Look at your browser URL
2. Copy the ID between `/d/` and `/edit`

Example URL:
```
https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit
```
Sheet ID: `1A2B3C4D5E6F7G8H9I0J`

### Step 6: Get API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Click "Enable APIs and Services"
4. Search for "Google Sheets API"
5. Click "Enable"
6. Go to "Credentials"
7. Click "Create Credentials" → "API Key"
8. Copy the API key

### Step 7: Configure Your Website

1. Go to your website `/admin.html`
2. Login with password: `admin123`
3. Click "Settings" tab
4. Paste:
   - Sheet ID
   - API Key
5. Click "Save Settings"
6. Go to "Products" tab
7. Click "Sync with Google Sheets"

Done! Your products are now loaded from Google Sheets.

---

## Products Sheet Structure

Your Products sheet has these columns:

| Column | Description | Example |
|--------|-------------|---------|
| id | Unique product identifier | `hd-banner-vinyl-13oz` |
| name | Product display name | `HD BANNER (VINYL) - 13oz` |
| category | Category ID | `banner` |
| description | Product description | `Premium Vinyl Scrim Banner` |
| image_url | Product image URL | `https://images.unsplash.com/...` |
| status | Active or inactive | `active` |
| base_price | Base price per sqft | `1.25` |
| materials_json | Materials with pricing (JSON) | See below |
| options_json | Finishing options (JSON) | See below |
| pricing_json | Pricing structure (JSON) | See below |

### JSON Column Examples

**materials_json:**
```json
{
  "materials": [
    {
      "id": "13oz",
      "name": "13oz Vinyl",
      "price": 1.25,
      "description": "Standard weight vinyl scrim"
    }
  ]
}
```

**options_json:**
```json
{
  "printSides": ["single", "double"],
  "welding": ["yes", "no"],
  "grommets": ["yes", "no"]
}
```

**pricing_json:**
```json
{
  "singleSided": {"13oz": 1.25},
  "doubleSided": 4.25
}
```

---

## Categories Sheet Structure

| Column | Description | Example |
|--------|-------------|---------|
| id | Category identifier | `banner` |
| name | Display name | `Banner` |
| description | Category description | `Vinyl banners and flexible print materials` |
| icon | Font Awesome icon class | `fa-flag` |
| sort_order | Display order | `1` |

---

## Adding New Products

### Method 1: Google Sheets (Recommended)

1. Open your Google Sheet
2. Go to "Products" tab
3. Add new row with all columns filled
4. Go to your website admin panel
5. Click "Sync with Google Sheets"

### Method 2: Admin Panel

1. Go to `/admin.html`
2. Click "Add New Product"
3. Fill in all fields
4. Click "Save"

---

## Product Image URLs

### Current Setup (Unsplash Placeholders)
- All products use Unsplash stock photos
- Format: `https://images.unsplash.com/photo-XXXXXX?w=800`

### Replace with Your Images

**Option A: Upload to GitHub**
1. Create `images` folder in your repository
2. Upload product photos
3. Use URL: `https://[username].github.io/[repo]/images/banner.jpg`
4. Update `image_url` column in Google Sheet

**Option B: Use Image Hosting**
1. Upload to [Imgur](https://imgur.com), [Cloudinary](https://cloudinary.com), or similar
2. Get direct image URL
3. Update `image_url` column in Google Sheet

**Option C: Image Zone**
1. Upload to Image Zone in your website
2. Get image data URL
3. Note: This stores images in browser localStorage (limited storage)

---

## 27 Products Included

### BANNER (8 products)
1. HD BANNER (VINYL) - 13oz - $1.25/sqft
2. HD BANNER (VINYL) - 15oz - $1.75/sqft
3. HD BANNER (VINYL) - 18oz - $2.25/sqft
4. MESH BANNER - $2.75/sqft
5. HDPE BANNER - $2.50/sqft
6. CANVAS BANNER - $3.50/sqft
7. NO CURL BANNER - $3.25/sqft
8. POSTER - $0.95/sqft

### RIGID (10 products)
9. COROPLAST - 4mm - $3.00/sqft
10. COROPLAST - 10mm - $4.50/sqft
11. ACRYLIC - Clear - $8.50/sqft
12. ACRYLIC - White Back - $8.50/sqft
13. FOAMCORE - $4.00/sqft
14. PVC - 3mm - $5.50/sqft
15. PVC - 6mm - $7.50/sqft
16. ALUMINUM - ACM - $9.50/sqft
17. JBOND - $10.50/sqft
18. BACKLIT - $12.00/sqft

### ADHESIVE (6 products)
19. ADHESIVE VINYL - Removable - $2.75/sqft
20. ADHESIVE VINYL - Permanent - $2.75/sqft
21. ADHESIVE VINYL - Clear - $3.25/sqft
22. WINDOW CLING - $3.50/sqft
23. FLOOR GRAPHICS - $5.50/sqft
24. PERFORATED VINYL - $4.25/sqft

### MAGNET (1 product)
25. VEHICLE MAGNET - $6.50/sqft

### Total: 25+ products across all major categories

---

## Finishing Options by Product Type

### Banner Products
- **Print Sides**: Single, Double
- **Welding**: Yes, No (heat-sealed edges)
- **Rope**: None, Included (reinforced edges)
- **Grommets**: Yes, No (metal eyelets every 2-3 feet)
- **Pole Pockets**: None, Top, Bottom, Both
- **Wind Slits**: Yes, No (perforation for wind)

### Rigid Products
- **Print Sides**: Single, Double
- **Mounting**: None, Standoffs, Wall Mount, Post Mount, Easel
- **Corners**: Square, Rounded
- **Stakes**: None, H-Stakes, Wire Stakes

### Adhesive Products
- **Print Sides**: Single (mostly)
- **Laminate**: None, Gloss, Matte
- **Contour Cut**: Yes, No (custom shapes)

---

## Updating Prices

### Global Price Update
1. Open Google Sheet
2. Select price column
3. Use formula: `=A2*1.1` (for 10% increase)
4. Drag down to all rows
5. Copy values, paste as values
6. Sync from admin panel

### Individual Price Update
1. Find product row
2. Update `base_price` column
3. Update prices in `pricing_json` column
4. Sync from admin panel

---

## Adding Custom Finishing Options

In the `options_json` column, you can add any options:

```json
{
  "printSides": ["single", "double"],
  "laminate": ["gloss", "matte", "none"],
  "mounting": ["none", "wall", "standoff"],
  "customOption": ["value1", "value2", "value3"]
}
```

Your product configurator will automatically show these options!

---

## Troubleshooting

### Products not loading?
- ✅ Check Sheet is "Anyone with link can view"
- ✅ Verify Sheet ID is correct (between /d/ and /edit)
- ✅ Verify API Key is correct
- ✅ Check Google Sheets API is enabled
- ✅ Try clicking "Sync with Google Sheets" again

### Images not showing?
- ✅ Check image URLs are accessible (try opening in browser)
- ✅ Verify URLs use HTTPS (not HTTP)
- ✅ Replace Unsplash URLs with your own images

### Prices not calculating?
- ✅ Check `pricing_json` format is correct
- ✅ Verify material IDs match in materials_json and pricing_json
- ✅ Clear browser cache and reload

### Can't edit in admin panel?
- ✅ Changes in admin panel save to localStorage only
- ✅ To save to Google Sheets, edit the sheet directly
- ✅ Then sync from admin panel to reload

---

## Pro Tips

1. **Keep Sheet Simple**: Don't add extra columns - use only the ones listed
2. **Test Changes**: Edit one product, sync, test before bulk changes
3. **Backup Regularly**: File → Download → CSV for backup
4. **Use Formulas**: Calculate prices with formulas (=A2*1.5)
5. **Image Consistency**: Use same dimensions for all product images (800x600px recommended)

---

## Next Steps

1. ✅ Import the CSV files
2. ✅ Make sheet public
3. ✅ Get Sheet ID and API Key
4. ✅ Configure in admin panel
5. ✅ Sync products
6. ✅ Replace placeholder images with your own
7. ✅ Adjust prices as needed
8. ✅ Add more products
9. ✅ Customize options
10. ✅ Go live!

---

## Support

If you have issues:
1. Check browser console for errors (F12)
2. Verify all steps in this guide
3. Try different browser
4. Clear cache and cookies

---

Your Signs365 clone is ready with real products and Google Sheets integration! 🚀
