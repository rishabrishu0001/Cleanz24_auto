import re

sitemap_path = r'c:\Users\DIVYA JAISWAL\Desktop\Cleanz24\CLeanz24_website\public\sitemap.xml'
jsx_path = r'c:\Users\DIVYA JAISWAL\Desktop\Cleanz24\CLeanz24_website\src\pages\laundry\FranchiseCityPage.jsx'

with open(jsx_path, 'r', encoding='utf-8') as f:
    code = f.read()

slugs = re.findall(r'slug:\s*"([^"]+)"', code)
print(f'Total slugs found in FranchiseCityPage.jsx: {len(slugs)}')

with open(sitemap_path, 'r', encoding='utf-8') as f:
    sitemap = f.read()

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
    updated_sitemap = sitemap.replace(closing_tag, replacement)
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(updated_sitemap)
    print(f'Added {added_count} missing city franchise URLs to sitemap.xml!')
else:
    print('All city franchise URLs are already present in sitemap.xml!')
