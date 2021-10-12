import { handleIdRequests } from "../../../lib/apiUtilities"
import File from "../../../models/File"

export default async function handler(req, res) {
  await handleIdRequests(req, res, File)
}
