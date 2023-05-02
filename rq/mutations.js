import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { addBook, deleteBook, updateBook } from './httpRequests';
import { STORAGE_KEY } from '../settings';
import { openSnackbar } from '../redux/slices/snackbarSlice';

export const useAdd = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBook,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
      console.log('add response', data);
      dispatch(
        openSnackbar({
          severity: 'success',
          message: 'Review added!',
          autoHideDuration: 5000,
        }),
      );
    },
    onError: () => {
      dispatch(
        openSnackbar({
          severity: 'error',
          message: 'Error adding review, please try again.',
          autoHideDuration: 5000,
        }),
      );
    },
  });
};

export const useDelete = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
      console.log('delete response', data);
      dispatch(
        openSnackbar({
          severity: 'success',
          message: 'Review deleted!',
          autoHideDuration: 5000,
        }),
      );
    },
    onError: () => {
      dispatch(
        openSnackbar({
          severity: 'error',
          message: 'Error deleting review, please try again.',
          autoHideDuration: 5000,
        }),
      );
    },
  });
};

export const useUpdate = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBook,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
      console.log('update response', data);
      dispatch(
        openSnackbar({
          severity: 'success',
          message: 'Review updated!',
          autoHideDuration: 5000,
        }),
      );
    },
    onError: () => {
      dispatch(
        openSnackbar({
          severity: 'error',
          message: 'Error updating review, please try again.',
          autoHideDuration: 5000,
        }),
      );
    },
  });
};
