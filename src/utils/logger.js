require("colors");
const date = new Date().toLocaleDateString();
module.exports = {
	/**
	 * @param  {...any} message
	 */
	info(message, type = "bot") {
		console.info(
			`[${date} ${new Date().toLocaleTimeString()}]`.gray,
			`[info]`.toUpperCase().blue,
			`(${type})`,
			message
		);
	},
	/**
	 * @param  {...any} message
	 */
	error(message, type = "bot") {
		console.error(
			`[${date} ${new Date().toLocaleTimeString()}]`.gray,
			`[error]`.toUpperCase().red,
			`(${type})`,
			message
		);
	},
	/**
	 * @param  {...any} message
	 */
	warn(message, type = "bot") {
		console.warn(
			`[${date} ${new Date().toLocaleTimeString()}]`.gray,
			`[warning]`.toUpperCase().yellow,
			`(${type})`,
			message
		);
	},
};
