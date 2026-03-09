# Attach to WordPress (Quick Options)

## Option A (Recommended): Host separately and link
- Deploy the app to a host (Vercel / DigitalOcean App Platform / etc.)
- Put it on a subdomain like: `app.yoursite.com`
- In WordPress: Appearance → Menus → add Custom Link → `https://app.yoursite.com`

## Option B: Embed inside a WordPress page (iframe)
Create a page in WordPress → add Custom HTML block:

```html
<iframe
  src="https://app.yoursite.com"
  style="width:100%;height:920px;border:0;border-radius:18px;overflow:hidden;"
  loading="lazy"
></iframe>
```

Note: if you later add login/cookies, subdomain linking is usually smoother than iframe.


## WordPress.com FREE plan note
On WordPress.com free sites, raw `<iframe>` embeds are often stripped for security, so the reliable option is to **host the app separately** and add a **menu link/button** to it.
