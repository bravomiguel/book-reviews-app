import dbConnect from '@/lib/db';
import Book from '@/lib/models/book.model';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    try {
      await dbConnect();
      const data = await Book.findById(id).exec();
      if (data === null) {
        res.status(404).send(data);
      }
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  if (req.method === 'PUT') {
    const { id } = req.query;
    const updates = req.body;
    try {
      await dbConnect();
      const result = await Book.updateOne({ _id: id }, updates);
      if (result.n === 0) return res.status(400);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await dbConnect();
      const result = await Book.deleteOne({ _id: id });
      if (result.n === 0) return res.status(404);
      res.status(204).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(400)
      .send(
        `Method ${req.method} not supported for this endpoint`,
      );
  }
}
