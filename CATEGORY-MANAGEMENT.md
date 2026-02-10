# Complete Category Management System

## 🎯 Overview

The category management system allows you to create, edit, delete, and organize product categories with full control over the navigation menu.

---

## ✨ Features

### ✅ Full CRUD Operations
- **Create** new categories with custom icons and descriptions
- **Read** all categories in an organized table
- **Update** existing categories (name, icon, description, order)
- **Delete** categories (with product count warnings)

### ✅ Smart Organization
- **Drag & Drop Sorting** - Reorder categories in navigation
- **Sort Order Numbers** - Control exact display order
- **Active/Inactive Status** - Hide categories without deleting
- **Product Count** - See how many products in each category

### ✅ Icon Management
- **10+ Icon Suggestions** - Click to select common icons
- **Live Preview** - See icon as you type
- **Font Awesome Support** - 1000+ icons available
- **Custom Icons** - Use any Font Awesome icon class

### ✅ Data Management
- **Import from Google Sheets** - Bulk category management
- **Export to CSV** - Backup and share categories
- **LocalStorage Sync** - Instant updates across site
- **Default Categories** - 7 pre-configured categories included

---

## 📋 Category Table Columns

| Column | Description |
|--------|-------------|
| **Sort Order** | Drag handle + number (controls navigation order) |
| **Icon** | Font Awesome icon preview |
| **ID** | Unique identifier (lowercase-with-hyphens) |
| **Name** | Display name in navigation |
| **Description** | What products go in this category |
| **Products** | Count of products in category |
| **Status** | Active (shows in nav) / Inactive (hidden) |
| **Actions** | Edit and Delete buttons |

---

## 🎨 Add New Category

### Step-by-Step:

1. Click **"Add New Category"** button
2. Fill in the form:

   **Category ID** (required)
   - Lowercase letters and hyphens only
   - Examples: `custom-signs`, `wall-decals`, `vehicle-wraps`
   - Cannot be changed after creation
   
   **Category Name** (required)
   - Display name shown in navigation
   - Examples: "Custom Signs", "Wall Decals", "Vehicle Wraps"
   
   **Description** (required)
   - Brief description of what goes in this category
   - Shows in admin panel for reference
   
   **Icon** (required)
   - Font Awesome icon class (e.g., `fa-flag`)
   - Click suggestions or type custom
   - Live preview on the right
   
   **Sort Order** (required)
   - Number (1, 2, 3, etc.)
   - Lower numbers appear first in navigation
   - Can have gaps (1, 5, 10 works fine)
   
   **Status**
   - Active: Shows in navigation
   - Inactive: Hidden but not deleted

3. Click **"Save Category"**

### Icon Suggestions Available:
- `fa-flag` - Banners/flags
- `fa-square` - Rigid materials
- `fa-sticky-note` - Adhesive/stickers
- `fa-sign` - Signs
- `fa-magnet` - Magnetic products
- `fa-tshirt` - Apparel
- `fa-th` - Miscellaneous
- `fa-star` - Featured/new
- `fa-paint-brush` - Custom/art
- `fa-truck` - Delivery/large format

