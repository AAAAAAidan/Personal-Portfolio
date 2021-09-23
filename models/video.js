const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  videoId: {
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
  }
}, { timestamps: true });

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
