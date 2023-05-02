  import dbConnect from '@/lib/db';
import Book from '@/lib/models/book.model';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const data = await Book.find({});
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  } else if (req.method === 'POST') {
    const bookData = req.body;
    console.log('bookData', bookData);
    try {
      await dbConnect();
      const newBook = new Book(bookData);
      const result = await newBook.save();
      res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
    // const book = new Book(bookData);
  } else {
    res
      .status(400)
      .send(
        `Method ${req.method} not supported for this endpoint`,
      );
  }
}
