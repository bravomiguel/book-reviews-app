import {useEffect} from 'react';
import Typography from '@mui/material/Typography';
import BooksList from '@/components/booksList';

export default function Home() {
  return (
    <>
      <Typography variant="h4" component="h3">
        Book Reviews
      </Typography>
      <BooksList />
    </>
  )
}
