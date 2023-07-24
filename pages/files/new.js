import { getApiForm } from "../../lib/apiUtilities"

export default function NewFile() {
  const action = "/api/files"
  const method = "post"
  const data = {
    filename: "",
    title: "",
    description: ""
  }
  return getApiForm(action, method, data)
}
