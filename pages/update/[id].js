import Typography from '@mui/material/Typography';
import BookForm from '@/components/forms/bookForm';
import data from '../../dummyData';

export default function Update({ id }) {
  const idx = data.findIndex((book) => book._id === id);
  const book = data.at(idx);
  return (
    <>
      <Typography variant="h4" component="h3" sx={{ marginBottom: '0.5em' }}>
        Update Review
      </Typography>
      <BookForm book={book} />
    </>
  );
}

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}

export async function getStaticPaths() {
  const books = data;
  const paths = books.map((book) => ({ params: { id: book._id } }));
  return {
    paths,
    fallback: true,
  };
}
