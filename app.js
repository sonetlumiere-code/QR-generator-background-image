const qrcode = require('qrcode');
const sharp = require('sharp');

async function generateQRCode(data, outputFile) {
  try {
    const qrSize = 500;
    const qrCode = await qrcode.toBuffer(data, { 
      errorCorrectionLevel: 'H',
      width: qrSize,
      height: qrSize
    });

    const backgroundImage = await sharp('background.jpg');

    const imageMetadata = await backgroundImage.metadata();

    const verticalPercentage = 38;
    const verticalPosition = Math.floor((imageMetadata.height * verticalPercentage) / 100);
    const horizontalPosition = (imageMetadata.width - qrSize) / 2;

    const result = await backgroundImage
      .composite([
        {
          input: qrCode,
          // gravity: 'center', // Position the QR code in the center of the image
          top: verticalPosition,
          left: horizontalPosition
        },
      ])
      .toFile(outputFile);

    console.log('QR code with background image created:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

generateQRCode('https://example.com', 'output.jpg');
