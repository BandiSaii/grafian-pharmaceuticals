import sharp from 'sharp';
import fs from 'fs';

/**
 * Auto-crop the logo PNG to remove excess transparent space around the actual logo content.
 * This makes the visible logo content fill the displayed area at any size.
 */
async function autocrop(inputPath: string, outputPath: string) {
  const buf = fs.readFileSync(inputPath);
  const meta = await sharp(buf).metadata();
  console.log(`Input: ${inputPath} — ${meta.width}×${meta.height}, alpha: ${meta.hasAlpha}`);

  // Use sharp's trim() to automatically remove transparent borders.
  const trimmed = await sharp(buf)
    .trim({
      threshold: 50,
    })
    .toBuffer();

  const trimmedMeta = await sharp(trimmed).metadata();
  console.log(`Trimmed: ${trimmedMeta.width}×${trimmedMeta.height}`);

  // Add a small padding around the logo content (5% on each side)
  const padW = Math.round(trimmedMeta.width! * 0.05);
  const padH = Math.round(trimmedMeta.height! * 0.05);

  const finalBuf = await sharp(trimmed)
    .extend({
      top: padH,
      bottom: padH,
      left: padW,
      right: padW,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();

  fs.writeFileSync(outputPath, finalBuf);
  const finalMeta = await sharp(finalBuf).metadata();
  console.log(`Output: ${outputPath} — ${finalMeta.width}×${finalMeta.height}, size: ${finalBuf.length} bytes`);
}

async function main() {
  await autocrop('/home/z/my-project/public/logo.png', '/home/z/my-project/public/logo.png');
  console.log('\n✓ Logo auto-cropped to remove excess transparent space.');
}

main().catch(e => { console.error(e); process.exit(1); });
