const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const nameCounts = {};
  const result = [];

  for (const name of names) {
    if (!nameCounts[name]) {
      result.push(name);
      nameCounts[name] = 1;
    } else {
      let k = nameCounts[name];
      let newName = `${name}(${k})`;

      while (nameCounts[newName]) {
        k++;
        newName = `${name}(${k})`;
      }

      result.push(newName);
      nameCounts[newName] = 1;
      nameCounts[name] = k + 1;
    }
  }

  return result;
}

module.exports = {
  renameFiles
};
