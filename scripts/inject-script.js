import fs from 'fs';
import path from 'path';

const assetsDir = 'dist/client/assets';
const indexPath = 'dist/client/index.html';

// Copy index.html to dist/client if it doesn't exist
if (!fs.existsSync(indexPath)) {
  fs.copyFileSync('index.html', indexPath);
  console.log('Copied index.html to dist/client/');
}

// Find the main JS bundle (the largest one typically)
const files = fs.readdirSync(assetsDir);
const jsFiles = files.filter(f => f.startsWith('index-') && f.endsWith('.js'));

if (jsFiles.length === 0) {
  console.warn('No index JS file found in assets');
  process.exit(0);
}

// Sort by file size (largest first) to get the main bundle
const mainFile = jsFiles.sort((a, b) => {
  const sizeA = fs.statSync(path.join(assetsDir, a)).size;
  const sizeB = fs.statSync(path.join(assetsDir, b)).size;
  return sizeB - sizeA;
})[0];

// Read the current index.html
let html = fs.readFileSync(indexPath, 'utf-8');

// Inject the script tag before closing body
const scriptTag = `    <script type="module" src="./assets/${mainFile}"><\/script>\n  </body>`;
html = html.replace('  </body>', scriptTag);

// Write back
fs.writeFileSync(indexPath, html);
console.log(`Injected script: ${mainFile}`);
