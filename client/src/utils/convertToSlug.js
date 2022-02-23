/**
 * Create a slug from any string by condensing consecutive spaces into a hyphen
 * @param {string} text
 * @return {string}
 */
const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

module.exports = convertToSlug;
