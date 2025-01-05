import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' },
  { size: 192, name: 'pwa-maskable-192x192.png' },
  { size: 512, name: 'pwa-maskable-512x512.png' }
];

async function generateIcons() {
  const inputImage = join(__dirname, '..', 'public', 'logo.svg');
  const outputDir = join(__dirname, '..', 'public', 'icons');

  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    for (const { size, name } of sizes) {
      await sharp(inputImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(join(outputDir, name));
      
      console.log(`Generated ${name}`);
    }

    console.log('All PWA icons generated successfully!');
  } catch (error) {
    console.error('Error generating PWA icons:', error);
  }
}

generateIcons();
