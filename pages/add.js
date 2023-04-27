import { useEffect } from "react";
import BookSearch from "@/components/bookSearch"
import BookForm from "@/components/forms/bookForm"
import Typography from "@mui/material/Typography"
import { useDispatch } from 'react-redux';

import { setBnValue } from "@/redux/slices/bottomNavSlice";

export default function Add() {
    // make sure bottom nav set to add book
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setBnValue(1));
    }, []);
  return (
    <>
      <Typography variant="h4" component="h3" sx={{ marginBottom: '0.5em' }}>
        Add Review
      </Typography>
      <BookSearch />
      <BookForm />
    </>
  )
}
