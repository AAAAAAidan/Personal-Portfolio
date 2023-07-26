import { getApiList, getStaticApiProps } from "../../lib/apiUtilities"
import File from "../../models/File"

export default function ListFiles({ files }) {
  return getApiList("/files", files)
}

export async function getStaticProps() {
  const files = await getStaticApiProps(File)
  return {
    props: {
      files
    }
  }
}
