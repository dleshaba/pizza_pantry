import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  category: String,
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Item", itemSchema);
