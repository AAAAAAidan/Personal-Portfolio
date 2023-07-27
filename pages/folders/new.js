import { getApiForm } from "../../lib/apiUtilities"

export default function NewFolder() {
  const action = "/api/folders"
  const method = "post"
  const data = {
    title: "",
    description: "",
    files: []
  }
  return getApiForm(action, method, data)
}
