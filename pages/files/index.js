import { getApiList, getStaticApiProps } from "../../lib/apiUtilities"

export default function ListFiles({ files }) {
  return getApiList("/files", files)
}

export async function getStaticProps() {
  const files = await getStaticApiProps("/api/files")
  return {
    props: {
      files
    }
  }
}
