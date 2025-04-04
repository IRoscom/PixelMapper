module.exports = (obj) => {
  const isObject =
    obj !== null && typeof obj === "object" && !Array.isArray(obj);
  return isObject && Object.keys(obj).length > 0;
};
