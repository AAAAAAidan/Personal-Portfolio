import { formatResult, formatError } from "../../lib/jsonUtilities"

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      console.log(req.headers.host)
      try {
        const links = {
          files: "http://" + req.headers.host + req.url + "/files",
          folders: "http://" + req.headers.host + req.url + "/folders"
        }
        res.status(200).json(formatResult(links))
      } catch (e) {
        console.error(e.stack)
      }
      break
  }

  if (!res.headersSent) {
    res.status(400).json(formatError(400))
  }
}
