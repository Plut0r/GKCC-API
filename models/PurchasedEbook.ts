import mongoose from "mongoose";

const PurchasedEbookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ebooks: [
    {
      ebook: {
        type: mongoose.Types.ObjectId,
        ref: "Ebook",
        required: true,
      },
      purchasedAt: {
        type: Date,
        default: Date.now,
        required: true,
      },
    },
  ],
});

export default mongoose.model("PurchasedEbook", PurchasedEbookSchema);
