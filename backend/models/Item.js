import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    unit: { type: String, required: true }, 
    quantity: { type: Number, default: 0 },
    reorderThreshold: { type: Number, default: 10 },
    costPrice: { type: Number, required: true },
    createdBy: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
