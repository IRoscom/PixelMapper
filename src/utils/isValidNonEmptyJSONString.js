const isValidNonEmptyJSON = require("./isValidNonEmptyJSON");

module.exports = (obj) => {
  try {
    const parsed = JSON.parse(obj);
    return isValidNonEmptyJSON(parsed);
  } catch (e) {
    return false;
  }
};
