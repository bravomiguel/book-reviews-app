import Typography from '@mui/material/Typography';
import BookForm from '@/components/forms/bookForm';
import { useRouter } from 'next/router';

import dbConnect from '@/lib/db';
import Book from '@/lib/models/book.model';
import { useUpdate } from '@/rq/mutations';
import { getDiffOfTwoObjects } from '@/lib/utils';

export default function Update({ book }) {
  // handle updates with form submit
  const updateMutation = useUpdate();
  const router = useRouter();
  const submitHandler = (id, vals) => {
    console.log('id', id);
    const updates = getDiffOfTwoObjects(book, vals);
    console.log('updates', updates);
    updateMutation.mutate({id, data: updates});
    router.push('/');
  };

  return (
    <>
      <Typography variant="h4" component="h3" sx={{ marginBottom: '0.5em' }}>
        Update Review
      </Typography>
      <BookForm submitHandler={submitHandler} book={book} />
    </>
  );
}

export async function getStaticProps({ params }) {
  await dbConnect();
  const book = await Book.findById(params.id);

  return {
    props: {
      id: params.id,
      book: JSON.parse(JSON.stringify(book)),
    },
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
