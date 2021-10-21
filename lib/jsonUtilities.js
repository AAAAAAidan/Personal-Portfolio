// Error response messages
const messages = {
  400: "The server was unable to process your request. :(",
  403: "You don't have permission to make this request! >:("
}

/**
 * Formats the given data object as a JSON response
 *
 * @param {Object} data The data object to be formatted
 * @returns {String} Returns the formatted JSON string
 */
function formatResult(data) {
  const json = {
    success: true,
    data: data
  }

  return JSON.stringify(json, null, 2)
}

/**
 * Formats the given data objects into a JSON response
 *
 * @param {Object[]} data The data objects to be formatted
 * @param {Object} req The request object from the URL
 * @returns {String} Returns the formatted JSON string
 */
function formatResults(data, req) {
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
  const dataPerPage = req.query.dataPerPage || 10
  const nextPageNum = page < data.length / dataPerPage ? parseInt(page) + 1 : null
  const previousPageNum = page > 1 ? parseInt(page) - 1 : null
  const json = {
    success: true,
    previousPage: previousPageNum ? url.replace("page=" + page, "page=" + previousPageNum) : null,
    nextPage: nextPageNum ? url.replace("page=" + page, "page=" + nextPageNum) : null,
    dataPerPage: parseInt(dataPerPage),
    dataCount: data.length,
    data: page > 0 ? data.splice(page * dataPerPage - dataPerPage, dataPerPage) : []
  }

  return JSON.stringify(json, null, 2)
}

/**
 * Formats the given string into a JSON error message response
 *
 * @param {String} errorCode The error code of the message
 * @returns {String} Returns the formatted JSON string
 */
function formatError(errorCode) {
  const json = {
    success: false,
    data: messages[errorCode]
  }

  return JSON.stringify(json, null, 2)
}

export {
  formatResult,
  formatResults,
  formatError
}
