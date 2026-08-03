import re
import os

sitemap_path = r'c:\Users\DIVYA JAISWAL\Desktop\Cleanz24\CLeanz24_website\public\sitemap.xml'
jsx_path = r'c:\Users\DIVYA JAISWAL\Desktop\Cleanz24\CLeanz24_website\src\pages\laundry\FranchiseCityPage.jsx'

slugs = []
if os.path.exists(jsx_path):
    with open(jsx_path, 'r', encoding='utf-8') as f:
        code = f.read()
    slugs = re.findall(r'slug:\s*"([^"]+)"', code)
print(f'Total slugs found in FranchiseCityPage.jsx: {len(slugs)}')

if os.path.exists(sitemap_path):
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        sitemap = f.read()
else:
    sitemap = """<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cleanz24.com/</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://cleanz24.com/laundry</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://cleanz24.com/laundry/stores</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://cleanz24.com/laundry/services</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://cleanz24.com/laundry/franchise</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://cleanz24.com/laundry/blog</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://cleanz24.com/laundry/contact-us</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://cleanz24.com/laundry/privacy-policy</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://cleanz24.com/laundry/terms-of-service</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://cleanz24.com/cleanz24_franchise_brochure.pdf</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>"""

added_count = 0
new_url_entries = []

for slug in slugs:
    url = f'https://cleanz24.com/laundry/franchise/{slug}'
    if url not in sitemap:
        entry = f"""  <url>
    <loc>{url}</loc>
    <lastmod>2026-07-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>"""
        new_url_entries.append(entry)
        added_count += 1

if new_url_entries:
    closing_tag = '</urlset>'
    replacement = '\n' + '\n'.join(new_url_entries) + '\n' + closing_tag
    sitemap = sitemap.replace(closing_tag, replacement)

if '<?xml-stylesheet' not in sitemap:
    sitemap = sitemap.replace('<urlset', '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset')

with open(sitemap_path, 'w', encoding='utf-8') as f:
    f.write(sitemap)

print(f'Sitemap updated successfully at {sitemap_path}! Added {added_count} missing franchise URLs.')

