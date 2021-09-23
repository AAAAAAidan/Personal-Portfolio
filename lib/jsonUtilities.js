/**
 * Formats the given object as a JSON response.
 *
 * @param {Object} object The object to be formatted.
 * @returns {JSON} Returns the formatted JSON string.
 */
const formatResult = function(object) {
  if (!object) {
    object = {};
  }

  return JSON.stringify(object, null, 2);
}

/**
 * Formats the given objects into a JSON response.
 *
 * @param {Object[]} objects The objects to be formatted.
 * @param {String} type The file type of the objects.
 * @returns {JSON} Returns the formatted JSON string.
 */
const formatResults = function(objects, type) {
  let json = {
    type: null,
    count: 0,
    results: null
  }

  if (type) {
    json.type = type;
  }

  if (objects) {
    json.count = objects.length;
    json.results = objects;
  }

  return JSON.stringify(json, null, 2);
}

module.exports = {
  formatResult,
  formatResults
};
