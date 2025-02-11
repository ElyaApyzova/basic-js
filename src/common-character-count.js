const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const frequencyMap1 = createFrequencyMap(s1);
  const frequencyMap2 = createFrequencyMap(s2);

  let commonCount = 0;

  for (const char in frequencyMap1) {
    if (frequencyMap2[char]) {
      commonCount += Math.min(frequencyMap1[char], frequencyMap2[char]);
    }
  }
  return commonCount;
}

function createFrequencyMap(str) {
  const frequencyMap = {};
  for (const char of str) {
    frequencyMap[char] = (frequencyMap[char] || 0) + 1;
  }
  return frequencyMap;
}

module.exports = {
  getCommonCharacterCount
};
