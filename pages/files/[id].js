import { getApiForm, getStaticApiPaths, getStaticApiProps } from "../../lib/apiUtilities"

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
  const paths = await getStaticApiPaths("/api/files")
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const file = await getStaticApiProps("/api/files/" + params.id)
  return {
    props: {
      file
    }
  }
}
