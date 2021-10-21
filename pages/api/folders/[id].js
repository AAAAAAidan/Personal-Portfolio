import { handleIdRequests } from "../../../lib/apiUtilities"
import Folder from "../../../models/Folder"

export default async function handler(req, res) {
  await handleIdRequests(req, res, Folder)
}
