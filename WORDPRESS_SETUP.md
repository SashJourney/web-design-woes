# HackerNull WordPress Setup Guide

## 🎯 Overview
Your site uses **Headless WordPress** architecture:
- **Frontend**: React app (fast, sleek design) - what visitors see
- **Backend**: WordPress (easy content management) - where you write articles

## 📋 Step-by-Step Setup

### Step 1: Install WordPress on Your Server

#### Option A: cPanel Installation (Recommended)
1. Log into your cPanel account
2. Scroll to "Software" section
3. Click **"WordPress Manager by Softaculous"** or **"Softaculous Apps Installer"**
4. Click **"Install"**
5. Configure installation:
   - **Choose Protocol**: https:// (if you have SSL)
   - **Choose Domain**: Select your domain
   - **In Directory**: Leave blank for root OR use `wp` or `admin`
     - If you use `admin`, your WordPress will be at: `yourdomain.com/admin`
     - Recommended: Use subdomain like `admin.yourdomain.com`
   - **Site Name**: HackerNull
   - **Admin Username**: Choose a secure username (NOT "admin")
   - **Admin Password**: Use a strong password
   - **Admin Email**: Your email address
6. Click **"Install"**
7. Wait for installation to complete (1-2 minutes)
8. Save your login URL, username, and password!

#### Option B: Manual Installation
1. Download WordPress from wordpress.org
2. Upload via FTP to your server
3. Create MySQL database in cPanel
4. Run WordPress installation wizard
5. Complete setup

### Step 2: Configure WordPress for Headless Mode

1. **Login to WordPress Admin**
   - Go to: `yourdomain.com/wp-admin` (or your custom path)
   - Enter your username and password

2. **Set Permalink Structure**
   - Go to: Settings → Permalinks
   - Select: **"Post name"**
   - Click: **"Save Changes"**
   - ✅ This enables clean URLs for API access

3. **Optional: Install Useful Plugins**
   ```
   - Yoast SEO (for SEO optimization)
   - Advanced Custom Fields (for extra post fields)
   - WP REST API Controller (for API control)
   ```

### Step 3: Get Your WordPress API URL

Your WordPress REST API URL will be:
```
https://yourdomain.com/wp-json/wp/v2
```

Or if you installed in subdirectory:
```
https://yourdomain.com/admin/wp-json/wp/v2
```

Test it by visiting that URL in your browser - you should see JSON data.

### Step 4: Configure Your React App

1. **Create `.env.local` file** in your project root:
   ```env
   VITE_WP_API_URL=https://yourdomain.com/wp-json/wp/v2
   ```
   ⚠️ Replace `yourdomain.com` with your actual domain!

2. **Test the connection**:
   - Your React app will automatically fetch posts from WordPress
   - If you see "No posts yet" - that's normal! You haven't created any posts yet.

### Step 5: Create Your First Post in WordPress

1. **Go to WordPress Admin**: `yourdomain.com/wp-admin`
2. Click **"Posts" → "Add New"**
3. Create your post:
   - **Title**: Your article title (e.g., "Advanced SQL Injection Techniques")
   - **Content**: Write your article with formatting
   - **Categories**: Create and assign categories (e.g., "Web Security", "Tutorials")
   - **Featured Image**: Click "Set featured image" and upload/select an image
   - **Excerpt**: Add a short summary (optional - auto-generated if empty)
4. Click **"Publish"**
5. Refresh your React app - your post should appear! 🎉

### Step 6: Deploy Your React App

Update your `.cpanel.yml` to deploy the built React app:

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=public_html/
    - npm run build
    - /bin/cp -R dist/* $DEPLOYPATH
```

Or deploy to separate directory:
```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=public_html/blog/
    - npm run build
    - /bin/cp -R dist/* $DEPLOYPATH
```

## 🎨 Managing Content

### Creating Categories
1. Go to: **Posts → Categories**
2. Add new category:
   - **Name**: Web Security
   - **Slug**: web-security (for URL)
   - **Description**: Articles about web application security
3. Click **"Add New Category"**

**Recommended Categories for HackerNull:**
- Web Security (`web-security`)
- Penetration Testing (`penetration-testing`)
- Cryptography (`cryptography`)
- Network Security (`network-security`)
- Exploit Development (`exploit-development`)
- Privacy (`privacy`)

### SEO Optimization (with Yoast SEO plugin)
1. Install Yoast SEO plugin
2. For each post, scroll down to Yoast SEO section
3. Set:
   - **Focus keyphrase**: Main keyword
   - **Meta description**: Custom description (160 chars)
   - **SEO title**: Optimized title with keyword

### Internal Linking
In your post editor:
1. Highlight text you want to link
2. Click link icon or press Ctrl+K
3. Search for your post name
4. Select post and click "Apply"
5. WordPress will create the link automatically!

## 🔧 Troubleshooting

### Posts Not Showing Up
1. Check `.env.local` has correct API URL
2. Verify WordPress permalink structure is set to "Post name"
3. Check browser console for API errors
4. Visit API URL directly: `yourdomain.com/wp-json/wp/v2/posts`

### CORS Errors
Add to WordPress `functions.php`:
```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);
```

### Images Not Loading
1. Make sure featured image is set in WordPress
2. Check image URLs in API response
3. Verify image permissions on server

## 📊 WordPress Admin Dashboard Overview

**Main Menu:**
- **Posts**: Write and manage articles
- **Media**: Upload and manage images
- **Pages**: Create static pages (About, Contact, etc.)
- **Comments**: Manage reader comments
- **Appearance**: Themes (not used in headless setup)
- **Plugins**: Add functionality
- **Users**: Manage authors
- **Settings**: Configure WordPress

## 🚀 Publishing Workflow

1. **Draft** → Write in WordPress admin
2. **Preview** → Check how it looks
3. **Publish** → Make it live
4. **Automatic** → React app fetches it immediately
5. **Done** → Post appears on your site! 🎉

## 📈 Performance Tips

1. **Use image optimization plugins** (Smush, ShortPixel)
2. **Cache API responses** in React (already configured with React Query)
3. **Limit posts per page** (configured to 6 posts)
4. **Use CDN** for images (Cloudflare, BunnyCDN)

## 🎓 Resources

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Yoast SEO Guide](https://yoast.com/wordpress-seo/)
- [WordPress Codex](https://codex.wordpress.org/)

---

**Need help?** Check the WordPress documentation or reach out to me!
