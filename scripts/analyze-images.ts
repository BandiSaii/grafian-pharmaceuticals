import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

async function main() {
  const zai = await ZAI.create();
  const dir = '/home/z/my-project/upload';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

  for (const file of files) {
    const fp = path.join(dir, file);
    const buf = fs.readFileSync(fp);
    const b64 = buf.toString('base64');
    console.log(`\n=== ${file} ===`);
    try {
      const res = await zai.chat.completions.createVision({
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Describe this image in detail. Is it: a company logo, a certificate, a medicine box, a building, or something else? Mention any text you can read on the image, the colors used, the layout, and what the image depicts.',
              },
              {
                type: 'image_url',
                image_url: { url: `data:image/jpeg;base64,${b64}` },
              },
            ],
          },
        ],
        thinking: { type: 'disabled' },
      });
      console.log(res.choices[0]?.message?.content || '(no content)');
    } catch (e) {
      console.error('Error:', e);
    }
  }
}

main();
