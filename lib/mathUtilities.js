/**
 * Returns a random number that is a valid index in the range of an array's length.
 * @param {Array[]} array - The array to get the index from.
 * @returns {Number} Returns the random index.
 */
function randomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

/**
 * Returns a random value from a valid index in the range of an array's length.
 * @param {Array[]} array - The array to get the value from.
 * @returns {Object} Returns the random value.
 */
function randomIndexValue(array) {
  return array[randomIndex(array)]
}

/**
 * Returns the previous valid index in an array, or the last index if the start of the array is reached.
 * @param {Array[]} array - The array to get the previous index from.
 * @param {Number} currentIndex - The current array index.
 * @returns {Number} Returns the previous index.
 */
function previousIndex(array, currentIndex) {
  if (currentIndex - 1 < 0) {
    return array.length - 1
  } else {
    return currentIndex - 1
  }
}

/**
 * Returns the next valid index in an array, or zero if the end of the array is reached.
 * @param {Array[]} array - The array to get the previous index from.
 * @param {Number} currentIndex - The current array index.
 * @returns {Number} Returns the next index.
 */
function nextIndex(array, currentIndex) {
  if (currentIndex + 1 >= array.length) {
    return 0
  } else {
    return currentIndex + 1
  }
}

export {
  randomIndex,
  randomIndexValue,
  previousIndex,
  nextIndex
}
