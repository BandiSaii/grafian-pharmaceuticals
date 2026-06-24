import sharp from 'sharp';
import fs from 'fs';

async function check(path: string) {
  const buf = fs.readFileSync(path);
  const meta = await sharp(buf).metadata();
  console.log(`\n${path}`);
  console.log(`  Format: ${meta.format}, channels: ${meta.channels}, hasAlpha: ${meta.hasAlpha}`);

  if (meta.hasAlpha) {
    // Get raw pixels and check alpha distribution
    const raw = await sharp(buf).raw().toBuffer();
    const w = meta.width!;
    const h = meta.height!;
    let transparent = 0, opaque = 0, partial = 0;
    for (let i = 0; i < w * h; i++) {
      const a = raw[i * 4 + 3];
      if (a === 0) transparent++;
      else if (a === 255) opaque++;
      else partial++;
    }
    const total = w * h;
    console.log(`  ${w}×${h} = ${total} pixels`);
    console.log(`  Transparent (alpha=0): ${transparent} (${(transparent/total*100).toFixed(1)}%)`);
    console.log(`  Opaque (alpha=255): ${opaque} (${(opaque/total*100).toFixed(1)}%)`);
    console.log(`  Partial (0<a<255): ${partial} (${(partial/total*100).toFixed(1)}%)`);
  }
}

async function main() {
  await check('/home/z/my-project/public/logo.png');
  await check('/home/z/my-project/public/certificates/who-gmp.png');
  await check('/home/z/my-project/public/certificates/iso-9001.png');
}

main();
