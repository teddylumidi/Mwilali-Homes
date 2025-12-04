import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CHANGED: Output to src/assets instead of public
const ASSETS_DIR = path.join(process.cwd(), 'src', 'assets');

// 1. Ensure assets directory exists
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
  console.log('Created src/assets directory');
}

// List of all required filenames.
// CHANGED: Property images are now .pdf to match constants.ts
const files = [
  // --- LOGOS (Keep as PNG) ---
  "logo.webp",
  "logo-white.webp",

  // --- OAK BREEZE UNIT SERIES (.pdf) ---
  ...Array.from({length: 6}, (_, i) => `1BR 45SQM-${i + 1}.pdf`),
  ...Array.from({length: 5}, (_, i) => `1BR 50SQM-${i + 1}.pdf`),
  ...Array.from({length: 6}, (_, i) => `1BR 59SQM-${i + 1}.pdf`),
  
  // --- BROOKSIDE OAK SINGLE UNIT IMAGES (.pdf) ---
  "1BR 65SQM.pdf",
  "1BR 70SQM.pdf",
  "1BR 75SQM.pdf",
  "1BR 89SQM.pdf",
  
  // --- OAK BREEZE 2BR SERIES (.pdf) ---
  ...Array.from({length: 8}, (_, i) => `2BR 91SQM-${i + 1}.pdf`),
  ...Array.from({length: 8}, (_, i) => `2BR 95SQM-${i + 1}.pdf`),
  ...Array.from({length: 9}, (_, i) => `2BR 96SQM-${i + 1}.pdf`),
  
  // --- BROOKSIDE OAK SINGLE UNIT IMAGES (CONTINUED) (.pdf) ---
  "2BR 100SQM.pdf",
  "2BR 118SQM.pdf",
  "3BR 142SQM.pdf",
  "3BR 172SQM.pdf",
  "3BR 186SQM.pdf",
  "3BR 200SQM (3)-1.pdf",
  "3BR 200SQM (7)-1.pdf",
  
  // --- BROOKSIDE OAK 3BR INTERIORS (01-25) (.pdf) ---
  ...Array.from({length: 25}, (_, i) => `251025 3BR INTERIOR RENDERS-${String(i + 1).padStart(2, '0')}.pdf`),
  
  // --- BROOKSIDE OAK AMENITIES (01-18) (.pdf) ---
  ...Array.from({length: 18}, (_, i) => `251025 AMENITIES-${String(i + 1).padStart(2, '0')}.pdf`),
  
  // --- BROOKSIDE OAK 1BR INTERIORS (1-6) (.pdf) ---
  ...Array.from({length: 6}, (_, i) => `2510251BR INTERIOR RENDERS-${i + 1}.pdf`),
  
  // --- BROOKSIDE OAK FLOOR PLAN (.pdf) ---
  "New Typical Floor Plan - 1.pdf",
  
  // --- OAK BREEZE BROCHURE (01-23) (.pdf) ---
  ...Array.from({length: 23}, (_, i) => `Oak_Breeze_Residency_Brochure-${String(i + 1).padStart(2, '0')}.pdf`)
];

// Helper to download a dummy image
const downloadPlaceholder = (rawFilename) => {
  // Strip leading "./" if present
  const filename = rawFilename.startsWith('./') ? rawFilename.substring(2) : rawFilename;
  const filePath = path.join(ASSETS_DIR, filename);
  
  // Skip if exists
  if (fs.existsSync(filePath)) {
    return;
  }

  // Determine text and dimensions
  const text = filename.replace('.pdf', '').replace('.webp', '').substring(0, 25);
  
  // Dimensions: Default Landscape
  let width = 800;
  let height = 600;

  // Brochure pages are usually portrait
  if (filename.toLowerCase().includes('brochure')) {
    width = 600;
    height = 850;
  }

  // Logos
  if (filename.includes('logo')) {
    width = 400;
    height = 100;
  }

  // Colors
  let bg = 'e2e8f0'; // slate-200
  let fg = '475569'; // slate-600
  
  if (filename.includes('logo')) {
    bg = filename.includes('white') ? '1a202c' : 'ffffff';
    fg = filename.includes('white') ? 'ffffff' : '1a202c';
  } else if (filename.includes('Oak_Breeze')) {
    bg = 'fdfbf7'; // Cream
    fg = 'c05621'; // Accent
  }

  const url = `https://placehold.co/${width}x${height}/${bg}/${fg}/png?text=${encodeURIComponent(text)}`;

  const file = fs.createWriteStream(filePath);
  
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Generated: ${filename}`);
    });
  }).on('error', (err) => {
    fs.unlink(filename);
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
};

console.log(`Generating ${files.length} placeholder assets in src/assets...`);

// Throttle requests to avoid rate limits
let delay = 0;
files.forEach(file => {
  setTimeout(() => {
    downloadPlaceholder(file);
  }, delay);
  delay += 50; 
});
