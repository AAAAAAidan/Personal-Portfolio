import { handleIndexRequests } from "../../../lib/apiUtilities"
import Folder from "../../../models/Folder"

export default async function handler(req, res) {
  await handleIndexRequests(req, res, Folder)
}
