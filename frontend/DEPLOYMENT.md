# KrishiConnect Live Server Deployment Guide

## Step 1: Domain Registration

### Register the "krishiconnect.np" domain:
1. Go to **Nepal's domain registrar**:
   - MyMart Domain (https://mymart.com.np)
   - Register Nepal (https://register.com.np)
   - NepDomain (https://nepdomain.com.np)

2. Search for and register `krishiconnect.np`
3. Keep your domain credentials safe

---

## Step 2: Choose a Hosting Provider

### Recommended options for Nepal:
- **Vercel** (Simple, free tier available) - Already configured in your `vercel.json`
- **Netlify** (Free tier, excellent for React)
- **AWS** (More control, scalable)
- **DigitalOcean** (Affordable VPS)
- **Local ISP hosting** (Tekweb, Mercantile, etc.)

---

## Step 3: Deploy with Vercel (Recommended)

### 1. Build your project:
```bash
npm run build
```

### 2. Install Vercel CLI:
```bash
npm install -g vercel
```

### 3. Deploy:
```bash
vercel --prod
```

### 4. Connect your domain:
- Go to Vercel Dashboard
- Navigate to Project Settings → Domains
- Add custom domain: `krishiconnect.np`
- Update your domain's DNS records with Vercel's nameservers

---

## Step 4: Configure DNS Records

### For your domain provider, add these records:

**If using Vercel:**
- Change nameservers to Vercel's provided ones

**If using traditional hosting:**
- **A Record**: Point to your hosting server IP
- **CNAME Record**: `www` → `krishiconnect.np`
- **MX Record**: For email (optional)

Example DNS configuration:
```
Type    | Name          | Value
--------|---------------|------------------
A       | @             | [Your Server IP]
CNAME   | www           | krishiconnect.np
```

---

## Step 5: SSL/HTTPS Certificate

Vercel and Netlify provide **free SSL certificates** automatically.

For traditional hosting:
- Use **Let's Encrypt** (Free)
- Use **Cloudflare** (Free SSL + CDN)

---

## Step 6: Submit to Google Search Console

### 1. Go to: https://search.google.com/search-console

### 2. Add your property:
- Select "URL prefix"
- Enter: `https://krishiconnect.np`

### 3. Verify ownership:
- Download HTML verification file
- Upload it to your public folder OR
- Add the DNS TXT record

### 4. Submit sitemap:
- Go to Sitemaps section
- Submit: `https://krishiconnect.np/sitemap.xml`

### 5. Check robots.txt:
- Verify: `https://krishiconnect.np/robots.txt`

---

## Step 7: SEO Optimization (Already Done)

✅ **Meta tags** configured in `index.html`
✅ **Sitemap** created at `public/sitemap.xml`
✅ **Robots.txt** created at `public/robots.txt`
✅ **Open Graph tags** for social sharing
✅ **Canonical URL** set

---

## Step 8: Additional SEO Tips

### 1. Submit to Bing:
- https://www.bing.com/webmasters

### 2. Create quality content:
- Add product descriptions
- Write blog posts about agriculture
- Add customer reviews

### 3. Mobile optimization:
- Your site is already mobile-responsive

### 4. Page speed:
- Check: https://pagespeed.web.dev
- Your Vite build is already optimized

### 5. Backlinks:
- Promote on social media
- Partner with agricultural websites

---

## Step 9: Monitor Your Site

### 1. Google Search Console:
- Monitor rankings
- Check for errors
- View search statistics

### 2. Google Analytics (Optional):
```html
<!-- Add to your index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

### 3. Uptime monitoring:
- Use: https://uptimerobot.com (Free)

---

## Build & Deployment Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel
vercel --prod
```

---

## Expected Timeline

- **Domain registration**: 24-48 hours
- **DNS propagation**: 24-48 hours
- **Deployment**: Instant (Vercel) to hours (traditional)
- **Google indexing**: 2-14 days (First crawl happens within 48 hours)

---

## Troubleshooting

### Site not appearing in Google:
1. ✅ Verify domain is live and accessible
2. ✅ Submit sitemap in Google Search Console
3. ✅ Check robots.txt is allowing crawlers
4. ✅ Wait 2-4 weeks for initial indexing
5. ✅ Check for indexing errors in GSC

### High bounce rate:
- Improve page load speed
- Add more product details
- Better user experience

### Poor rankings:
- Add more quality content
- Get backlinks from agriculture websites
- Improve on-page SEO

---

**Questions or issues?** Contact your hosting provider's support team.
