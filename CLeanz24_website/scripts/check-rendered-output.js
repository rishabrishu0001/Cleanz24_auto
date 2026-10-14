const fs = require('fs');
const path = require('path');

/**
 * SEO & Content Integrity Guard
 * Fails the build if:
 * 1. Duplicate brand phrases like "Cleanz24 Cleanz24" appear in rendered output.
 * 2. Unreplaced '$' template placeholders like "$Noida", "$city", etc. appear in rendered HTML tags/content.
 */

const APP_SERVER_DIR = path.join(__dirname, '../.next/server/app');
let errors = 0;
let checkedCount = 0;

function checkHtmlContent(filePath, rawContent) {
  // 1. Check for duplicate brand name "Cleanz24 Cleanz24"
  const duplicateBrandRegex = /Cleanz24\s+Cleanz24/gi;
  let match;
  while ((match = duplicateBrandRegex.exec(rawContent)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(rawContent.length, match.index + match[0].length + 40);
    console.error(`❌ [FAIL] Duplicate brand name detected in ${filePath}:`);
    console.error(`   Context: "...${rawContent.slice(start, end).replace(/\s+/g, ' ')}..."\n`);
    errors++;
  }

  // 2. Strip <script> and <style> tags so React 19 RSC payloads don't trigger false positives
  const visibleHtml = rawContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Check for literal "$" unreplaced template variables like "$Noida", "$city", "$storeName"
  const dollarVarRegex = /\$([A-Za-z][A-Za-z0-9_]*)/g;
  while ((match = dollarVarRegex.exec(visibleHtml)) !== null) {
    const varName = match[1];
    if (['schema', 'type', 'context', 'graph', 'id'].includes(varName.toLowerCase())) continue;

    const start = Math.max(0, match.index - 30);
    const end = Math.min(visibleHtml.length, match.index + match[0].length + 30);
    console.error(`❌ [FAIL] Unreplaced '$' template variable placeholder in ${filePath}:`);
    console.error(`   Placeholder: "${match[0]}"`);
    console.error(`   Context: "...${visibleHtml.slice(start, end).replace(/\s+/g, ' ')}..."\n`);
    errors++;
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    // Skip segment internal artifact directories to prevent deep filesystem traversal
    if (entry.name.includes('.segments') || entry.name === 'node_modules') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      checkHtmlContent(fullPath, content);
      checkedCount++;
    }
  }
}

console.log('🔍 Running Content & SEO Guard on rendered output...');
if (fs.existsSync(APP_SERVER_DIR)) {
  scanDir(APP_SERVER_DIR);
  console.log(`Scanned ${checkedCount} rendered HTML files.`);
} else {
  console.log('⚠️ [Notice] .next/server/app does not exist yet; checking page source templates...');
  const srcDir = path.join(__dirname, '../src/app');
  function scanSrc(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) scanSrc(fullPath);
      else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (/Cleanz24\s+Cleanz24/i.test(content)) {
          console.error(`❌ [FAIL] Duplicate brand name in template: ${fullPath}`);
          errors++;
        }
        if (/\$Noida/i.test(content)) {
          console.error(`❌ [FAIL] Literal $Noida placeholder in template: ${fullPath}`);
          errors++;
        }
        checkedCount++;
      }
    }
  }
  scanSrc(srcDir);
  console.log(`Scanned ${checkedCount} source template files.`);
}

if (errors > 0) {
  console.error(`\n❌ Content Integrity Guard failed with ${errors} violation(s). Build aborted.`);
  process.exit(1);
} else {
  console.log('✅ Content Integrity Guard passed: No duplicate brand or unreplaced "$" placeholders found.');
  process.exit(0);
}
