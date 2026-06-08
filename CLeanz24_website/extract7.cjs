const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\DIVYA JAISWAL\\.gemini\\antigravity\\brain\\97f0a7df-c8c4-4b28-8c3e-40c5df65a328\\.system_generated\\steps\\262\\content.md', 'utf8');
const clean = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                  .replace(/<[^>]+>/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim();
console.log(clean.substring(0, 4000));