[See more icons](https://fontawesome.com/icons?d=gallery&m=free)

---

## ✏️ Edit Category

1. Click the **edit icon** (pencil) on any row
2. Modify fields (ID cannot be changed)
3. Click **"Save Category"**

### What You Can Edit:
- ✅ Name
- ✅ Description
- ✅ Icon
- ✅ Sort Order
- ✅ Status
- ❌ ID (locked after creation)

---

## 🗑️ Delete Category

1. Click the **delete icon** (trash) on any row
2. Review the warning:
   - If category has products, they won't be deleted
   - Products will need to be reassigned
   - Product count is shown
3. Confirm deletion

### Safety Features:
- Product count warning before deletion
- Confirmation dialog
- Products are NOT deleted (orphaned products remain)
- Can be recreated with same ID later

---

## 🔢 Sort Order Management

### Method 1: Drag & Drop (Future Feature)
- Grab the drag handle (≡)
- Drag row up or down
- Release to set new position
- Sort order updates automatically

### Method 2: Edit Sort Number
1. Click edit on category
2. Change "Sort Order" number
3. Save
4. Table re-sorts automatically

### Sorting Rules:
- Lower numbers appear first
- Gaps are OK (1, 5, 10)
- Ties break alphabetically
- Inactive categories still need sort order

---

## 📤 Import from Google Sheets

### Setup:
1. Create "Categories" sheet in your Google Sheets
2. Use these column headers:
   ```
   id | name | description | icon | sort_order | status
   ```

3. Example row:
   ```
   vehicle-wraps | Vehicle Wraps | Car and truck wrap materials | fa-car | 8 | active
   ```

4. Make sheet public
5. Configure Sheet ID + API Key in Settings

### Import:
1. Go to Categories tab
2. Click **"Import from Google Sheets"**
3. Categories sync automatically
4. Existing categories are replaced

### CSV File Included:
- `Categories-Sheet.csv` ready to import
- Contains 7 default categories
- Upload to Google Sheets or edit locally

---

## 📥 Export Categories

1. Click **"Export Categories"**
2. CSV file downloads instantly
3. Use for:
   - Backup
   - Sharing with team
   - Importing to Google Sheets
   - Editing in Excel

### CSV Format:
```csv
id,name,description,icon,sort_order,status
banner,Banner,Vinyl banners and flexible materials,fa-flag,1,active
rigid,Rigid,Hard substrates and boards,fa-square,2,active
```

---

## 🎯 Default Categories Included

| ID | Name | Icon | Sort | Description |
|----|------|------|------|-------------|
| banner | Banner | fa-flag | 1 | Vinyl banners and flexible materials |
| rigid | Rigid | fa-square | 2 | Hard substrates (coroplast, acrylic) |
| adhesive | Adhesive | fa-sticky-note | 3 | Stickers, decals, vinyl |
| handheld | Handheld | fa-sign | 4 | Portable signs and displays |
| magnet | Magnet | fa-magnet | 5 | Magnetic materials |
| apparel | Apparel | fa-tshirt | 6 | Clothing and wearables |
| misc | Misc | fa-th | 7 | Other specialty products |

---

## 🔧 Advanced Features

### Status Management
**Active Categories:**
- Show in main navigation
- Products are accessible
- Appear in product category dropdown

**Inactive Categories:**
- Hidden from navigation
- Products still exist (orphaned)
- Still editable in admin
- Can be reactivated anytime

### Product Assignment
When you create/edit a product:
1. Category dropdown auto-updates
2. Only active categories shown
3. Sorted by sort_order
4. If category is deleted, products remain (need manual reassignment)

### Navigation Updates
Changes to categories automatically update:
- ✅ Main navigation menu
- ✅ Product category dropdown
- ✅ Side menu (if applicable)
- ✅ Filtering on catalog page

No page refresh needed!

---

## 💡 Best Practices

### Category IDs
✅ **Good IDs:**
- `vehicle-wraps`
- `custom-signs`
- `floor-graphics`
- `wall-decals`

❌ **Bad IDs:**
- `Vehicle Wraps` (capitals)
- `vehicle_wraps` (underscores)
- `vehicle wraps` (spaces)
- `123` (numbers only)

### Icon Selection
- Choose icons that represent the product type
- Use consistent style (all solid or all outline)
- Preview before saving
- Test on mobile (some icons are better at small sizes)

### Sort Order Strategy
**Option 1: Sequential (1, 2, 3...)**
- Easy to understand
- Must renumber when inserting

**Option 2: Gaps (10, 20, 30...)**
- Easy to insert (add 15 between 10 and 20)
- More flexible
- Recommended!

### Descriptions
- Keep brief (under 50 characters)
- Focus on product types, not features
- Examples:
  - ✅ "Vinyl banners and flexible materials"
  - ❌ "High quality custom printed vinyl banners with fast turnaround"

---

## 🐛 Troubleshooting

### Category not showing in navigation?
- Check status is "Active"
- Clear browser cache
- Reload page

### Icon not displaying?
- Verify Font Awesome class is correct
- Check for typos (fa-flag not fa-flags)
- Must start with `fa-`

### Can't delete category?
- If it has products, confirm you want to proceed
- Products won't be deleted, just orphaned
- Consider making inactive instead

### Import not working?
- Verify Sheet is public
- Check Sheet ID and API Key in Settings
- Ensure sheet name is exactly "Categories"
- Column headers must match exactly

### Products disappeared?
- Products don't get deleted with categories
- Filter by category in Products tab
- Look for products with deleted category ID
- Reassign to new category

---

## 🎓 Use Cases

### Adding Seasonal Category
1. Add category: `holiday-decor`
2. Name: "Holiday Decor"
3. Icon: `fa-gift`
4. Sort: 15 (between existing categories)
5. Add seasonal products
6. Set inactive after season ends

### Reorganizing Navigation
1. Edit categories one by one
2. Update sort order:
   - Featured: 1
   - Most popular: 2-4
   - Specialty: 5-6
   - Other: 7+
3. Save each
4. Navigation reorders automatically

### Creating Sub-Categories
*Categories are flat, but you can use naming:*
- `signs-yard`
- `signs-vehicle`
- `signs-wall`

Or use descriptions to indicate relationships.

---

## 📊 Data Storage

### Where Categories Are Stored:

**1. LocalStorage** (Browser)
- Key: `signs365_categories`
- JSON format
- Instant access
- Per-browser

**2. Google Sheets** (Optional)
- "Categories" sheet
- CSV format
- Team collaboration
- Cloud backup

### Data Flow:
```
Create Category → LocalStorage → Navigation Updates
                              ↓
                    (optional) Google Sheets ← Import/Export
```

---

## 🚀 Quick Reference

### Common Tasks:

**Add Category:**
1. Add New Category button
2. Fill form
3. Save

**Reorder Categories:**
1. Edit category
2. Change sort order number
3. Save

**Hide Category:**
1. Edit category
2. Status: Inactive
3. Save

**Backup Categories:**
1. Export Categories button
2. CSV downloads

**Restore Categories:**
1. Import from Google Sheets
2. Or add manually from CSV

---

## 🎉 You're All Set!

Your category management system is complete with:
- ✅ Full CRUD operations
- ✅ Icon management with preview
- ✅ Sort ordering
- ✅ Import/Export
- ✅ Product counting
- ✅ Status management
- ✅ Google Sheets integration

Manage your product categories like a pro! 🎊
