/**
 * Fetches a JSON object from a URL.
 * @param {String} url - The request URL.
 * @returns {Array[]} Returns the JSON object and error string.
 */
async function fetchJson(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!data) {
      throw new Error("No data found from URL: " + url)
    }

    return [data, null]
  } catch(e) {
    console.error(e.stack)
    const error = "Sorry, a server error occured. :("
    return [null, error]
  }
}

/**
 * Fetches all folder objects from the native API, complete with file data.
 * @returns {Array[]} Returns the folders array and error string.
 */
async function fetchFolders() {
  // Fetch folders from the API
  const [foldersJson, foldersError] = await fetchJson("/api/folders")

  if (foldersError) {
    return [null, foldersError]
  }

  // Fetch files from the API
  const [filesJson, filesError] = await fetchJson("/api/files?dataPerPage=100")

  if (filesError) {
    return [null, filesError]
  }

  const files = filesJson.data

  // Replace all file IDs inside the folders with the associated file objects
  const folders = foldersJson.data.map((folder) => {
    for (var i in folder.files) {
      folder.files[i] = files.filter((file) => file._id == folder.files[i])[0]
    }

    return folder
  })

  return [folders, null]
}

export {
  fetchJson,
  fetchFolders
}
