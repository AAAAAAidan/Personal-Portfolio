/**
 * Formats the given result object as a JSON response.
 *
 * @param {Object} result The result object to be formatted.
 * @returns {JSON} Returns the formatted JSON string.
 */
const formatResult = function(result) {
  return JSON.stringify(result, null, 2);
}

/**
 * Formats the given result objects into a JSON response.
 *
 * @param {Object[]} results The result objects to be formatted.
 * @param {Integer} page The current page of results.
 * @param {Integer} resultsPerPage The number of results per page.
 * @param {String} fileExtension The file extension of the objects.
 * @returns {JSON} Returns the formatted JSON string.
 */
const formatResults = function(results, page, resultsPerPage, fileExtension) {
  const json = {
    fileExtension: fileExtension,
    previousPage: page > 1 ? parseInt(page) - 1 : null,
    nextPage: page < results.length / resultsPerPage ? parseInt(page) + 1 : null,
    resultsPerPage: parseInt(resultsPerPage),
    resultsCount: results.length,
    results: page > 0 ? results.splice(page * resultsPerPage - resultsPerPage, resultsPerPage) : []
  }

  return JSON.stringify(json, null, 2);
}

/**
 * Formats the given string into a JSON error message response.
 *
 * @param {String} message The error message to return.
 * @returns {JSON} Returns the formatted JSON string.
 */
const formatError = function(message) {
  const json = {
    message: message,
  }

  return JSON.stringify(json, null, 2);
}

module.exports = {
  formatResult,
  formatResults,
  formatError
};
