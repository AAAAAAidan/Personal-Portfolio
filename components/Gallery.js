import styles from "../styles/Gallery.module.css"

export default function Gallery() {
  return (
    <div>
      <h2>Folder Description</h2>
      <div className={styles.gallery}>
        <button>Previous</button>
        <img className={styles.image} src="filename" />
        <button>Next</button>
      </div>
      <h3>File Title</h3>
      <h4>File Description</h4>
    </div>
  )
}
