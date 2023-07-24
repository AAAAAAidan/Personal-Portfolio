import { getApiList, getStaticApiProps } from "../../lib/apiUtilities"

export default function ListFolders({ folders }) {
  return getApiList("/folders", folders)
}

export async function getStaticProps() {
  const folders = await getStaticApiProps("/api/folders")
  return {
    props: {
      folders
    }
  }
}
