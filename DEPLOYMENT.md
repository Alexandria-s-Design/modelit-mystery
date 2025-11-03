# Deployment Guide for ModelIt Mystery

This guide covers various deployment options for the ModelIt Mystery educational game.

## 📦 Deployment Options

### Option 1: GitHub Pages (Recommended - Free)

GitHub Pages offers free hosting for static websites directly from your repository.

**Steps:**

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Select **/ (root)** folder
   - Click **Save**

3. **Access your game**
   - Your game will be available at: `https://yourusername.github.io/modelit-mystery/`
   - Wait 2-3 minutes for first deployment

**Benefits:**
- ✅ Completely free
- ✅ Automatic updates when you push changes
- ✅ HTTPS enabled by default
- ✅ Custom domain support

### Option 2: Local Server (Development)

For local testing and development:

```bash
# Install http-server globally (one time)
npm install -g http-server

# Start server
npm start

# Or manually
http-server -p 8080 -c-1
```

Open http://localhost:8080 in your browser.

### Option 3: Static Site Hosting Services

#### Netlify

1. Sign up at https://www.netlify.com
2. Drag and drop your project folder
3. Your site is live!

**Benefits:**
- ✅ Free tier available
- ✅ Continuous deployment from Git
- ✅ Custom domains
- ✅ Automatic HTTPS

#### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

**Benefits:**
- ✅ Free tier available
- ✅ Edge network (fast worldwide)
- ✅ Preview deployments

### Option 4: Offline/USB Distribution

For classrooms without internet:

1. **Create a distribution package**
   ```bash
   # Copy essential files
   cp -r audio images src *.html *.js README.md distribution/
   ```

2. **Test offline**
   ```bash
   cd distribution
   python3 -m http.server 8000
   ```

3. **Distribute**
   - Zip the `distribution` folder
   - Copy to USB drives or network share
   - Students can open `index.html` directly in browser

**Note:** Voice and images work offline, but dynamic image APIs require internet.

## 🔧 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass: `npm test`
- [ ] Code is linted: `npm run lint`
- [ ] Code is formatted: `npm run format`
- [ ] Assets validate: `npm run validate:assets`
- [ ] API keys are NOT in code (use config.js)
- [ ] .gitignore includes sensitive files
- [ ] README is up to date
- [ ] Game works in multiple browsers

## 🌐 Configuration for Production

### For GitHub Pages

No special configuration needed! The game works as-is.

### For Custom Domain

If using a custom domain (e.g., modelit.yourdomain.com):

1. Add a `CNAME` file in root:
   ```
   modelit.yourdomain.com
   ```

2. Configure DNS:
   - Add CNAME record pointing to `yourusername.github.io`
   - Wait for DNS propagation (up to 48 hours)

3. Enable HTTPS in GitHub Pages settings

### Environment Variables

If you've configured optional API keys:

**For Netlify:**
- Go to Site Settings → Build & Deploy → Environment
- Add your variables:
  - `UNSPLASH_ACCESS_KEY`
  - `PEXELS_API_KEY`
  - `OPENROUTER_API_KEY`

**For Vercel:**
```bash
vercel env add UNSPLASH_ACCESS_KEY
vercel env add PEXELS_API_KEY
```

## 🚀 Performance Optimization

### Before Deploying to Production

1. **Compress images**
   ```bash
   # Install imagemin
   npm install -g imagemin-cli imagemin-pngquant

   # Compress PNG files
   imagemin images/scenes/*.png --out-dir=images/scenes/optimized --plugin=pngquant
   ```

2. **Minify JavaScript** (optional)
   ```bash
   # Install terser
   npm install -g terser

   # Minify files
   terser src/game.js -o src/game.min.js -c -m
   ```

3. **Enable caching**
   - Add `.htaccess` for Apache servers
   - Configure cache headers in hosting platform

### CDN Integration (Advanced)

For faster worldwide loading:

1. Upload static assets to CDN
2. Update paths in HTML to CDN URLs
3. Keep game logic on main server

## 📊 Monitoring (Optional)

### Analytics

Add privacy-friendly analytics:

**Simple counter:**
```html
<script src="https://simple-analytics.com/latest.js"></script>
```

**Self-hosted:**
```javascript
// Track page views locally
localStorage.setItem('visits', parseInt(localStorage.getItem('visits') || 0) + 1);
```

### Error Tracking

The game includes built-in error handling. For production monitoring:

```javascript
// In src/error-handler.js, add:
if (CONFIG.ERROR_REPORTING_ENABLED) {
    // Send to your error tracking service
}
```

## 🔒 Security Considerations

### API Keys

**NEVER commit API keys to Git!**

✅ **Correct approach:**
```javascript
// Use environment variables
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
```

❌ **Wrong approach:**
```javascript
// Hardcoded in source
const UNSPLASH_KEY = 'your-secret-key-here';
```

### HTTPS

Always use HTTPS in production:
- GitHub Pages: Automatic
- Netlify/Vercel: Automatic
- Custom server: Configure SSL certificate (Let's Encrypt)

## 🎓 Classroom Deployment

### School Network

Work with IT department to:
1. Whitelist required domains (if using API features)
2. Deploy to internal server
3. Configure firewall exceptions

### Learning Management Systems (LMS)

#### Canvas/Blackboard/Moodle

1. Upload game files to course materials
2. Create assignment linking to `index.html`
3. Students access directly in LMS

#### Google Classroom

1. Upload to Google Drive
2. Share link with students
3. Or embed in Google Sites

## 🐛 Troubleshooting Deployment

### Game doesn't load

**Check:**
- Browser console for errors (F12)
- File paths are correct
- All assets uploaded
- HTTPS is enabled

### Images/Audio not loading

**Check:**
- File paths use relative paths (not absolute)
- Files are in correct directories
- Correct file extensions (.png, .mp3)
- Server allows audio/image MIME types

### Slow loading

**Solutions:**
- Compress images
- Enable browser caching
- Use CDN for assets
- Reduce audio file sizes

## 📱 Mobile Deployment

The game works on mobile browsers, but for app-like experience:

### Progressive Web App (PWA)

Add `manifest.json`:
```json
{
  "name": "ModelIt Mystery",
  "short_name": "ModelIt",
  "start_url": "/index.html",
  "display": "standalone",
  "theme_color": "#00d4ff",
  "background_color": "#0a4f6e"
}
```

### Add to Home Screen

Users can:
1. Open game in Safari/Chrome
2. Tap "Share" → "Add to Home Screen"
3. Game appears as app icon

## 🔄 Continuous Deployment

### Automatic deployments

**With GitHub Pages:**
- Push to main branch → Automatic deployment

**With Netlify:**
- Connect GitHub repo → Auto-deploy on push

**With Vercel:**
- Connect GitHub repo → Auto-deploy on push

### Deploy from CLI

```bash
# Test locally
npm start

# Run tests
npm test

# Deploy to Vercel
vercel --prod

# Or Netlify
netlify deploy --prod
```

## 📞 Support

Need help with deployment?

- Check [CONTRIBUTING.md](CONTRIBUTING.md) for setup help
- Open an issue on GitHub
- Email: charlesmartinedd@gmail.com

## 🎉 Post-Deployment

After successful deployment:

1. ✅ Test in multiple browsers
2. ✅ Test on mobile devices
3. ✅ Share with teachers/students
4. ✅ Gather feedback
5. ✅ Iterate and improve!

---

**Ready to deploy? Start with GitHub Pages for the easiest, free option!** 🚀
