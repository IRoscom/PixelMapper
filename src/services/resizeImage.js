const sharp = require("sharp");
module.exports = (buffer) => {
  return sharp(buffer)
    .resize({
      width: 64,
      height: 64,
    })
    .png()
    .toBuffer();
};
