import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import BooksList from '@/components/booksList';
import { useDispatch } from 'react-redux';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { STORAGE_KEY } from '@/settings';
import { fetchBooks } from '@/rq/httpRequests';
import { useBooks } from '@/rq/queries';
import { useDelete } from '@/rq/mutations';
import { setBnValue } from '@/redux/slices/bottomNavSlice';

export default function Home() {
  // make sure bottom nav set to home
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBnValue(0));
  }, []);

  const {data: books, isLoading} = useBooks();
  console.log(isLoading);
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
      <BooksList books={books} deleteHandler={deleteHandler} />
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([STORAGE_KEY], fetchBooks);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
