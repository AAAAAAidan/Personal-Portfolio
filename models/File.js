const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FileSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  folders: [{
    type: Schema.Types.ObjectId,
    ref: "Folder",
    required: false
  }]
}, { timestamps: true })

export default mongoose.models.File || mongoose.model("File", FileSchema)
