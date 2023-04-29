import dbConnect from "../../server/db";
import Book from "../../server/models/book.model";

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}