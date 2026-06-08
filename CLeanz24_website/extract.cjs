const fs = require('fs');
const txt = fs.readFileSync('C:\\Users\\DIVYA JAISWAL\\.gemini\\antigravity\\brain\\97f0a7df-c8c4-4b28-8c3e-40c5df65a328\\.system_generated\\steps\\46\\content.md', 'utf8');
const links = txt.match(/href="https:\/\/cleanz24\.com[^"]*"/g) || [];
const uniqueLinks = [...new Set(links)];
console.log(uniqueLinks.join('\n'));
