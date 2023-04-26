import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Rating from '@mui/material/Rating';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export default function BooksList() {
  const data = [
    {
      _id: '1',
      title: 'Harry Potter',
      avatarUrl: 'https://m.media-amazon.com/images/I/81m1s4wIPML.jpg',
      author: 'J.K. Rowling',
      rating: 3.5,
    },
    {
      _id: '1',
      title: 'Harry Potter',
      avatarUrl: 'https://m.media-amazon.com/images/I/81m1s4wIPML.jpg',
      author: 'J.K. Rowling',
      rating: 3.5,
    },
  ];

  if (data.length === 0) {
    return <p>Add a new review.</p>;
  }

  return (
    <List>
      {data.map(({ title, rating, _id, avatarUrl }) => (
        <ListItem
          key={_id}
          sx={{ marginBottom: '0.5em', color: 'inherit' }}
          to={`/view/${_id}`}
          // component={Link}
        >
          <ListItemAvatar>
            <Avatar
              variant="square"
              src={avatarUrl}
              imgProps={{ loading: 'lazy' }}
              sx={{ width: '2em', height: '100%', border: '0.5px solid grey' }}
            >
              {avatarUrl ? null : <AutoStoriesIcon sx={{ height: '2.4em' }} />}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={title}
            secondary={
              <Rating
                name="half-rating-read"
                defaultValue={rating}
                precision={0.5}
                readOnly
              />
            }
          />
          <IconButton
            aria-label="update"
            to={`/update/${_id}`}
            // component={Link}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {}}
            to={`/`}
            // component={Link}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}
