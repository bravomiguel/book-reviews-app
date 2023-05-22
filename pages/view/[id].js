import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import dbConnect from '@/lib/db';
import Book from '@/lib/models/book.model';
import { useDelete } from '@/rq/mutations';
import { STORAGE_KEY } from '@/settings';
import { useBook } from '@/rq/queries';

export default function View() {
  const router = useRouter();
  const { id } = router.query;
  console.log(`id`, id);
  const { data: book } = useBook({ id });

  // handle when use clicks delete
  const deleteMutation = useDelete();
  const deleteHandler = (id) => {
    deleteMutation.mutate(id);
    router.push('/');
  };

  const formRowStyle = {
    marginBlockEnd: '1.5em',
  };

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'min-content auto min-content',
          gridTemplateRows: 'auto',
          gridTemplateAreas: `
        'img info icons'
        `,
          columnGap: '2em',
          marginBottom: '2em',
        }}
      >
        <Avatar
          variant="square"
          src={book?.avatarUrl}
          sx={{
            width: '4.5em',
            height: '100%',
            maxHeight: '7em',
            border: '0.5px solid grey',
            gridArea: 'img',
          }}
        >
          {book?.avatarUrl ? null : (
            <AutoStoriesIcon sx={{ height: '2.4em' }} />
          )}
        </Avatar>
        <div style={{ gridArea: 'info' }}>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ gridArea: 'title' }}
          >
            {book?.title}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ gridArea: 'author' }}
          >
            {book?.author}
          </Typography>
          <Rating
            name="half-rating-read"
            defaultValue={book?.rating}
            precision={0.5}
            readOnly
            size="large"
            sx={{ gridArea: 'rating' }}
          />
        </div>
        <div style={{ gridArea: 'icons' }}>
          <IconButton
            size="large"
            href={`/update/${book?._id}`}
            component={Link}
            sx={{ gridArea: 'edit' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="large"
            sx={{ gridArea: 'delete' }}
            href={'/'}
            component={Link}
            onClick={() => deleteHandler(book?._id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div style={formRowStyle}>
        {book?.feelings && (
          <Card sx={{ minWidth: 275 }} fullWidth>
            <CardContent>
              <Typography
                sx={{ fontSize: '0.75em' }}
                color="text.secondary"
                gutterBottom
              >
                How did this book make you feel?
              </Typography>
              <Typography variant="p" component="div" sx={{ fontSize: '1em' }}>
                {book?.feelings}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
      <div style={formRowStyle}>
        {book?.characters && (
          <Card sx={{ minWidth: 275 }} fullWidth>
            <CardContent>
              <Typography
                sx={{ fontSize: '0.75em' }}
                color="text.secondary"
                gutterBottom
              >
                Who were your favourite characters?
              </Typography>
              <Typography variant="p" component="div" sx={{ fontSize: '1em' }}>
                {book?.characters}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
      <div style={formRowStyle}>
        {book?.writingStyle && (
          <Card sx={{ minWidth: 275 }} fullWidth>
            <CardContent>
              <Typography
                sx={{ fontSize: '0.75em' }}
                color="text.secondary"
                gutterBottom
              >
                What were your thoughts on the writing style?
              </Typography>
              <Typography variant="p" component="div" sx={{ fontSize: '1em' }}>
                {book?.writingStyle}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
      <div style={formRowStyle}>
        {book?.notLiked && (
          <Card sx={{ minWidth: 275 }} fullWidth>
            <CardContent>
              <Typography
                sx={{ fontSize: '0.75em' }}
                color="text.secondary"
                gutterBottom
              >
                Was there anything you didn't like?
              </Typography>
              <Typography variant="p" component="div" sx={{ fontSize: '1em' }}>
                {book?.notLiked}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
      <div style={formRowStyle}>
        {book?.mostEnjoyed && (
          <Card sx={{ minWidth: 275 }} fullWidth>
            <CardContent>
              <Typography
                sx={{ fontSize: '0.75em' }}
                color="text.secondary"
                gutterBottom
              >
                What did you most enjoy?
              </Typography>
              <Typography variant="p" component="div" sx={{ fontSize: '1em' }}>
                {book?.mostEnjoyed}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
      <div style={formRowStyle}>
        {book?.other && (
          <Card sx={{ minWidth: 275 }} fullWidth>
            <CardContent>
              <Typography
                sx={{ fontSize: '0.75em' }}
                color="text.secondary"
                gutterBottom
              >
                Any other comments?
              </Typography>
              <Typography variant="p" component="div" sx={{ fontSize: '1em' }}>
                {book?.other}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
      {!book?.feelings &&
        !book?.characters &&
        !book?.writingStyle &&
        !book?.notLiked &&
        !book?.mostEnjoyed &&
        !book?.other && <p>Add more info to your review.</p>}
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
      // book: JSON.parse(JSON.stringify(book)),
      dehydratedState: dehydrate(queryClient),
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
