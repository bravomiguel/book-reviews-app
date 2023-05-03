import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

import BookSearch from '@/components/bookSearch';
import BookForm from '@/components/forms/bookForm';
import { useSelector, useDispatch } from 'react-redux';
import { setBnValue } from '@/redux/slices/bottomNavSlice';
import {
  searchBooks,
  setValue,
  setInputValue,
  clearResults,
  selectValue,
  selectInputValue,
  selectResults,
} from '@/redux/slices/bookSearchSlice';
import { useAdd } from '@/rq/mutations';

export default function Add() {
  // make sure bottom nav set to add book
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBnValue(1));
  }, []);

  // get book search state
  const searchValue = useSelector(selectValue);
  const searchInputValue = useSelector(selectInputValue);
  const searchResults = useSelector(selectResults);
  // set book search state to blank on loading page
  useEffect(() => {
    dispatch(setValue(null));
    dispatch(setInputValue(''));
    dispatch(clearResults());
  }, []);
  // update search bar with option chosen
  const searchOnChange = (event, newValue) => {
    dispatch(setValue(newValue));
  };
  // update search bar input values and search results each time input value changes
  const searchOnInputChange = (event, newInputValue) => {
    dispatch(setInputValue(newInputValue));
    if (searchInputValue.length === 0) {
      dispatch(clearResults());
      return;
    }
    dispatch(searchBooks(searchInputValue));
  };

  // handle book form submit
  const addMutation = useAdd();
  const router = useRouter();
  const submitHandler = (data) => {
    addMutation.mutate(data);
    router.push('/');
  };

  return (
    <>
      <Typography variant="h4" component="h3" sx={{ marginBottom: '0.5em' }}>
        Add Review
      </Typography>
      <BookSearch
        value={searchValue}
        inputValue={searchInputValue}
        results={searchResults}
        onChange={searchOnChange}
        onInputChange={searchOnInputChange}
      />
      <BookForm submitHandler={submitHandler} searchValue={searchValue} />
    </>
  );
}
