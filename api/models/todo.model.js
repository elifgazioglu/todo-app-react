import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    level: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      default: "low",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
