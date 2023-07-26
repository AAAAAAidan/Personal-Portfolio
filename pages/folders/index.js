import { getApiList, getStaticApiProps } from "../../lib/apiUtilities"
import Folder from "../../models/Folder"

export default function ListFolders({ folders }) {
  return getApiList("/folders", folders)
}

export async function getStaticProps() {
  const folders = await getStaticApiProps(Folder)
  return {
    props: {
      folders
    }
  }
}
