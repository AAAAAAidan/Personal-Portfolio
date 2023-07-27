// Error response messages
const messages = {
  400: "The server was unable to process your request. :(",
  403: "You don't have permission to make this request! >:("
}

/**
 * Formats the given data object as a JSON response
 *
 * @param {Object} data The data object to be formatted
 * @returns {Object} Returns the JSON
 */
function formatResult(data) {
  return {
    success: true,
    data: data
  }
}

/**
 * Formats the given data objects into a JSON response
 *
 * @param {Object[]} data The data objects to be formatted
 * @param {Object} req The request object from the URL
 * @returns {Object} Returns the JSON
 */
function formatResults(data, req) {
  var url = "http://" + req.headers.host + req.url

  // Add the page parameter if it's missing; it's needed for page links to work
  if (!req.url.includes("page=")) {
    if (req.url.includes("?")) {
      url += "&page=1"
    } else {
      url += "?page=1"
    }
  }

  const page = req.query.page || 1
  const dataPerPage = req.query.dataPerPage || 10
  const nextPageNum = page < data.length / dataPerPage ? parseInt(page) + 1 : null
  const previousPageNum = page > 1 ? parseInt(page) - 1 : null
  return {
    success: true,
    previousPage: previousPageNum ? url.replace("page=" + page, "page=" + previousPageNum) : null,
    nextPage: nextPageNum ? url.replace("page=" + page, "page=" + nextPageNum) : null,
    dataPerPage: parseInt(dataPerPage),
    dataCount: data.length,
    data: page > 0 ? data.splice(page * dataPerPage - dataPerPage, dataPerPage) : []
  }
}

/**
 * Formats the given string into a JSON error message response
 *
 * @param {String} errorCode The error code of the message
 * @returns {Object} Returns the JSON
 */
function formatError(errorCode) {
  return {
    success: false,
    data: messages[errorCode]
  }
}

export {
  formatResult,
  formatResults,
  formatError
}
