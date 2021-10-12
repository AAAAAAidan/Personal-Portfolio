// Error response messages
const messages = {
  400: "The server was unable to process your request. :(",
  403: "You don't have permission to make this request! >:("
}

/**
 * Formats the given result object as a JSON response
 *
 * @param {Object} result The result object to be formatted
 * @returns {String} Returns the formatted JSON string
 */
const formatResult = function(result) {
  const json = {
    success: true,
    result: result
  }

  return JSON.stringify(json, null, 2)
}

/**
 * Formats the given result objects into a JSON response
 *
 * @param {Object[]} results The result objects to be formatted
 * @param {Object} req The request object from the URL
 * @returns {String} Returns the formatted JSON string
 */
const formatResults = function(results, req) {
  var url = "http://" + req.headers.host + req.url

  // Add the page parameter if it's missing; it's needed for page links to work
  if (!req.url.includes("page=")) {
    if (req.url.includes("?")) {
      url += "&page=1"
    }
    else {
      url += "?page=1"
    }
  }

  const page = req.query.page || 1
  const resultsPerPage = req.query.resultsPerPage || 10
  const nextPageNum = page < results.length / resultsPerPage ? parseInt(page) + 1 : null
  const previousPageNum = page > 1 ? parseInt(page) - 1 : null
  const json = {
    success: true,
    previousPage: previousPageNum ? url.replace("page=" + page, "page=" + previousPageNum) : null,
    nextPage: nextPageNum ? url.replace("page=" + page, "page=" + nextPageNum) : null,
    resultsPerPage: parseInt(resultsPerPage),
    resultsCount: results.length,
    results: page > 0 ? results.splice(page * resultsPerPage - resultsPerPage, resultsPerPage) : []
  }

  return JSON.stringify(json, null, 2)
}

/**
 * Formats the given string into a JSON error message response
 *
 * @param {String} errorCode The error code of the message
 * @returns {String} Returns the formatted JSON string
 */
const formatError = function(errorCode) {
  const json = {
    success: false,
    result: messages[errorCode]
  }

  return JSON.stringify(json, null, 2)
}

export {
  formatResult,
  formatResults,
  formatError
}
