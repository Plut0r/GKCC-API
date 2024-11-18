import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide media title"],
  },
  link: {
    type: String,
    required: [true, "Please provide media link"],
  },
  type: {
    type: String,
    enum: ["livestream", "audio"],
    required: [true, "Please provide a media type"],
  },
});

export default mongoose.model("Media", MediaSchema);
