import Typography from '@mui/material/Typography';
import BookForm from '@/components/forms/bookForm';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import dbConnect from '@/lib/db';
import Book from '@/lib/models/book.model';
import { useUpdate } from '@/rq/mutations';
import { getDiffOfTwoObjects } from '@/lib/utils';
import { useBook } from '@/rq/queries';
import { STORAGE_KEY } from '@/settings';

export default function Update() {
  const router = useRouter();
  const { id } = router.query;

  const { data: book } = useBook({ id });

  // handle updates with form submit
  const updateMutation = useUpdate();
  const submitHandler = (id, vals) => {
    console.log('id', id);
    const updates = getDiffOfTwoObjects(book, vals);
    console.log('updates', updates);
    updateMutation.mutate({ id, data: updates });
    router.push('/');
  };

  return (
    <>
      <BookForm submitHandler={submitHandler} book={book} />
    </>
  );
}

export async function getStaticProps({ params }) {
  await dbConnect();
  const data = await Book.findById(params.id);
  const queryClient = new QueryClient();
  await queryClient.setQueryData(
    [STORAGE_KEY, params.id],
    JSON.parse(JSON.stringify(data)),
  );

  return {
    props: {
      id: params.id,
      dehydratedState: dehydrate(queryClient),
      pageTitle: 'Update Review',
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  await dbConnect();
  const books = await Book.find({});
  const paths = books.map((book) => ({
    params: { id: JSON.parse(JSON.stringify(book._id)) },
  }));
  return {
    paths,
    fallback: true,
  };
}
