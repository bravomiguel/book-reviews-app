import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import debounce from 'lodash/debounce';

import { GOOGLE_BOOKS_ENDPOINT } from '@/settings';

const initialState = {
  results: [],
  status: 'idle',
  error: null,
  value: null,
  inputValue: '',
};

const handler = async (searchTerms) => {
  const queryURL = `${GOOGLE_BOOKS_ENDPOINT}/volumes?q=${searchTerms}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`;
  try {
    const response = await fetch(queryURL);
    console.log(response.status);
    if (!response.ok) throw response;
    const rawData = await response.json();
    let data = [];
    for (const item of rawData.items) {
      let result = {
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.at(0),
        avatarUrl: item.volumeInfo.imageLinks?.thumbnail,
      };
      data = data.concat(result);
    }
    return data;
  } catch (err) {
    console.log(err.statusText || err.message);
    return Promise.reject(err.statusText || err.message);
  }
};
const debouncedHandler = debounce(handler, 200, { leading: true });

export const searchBooks = createAsyncThunk(
  'bookSearch/searchBooks',
  debouncedHandler,
);

export const bookSearchSlice = createSlice({
  name: 'bookSearch',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.status = 'idle';
        state.results = action.payload;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.status = 'errored';
        state.error = action.error.message;
      });
  },
});

export const { setValue, setInputValue, clearResults } =
  bookSearchSlice.actions;

export const selectValue = (state) => state.bookSearch.value;
export const selectInputValue = (state) => state.bookSearch.inputValue;
export const selectResults = (state) => state.bookSearch.results;
export const selectStatus = (state) => state.bookSearch.status;
export const selectError = (state) => state.bookSearch.error;

export default bookSearchSlice.reducer;
