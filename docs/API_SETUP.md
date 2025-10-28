# API Setup Guide for ModelIt Mystery

## Overview

ModelIt Mystery can work completely offline without any API keys. However, you can enhance it with free APIs for dynamic images and AI-powered feedback.

**All APIs are 100% optional** - the game provides excellent fallbacks!

---

## Quick Start (No APIs)

Just open `index.html` or `modelit-story.html` in your browser. That's it!

The game includes:
- ✅ 49 pre-generated scene images
- ✅ 79 voice narration files
- ✅ Background music
- ✅ Complete educational content
- ✅ Boss levels and branching choices

---

## Optional Enhancement: Dynamic Images

Add fresh, high-quality images from free stock photo APIs.

### Option 1: Unsplash (Recommended)

**Free Tier**: 50 requests per hour

1. **Sign up**: Go to [https://unsplash.com/developers](https://unsplash.com/developers)
2. **Create an app**:
   - Click "Register as a Developer"
   - Click "New Application"
   - Name: "ModelIt Mystery"
   - Description: "Educational game about biological modeling"
   - Accept terms
3. **Get your Access Key**: Copy the "Access Key" (starts with "...")
4. **Configure**:
   - Copy `src/config.example.js` to `src/config.js`
   - Set `UNSPLASH_ACCESS_KEY: 'your-key-here'`
   - Set `ENABLE_DYNAMIC_IMAGES: true`

**Attribution**: Unsplash requires photo credits. The game automatically tracks downloads (required by API terms).

### Option 2: Pexels (Alternative)

**Free Tier**: 200 requests per hour

1. **Sign up**: Go to [https://www.pexels.com/api/](https://www.pexels.com/api/)
2. **Get API Key**:
   - Click "Get Started"
   - Fill out the form
   - Copy your API key
3. **Configure**:
   - Copy `src/config.example.js` to `src/config.js`
   - Set `PEXELS_API_KEY: 'your-key-here'`
   - Set `ENABLE_DYNAMIC_IMAGES: true`

**Attribution**: Pexels images are free to use with minimal attribution.

---

## Optional Enhancement: AI Feedback

Enable AI-powered hints and personalized feedback (experimental).

### OpenRouter API

**Free Tier**: Limited free models available

1. **Sign up**: Go to [https://openrouter.ai/](https://openrouter.ai/)
2. **Get API Key**:
   - Create an account
   - Go to "Keys" in your dashboard
   - Generate a new key
   - Add some credits (optional, free models available)
3. **Configure**:
   - Copy `src/config.example.js` to `src/config.js`
   - Set `OPENROUTER_API_KEY: 'sk-or-v1-...'`
   - Set `ENABLE_AI_FEEDBACK: true`

**Note**: The game has built-in feedback that works without AI. AI just makes it more personalized.

---

## Configuration File Setup

### Step 1: Copy Example Config

```bash
cp src/config.example.js src/config.js
```

### Step 2: Edit `src/config.js`

```javascript
const CONFIG = {
    // Add your keys here
    UNSPLASH_ACCESS_KEY: 'YOUR_UNSPLASH_KEY',
    PEXELS_API_KEY: 'YOUR_PEXELS_KEY',
    OPENROUTER_API_KEY: 'YOUR_OPENROUTER_KEY',

    // Enable features you want
    ENABLE_DYNAMIC_IMAGES: true,
    ENABLE_AI_FEEDBACK: false, // Optional

    // Other settings...
};
```

### Step 3: Include in HTML

Add to `index.html` or `modelit-story.html` (before other scripts):

```html
<script src="src/config.js"></script>
<script src="src/error-handler.js"></script>
<script src="src/image-api.js"></script>
```

---

## Security Best Practices

### ✅ DO:
- Use `config.js` for all API keys
- Add `config.js` to `.gitignore`
- Use read-only API keys when possible
- Keep API keys private
- Use environment variables in production

### ❌ DON'T:
- Commit API keys to Git
- Share keys publicly
- Use production keys in development
- Hardcode keys in HTML or JavaScript files
- Use keys with write permissions

---

## Rate Limiting

The game includes smart rate limiting:

| API | Free Limit | Game Buffer | Fallback |
|-----|------------|-------------|----------|
| Unsplash | 50/hour | 45/hour | Local images |
| Pexels | 200/hour | 190/hour | Local images |
| OpenRouter | Varies | N/A | Static feedback |

**What happens when limit is reached?**
- Game automatically falls back to local images
- No error messages to players
- Continues working perfectly

---

## Testing Your Setup

### Test Image APIs

1. Open browser console (F12)
2. Run this code:

```javascript
const imageAPI = new ImageAPIManager(window.GAME_CONFIG);
imageAPI.getSceneImage('test', 'scientist laboratory', 'fallback.png')
    .then(url => console.log('Image URL:', url));
```

**Expected output**:
- With API: URL from Unsplash/Pexels
- Without API: Local fallback path

### Check API Stats

```javascript
const imageAPI = new ImageAPIManager(window.GAME_CONFIG);
console.log(imageAPI.getStats());
```

**Expected output**:
```json
{
  "cacheSize": 0,
  "unsplashCalls": 0,
  "pexelsCalls": 0,
  "unsplashRemaining": 45,
  "pexelsRemaining": 190
}
```

---

## Troubleshooting

### "Network error" in console

**Cause**: Invalid API key or rate limit exceeded

**Solution**:
1. Verify API key is correct
2. Check rate limits (refresh after an hour)
3. Try the other image API
4. Disable dynamic images (game still works!)

### Images not loading

**Cause**: CORS issues or API downtime

**Solution**:
- Game automatically falls back to local images
- No action needed from you!
- Check browser console for details

### API key not working

**Common mistakes**:
1. **Extra spaces**: `'  key  '` → `'key'`
2. **Wrong quotes**: `"key"` or `'key'` both work, but be consistent
3. **Not enabled**: Set `ENABLE_DYNAMIC_IMAGES: true`
4. **Wrong file**: Make sure editing `config.js` not `config.example.js`

---

## Production Deployment

### For Educators (Offline Use)

**No APIs needed!** Just distribute the game folder:

```
modelit-mystery/
├── index.html (or modelit-story.html)
├── story-data.js
├── audio/
├── images/
└── src/
```

Everything works offline!

### For Web Hosting

If hosting online with APIs:

1. **Environment Variables**: Use hosting platform's env vars
2. **Backend Proxy**: Route API calls through your server
3. **Rate Limiting**: Implement server-side caching
4. **Monitoring**: Track API usage

**Recommended**: Keep it offline for maximum compatibility!

---

## Cost Breakdown

| Feature | API | Cost | Limit |
|---------|-----|------|-------|
| Images | None | $0 | ∞ (49 included) |
| Images | Unsplash | $0 | 50/hour |
| Images | Pexels | $0 | 200/hour |
| Voice | None | $0 | ∞ (79 included) |
| Music | None | $0 | ∞ (1 included) |
| AI Feedback | OpenRouter | ~$0-5/mo | Varies by model |

**Total minimum cost**: **$0.00** ✅

---

## Advanced: Custom API Integration

Want to use your own image API? Edit `src/image-api.js`:

```javascript
async tryCustomAPI(keywords) {
    const response = await fetch(`https://your-api.com/search?q=${keywords}`);
    const data = await response.json();
    return data.imageUrl;
}
```

Then update `getSceneImage()` to call your method.

---

## Support

**Questions?** Check these resources:

- [Unsplash API Docs](https://unsplash.com/documentation)
- [Pexels API Docs](https://www.pexels.com/api/documentation/)
- [OpenRouter Docs](https://openrouter.ai/docs)
- [Game README](../README.md)
- [Developer Guide](./DEVELOPER_GUIDE.md)

**Need help?** Open an issue on GitHub or contact the developer.

---

## Summary

✅ **No APIs required** - game works perfectly offline
✅ **Optional enhancements** - add if you want
✅ **Free forever** - all APIs have generous free tiers
✅ **Secure by default** - config.js is gitignored
✅ **Automatic fallbacks** - never breaks if APIs fail

**Recommended setup for most users**: No APIs, just download and play!

---

*Last Updated: October 28, 2025*
