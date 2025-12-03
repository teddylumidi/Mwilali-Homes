
import fs from 'fs';
import path from 'path';
import https from 'https';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// 1. Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  console.log('Created public directory');
}

// List of all required filenames based on the comprehensive mixed list and requirements
const files = [
  // --- LOGOS ---
  "logo.png",
  "logo-white.png",

  // --- OAK BREEZE UNIT SERIES ---
  ...Array.from({length: 6}, (_, i) => `1BR 45SQM-${i + 1}.jpg`),
  ...Array.from({length: 5}, (_, i) => `1BR 50SQM-${i + 1}.jpg`),
  ...Array.from({length: 6}, (_, i) => `1BR 59SQM-${i + 1}.jpg`),
  
  // --- BROOKSIDE OAK SINGLE UNIT IMAGES ---
  "1BR 65SQM.jpg",
  "1BR 70SQM.jpg",
  "1BR 75SQM.jpg",
  "1BR 89SQM.jpg",
  
  // --- OAK BREEZE 2BR SERIES ---
  ...Array.from({length: 8}, (_, i) => `2BR 91SQM-${i + 1}.jpg`),
  ...Array.from({length: 8}, (_, i) => `2BR 95SQM-${i + 1}.jpg`),
  ...Array.from({length: 9}, (_, i) => `2BR 96SQM-${i + 1}.jpg`),
  
  // --- BROOKSIDE OAK SINGLE UNIT IMAGES (CONTINUED) ---
  "2BR 100SQM.jpg",
  "2BR 118SQM.jpg",
  "3BR 142SQM.jpg",
  "3BR 172SQM.jpg",
  "3BR 186SQM.jpg",
  "3BR 200SQM (3)-1.jpg",
  "3BR 200SQM (7)-1.jpg",
  
  // --- BROOKSIDE OAK 3BR INTERIORS (01-25) ---
  ...Array.from({length: 25}, (_, i) => `251025 3BR INTERIOR RENDERS-${String(i + 1).padStart(2, '0')}.jpg`),
  
  // --- BROOKSIDE OAK AMENITIES (01-18) ---
  ...Array.from({length: 18}, (_, i) => `251025 AMENITIES-${String(i + 1).padStart(2, '0')}.jpg`),
  
  // --- BROOKSIDE OAK 1BR INTERIORS (1-6) ---
  ...Array.from({length: 6}, (_, i) => `2510251BR INTERIOR RENDERS-${i + 1}.jpg`),
  
  // --- BROOKSIDE OAK FLOOR PLAN ---
  "New Typical Floor Plan - 1.jpg",
  
  // --- OAK BREEZE BROCHURE (01-23) ---
  ...Array.from({length: 23}, (_, i) => `Oak_Breeze_Residency_Brochure-${String(i + 1).padStart(2, '0')}.jpg`)
];

// Helper to download a dummy image
const downloadPlaceholder = (filename) => {
  const filePath = path.join(PUBLIC_DIR, filename);
  
  // Skip if exists
  if (fs.existsSync(filePath)) {
    return;
  }

  // Create a simple placeholder from placehold.co
  const text = filename.replace('.jpg', '').replace('.png', '').substring(0, 20); // Shorten text
  
  // Different color for logo
  let bg = 'EEE';
  let fg = '31343C';
  if (filename.includes('logo')) {
    bg = filename.includes('white') ? '333' : 'FFF';
    fg = filename.includes('white') ? 'FFF' : '000';
  }

  const url = `https://placehold.co/800x600/${bg}/${fg}/png?text=${encodeURIComponent(text)}`;

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

console.log(`Generating ${files.length} placeholder images in /public...`);

// Throttle requests to avoid rate limits
let delay = 0;
files.forEach(file => {
  setTimeout(() => {
    downloadPlaceholder(file);
  }, delay);
  delay += 50; // 50ms delay between each
});
