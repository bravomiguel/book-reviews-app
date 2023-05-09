// grab mongoose Schema method
import mongoose from "mongoose";
const { Schema } = mongoose;

// define schema
const bookSchema = Schema({
  title: {type: String, required: false},
  author: {type: String, required: false},
  avatarUrl: {type: String, required: false},
  feelings: {type: String, required: false},
  characters: {type: String, required: false},
  writingStyle: {type: String, required: false},
  notLiked: {type: String, required: false},
  mostEnjoyed: {type: String, required: false},
  other: {type: String, required: false},
  rating: {type: Number, required: false},
})

// create model
const Book = mongoose?.models?.Book || mongoose.model('Book', bookSchema);

// export model
export default Book;