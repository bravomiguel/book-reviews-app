import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import BooksList from '@/components/booksList';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import { useBooks } from '@/rq/queries';
import { useDelete } from '@/rq/mutations';
import dbConnect from '@/lib/db';
import { STORAGE_KEY } from '@/settings';
import { fetchBooks } from '@/rq/httpRequests';
import Book from '@/lib/models/book.model';
import { setBnValue } from '@/redux/slices/bottomNavSlice';

export default function Home() {
  // make sure bottom nav set to home
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBnValue(0));
  }, []);

  const { data: books } = useBooks();
  // console.log(books);

  const deleteMutation = useDelete();
  const deleteHandler = (id) => {
    deleteMutation.mutate(id);
  };

  // if (isFetching)
  //   return (
  //     <CircularProgress
  //       sx={{ position: 'fixed', bottom: '50%', right: '50%' }}
  //     />
  //   );

  if (books.length === 0) {
    return <p>Add a new review.</p>;
  }

  return (
    <>
      <BooksList books={books} deleteHandler={deleteHandler} />
    </>
  );
}

export async function getStaticProps() {
  await dbConnect();
  const data = await Book.find({});
  const queryClient = new QueryClient();
  await queryClient.setQueryData(
    [STORAGE_KEY],
    JSON.parse(JSON.stringify(data)),
  );

  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery([STORAGE_KEY], fetchBooks);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      pageTitle: 'Book Reviews',
    },
    revalidate: 10,
  };
}
