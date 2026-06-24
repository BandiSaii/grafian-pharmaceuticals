import sharp from 'sharp';

// Crop just the certificate area from the screenshot for closer inspection
await sharp('/home/z/my-project/scripts/certs-on-home.png')
  .extract({ left: 700, top: 100, width: 500, height: 250 })
  .toFile('/home/z/my-project/scripts/cert-crop.png');

console.log('Cropped certificate area saved.');
