import { Schema, model, models } from "mongoose";

const bookSchema = new Schema(
  {
    isbn: { type: String, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default models.Book || model("Book", bookSchema);
