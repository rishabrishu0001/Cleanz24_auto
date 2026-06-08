import fs from 'fs';
const content = fs.readFileSync('C:\\Users\\DIVYA JAISWAL\\.gemini\\antigravity\\brain\\97f0a7df-c8c4-4b28-8c3e-40c5df65a328\\.system_generated\\steps\\734\\content.md', 'utf8');

// Find all URLs in content.md containing wp-content/uploads
const urls = content.match(/https:\/\/cleanz24\.com\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"'\s\)]+/g);
const uniqueUrls = [...new Set(urls)];
console.log(uniqueUrls);
