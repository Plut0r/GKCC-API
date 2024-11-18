import mongoose from "mongoose";

const PolicySchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Please provide the content"],
  },
  type: {
    type: String,
    enum: ["privacy-policy", "terms-conditions"],
    required: [true, "Please provide a type"],
  },
});

export default mongoose.model("Policy", PolicySchema);
