
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const imageDir = './public/images/properties';

const convertImagesToWebp = async () => {
  try {
    const files = await fs.readdir(imageDir);

    for (const file of files) {
      if (file.endsWith('.jpg')) {
        const inputPath = path.join(imageDir, file);
        const outputPath = path.join(imageDir, file.replace('.jpg', '.webp'));

        await sharp(inputPath)
          .toFormat('webp')
          .toFile(outputPath);

        console.log(`Converted ${file} to WebP`);
      }
    }
  } catch (error) {
    console.error('Error converting images:', error);
  }
};

convertImagesToWebp();
