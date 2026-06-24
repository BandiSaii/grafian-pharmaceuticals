import sharp from 'sharp';
import fs from 'fs';

async function main() {
  const files = [
    '/home/z/my-project/public/logo-white.png',
    '/home/z/my-project/public/certificates/who-gmp.png',
    '/home/z/my-project/public/certificates/iso-9001.png',
  ];

  for (const f of files) {
    const buf = fs.readFileSync(f);
    // Detect if it's actually JPEG data
    const isJpeg = buf[0] === 0xff && buf[1] === 0xd8;
    console.log(`${f} — currently ${isJpeg ? 'JPEG' : 'PNG'} (${buf.length} bytes)`);

    if (isJpeg) {
      // Convert to true PNG with sharp, flatten on pure white background,
      // and optimise compression. Output dimensions preserved.
      const outBuf = await sharp(buf)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .png({
          quality: 95,
          compressionLevel: 9,
          palette: false,
          mozjpeg: false,
        })
        .toBuffer();

      // Write back to the same .png path
      fs.writeFileSync(f, outBuf);
      console.log(`  → converted to real PNG (${outBuf.length} bytes)`);
    } else {
      // Already PNG — just re-encode to ensure clean PNG
      const outBuf = await sharp(buf)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .png({ compressionLevel: 9 })
        .toBuffer();
      fs.writeFileSync(f, outBuf);
      console.log(`  → re-encoded as PNG (${outBuf.length} bytes)`);
    }
  }

  // Verify
  for (const f of files) {
    const buf = fs.readFileSync(f);
    const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
    console.log(`Verify ${f}: ${isPng ? '✓ real PNG' : '✗ NOT PNG'}`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
