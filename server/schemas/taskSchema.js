import mongoose from "mongoose";

const taskSch = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo"
    },
    dueDate: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSch);
