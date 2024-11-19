import mongoose from "mongoose";

const EbookSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide ebook title"],
    maxlength: [100, "Name can not be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide ebook description"],
  },
  tags: {
    type: [String],
    required: [true, "Please provide product category"],
  },
  free: {
    type: Boolean,
    default: false,
    required: [true, "Please specify if ebook is free"],
  },
  price: {
    type: Number,
    required: [true, "Please provide ebook price"],
    default: 0,
  },
  cover_img: {
    type: String,
    required: [true, "Please provide ebook cover image"],
    default: "/uploads/example.jpeg",
  },
  ebook_file: {
    type: String,
    required: [true, "Please provide ebook pdf file"],
  },
  sales: {
    type: Number,
    default: 0,
    required: [true, "Please provide the number of sales"],
  },
  revenue: {
    type: Number,
    default: 0,
    required: [true, "Please provide the revenue generated from the ebook"],
  },
});

export default mongoose.model("Ebook", EbookSchema);
