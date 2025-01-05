import sharp from 'sharp';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const iconsDir = join(__dirname, '../public/icons');

async function convertSvgToPng(filename) {
  const svgPath = join(iconsDir, filename);
  const pngPath = join(iconsDir, filename.replace('.svg', '.png'));
  
  try {
    const svgBuffer = readFileSync(svgPath);
    await sharp(svgBuffer)
      .png()
      .toFile(pngPath);
    console.log(`Converted ${filename} to PNG`);
  } catch (error) {
    console.error(`Error converting ${filename}:`, error);
  }
}

async function convertAllIcons() {
  const files = readdirSync(iconsDir);
  const svgFiles = files.filter(file => file.endsWith('.svg'));
  
  for (const file of svgFiles) {
    await convertSvgToPng(file);
  }
}

convertAllIcons();
