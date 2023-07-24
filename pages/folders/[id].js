import { getApiForm, getStaticApiPaths, getStaticApiProps } from "../../lib/apiUtilities"

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
  const paths = await getStaticApiPaths("/api/folders")
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const folder = await getStaticApiProps("/api/folders/" + params.id)
  return {
    props: {
      folder
    }
  }
}
