import sharp from 'sharp';
import fs from 'fs';

/**
 * Convert the logo (currently on white background) into a true transparent PNG.
 * Strategy:
 *   - Load pixels as raw RGBA
 *   - For each pixel, compute how "white" it is (max channel difference from 255)
 *   - Pure white (255,255,255) → alpha 0
 *   - Pure colored (e.g. green/orange) → alpha 255
 *   - Anti-aliased edges → proportional alpha
 *   - Also color-correct the edge pixels by "un-multiplying" the white background
 *     so the logo edges look clean against any background color.
 */

async function makeTransparent(
  inputPath: string,
  outputPath: string,
  options: { threshold?: number; feather?: number } = {}
) {
  const threshold = options.threshold ?? 240; // pixels >= this on all channels are "white"
  const feather = options.feather ?? 15; // soft edge range

  // Load image with sharp — get metadata
  const meta = await sharp(inputPath).metadata();
  const width = meta.width!;
  const height = meta.height!;

  // Get raw RGB pixels
  const rawRgb = await sharp(inputPath)
    .removeAlpha()
    .raw()
    .toBuffer();

  // Build RGBA buffer with transparency
  const rgba = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const rRaw = rawRgb[i * 3];
    const gRaw = rawRgb[i * 3 + 1];
    const bRaw = rawRgb[i * 3 + 2];

    // "Whiteness" — minimum channel value (pure white = 255)
    const minChan = Math.min(rRaw, gRaw, bRaw);
    // "Saturation" — how colorful is this pixel
    const maxChan = Math.max(rRaw, gRaw, bRaw);
    const sat = maxChan - minChan;

    let alpha: number;
    if (minChan >= threshold) {
      // Pure / near-white background → fully transparent
      alpha = 0;
    } else if (minChan >= threshold - feather && sat < 30) {
      // Anti-aliased edge between white and content → smooth transition
      const t = (threshold - minChan) / feather;
      alpha = Math.round(255 * t);
    } else {
      // Solid colored pixel → fully opaque
      alpha = 255;
    }

    // For semi-transparent edge pixels, "un-premultiply" the white background
    // so the underlying color is preserved when the pixel is blended later.
    let r = rRaw;
    let g = gRaw;
    let b = bRaw;
    if (alpha > 0 && alpha < 255) {
      const a = alpha / 255;
      r = Math.round((rRaw - 255 * (1 - a)) / a);
      g = Math.round((gRaw - 255 * (1 - a)) / a);
      b = Math.round((bRaw - 255 * (1 - a)) / a);
      r = Math.max(0, Math.min(255, r));
      g = Math.max(0, Math.min(255, g));
      b = Math.max(0, Math.min(255, b));
    }

    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    rgba[i * 4 + 3] = alpha;
  }

  // Encode as PNG with alpha
  await sharp(rgba, {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 9, palette: false })
    .toFile(outputPath);

  // Verify
  const outMeta = await sharp(outputPath).metadata();
  const outSize = fs.statSync(outputPath).size;
  console.log(`✓ ${outputPath}`);
  console.log(`  Dimensions: ${outMeta.width}×${outMeta.height}, channels: ${outMeta.channels}, size: ${outSize} bytes`);
  console.log(`  Has alpha: ${outMeta.hasAlpha ? 'YES' : 'NO'}`);
}

async function main() {
  // 1. Logo: remove white background → transparent PNG
  console.log('Processing logo to transparent PNG…');
  await makeTransparent(
    '/home/z/my-project/public/logo-white.png',
    '/home/z/my-project/public/logo.png',
    { threshold: 238, feather: 18 }
  );

  // 2. WHO-GMP certificate: also transparent (so badge sits nicely on any background)
  console.log('\nProcessing WHO-GMP certificate to transparent PNG…');
  await makeTransparent(
    '/home/z/my-project/public/certificates/who-gmp.png',
    '/home/z/my-project/public/certificates/who-gmp.png',
    { threshold: 240, feather: 12 }
  );

  // 3. ISO 9001 certificate: also transparent
  console.log('\nProcessing ISO 9001 certificate to transparent PNG…');
  await makeTransparent(
    '/home/z/my-project/public/certificates/iso-9001.png',
    '/home/z/my-project/public/certificates/iso-9001.png',
    { threshold: 240, feather: 12 }
  );

  console.log('\n✅ All images processed to transparent PNG.');
}

main().catch(e => { console.error(e); process.exit(1); });
