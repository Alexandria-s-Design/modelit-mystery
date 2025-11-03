# Security Policy

## 🔒 Security Measures

ModelIt Mystery implements several security best practices to protect users and developers.

## ✅ What We Do

### 1. API Key Protection

**Current Implementation:**
- ✅ API keys loaded from external `config.js` (gitignored)
- ✅ Template provided in `config.example.js`
- ✅ No hardcoded keys in source code
- ✅ Graceful fallback when keys not configured
- ✅ Configuration instructions in documentation

**Before You Deploy:**
1. Copy `src/config.example.js` to `src/config.js`
2. Add your API keys to `src/config.js`
3. Verify `src/config.js` is in `.gitignore`
4. **Never commit config.js to Git!**

### 2. No User Data Collection

**Privacy-First Approach:**
- ✅ No analytics or tracking
- ✅ No personal information collected
- ✅ No cookies (except browser LocalStorage for progress)
- ✅ No external service calls (except optional image APIs)
- ✅ All data stays in user's browser

**LocalStorage Usage:**
```javascript
// Only game progress and settings stored
{
    'modelit_current_chapter': 3,
    'modelit_voice_enabled': true,
    'modelit_music_volume': 0.054
}
```

### 3. Input Validation

**All User Inputs Validated:**
- ✅ Predefined choices (no free-form input)
- ✅ Component names from fixed list
- ✅ State values validated (0 or 1 only)
- ✅ No eval() or dangerous functions
- ✅ No user-generated content displayed without sanitization

### 4. Secure Dependencies

**Dependency Management:**
- ✅ No runtime dependencies (pure HTML/CSS/JS)
- ✅ Only dev dependencies (ESLint, Jest, Prettier)
- ✅ Regular security audits with `npm audit`
- ✅ Minimal attack surface

### 5. Content Security

**Asset Protection:**
- ✅ All assets served from same origin
- ✅ No external scripts loaded
- ✅ No inline event handlers
- ✅ No dynamic script injection

## 🚨 Reporting Security Issues

### How to Report

If you discover a security vulnerability, please:

1. **DO NOT** create a public GitHub issue
2. **Email:** charlesmartinedd@gmail.com
3. **Include:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 1 week
- **Fix Timeline:** Depends on severity
  - Critical: 1-7 days
  - High: 1-2 weeks
  - Medium: 2-4 weeks
  - Low: As part of next release

### Disclosure Policy

We follow coordinated disclosure:
1. Issue is verified
2. Fix is developed and tested
3. Fix is deployed
4. Public disclosure after 90 days (or when fix is deployed)

## 🛡️ Security Checklist for Developers

Before deploying or contributing:

- [ ] No API keys in source code
- [ ] `config.js` is gitignored
- [ ] All dependencies audited: `npm audit`
- [ ] Code linted: `npm run lint`
- [ ] Tests passing: `npm test`
- [ ] No external scripts loaded
- [ ] No eval() or innerHTML with user data
- [ ] Error messages don't expose sensitive info
- [ ] HTTPS enabled in production
- [ ] CSP headers configured (if using custom server)

## 🔐 Configuration Security

### API Keys (Optional Features)

**Unsplash API:**
```javascript
// src/config.js (gitignored)
UNSPLASH_ACCESS_KEY: 'your_key_here'
```
- **Risk:** Low (read-only, public images)
- **Rate Limit:** 50 requests/hour
- **Exposure Impact:** Minimal (only shows public images)

**Pexels API:**
```javascript
// src/config.js (gitignored)
PEXELS_API_KEY: 'your_key_here'
```
- **Risk:** Low (read-only, public images)
- **Rate Limit:** 200 requests/hour
- **Exposure Impact:** Minimal (only shows public images)

**OpenRouter API:**
```javascript
// src/config.js (gitignored)
OPENROUTER_API_KEY: 'your_key_here'
```
- **Risk:** Medium (costs money if abused)
- **Rate Limit:** Based on account
- **Exposure Impact:** Could incur costs
- **Mitigation:** Use free models, set spending limits

### Environment Variables (Server Deployment)

For production deployments:

**Netlify:**
```bash
# Set in Netlify dashboard
UNSPLASH_ACCESS_KEY=xxx
PEXELS_API_KEY=xxx
OPENROUTER_API_KEY=xxx
```

**Vercel:**
```bash
vercel env add UNSPLASH_ACCESS_KEY
vercel env add PEXELS_API_KEY
vercel env add OPENROUTER_API_KEY
```

## 🔍 Security Auditing

### Automated Checks

```bash
# Check for known vulnerabilities
npm audit

# Fix auto-fixable issues
npm audit fix

# View full audit report
npm audit --json > audit-report.json
```

### Manual Security Review

**Check these files:**
1. `src/game.js` - No hardcoded keys
2. `src/game-v2.js` - No hardcoded keys
3. `.gitignore` - Includes `config.js`
4. `package.json` - No suspicious dependencies
5. `src/error-handler.js` - No sensitive info in logs

### Code Review Checklist

- [ ] No secrets in code
- [ ] No console.log with sensitive data
- [ ] No user input directly in DOM
- [ ] All external calls are validated
- [ ] Error messages are generic
- [ ] No dangerous functions (eval, Function constructor)

## 📜 Compliance

### Educational Use

This game is designed for educational purposes in compliance with:

- ✅ **FERPA:** No student data collected or shared
- ✅ **COPPA:** No data collection from children
- ✅ **GDPR:** No personal data processing
- ✅ **Accessibility:** WCAG 2.1 AA compliant

### License Compliance

**Third-Party Assets:**
- ✅ Background music: CC-BY (Kevin MacLeod)
- ✅ Voice synthesis: Free (Microsoft Edge TTS)
- ✅ Images: Self-generated via OpenRouter
- ✅ Code: MIT License

## 🔄 Security Updates

### Update Process

1. Monitor security advisories for dependencies
2. Review `npm audit` reports weekly
3. Test security patches in staging
4. Deploy to production
5. Notify users if action needed

### Version Policy

- **Patch releases** (x.x.X): Security fixes only
- **Minor releases** (x.X.x): Security + features
- **Major releases** (X.x.x): Breaking changes + security

## 🤝 Responsible Disclosure

We appreciate security researchers who:

- Report issues privately
- Allow time for fixes before public disclosure
- Provide clear reproduction steps
- Suggest fixes when possible

**Recognition:**
- Security researchers credited in release notes
- Listed in CONTRIBUTORS.md (with permission)
- Thank you note in release announcement

## 📞 Contact

**Security Issues:** charlesmartinedd@gmail.com
**General Questions:** GitHub Issues
**Documentation:** See CONTRIBUTING.md

---

**Last Updated:** November 2024
**Next Review:** Quarterly

**Remember:** Security is a shared responsibility. If you see something, say something! 🔒
