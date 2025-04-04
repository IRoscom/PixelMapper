const { createCanvas } = require("canvas");
const convertRGBColor = require("../utils/convertRGBColor");

module.exports = (object) => {
  try {
    const canvas = createCanvas(64, 64);
    const ctx = canvas.getContext("2d");

    for (let y = 0; y < 64; y++) {
      const row = object[y.toString()];
      for (let x = 0; x < 64; x++) {
        const value = parseFloat(row[x.toString()]);
        const color = convertRGBColor(value);
        ctx.fillStyle = color;
        ctx.fillRect(y, x, 1, 1);
      }
    }

    return canvas.toBuffer();
  } catch (error) {
    return null;
  }
};
