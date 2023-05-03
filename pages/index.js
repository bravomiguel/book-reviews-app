import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import BooksList from '@/components/booksList';
import { useDispatch } from 'react-redux';

import { useBooks } from '@/rq/queries';
import { useDelete } from '@/rq/mutations';
import dbConnect from '@/lib/db';
import Book from '@/lib/models/book.model';
import { setBnValue } from '@/redux/slices/bottomNavSlice';

export default function Home({initialBooks}) {
  // make sure bottom nav set to home
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBnValue(0));
  }, []);

  // const query = useBooks({initialBooks});
  // console.log(query);
  const {data: books, isLoading, isFetching} = useBooks({initialBooks});
  console.log(isLoading);
  console.log(isFetching);
  // console.log(books);

  const deleteMutation = useDelete();
  const deleteHandler = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <>
      <Typography variant="h4" component="h3">
        Book Reviews
      </Typography>
      <BooksList isFetching={isFetching} books={books} deleteHandler={deleteHandler} />
    </>
  );
}

export async function getStaticProps() {

  await dbConnect();
  const data = await Book.find({});

  return {
    props: {
      initialBooks: JSON.parse(JSON.stringify(data)),
    },
  };
}
