import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import BooksList from '@/components/booksList';
import { useDispatch } from 'react-redux';

import { setBnValue } from '@/redux/slices/bottomNavSlice';

export default function Home() {
  // make sure bottom nav set to home
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBnValue(0));
  }, []);
  
  return (
    <>
      <Typography variant="h4" component="h3">
        Book Reviews
      </Typography>
      <BooksList />
    </>
  );
}
