# The Saw Dust Shop — Website Maintenance Guide

This is the static website for **The Saw Dust Shop**, a custom woodworking business in Caledonia, WI.
Deployed via GitHub Pages at [www.thesawdustshopwi.com](https://www.thesawdustshopwi.com).

No build system — just HTML, CSS, and JS. Edit the files and push.

---

## File Structure

```
sawdust-shop-website/
  index.html                  # Homepage
  about/index.html            # About page
  contact/index.html          # Quote request form
  faq/index.html              # FAQ page
  projects/
    index.html                # All Projects page (curated thumbnails)
    patio-sets/index.html     # Patio Furniture category
    swings/index.html         # Swings category
    benches/index.html        # Benches category
    garden-boxes/index.html   # Garden Boxes category
    wishing-wells/index.html  # Wishing Wells category
    mailboxes/index.html      # Mailboxes category
    custom-builds/index.html  # Custom Builds category
  service-areas/
    caledonia-wi/index.html
    oak-creek-wi/index.html
    south-milwaukee-wi/index.html
    racine-wi/index.html
    franklin-wi/index.html
    cudahy-wi/index.html
    st-francis-wi/index.html
  assets/
    css/styles.css            # All site styles
    js/main.js                # Nav toggle, FAQ accordion, carousel, form handler
    images/
      hero/                   # Homepage hero images
      logos/                  # Logo and favicons
      projects/
        patio-sets/           # Patio furniture images
        swings/               # Swing images
        benches/              # Bench images
        garden-boxes/         # Garden box images
        custom-builds/        # Custom builds, mailboxes, and wishing well images
  sitemap.xml
  robots.txt
  llms.txt
  CNAME                       # Custom domain config (thesawdustshopwi.com)
```

---

## How to Add a New Product

Adding a new product requires updating **3 files** (and optionally a 4th):

### 1. Add the image

- Place the image in the appropriate folder under `assets/images/projects/`
- **Naming convention**: lowercase, hyphens, descriptive (e.g., `cedar-patio-set-stained.webp`)
- **Preferred format**: WebP. If you have a JPG as well, include both for the `<picture>` fallback pattern
- Mailbox and wishing well images go in `assets/images/projects/custom-builds/` (no dedicated folders)

### 2. Add the entry to the category page

Open the relevant category page (e.g., `projects/patio-sets/index.html`) and add a new `project-entry` block inside the `project-gallery` div.

**Single image template:**
```html
<div class="project-entry">
  <div class="project-entry__image">
    <picture>
      <source srcset="../../assets/images/projects/CATEGORY/IMAGE.webp" type="image/webp">
      <img src="../../assets/images/projects/CATEGORY/IMAGE.jpg" alt="DESCRIPTION" loading="lazy" width="1200" height="900">
    </picture>
  </div>
  <div class="project-entry__info">
    <h3>PRODUCT NAME</h3>
    <p>PRODUCT DESCRIPTION</p>
    <p class="project-entry__price">Starting at $PRICE</p>
    <a href="../../contact/" class="btn btn--outline btn--small">Get a Quote</a>
  </div>
</div>
```

**Multi-image carousel template** (for products with multiple photos):
```html
<div class="project-entry">
  <div class="project-entry__image" data-carousel='[{"src":"../../assets/images/projects/CATEGORY/IMAGE1.jpg","alt":"DESCRIPTION 1"},{"src":"../../assets/images/projects/CATEGORY/IMAGE2.jpg","alt":"DESCRIPTION 2"}]'>
    <img src="../../assets/images/projects/CATEGORY/IMAGE1.jpg" alt="DESCRIPTION 1" loading="lazy" width="1200" height="900">
  </div>
  <div class="project-entry__info">
    <h3>PRODUCT NAME</h3>
    <p>PRODUCT DESCRIPTION</p>
    <p class="project-entry__price">Starting at $PRICE</p>
    <a href="../../contact/" class="btn btn--outline btn--small">Get a Quote</a>
  </div>
</div>
```

**Notes:**
- For items where pricing varies or isn't fixed, use: `Request a quote for pricing`
- The `data-carousel` attribute is a JSON array — the JS in `main.js` auto-generates prev/next buttons and dots
- To zoom in on a tall/narrow image, add `style="aspect-ratio: 3/4; object-position: center;"` to the `<img>` tag

### 3. Add a thumbnail to the All Projects page

Open `projects/index.html` and add a thumbnail in the `projects-grid` div under the appropriate category comment:

```html
<a href="../projects/CATEGORY/" class="project-thumb">
  <picture>
    <source srcset="../assets/images/projects/CATEGORY/IMAGE.webp" type="image/webp">
    <img src="../assets/images/projects/CATEGORY/IMAGE.jpg" alt="DESCRIPTION" loading="lazy" width="800" height="600">
  </picture>
  <div class="project-thumb__info">
    <h3>PRODUCT NAME</h3>
    <p>CATEGORY NAME</p>
  </div>
</a>
```

**Note:** The All Projects page is a curated showcase. Not every product needs a thumbnail here — just your best work per category.

### 4. Update the sitemap (only for new pages)

If you created a new page (not just adding a product to an existing page), add it to `sitemap.xml`:

```xml
<url>
  <loc>https://www.thesawdustshopwi.com/NEW-PAGE-PATH/</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <priority>0.7</priority>
</url>
```

---

## How to Update Pricing

Prices are in `<p class="project-entry__price">` tags on each category page. Search for the product name and update the text.

Example:
```html
<p class="project-entry__price">Starting at $150</p>
```

---

## How to Add a New Category

This is more involved. You need to:

1. Create a new folder under `projects/` with an `index.html` (copy an existing category page as a template)
2. Add the category to the **filter bar** on every category page and the All Projects page
3. Add the category to the **footer** on every page (Projects column)
4. Add the category to the **homepage category grid** in `index.html`
5. Add the category to `sitemap.xml`
6. Add the category to the **contact form** dropdown in `contact/index.html`

---

## Image Guidelines

| Format | Use for |
|--------|---------|
| `.webp` | Primary format — smaller file size, modern browser support |
| `.jpg` | Fallback for older browsers — use in the `<img>` tag inside `<picture>` |

**If you only have a .webp file**, you can use it directly in the `<img src>` — it works in 95%+ of browsers but won't display in very old ones.

**Recommended approach:**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="description" loading="lazy" width="1200" height="900">
</picture>
```

---

## Key Files to Know

| File | What it controls |
|------|-----------------|
| `assets/css/styles.css` | All site styling |
| `assets/js/main.js` | Mobile nav, FAQ accordion, image carousel, contact form submission |
| `sitemap.xml` | Tells Google what pages exist |
| `robots.txt` | Tells crawlers what to index |
| `llms.txt` | AI crawler optimization |
| `CNAME` | GitHub Pages custom domain (`thesawdustshopwi.com`) |

---

## Contact Form

The form on the contact page currently uses a **placeholder API endpoint** in `main.js`:

```js
var API_ENDPOINT = 'https://YOUR-API-GATEWAY-URL/submit-quote';
```

This needs to be replaced with a real API Gateway URL backed by a Lambda + SES setup. See the `infra/` directory (once created) for the Terraform configuration.

---

## Deployment

The site is deployed via **GitHub Pages** with a custom domain.

- Push to the main branch → site updates automatically
- Domain: `www.thesawdustshopwi.com` (configured via CNAME file)
- No build step required

---

## Quick Reference: Files to Update Per Task

| Task | Files to update |
|------|----------------|
| Add new product | Category page, All Projects page (`projects/index.html`) |
| Update a price | Category page only |
| Add new category | Category page (new), filter bars (all category pages + All Projects), footer (all pages), homepage grid, sitemap, contact form dropdown |
| Add new service area | Service area page (new), footer (all pages), homepage service area links, sitemap, schema markup on homepage + about page |
| Swap an image | Replace the file in `assets/images/projects/`, update any `src`/`srcset` references if the filename changed |
