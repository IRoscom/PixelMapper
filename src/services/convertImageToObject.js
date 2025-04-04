const { Jimp, intToRGBA } = require("jimp");
const getColor = require("../utils/getColor");

module.exports = async (buffer) => {
  const image = await Jimp.read(buffer);
  const { width, height } = image.bitmap;
  if (width === 64 && height === 64) {
    const pixelData = {};
    for (let y = 0; y < height; y++) {
      pixelData[y] = {};
      for (let x = 0; x < width; x++) {
        const color = image.getPixelColor(y, x);
        const rgba = intToRGBA(color);
        pixelData[y][x] = String(getColor(rgba.r, rgba.g, rgba.b)) + ".0";
      }
    }
    return JSON.stringify(pixelData);
  }
};
