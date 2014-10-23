function removeColor(str) {
  return typeof str === 'string' ? str.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '').trim() : str;
}

module.exports = removeColor;