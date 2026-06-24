import sharp from 'sharp';

// Crop just the header area (top 350px of the screenshot)
await sharp('/home/z/my-project/scripts/desktop-massive.png')
  .extract({ left: 0, top: 0, width: 1440, height: 350 })
  .toFile('/home/z/my-project/scripts/header-crop.png');

console.log('Header crop saved.');
