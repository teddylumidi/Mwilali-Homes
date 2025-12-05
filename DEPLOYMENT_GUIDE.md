# 🚀 QUICK DEPLOYMENT GUIDE - NETLIFY

## Step-by-Step Instructions for www.mwalalihomes.co.ke

### Prerequisites
✅ Build completed successfully (dist folder ready)
✅ Netlify account (free)
✅ Domain: www.mwalalihomes.co.ke

---

## STEP 1: Create Netlify Account

1. Go to [https://app.netlify.com/signup](https://app.netlify.com/signup)
2. Sign up with GitHub (recommended) or email
3. Confirm your email address

---

## STEP 2: Deploy Your Site

### Manual Deploy (Easiest):

1. **Log in to Netlify**
2. **Click** "Add new site" dropdown
3. **Select** "Deploy manually"
4. **Drag and drop** the entire `dist` folder from:
   ```
   C:\Users\User\Mwilali-Homes\dist
   ```
5. **Wait** for deployment to complete (30-60 seconds)
6. **Copy** your temporary URL (e.g., `random-name-123.netlify.app`)

✅ **Your site is now live!** (but on temporary domain)

---

## STEP 3: Add Custom Domain

1. **In your Netlify site dashboard**, click "Domain management"
2. **Click** "Add custom domain"
3. **Enter**: `www.mwalalihomes.co.ke`
4. **Click** "Verify" → "Add domain"
5. **You'll see a message** about DNS configuration

---

## STEP 4: Configure DNS in Netlify

Since you're already in Netlify DNS interface, here's what to add:

### A Record (for root domain):
```
Type: A
Name: @ (or leave blank for root domain)
Value: 75.2.60.5
TTL: Automatic (or 3600)
```

### CNAME Record (for www):
```
Type: CNAME
Name: www
Value: [your-netlify-site].netlify.app
TTL: Automatic (or 3600)

Example:
Name: www
Value: mwalali-homes-123abc.netlify.app
```

**Important:** Replace `[your-netlify-site].netlify.app` with the actual URL from Step 2!

---

## STEP 5: Wait for DNS Propagation

- **Typical wait time**: 5-30 minutes
- **Maximum wait time**: 24-48 hours (rare)

**Check status:**
- Go to Netlify "Domain management"
- Look for green checkmark next to domain
- Or use: [https://dnschecker.org](https://dnschecker.org)

---

## STEP 6: Enable HTTPS (Automatic)

1. **In Netlify**, go to "Domain management"
2. **Scroll to** "HTTPS" section
3. **Wait** for "Let's Encrypt certificate" to provision (automatic)
4. **Time**: Usually 1-5 minutes after DNS is configured
5. **When ready**, you'll see: "Your site has HTTPS enabled"
6. **Enable** "Force HTTPS" toggle

✅ **Done! Your site is now live with HTTPS!**

---

## STEP 7: Verify Everything Works

### Test Your Site:
- ✅ Visit: `https://www.mwalalihomes.co.ke`
- ✅ Check all pages load (Home, About, Properties, Contact)
- ✅ Test mobile menu
- ✅ Try offline mode (DevTools → Network → Offline)
- ✅ Check on mobile device

### Run Lighthouse Audit:
1. Open your site in Chrome
2. Right-click → "Inspect"
3. Go to "Lighthouse" tab
4. Click "Analyze page load"
5. **Target scores**: All 90+ 🎯

---

## ALTERNATIVE: If Netlify DNS Doesn't Work

If you need to keep DNS at another provider (e.g., domain registrar):

### At Your Domain Registrar:

**Add these A Records:**
```
Host: @
Points to: 185.199.108.153
```
```
Host: @
Points to: 185.199.109.153
```
```
Host: @
Points to: 185.199.110.153
```
```
Host: @
Points to: 185.199.111.153
```

**Add CNAME Record:**
```
Host: www
Points to: [your-netlify-site].netlify.app
```

---

## TROUBLESHOOTING

### Site not loading:
- **Check DNS**: Use [dnschecker.org](https://dnschecker.org)
- **Wait longer**: DNS can take up to 48 hours
- **Clear cache**: Browser cache or DNS cache
- **Check Netlify status**: [status.netlify.com](https://status.netlify.com)

### HTTPS not working:
- **Wait**: SSL certificates take 1-5 minutes after DNS
- **Check DNS**: Must be fully propagated first
- **Retry**: Click "Renew certificate" in Netlify

### 404 errors:
- **Check netlify.toml**: Should redirect /* to /index.html
- **Already configured**: ✅ Your netlify.toml is correct

### Blank page:
- **Already fixed**: ✅ Base path issue resolved
- **Check console**: Open DevTools → Console
- **Clear service worker**: DevTools → Application → Service Workers → Unregister

---

## POST-DEPLOYMENT TASKS

### Immediate (Within 24 hours):
1. **Submit sitemap** to Google Search Console
   - URL: `https://www.mwalalihomes.co.ke/sitemap.xml`
2. **Test social sharing**
   - Facebook: [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
   - Twitter: [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
3. **Set up monitoring**
   - Netlify Analytics (paid)
   - Google Analytics (free)
   - Plausible (paid, privacy-friendly)

### Within First Week:
1. **Monitor performance**
   - Check Core Web Vitals
   - Run regular Lighthouse audits
   - Monitor uptime

2. **Test thoroughly**
   - Test on various devices
   - Test in different browsers
   - Get feedback from users

3. **Backup**
   - Keep `dist` folder backed up
   - Document any manual changes

---

## CONTINUOUS DEPLOYMENT (Optional)

For automatic deployments on every change:

1. **In Netlify**, click "Add new site" → "Import from Git"
2. **Connect** to your GitHub repository
3. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Deploy!**

Now every push to GitHub automatically deploys! 🎉

---

## SUPPORT & RESOURCES

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Netlify Support**: [community.netlify.com](https://community.netlify.com)
- **DNS Help**: [dnschecker.org](https://dnschecker.org)
- **SSL Help**: [letsencrypt.org](https://letsencrypt.org)

---

## FINAL CHECKLIST

Before considering deployment complete:

- [ ] Site accessible at https://www.mwalalihomes.co.ke
- [ ] HTTPS enabled (green padlock in browser)
- [ ] All pages load correctly
- [ ] Mobile menu works
- [ ] Images load properly
- [ ] Contact links work (mailto)
- [ ] Lighthouse score 90+ in all categories
- [ ] PWA installable
- [ ] Offline mode works
- [ ] Social sharing preview looks good
- [ ] Sitemap submitted to Google
- [ ] No console errors

---

**Estimated Total Time:** 15-30 minutes (excluding DNS propagation)

**You've got this! 🚀**

If you encounter any issues, refer to the troubleshooting section or ask for help!
