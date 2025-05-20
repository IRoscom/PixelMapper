module.exports = {
	nonEmptyJSON,
	nonEmptyJSONString,
};

function nonEmptyJSON(obj) {
	const isObject =
		obj !== null && typeof obj === "object" && !Array.isArray(obj);
	return isObject && Object.keys(obj).length > 0;
}

function nonEmptyJSONString(obj) {
	try {
		const parsed = JSON.parse(obj);
		return nonEmptyJSON(parsed);
	} catch (e) {
		return false;
	}
}
