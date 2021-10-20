/**
 * Fetches a JSON object from a URL
 *
 * @param {String} url The request URL
 * @returns {Object} Returns the JSON object
 */
async function fetchJson(url) {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export {
  fetchJson
}
