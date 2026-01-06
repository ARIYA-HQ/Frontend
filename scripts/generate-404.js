const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const indexHtml = path.join(distDir, 'index.html');
const notFoundHtml = path.join(distDir, '404.html');

if (fs.existsSync(indexHtml)) {
    fs.copyFileSync(indexHtml, notFoundHtml);
    console.log('✅ Successfully created 404.html from index.html for GitHub Pages routing.');
} else {
    console.error('❌ Error: dist/index.html not found. Build may have failed.');
    process.exit(1);
}
