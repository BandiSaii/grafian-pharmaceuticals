import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

async function main() {
  const zai = await ZAI.create();
  const uploadDir = '/home/z/my-project/upload';
  const outDir = '/home/z/my-project/public';
  
  // Ensure directories exist
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  if (!fs.existsSync(`${outDir}/certificates`)) fs.mkdirSync(`${outDir}/certificates`, { recursive: true });

  // === 1. Process Logo: Remove black background, put on clean white ===
  console.log('Processing logo...');
  const logoSrc = path.join(uploadDir, 'pasted_image_1782310779361.jpg');
  const logoBuf = fs.readFileSync(logoSrc);
  const logoB64 = `data:image/jpeg;base64,${logoBuf.toString('base64')}`;

  try {
    // White-background version (for header on white nav)
    const logoWhiteRes = await zai.images.generations.edit({
      prompt: 'Clean professional pharmaceutical company logo on pure white background. The logo features a stylized green tree icon enclosed in a circle at the top, with the orange text "Grafian Pharmaceuticals" (with trademark symbol) below it. Centered, high quality, sharp, no shadows, no extra elements, transparent feel. Keep the EXACT same design, colors (green tree, orange text), layout, and text - just replace the solid black background with clean pure white. Professional corporate logo appearance.',
      images: [{ url: logoB64 }],
      size: '1152x864',
    });
    const logoWhiteBuf = Buffer.from(logoWhiteRes.data[0].base64, 'base64');
    fs.writeFileSync(`${outDir}/logo-white.png`, logoWhiteBuf);
    console.log(`  Saved: ${outDir}/logo-white.png (${logoWhiteBuf.length} bytes)`);
  } catch (e) {
    console.error('  Logo white failed:', e.message);
  }

  // === 2. Process WHO-GMP certificate as clean trust badge ===
  console.log('Processing WHO-GMP certificate...');
  const whoSrc = path.join(uploadDir, 'pasted_image_1782310747177.jpg');
  const whoBuf = fs.readFileSync(whoSrc);
  const whoB64 = `data:image/jpeg;base64,${whoBuf.toString('base64')}`;

  try {
    const whoRes = await zai.images.generations.edit({
      prompt: 'A clean professional circular WHO-GMP certification seal/badge on pure white background. The seal features a dark green (olive) circular background with gold accents (laurel wreath border, five gold stars at top). Text reads "GOOD MANUFACTURING PRACTICE" curved along the top, "WHO-GMP CERTIFIED" centered in bold white, and "QUALITY PRODUCT" curved along the bottom. Keep the EXACT same design and colors - just replace the solid black background with clean pure white. Make it look like a professional certification trust badge. Centered, sharp, no shadows.',
      images: [{ url: whoB64 }],
      size: '1024x1024',
    });
    const whoOutBuf = Buffer.from(whoRes.data[0].base64, 'base64');
    fs.writeFileSync(`${outDir}/certificates/who-gmp.png`, whoOutBuf);
    console.log(`  Saved: ${outDir}/certificates/who-gmp.png (${whoOutBuf.length} bytes)`);
  } catch (e) {
    console.error('  WHO-GMP failed:', e.message);
  }

  // === 3. Process ISO 9001 certificate as clean trust badge ===
  console.log('Processing ISO 9001 certificate...');
  const isoSrc = path.join(uploadDir, 'pasted_image_1782310763438.jpg');
  const isoBuf = fs.readFileSync(isoSrc);
  const isoB64 = `data:image/jpeg;base64,${isoBuf.toString('base64')}`;

  try {
    const isoRes = await zai.images.generations.edit({
      prompt: 'A clean professional circular ISO 9001 certification seal/badge on pure white background. The seal features a gold star-burst (spiked) outer edge, with a black inner ring containing the word "CERTIFIED" (top and bottom) in gold text, and small gold stars arranged in a circle. A horizontal gold banner spans the middle displaying "ISO 9001" in large bold black text. Keep the EXACT same design and colors - just ensure the background is clean pure white. Make it look like a professional certification trust badge. Centered, sharp, no shadows.',
      images: [{ url: isoB64 }],
      size: '1024x1024',
    });
    const isoOutBuf = Buffer.from(isoRes.data[0].base64, 'base64');
    fs.writeFileSync(`${outDir}/certificates/iso-9001.png`, isoOutBuf);
    console.log(`  Saved: ${outDir}/certificates/iso-9001.png (${isoOutBuf.length} bytes)`);
  } catch (e) {
    console.error('  ISO 9001 failed:', e.message);
  }

  console.log('\nDone!');
}

main().catch(e => { console.error(e); process.exit(1); });
