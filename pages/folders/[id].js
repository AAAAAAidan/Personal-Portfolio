import { getApiForm, getStaticApiPaths, getStaticApiProps } from "../../lib/apiUtilities"
import Folder from "../../models/Folder"

export default function UpdateFolder({ folder }) {
  const action = "/api/folders/" + folder._id
  const method = "put"
  const data = {
    title: folder.title,
    description: folder.description,
    files: folder.files
  }
  return getApiForm(action, method, data)
}

export async function getStaticPaths() {
  const paths = await getStaticApiPaths(Folder)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const folder = await getStaticApiProps(Folder, params.id)
  return {
    props: {
      folder
    }
  }
}
