import { getApiForm, getStaticApiPaths, getStaticApiProps } from "../../lib/apiUtilities"
import File from "../../models/File"

export default function UpdateFile({ file }) {
  const action = "/api/files/" + file._id
  const method = "put"
  const data = {
    filename: file.filename,
    title: file.title,
    description: file.description
  }
  return getApiForm(action, method, data)
}

export async function getStaticPaths() {
  const paths = await getStaticApiPaths(File)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const file = await getStaticApiProps(File, params.id)
  return {
    props: {
      file
    }
  }
}
