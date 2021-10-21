const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FolderSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  files: [{
    type: Schema.Types.ObjectId,
    ref: "File",
    required: false
  }]
}, { timestamps: true })

export default mongoose.models.Folder || mongoose.model("Folder", FolderSchema)
