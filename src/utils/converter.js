module.exports = {
	RGBColor,
	getColor,
};

function RGBColor(value) {
	const intValue = Math.floor(value);
	const r = (intValue >> 16) & 0xff;
	const g = (intValue >> 8) & 0xff;
	const b = intValue & 0xff;
	return `rgb(${r}, ${g}, ${b})`;
}

function getColor(r, g, b) {
	return (r << 16) | (g << 8) | b;
}
