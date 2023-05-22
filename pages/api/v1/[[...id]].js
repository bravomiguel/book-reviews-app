// import nc from "next-connect";
import { createRouter } from 'next-connect';

import Book from '@/lib/models/book.model';

const baseRoute = '/api/v1/:id?';

const router = createRouter();
router
  .get(baseRoute, async (req, res) => {
    const { id } = req.params;

    try {
      let data = [];
      if (id) {
        data = await Book.findById(id).exec();
      } else {
        data = await Book.find({}).exec();
      }
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  })
  .post(baseRoute, async (req, res) => {
    let data = { ...req.body };
    try {
      const newBook = new Book(data);
      const result = await newBook.save();
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  })
  .put(baseRoute, async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No id provided to update" });
    }
    let updates = { ...req.body };
    try {
      const result = await Book.updateOne({ _id: id }, updates);
      if (result.n === 0) return res.status(404).send({ message: "Not Found" });
      return res.status(200).send({ message: "Updated" });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  })
  .delete(baseRoute, async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No id provided to delete" });
    }
    try {
      const result = await Book.deleteOne({ _id: id });
      if (result.n === 0) return res.status(404).send({ message: "Not Found" });
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Internal Server Error');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Not Found');
  },
  attachParams: true,
});
