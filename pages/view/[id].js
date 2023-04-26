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

export default function View({ id }) {
  const book = {
    _id: '1',
    title: 'Harry Potter',
    avatarUrl: 'https://m.media-amazon.com/images/I/81m1s4wIPML.jpg',
    author: 'J.K. Rowling',
    rating: 3.5,
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
        src={book.avatarUrl}
        sx={{
          width: '4.5em',
          height: '100%',
          maxHeight: '7em',
          border: '0.5px solid grey',
          gridArea: 'img',
        }}
      >
        {book.avatarUrl ? null : (
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
          {book.title}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ gridArea: 'author' }}
        >
          {book.author}
        </Typography>
        <Rating
          name="half-rating-read"
          defaultValue={book.rating}
          precision={0.5}
          readOnly
          size="large"
          sx={{ gridArea: 'rating' }}
        />
      </div>
      <div style={{ gridArea: 'icons' }}>
        <IconButton
          size="large"
          href={`/update/${book._id}`}
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
          onClick={() => deleteHandler(book.id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
    <div style={formRowStyle}>
      {book.feelings && (
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
              {book.feelings}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
    <div style={formRowStyle}>
      {book.characters && (
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
              {book.characters}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
    <div style={formRowStyle}>
      {book.writingStyle && (
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
              {book.writingStyle}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
    <div style={formRowStyle}>
      {book.notLiked && (
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
              {book.notLiked}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
    <div style={formRowStyle}>
      {book.mostEnjoyed && (
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
              {book.mostEnjoyed}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
    <div style={formRowStyle}>
      {book.other && (
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
              {book.other}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
    {!book.feelings &&
      !book.characters &&
      !book.writingStyle &&
      !book.notLiked &&
      !book.mostEnjoyed &&
      !book.other && <p>Add more info to your review.</p>}
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
  const paths = [
    {
      params: {
        id: '1',
      },
    },
  ];

  return {
    paths,
    fallback: true,
  };
}
