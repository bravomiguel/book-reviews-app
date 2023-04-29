import { useQuery } from '@tanstack/react-query';
import { fetchBooks, fetchBook } from './requests';
import { STORAGE_KEY } from '../settings';

export const useBooks = ({
  onSuccess = () => {},
  onError = (err) => {
    console.log(err);
  },
} = {}) =>
  useQuery({
    // suspense: true,
    queryKey: [STORAGE_KEY],
    queryFn: fetchBooks,
    onSuccess,
    onError,
  });

export const useBook = ({
  id,
  onSuccess = () => {},
  onError = (err) => {
    console.log(err);
  },
} = {}) =>
  useQuery({
    // suspense: true,
    queryKey: [STORAGE_KEY, id],
    queryFn: () => fetchBook(id),
    onSuccess,
    onError,
  });