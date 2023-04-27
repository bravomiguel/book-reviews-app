import Link from 'next/link';
import { useRouter } from 'next/router';
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

import data from '../dummyData';

export default function BooksList() {
  if (data.length === 0) {
    return <p>Add a new review.</p>;
  }

  const router = useRouter();

  return (
    <List>
      {data.map(({ title, rating, _id, avatarUrl }) => (
        <div key={_id} onClick={() => {router.push(`/view/${_id}`)}} style={{ cursor: "pointer" }}>
          <ListItem
            // key={_id}
            sx={{ marginBottom: '0.5em', color: 'inherit' }}
            // href={`/view/${_id}`}
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
              onClick={(event) => {
                event.stopPropagation();
                router.push(`/update/${_id}`);
                }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                router.push(`/`);
                }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </div>
      ))}
    </List>
  );
}
